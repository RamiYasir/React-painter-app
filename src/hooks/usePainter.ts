import { useRef, useCallback, useContext } from "react";
import { PainterContext } from "../context/PainterContext";

export const usePainter = (draw: (event: MouseEvent) => void) => {
  const isDrawing = useRef(false);
  const context = useContext(PainterContext);

  const handleDraw = useCallback(
    (event: MouseEvent) => {
      if (isDrawing.current) {
        draw(event);
        [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
        console.log("handleDraw called ", isDrawing.current);
      } else {
        console.log("handleDraw NOT called ", isDrawing.current);
      }
    },
    [draw, context.previousX, context.previousY]
  );

  const handlePainterDown = useCallback(
    (event: MouseEvent): void => {
      isDrawing.current = true;
      [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      console.log(isDrawing.current);
      console.log("handlePainterDown called");
    },
    [context.previousX, context.previousY]
  );

  const handlePainterOut = useCallback((): void => {
    isDrawing.current = false;
    console.log(isDrawing.current);
    console.log("handlePainterOut called");
  }, []);

  return [handleDraw, handlePainterDown, handlePainterOut];
};
