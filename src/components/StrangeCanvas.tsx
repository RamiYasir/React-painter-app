import React, { FC, useRef, useEffect, useState, useContext } from "react";
import { PainterContext } from "../context/PainterContext";
import drawHelpers from "../helpers/drawFunctions";
import { useMode } from "../hooks/useMode";

interface StrangeCanvasProps {
  width: number;
  height: number;
}

const StrangeCanvas: FC<StrangeCanvasProps> = ({
  width,
  height,
}: StrangeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const context = useContext(PainterContext);

  const drawStrangeStroke = (event: MouseEvent): void => {
    if (!ctx) {
      return;
    }
    drawHelpers.drawStrangeStroke(
      event,
      ctx,
      context.previousX!,
      context.previousY!
    );
  };

  const drawStrangeRect = (event: MouseEvent): void => {
    if (!ctx) {
      return;
    }
    drawHelpers.drawStrangeRect(
      event,
      ctx,
      context.previousX!,
      context.previousY!
    );
  };

  useMode(canvasRef, width, height, ctx!, drawStrangeStroke, drawStrangeRect);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d")!);
    }
  }, []);

  return (
    <canvas className="border-solid border-2 border-red-500" ref={canvasRef} />
  );
};

export default StrangeCanvas;
