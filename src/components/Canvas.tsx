import React, { FC, useRef, useEffect, useState } from "react";
import { usePainter } from "../hooks/usePainter";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: FC<CanvasProps> = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const lastX = useRef(0);
  const lastY = useRef(0);

  // useMode could be where we figure out the logic for which usePainter to use when.

  // isDrawing needs to be passed in somehow.
  // I'm not a fan of how these state variables are repeated between canvas and usePainter.
  const draw = (event: MouseEvent): void => {
    // uses isDrawing
    if (!ctx || !ctx) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  };

  // pass canvasRef to usePainter, get ctx in usePainter.
  // really make canvas as dumb as possible.
  const [handleDraw, handlePainterDown, handlePainterOut] = usePainter(draw);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d")!);

      if (ctx) {
        canvasRef.current?.addEventListener("mousedown", handlePainterDown);
        canvasRef.current?.addEventListener("mousemove", handleDraw);
        canvasRef.current?.addEventListener("mouseup", handlePainterOut);
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
