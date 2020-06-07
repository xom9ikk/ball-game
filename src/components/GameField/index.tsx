/* eslint-disable max-len */
import React, { FC, useEffect, useState } from 'react';
import { Cell } from '../Cell';
import { Row } from '../Row';
import { Ball } from '../Ball';
import { IGrid, IRow } from '../../types';

interface IGameField {
  isVisible: boolean,
  grid: IGrid,
  cellSize: number;
  x: number;
  y: number;
}


const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateHSL = () => {
  const h = randomInt(0, 360);
  const s = randomInt(50, 90);
  const l = randomInt(70, 90);
  return [h, s, l];
};

export const GameField: FC<IGameField> = ({
  isVisible, grid, cellSize, x, y,
}) => {
  const [filledColor, setFilledColor] = useState('');
  const [firstBallColor, setFirstBallColor] = useState('');
  const [secondBallColor, setSecondBallColor] = useState('');
  useEffect(() => {
    const [h, s, l] = generateHSL();
    setFilledColor(`hsl(${h},${s}%,${l}%)`);
    setFirstBallColor(`hsl(${h},${s - 10}%,${l}%)`);
    setSecondBallColor(`hsl(${h},${s - 5}%,${l - 5}%)`);
  }, [cellSize]);
  return (
    <div className={`game-field ${!isVisible ? 'game-field--invisible' : ''}`}>
      {
          grid && grid.map((row: IRow, iRow: number) => (
            <Row key={`row-${iRow}`}>
              {
                  row.map((cell, iCell: number) => (
                    <Cell
                      key={`cell-${iCell}`}
                      type={cell}
                      width={cellSize}
                      height={cellSize}
                      filledColor={filledColor}
                    />
                  ))
                }
            </Row>
          ))
        }
      <Ball
        size={cellSize}
        x={x}
        y={y}
        firstBallColor={firstBallColor}
        secondBallColor={secondBallColor}
      />
    </div>
  );
};
