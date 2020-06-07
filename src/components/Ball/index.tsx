import React, { FC } from 'react';

interface IBall {
  size: number;
  x: number;
  y: number;
  firstBallColor: string;
  secondBallColor: string;
}

export const Ball: FC<IBall> = ({
  size, x, y, firstBallColor, secondBallColor,
}) => (
  <div
    className="ball"
    style={{
      width: size * 0.75,
      height: size * 0.75,
      left: x * size + size * ((1 - 0.75) / 2),
      top: y * size + size * ((1 - 0.75) / 2),
      background: `radial-gradient(circle at 100px 100px, ${firstBallColor}, ${secondBallColor}})`,
      backgroundColor: secondBallColor,
    }}
  />
);
