import React, { FC } from 'react';
import { EnumCell } from '../../types/cell';

interface ICell {
  type: EnumCell;
  width: number;
  height: number;
}

export const Cell: FC<ICell> = ({ type, width, height }) => {
  const types = ['wall', 'empty', 'filled'];
  return (
    <div className={`cell cell--${types[type]}`} style={{ width, height }} />
  );
};
