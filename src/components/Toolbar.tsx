import React, { FC, useContext, useEffect, useCallback, useRef } from "react";
import { PainterContext } from "../context/PainterContext";

const Toolbar: FC = () => {
  const lineRadioRef = useRef<HTMLInputElement>(null);
  const rectRadioRef = useRef<HTMLInputElement>(null);
  const context = useContext(PainterContext);

  const handleSelected = useCallback((event: Event) => {
    context.setCurrentPainter!((event.target as HTMLInputElement)?.value);
    // context.currentPainter = (event.target as HTMLInputElement)?.value;
    console.log(`current painter (Toolbar): ${context.currentPainter}`);
  }, []);

  useEffect(() => {
    lineRadioRef.current?.addEventListener("click", handleSelected);
    rectRadioRef.current?.addEventListener("click", handleSelected);
  }, [handleSelected]);

  return (
    <>
      <input
        type="radio"
        name="painter-type"
        value="line"
        ref={lineRadioRef}
      ></input>
      <label htmlFor="line">Line</label>
      <input
        type="radio"
        name="painter-type"
        value="rect"
        ref={rectRadioRef}
      ></input>
      <label htmlFor="rect">Rectangle</label>
    </>
  );
};

export default Toolbar;
