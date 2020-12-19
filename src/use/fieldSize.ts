import { useEffect, useState } from 'react';

const STEP = 25;
const BREAKPOINT_FACTOR = 0.1;
const MIN_BREAKPOINT_VALUE = 200;
const HEADER_HEIGHT = 160;
const CONTROLS_HEIGHT = 62;

const generateBreakpoints = (height: number) => {
  const maxValue = Math.ceil(height - (HEADER_HEIGHT + CONTROLS_HEIGHT));
  const arraySize = Math.ceil((maxValue - MIN_BREAKPOINT_VALUE) / STEP);

  return new Array(arraySize > 0 ? arraySize : 5)
    .fill(0)
    .map((value, index) => index)
    .map((value) => value * STEP + MIN_BREAKPOINT_VALUE)
    .reverse();
};

const generateFieldSizes = (breakPoints: Array<number>) => breakPoints
  .map((value) => value - value * BREAKPOINT_FACTOR);

export const useFieldSize = () => {
  const [fieldSize, setFieldSize] = useState(0);

  function getFieldSizeForWidth(width: number, height: number) {
    const breakPoints = generateBreakpoints(height);
    const fieldSizes = generateFieldSizes(breakPoints);

    const index = breakPoints.findIndex((breakPoint) => breakPoint <= width);

    if (index === -1) {
      return fieldSizes[fieldSizes.length - 1];
    }

    return fieldSizes[index];
  }

  useEffect(() => {
    setFieldSize(getFieldSizeForWidth(window.innerWidth, window.innerHeight));

    const handleResize = () => {
      setFieldSize(getFieldSizeForWidth(window.innerWidth, window.innerHeight));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    fieldSize,
  };
};
