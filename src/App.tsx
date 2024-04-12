import "./App.css";
import React, { useState, useCallback } from "react";
import Canvas from "./components/Canvas";

function App() {
  // const [count, setCount] = useState(0)
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  const divCallback = useCallback((node: any) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className="h-screen" ref={divCallback}>
      <Canvas width={width} height={height} />
    </div>
  );
}

export default App;
