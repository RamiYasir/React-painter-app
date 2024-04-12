import React, { FC, useRef, useEffect, useState, useCallback } from "react";
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
  const isDrawing = useRef(false);

  const draw = (event: MouseEvent): void => {
    if (!ctx || !ctx || !isDrawing.current) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  };

  const [handleDraw, handlePainterDown, handlePainterOut] = usePainter(draw);

  // const handleMouseDown = (event: MouseEvent): void => {
  //   isDrawing.current = true;
  //   [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  //   console.log(isDrawing.current);
  // };

  // const handleMouseOut = (): void => {
  //   isDrawing.current = false;
  //   console.log(isDrawing.current);
  // };

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
  }, [draw, ctx]);

  return (
    <canvas className="border-solid border-2 border-sky-500" ref={canvasRef} />
  );
};

export default Canvas;
