import React, { FC } from 'react';
import { EnumCell } from '../../types/cell';

interface ICell {
  type: EnumCell;
  width: number;
  height: number;
  filledColor: string;
}

export const Cell: FC<ICell> = ({
  type, width, height, filledColor,
}) => {
  const types = ['wall', 'empty', 'filled'];
  const style = {
    width,
    height,
    background: '',
  };
  if (type === 2) {
    style.background = filledColor;
  }
  return (
    <div className={`cell cell--${types[type]}`} style={style} />
  );
};
