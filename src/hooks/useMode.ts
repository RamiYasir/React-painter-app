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
  //   const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [handleLineDraw, handleLineDown, handleLineOut] =
    useLinePainter(lineFunction);
  const [handleRectDraw, handleRectDown, handleRectOut] =
    useShapePainter(rectFunction);
  const context = useContext(PainterContext);

  //   usePainters which store the event handlers
  //   attach and detatch those event handlers, or else a useState that causes a rerender when toolbar is changed

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
    console.log("useEffect in useMode called");
    if (canvas && canvas.current) {
      // there may be a problem here. I don't want ctx to be undefined, everything breaks that way.
      //   setCtx(canvas.current.getContext("2d") || undefined);
      console.log(context.currentPainter);
      if (ctx) {
        if (context.currentPainter === "line") {
          console.log("useMode remove rect, add line");
          removeEventHandlers(handleRectDraw, handleRectDown, handleRectOut);
          addEventHandlers(handleLineDraw, handleLineDown, handleLineOut);
        }

        if (context.currentPainter === "rect") {
          console.log("useMode remove line, add rect");
          removeEventHandlers(handleLineDraw, handleLineDown, handleLineOut);
          addEventHandlers(handleRectDraw, handleRectDown, handleRectOut);
        }

        ctx.canvas.width = width - 20;
        ctx.canvas.height = height - 50;
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 10;
      }
    }
  }, [
    width,
    height,
    canvas,
    ctx,
    context.currentPainter,
    handleLineDraw,
    handleLineDown,
    handleLineOut,
    handleRectDraw,
    handleRectDown,
    handleRectOut,
    addEventHandlers,
    removeEventHandlers,
  ]);

  //   const context = useContext(PainterContext);
  //   return [context.currentPainter];
};

// realised I should probably create toolbar first
