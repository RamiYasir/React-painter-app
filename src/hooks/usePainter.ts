import { useRef, useCallback } from "react";

export const usePainter = (draw: (event: MouseEvent) => void) => {
  const isDrawing = useRef(false);

  const handleDraw = useCallback(
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

  const handlePainterDown = useCallback((): void => {
    isDrawing.current = true;
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
