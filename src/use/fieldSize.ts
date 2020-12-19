import { useEffect, useState } from 'react';

const breakPoints = [850, 650, 450, 300];
const fieldSizes = [800, 600, 400, 250];

export const useFieldSize = () => {
  const [fieldSize, setFieldSize] = useState(fieldSizes[0]);


  function getFieldSizeForWidth(width: number) {
    const index = breakPoints.findIndex((breakPoint) => breakPoint <= width);
    if (index === -1) {
      return fieldSizes[fieldSizes.length - 1];
    }
    return fieldSizes[index];
  }

  useEffect(() => {
    setFieldSize(getFieldSizeForWidth(window.innerWidth));

    const handleResize = () => {
      setFieldSize(getFieldSizeForWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    fieldSize,
  };
};
