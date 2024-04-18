import React, { FC, useRef, useEffect, useState, useContext } from "react";
import { useLinePainter } from "../hooks/useLinePainter";
import { useShapePainter } from "../hooks/useShapePainter";
import { PainterContext } from "../context/PainterContext";
import drawHelpers from "../helpers/drawFunctions";

interface CanvasProps {
  width: number;
  height: number;
}

// pass canvasRef to usePainter, get ctx in usePainter?
// really make canvas as dumb as possible.
const Canvas: FC<CanvasProps> = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const context = useContext(PainterContext);

  const drawStroke = (event: MouseEvent): void => {
    if (!ctx) {
      return;
    }
    drawHelpers.drawStroke(event, ctx, context.previousX, context.previousY);
  };

  const drawRect = (event: MouseEvent): void => {
    if (!ctx) {
      return;
    }
    drawHelpers.drawRect(event, ctx, context.previousX, context.previousY);
  };

  const [handleDraw, handlePainterDown, handlePainterOut] =
    useLinePainter(drawStroke);
  const [handleDrawRect, handlePainterDownRect, handlePainterOutRect] =
    useShapePainter(drawRect);

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
        canvasRef.current?.addEventListener("mouseout", handlePainterOut);
        // canvasRef.current?.addEventListener("mouseout", handlePainterOutRect);
        // canvasRef.current?.addEventListener("mouseup", handlePainterOutRect);

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
  }, [
    handleDraw,
    handlePainterDown,
    handlePainterOut,
    width,
    height,
    ctx,
    handlePainterDownRect,
    handleDrawRect,
    handlePainterOutRect,
  ]);

  return (
    <canvas className="border-solid border-2 border-sky-500" ref={canvasRef} />
  );
};

export default Canvas;
