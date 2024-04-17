import { useRef, useCallback, useContext } from "react";
import { PainterContext } from "../context/PainterContext";

export const useShapePainter = (draw: (event: MouseEvent) => void) => {
  const isMouseDown = useRef(false);
  const context = useContext(PainterContext);

  const handleDraw = useCallback(
    (event: MouseEvent) => {
      if (!isMouseDown.current) {
        // draw(event);
        [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      } else {
        console.log("handleDraw NOT called");
        return;
      }
    },
    [draw, context.previousX, context.previousY]
  );

  const handleShapePainterDown = useCallback((): void => {
    isMouseDown.current = true;
    console.log("handleShapePainterDown called");
  }, []);

  const handleShapePainterOut = useCallback(
    (event: MouseEvent): void => {
      draw(event);
      isMouseDown.current = false;
      [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      console.log("handleShapePainterOut called");
    },
    [context.previousX, context.previousY]
  );

  return [handleDraw, handleShapePainterDown, handleShapePainterOut];
};
