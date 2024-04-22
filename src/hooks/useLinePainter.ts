import { useRef, useCallback, useContext } from "react";
import { PainterContext } from "../context/PainterContext";

export const useLinePainter = (draw: (event: MouseEvent) => void) => {
  const isMouseDown = useRef(false);
  const context = useContext(PainterContext);

  const handleDraw = useCallback(
    (event: MouseEvent) => {
      if (isMouseDown.current) {
        draw(event);
        [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      }
      [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      console.log("handleLineDraw called");
    },
    [draw, context.previousX, context.previousY]
  );

  const handlePainterDown = useCallback(
    (event: MouseEvent): void => {
      isMouseDown.current = true;
      [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      console.log("handleLineDown called");
    },
    [context.previousX, context.previousY]
  );

  const handlePainterOut = useCallback((): void => {
    isMouseDown.current = false;
    console.log("handleLineOut called");
  }, []);

  return [handleDraw, handlePainterDown, handlePainterOut];
};
