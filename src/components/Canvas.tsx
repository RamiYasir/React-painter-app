import React, { FC, useRef, useEffect, useState, useContext } from "react";
import { usePainter } from "../hooks/usePainter";
import { PainterContext } from "../context/PainterContext";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: FC<CanvasProps> = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const context = useContext(PainterContext);

  // useMode could be where we figure out the logic for which usePainter callbacks to use when.
  // because it's likely to be where we add event listeners, we can also deal with updateCoordinates there.

  // isDrawing needs to be passed in somehow.
  // I'm not a fan of how these state variables are repeated between canvas and usePainter.
  const drawStroke = (event: MouseEvent): void => {
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(context.previousX, context.previousY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  };

  // const drawRect = (event: MouseEvent): void => {
  //   if (!ctx) {
  //     return;
  //   }

  //   ctx.beginPath();
  //   ctx.moveTo(lastX.current, lastY.current);
  //   ctx.strokeRect(
  //     lastX.current,
  //     lastY.current,
  //     event.offsetX - lastX.current,
  //     event.offsetY - lastY.current
  //   );
  // };

  // pass canvasRef to usePainter, get ctx in usePainter?
  // really make canvas as dumb as possible.
  // width and height might be a candidate for Context
  const [handleDraw, handlePainterDown, handlePainterOut] =
    usePainter(drawStroke);
  // const [handleDrawRect, handlePainterDownRect, handlePainterOutRect] =
  //   usePainter(drawRect);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d")!);

      if (ctx) {
        // maybe this stuff can go in a useMode
        canvasRef.current?.addEventListener("mousedown", handlePainterDown);
        // canvasRef.current?.addEventListener("mousedown", handlePainterDownRect);
        canvasRef.current?.addEventListener("mousemove", handleDraw);
        // canvasRef.current?.addEventListener("mousemove", handleDrawRect);
        canvasRef.current?.addEventListener("mouseup", handlePainterOut);
        // canvasRef.current?.addEventListener("mousemove", handlePainterOutRect);
        canvasRef.current?.addEventListener("mouseout", handlePainterOut);

        ctx.canvas.width = width - 20;
        ctx.canvas.height = height - 50;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 10;
      }
    } else {
      console.log(
        `some variable is undefined:` +
          `\ncanvasRef: ${canvasRef}` +
          `\ncanvasRef.current: ${canvasRef.current}` +
          `\nctx: ${ctx}`
      );
    }
  }, [handleDraw, handlePainterDown, handlePainterOut, width, height, ctx]);

  return (
    <canvas className="border-solid border-2 border-sky-500" ref={canvasRef} />
  );
};

export default Canvas;
