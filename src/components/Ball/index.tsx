import React, { FC, useRef } from 'react';

enum EnumDirection {
  Left='left',
  Right='right',
  Top='top',
  Bottom='bottom',
}

interface IBall {
  size: number;
  x: number;
  y: number;
  firstBallColor: string;
  secondBallColor: string;
}

const MIN_ANIMATION_OFFSET = 2;
const MAX_ANIMATION_OFFSET = 8;

export const Ball: FC<IBall> = ({
  size, x, y, firstBallColor, secondBallColor,
}) => {
  const prevPosition = useRef<any>();
  const direction = useRef<any>();
  const animationSize = useRef<any>(100);

  let cellOffset = 0;
  const prevX = prevPosition.current?.x ?? 0;
  const prevY = prevPosition.current?.y ?? 0;
  if (x > prevX) {
    direction.current = EnumDirection.Right;
    cellOffset = x - prevX;
  }
  if (x < prevX) {
    direction.current = EnumDirection.Left;
    cellOffset = prevX - x;
  }
  if (y > prevY) {
    direction.current = EnumDirection.Bottom;
    cellOffset = y - prevY;
  }
  if (y < prevY) {
    direction.current = EnumDirection.Top;
    cellOffset = prevY - y;
  }
  let sizeOffsetPx = 0;
  if (cellOffset <= MAX_ANIMATION_OFFSET && cellOffset >= MIN_ANIMATION_OFFSET) {
    sizeOffsetPx = size * Math.ceil(cellOffset / 2);
  } else if (cellOffset > MAX_ANIMATION_OFFSET) {
    sizeOffsetPx = size * Math.ceil(MAX_ANIMATION_OFFSET / 2);
  }
  animationSize.current = sizeOffsetPx;
  prevPosition.current = { x, y };

  return (
    <>
      <div
        className="ball"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          left: x * size + size * ((1 - 0.75) / 2),
          top: y * size + size * ((1 - 0.75) / 2),
        }}
      >
        <div
          className={`ball__slide ball__slide--${direction.current}`}
          style={{
            width: size * 0.75,
            height: size * 0.75,
            background: `radial-gradient(circle at 100px 100px, ${firstBallColor}, ${secondBallColor}})`,
            backgroundColor: secondBallColor,
            // @ts-ignore
            '--animation-size': `${animationSize.current}px`,
            '--ball-size': `${size * 0.75}px`,
          }}
        />
        <div
          style={{
            width: size * 0.75,
            height: size * 0.75,
          }}
        >
          <div
            className={`ball__background ball__background--${direction.current}`}
            style={{
              background: `radial-gradient(circle at 100px 100px, ${firstBallColor}, ${secondBallColor}})`,
              backgroundColor: secondBallColor,
            }}
          />
        </div>
      </div>
    </>
  );
};
