import React, { createContext, useRef, useState } from "react";

interface ExposedData {
  previousX: number;
  previousY: number;
  currentPainter: string;
  setCurrentPainter: (value: string) => void;
}

export const PainterContext = createContext<Partial<ExposedData>>({});

export const PainterContextProvider = ({ children }) => {
  // this should really be lifted state
  const previousX = useRef(0);
  const previousY = useRef(0);
  // ^ should be lifted state

  // const currentPainter = useRef("");
  const [currentPainter, setCurrentPainter] = useState("");
  const setPainter = (value: string): void => {
    // currentPainter.current = value;
    // console.log(
    //   `current painter set to: ${value}, is: ${currentPainter.current}`
    // );
    setCurrentPainter(value);
  };

  const exposedData = {
    previousX: previousX.current,
    previousY: previousY.current,
    currentPainter: currentPainter,
    setCurrentPainter: setPainter,
  } as ExposedData;

  return (
    <PainterContext.Provider value={exposedData}>
      {children}
    </PainterContext.Provider>
  );
};
