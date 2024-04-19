import "./App.css";
import React, { useState, useCallback } from "react";
import Canvas from "./components/Canvas";
import { PainterContextProvider } from "./context/PainterContext";
import Toolbar from "./components/Toolbar";
import StrangeCanvas from "./components/StrangeCanvas";

function App() {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  const isStrange = false;

  const divCallback = useCallback((node: any) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className="h-screen" ref={divCallback}>
      <PainterContextProvider>
        <Toolbar />
        {isStrange && <StrangeCanvas width={width} height={height} />}
        {!isStrange && <Canvas width={width} height={height} />}
      </PainterContextProvider>
    </div>
  );
}

export default App;
