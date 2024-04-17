import React, { createContext, useRef } from "react";

interface ExposedData {
  previousX: number;
  previousY: number;
}

export const PainterContext = createContext({ previousX: 0, previousY: 0 });

export const PainterContextProvider = ({ children }) => {
  const previousX = useRef(0);
  const previousY = useRef(0);

  const exposedData = {
    previousX: previousX.current,
    previousY: previousY.current,
  } as ExposedData;

  return (
    <PainterContext.Provider value={exposedData}>
      {children}
    </PainterContext.Provider>
  );
};

// then in usePainter have updateCoordinates {[previousX, previousY] = [event.offsetX, event.offsetY]}
