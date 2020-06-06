import React, { FC } from 'react';

interface IBall {
  size: number;
  x: number;
  y: number;
}

export const Ball: FC<IBall> = ({ size, x, y }) => (
  <div
    className="ball"
    style={{
      width: size * 0.75,
      height: size * 0.75,
      left: x * size + size * ((1 - 0.75) / 2),
      top: y * size + size * ((1 - 0.75) / 2),
    }}
  />
);
