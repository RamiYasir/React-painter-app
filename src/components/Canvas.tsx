import React, { FC, useRef, useEffect, useState, useContext } from "react";
import { PainterContext } from "../context/PainterContext";
import drawHelpers from "../helpers/drawFunctions";
import { useMode } from "../hooks/useMode";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: FC<CanvasProps> = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const context = useContext(PainterContext);

  const drawStroke = (event: MouseEvent): void => {
    // it's so ugly having ctx here for this one thing and then properly being used in useMode
    if (!ctx) {
      return;
    }
    drawHelpers.drawStroke(event, ctx, context.previousX!, context.previousY!);
  };

  const drawRect = (event: MouseEvent): void => {
    if (!ctx) {
      return;
    }
    drawHelpers.drawRect(event, ctx, context.previousX!, context.previousY!);
  };

  // const drawStrangeStroke = (event: MouseEvent): void => {
  //   if (!ctx) {
  //     return;
  //   }
  //   drawHelpers.drawStrangeStroke(
  //     event,
  //     ctx,
  //     context.previousX!,
  //     context.previousY!
  //   );
  // };

  useMode(canvasRef, width, height, ctx!, drawStroke, drawRect);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d")!);
    }
  }, []);

  return (
    <canvas className="border-solid border-2 border-sky-500" ref={canvasRef} />
  );
};

export default Canvas;
