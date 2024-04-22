import { useRef, useCallback, useContext } from "react";
import { PainterContext } from "../context/PainterContext";

export const useShapePainter = (draw: (event: MouseEvent) => void) => {
  const isMouseDown = useRef(false);
  const context = useContext(PainterContext);

  const handleDraw = useCallback(
    (event: MouseEvent) => {
      if (!isMouseDown.current) {
        [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      } else {
        // preview of shape
        return;
      }
      console.log("handleShapeDraw called");
    },
    // important to have draw in dependency array so coordinates are updated within the function
    [draw, context.previousX, context.previousY]
  );

  const handleShapePainterDown = useCallback((): void => {
    isMouseDown.current = true;
    console.log("handleShapeDown called");
  }, []);

  const handleShapePainterOut = useCallback(
    (event: MouseEvent): void => {
      draw(event);
      isMouseDown.current = false;
      [context.previousX, context.previousY] = [event.offsetX, event.offsetY];
      console.log("handleShapeOut called");
    },
    [draw, context.previousX, context.previousY]
  );

  return [handleDraw, handleShapePainterDown, handleShapePainterOut];
};
