import React, { FC } from 'react';

interface IControls {
  lvl: number;
  onPrev: ()=>void;
  onNext: ()=>void;
  onRandom: ()=>void;
}

export const Controls: FC<IControls> = ({
  lvl, onPrev, onNext, onRandom,
}) => (
  <div className="controls">
    <div className="controls__wrapper">
      <button
        className="controls__button"
        onClick={onPrev}
      >
        <img src="/svg/prev.svg" alt="prev" />
      </button>
      <div className="controls__text">
        Level:
        {' '}
        {lvl}
      </div>
      <button
        className="controls__button"
        onClick={onNext}
      >
        <img src="/svg/next.svg" alt="next" />
      </button>
      <button
        className="controls__button controls__button--primary"
        onClick={onRandom}
      >
        <img src="/svg/random.svg" alt="random" />
      </button>
    </div>
  </div>
);
