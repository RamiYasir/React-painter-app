import React, { useEffect, useContext, useCallback } from "react";
import { PainterContext } from "../context/PainterContext";
import { useLinePainter } from "./useLinePainter";
import { useShapePainter } from "./useShapePainter";

export const useMode = (
  canvas: React.RefObject<HTMLCanvasElement>,
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  lineFunction: (event: MouseEvent) => void,
  rectFunction: (event: MouseEvent) => void
) => {
  const [handleLineDraw, handleLineDown, handleLineOut] =
    useLinePainter(lineFunction);
  const [handleRectDraw, handleRectDown, handleRectOut] =
    useShapePainter(rectFunction);
  const context = useContext(PainterContext);

  const removeEventHandlers = useCallback(
    (
      handleDraw: (event: MouseEvent) => void,
      handleDown: (event: MouseEvent) => void,
      handleOut: (event: MouseEvent) => void
    ): void => {
      canvas.current?.removeEventListener("mousedown", handleDown);
      canvas.current?.removeEventListener("mousemove", handleDraw);
      canvas.current?.removeEventListener("mouseout", handleOut);
      canvas.current?.removeEventListener("mouseup", handleOut);
    },
    [canvas]
  );

  const addEventHandlers = useCallback(
    (
      handleDraw: (event: MouseEvent) => void,
      handleDown: (event: MouseEvent) => void,
      handleOut: (event: MouseEvent) => void
    ): void => {
      canvas.current?.addEventListener("mousedown", handleDown);
      canvas.current?.addEventListener("mousemove", handleDraw);
      canvas.current?.addEventListener("mouseout", handleOut);
      canvas.current?.addEventListener("mouseup", handleOut);
    },
    [canvas]
  );

  useEffect(() => {
    if (canvas && canvas.current) {
      if (ctx) {
        ctx.canvas.width = width - 20;
        ctx.canvas.height = height - 50;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 10;
      }
    }
  }, [width, height, canvas, ctx]);

  useEffect(() => {
    if (context.currentPainter === "line") {
      console.log("useMode remove rect, add line");
      addEventHandlers(handleLineDraw, handleLineDown, handleLineOut);
    }

    if (context.currentPainter === "rect") {
      console.log("useMode remove line, add rect");
      addEventHandlers(handleRectDraw, handleRectDown, handleRectOut);
    }

    return () => {
      removeEventHandlers(handleLineDraw, handleLineDown, handleLineOut);
      removeEventHandlers(handleRectDraw, handleRectDown, handleRectOut);
    };
  }, [
    context.currentPainter,
    removeEventHandlers,
    addEventHandlers,
    handleLineDown,
    handleLineDraw,
    handleLineOut,
    handleRectDown,
    handleRectDraw,
    handleRectOut,
  ]);
};
