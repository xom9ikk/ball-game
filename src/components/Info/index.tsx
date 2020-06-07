import React, { FC } from 'react';

interface IInfo {
  lvl: number;
}

export const Info: FC<IInfo> = ({ lvl }) => (
  <div className="info">
    <div className="info__wrapper">
      <div className="info__text">
        Level:
        {' '}
        {lvl}
      </div>
    </div>
  </div>
);
