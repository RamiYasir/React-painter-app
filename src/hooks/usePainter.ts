import { useRef, useCallback } from "react";

export const usePainter = (draw: (event: MouseEvent) => void) => {
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const handleDraw = useCallback(
    // for some reason, we're getting called and NOT called in turn, which makes me think
    // the isDrawing.current var is being changed somehow. But idk how?
    (event: MouseEvent) => {
      if (isDrawing.current) {
        draw(event);
        console.log("handleDraw called ", isDrawing.current);
      } else {
        console.log("handleDraw NOT called ", isDrawing.current);
      }
    },
    [draw]
  );

  const handlePainterDown = useCallback((event: MouseEvent): void => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    console.log(isDrawing.current);
    console.log("handlePainterDown called");
  }, []);

  const handlePainterOut = useCallback((): void => {
    isDrawing.current = false;
    console.log(isDrawing.current);
    console.log("handlePainterOut called");
  }, []);

  return [handleDraw, handlePainterDown, handlePainterOut];
};
