import React, { useRef, useCallback } from "react";

export const usePainter = (draw: (event: MouseEvent) => void) => {
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const handleDraw = useCallback(
    (event: MouseEvent) => {
      draw(event);
    },
    [draw]
  );

  const handlePainterDown = (event: MouseEvent): void => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    console.log(isDrawing.current);
  };

  const handlePainterOut = (): void => {
    isDrawing.current = false;
    console.log(isDrawing.current);
  };

  return [handleDraw, handlePainterDown, handlePainterOut];
};
