import { useRef } from "react";

interface MouseCoordinatesUtility {
  updateCoordinates: (event: MouseEvent) => void;
  coordinateRefs: React.MutableRefObject<number>[];
}

const useMouseCoordinates = () => {
  const lastX = useRef(0);
  const lastY = useRef(0);

  const updateCoordinates = (event: MouseEvent): void => {
    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  };

  return {
    updateCoordinates: updateCoordinates,
    coordinateRefs: [lastX, lastY],
  } as MouseCoordinatesUtility;
};

export default useMouseCoordinates;
