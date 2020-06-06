/* eslint-disable max-len */
import React, { FC, useEffect, useState } from 'react';
import { EnumCell as E } from '../../types/cell';
import { Cell } from '../Cell';
import { Row } from '../Row';
import { Ball } from '../Ball';
import { EnumKeyCodes } from '../../types/keycodes';

interface IGameField {
}

type IRow = Array<E>;
type IColumn = Array<E>;
type IGrid = Array<IRow>;


// const defaultGrid: IGrid = [
//   [E.Wall, E.Wall, E.Empty, E.Empty, E.Empty, E.Empty, E.Empty],
//   [E.Empty, E.Empty, E.Empty, E.Empty, E.Empty, E.Empty, E.Empty],
//   [E.Empty, E.Empty, E.Wall, E.Wall, E.Wall, E.Empty, E.Empty],
//   [E.Empty, E.Empty, E.Wall, E.Wall, E.Wall, E.Empty, E.Empty],
//   [E.Empty, E.Empty, E.Empty, E.Empty, E.Empty, E.Empty, E.Empty],
//   [E.Empty, E.Empty, E.Empty, E.Empty, E.Empty, E.Empty, E.Wall],
// ];

const getRandomInt = (min: number, max: number) => {
  // console.log(`[${min} - ${max}]`);
  if (min > max) {
    // console.log('WOW min > max. RETURN', max >= 0 ? max : min);
    return max >= 0 ? max : min;
  }
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};

const tryGrid = (initialX: number, initialY: number, initialGrid: IGrid, tries: number) => {
  let grid = initialGrid.map((row) => [...row]);
  let y = initialY;
  let x = initialX;
  const rows = grid.length;
  const columns = grid[0].length;
  for (let i = 0; i < tries; i += 1) {
    const direction = getRandomInt(0, 3);
    switch (direction) {
      case 0: { // up
        const column: IColumn = getColumn(grid, x);
        let count = y;
        while ((column[count] === E.Empty || column[count] === E.Filled)
        // && count > 0
        ) {
          column[count] = E.Filled;
          count -= 1;
        }
        // if (!(count + 1 < rows - 1)) {
        //   console.log('WOW, up ', count, rows, columns);
        // }
        // if (count + 1 < rows - 1) {
        grid = setColumn([...grid], x, column);
        y = count + 1;
        // }
        break;
      }
      case 1: { // down
        const column: IColumn = getColumn(grid, x);
        let count = y;
        while ((column[count] === E.Empty || column[count] === E.Filled)
        // && count < rows - 1
        ) {
          column[count] = E.Filled;
          count += 1;
        }
        // if (count - 1 >= 0) {
        grid = setColumn([...grid], x, column);
        y = count - 1;
        // }
        break;
      }
      case 2: { // left
        const row: IRow = grid[y];
        let count = x;
        while ((row[count] === E.Empty || row[count] === E.Filled)
        // && count > 0
        ) {
          row[count] = E.Filled;
          count -= 1;
        }
        // if (count + 1 < columns - 1) {
        const newGrid = [...grid];
        newGrid[y] = row;
        grid = newGrid;
        x = count + 1;
        // }
        break;
      }
      case 3: { // right
        const row: IRow = grid[y];
        let count = x;
        while ((row[count] === E.Empty || row[count] === E.Filled)
        // && count < columns - 1
        ) {
          row[count] = E.Filled;
          count += 1;
        }
        // if (count - 1 >= 0) {
        const newGrid = [...grid];
        newGrid[y] = row;
        grid = newGrid;
        x = count - 1;
        // }
        break;
      }
      default: break;
    }
  }
  let isValid = true;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === E.Empty) {
        isValid = false;
        break;
      }
    }
  }
  return isValid;
};

const generate = () => {
  const minSize = 13;
  const maxSize = 15;
  const rows = getRandomInt(minSize, maxSize);
  const columns = getRandomInt(minSize, maxSize);
  const initialGrid: IGrid = [];
  // const initialGrid: IGrid = [
  //   ...new Array(rows)
  //     .fill(
  //       new Array(columns)
  //         .fill(E.Wall),
  //     ),
  // ];
  // console.log('rows', rows);
  // console.log('columns', columns);
  for (let i = 0; i < rows; i += 1) {
    initialGrid[i] = new Array(columns).fill(E.Wall);
  }
  const maxSlide = Math.ceil((rows * columns) / 2);
  let x = getRandomInt(0, rows - 1); // select row
  let y = getRandomInt(0, columns - 1); // select col
  const initialY = x;
  const initialX = y;
  // console.log('x', x);
  // console.log('y', y);
  // console.log(`patch x[${x}] y[${y}]`);
  // console.log('patch', initialGrid[x]);
  initialGrid[x][y] = E.Empty;
  // console.log('patched', initialGrid[x]);

  for (let i = 0; i < maxSlide; i += 1) {
  // for (let i = 0; i < 3; i += 1) {
    const direction = getRandomInt(0, 3);
    // const direction: number = 1;

    switch (direction) {
      case 0: { // up
        const newX = getRandomInt(0, x - 1);
        // console.log('up', x - newX);
        // console.log(`[${x}][${y}] -> [${newX}][${y}]`);
        if (newX >= 0) {
          for (let j = newX; j < x; j += 1) {
            initialGrid[j][y] = E.Empty;
          }
          x = newX;
        }
        break;
      }
      case 1: { // down
        const newX = getRandomInt(x + 1, rows - 1);
        // console.log('down', newX - x);
        // console.log(`[${x}][${y}] -> [${newX}][${y}]`);
        if (newX <= rows) {
          for (let j = x; j <= newX; j += 1) {
            initialGrid[j][y] = E.Empty;
          }
          x = newX;
        }
        break;
      }
      case 2: { // left
        const newY = getRandomInt(0, y - 1);
        // console.log('left', y - newY);
        // console.log(`[${x}][${y}] -> [${x}][${newY}]`);
        if (newY >= 0) {
          for (let j = newY; j < y; j += 1) {
            initialGrid[x][j] = E.Empty;
          }
          y = newY;
        }
        break;
      }
      case 3: { // right
        const newY = getRandomInt(y + 1, columns - 1);
        // console.log('right', newY - y);
        // console.log(`[${x}][${y}] -> [${x}][${newY}]`);
        if (newY <= columns) {
          for (let j = y; j <= newY; j += 1) {
            initialGrid[x][j] = E.Empty;
          }
          y = newY;
        }
        break;
      }
      default: break;
    }
  }
  let isValid = tryGrid(initialX, initialY, initialGrid, 10000);
  if (isValid) {
    // console.log('Potential valid');
    // }));
    for (let i = 0; i < 50; i += 1) {
      // console.log('Try potential valid');
      if (!tryGrid(initialX, initialY, initialGrid, 10000)) {
        isValid = false;
        break;
      }
    }
    // if (isValid) {
      // console.log('VALID');
      // console.log(JSON.stringify({
      //   initialX,
      //   initialY,
      //   initialGrid,
      // }));
    // }
  }
  // else {
  // console.log('invalid');
  // return generate();
  // }
  // isValid = true;
  return {
    initialX, initialY, initialGrid, isValid,
  };

  // @ts-ignore
  // return JSON.parse(
  //   '{"initialX":4,"initialY":2,"initialGrid":[["0","1","1","1","1","1","1","1","1",""],["0","0","0","0","1","1","1","1","1",""],["0","0","0","0","1","0","0","1","1",""],["0","0","0","0","1","0","0","1","1",""],["0","0","0","0","1","0","0","1","1",""],["0","0","0","0","0","0","0","1","1",""],["0","0","0","0","0","0","0","1","1",""],["0","0","0","0","0","0","0","0","0",""]]}'
  // );
};

const getColumn = (data: IGrid, columnIndex: number) => data.map((row) => row[columnIndex]);
const setColumn = (data: IGrid, columnIndex: number, column: IColumn) => {
  column.forEach((cell: E, index) => {
    // eslint-disable-next-line no-param-reassign
    data[index][columnIndex] = cell;
  });
  return data;
};


export const GameField: FC<IGameField> = () => {
  const [cellSize, setCellSize] = useState(0);
  const [x, _setX] = useState(0);
  const [y, _setY] = useState(0);
  const [grid, _setGrid] = useState();
  const xRef = React.useRef(x);
  const yRef = React.useRef(y);
  const gridRef = React.useRef(grid);

  const setX = (value: number) => {
    xRef.current = value;
    _setX(value);
  };

  const setY = (value: number) => {
    yRef.current = value;
    _setY(value);
  };

  const setGrid = (value: IGrid) => {
    gridRef.current = value;
    _setGrid(value);
  };

  const maxSize = 800;
  useEffect(() => {
    let {
      initialX, initialY, initialGrid, isValid,
    } = generate();
    while (!isValid) {
      const result = generate();
      initialX = result.initialX;
      initialY = result.initialY;
      initialGrid = result.initialGrid;
      isValid = result.isValid;
    }
    console.log(initialGrid);
    console.log(initialX);
    console.log(initialY);
    setX(initialX);
    setY(initialY);
    setGrid(initialGrid);
    const rowLength = initialGrid[0].length;
    const columnLength = initialGrid.length;
    const size = rowLength > columnLength ? rowLength : columnLength;
    setCellSize(maxSize / size);
  }, []);

  const calculateTargetPosition = (keycode: EnumKeyCodes) => {
    switch (keycode) {
      case EnumKeyCodes.ArrowUp: {
        const column: IColumn = getColumn(gridRef.current, xRef.current);
        let count = yRef.current;
        while (column[count] === E.Empty
        || column[count] === E.Filled) {
          column[count] = E.Filled;
          count -= 1;
        }
        const newGrid = setColumn([...gridRef.current], xRef.current, column);
        setGrid(newGrid);
        setY(count + 1);
        break;
      }
      case EnumKeyCodes.ArrowDown: {
        const column: IColumn = getColumn(gridRef.current, xRef.current);
        let count = yRef.current;
        while (column[count] === E.Empty
        || column[count] === E.Filled) {
          column[count] = E.Filled;
          count += 1;
        }
        const newGrid = setColumn([...gridRef.current], xRef.current, column);
        setGrid(newGrid);
        setY(count - 1);
        break;
      }
      case EnumKeyCodes.ArrowLeft: {
        const row: IRow = gridRef.current[yRef.current];
        let count = xRef.current;
        while (row[count] === E.Empty
          || row[count] === E.Filled) {
          row[count] = E.Filled;
          count -= 1;
        }
        const newGrid = [...gridRef.current];
        newGrid[yRef.current] = row;
        setGrid(newGrid);
        setX(count + 1);
        break;
      }
      case EnumKeyCodes.ArrowRight: {
        const row: IRow = gridRef.current[yRef.current];
        let count = xRef.current;
        while (row[count] === E.Empty
          || row[count] === E.Filled) {
          row[count] = E.Filled;
          count += 1;
        }
        const newGrid = [...gridRef.current];
        newGrid[yRef.current] = row;
        setGrid(newGrid);
        setX(count - 1);
        break;
      }
      default: break;
    }
  };

  const calculatePositions = (keycode: EnumKeyCodes) => {
    calculateTargetPosition(keycode);
  };

  const keydownHandler = (event: any) => {
    switch (event.key) {
      case EnumKeyCodes.ArrowUp: { calculatePositions(EnumKeyCodes.ArrowUp); break; }
      case EnumKeyCodes.ArrowDown: { calculatePositions(EnumKeyCodes.ArrowDown); break; }
      case EnumKeyCodes.ArrowLeft: { calculatePositions(EnumKeyCodes.ArrowLeft); break; }
      case EnumKeyCodes.ArrowRight: { calculatePositions(EnumKeyCodes.ArrowRight); break; }
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <div className="game-field">
      {
        grid && grid.map((row: IRow, index: number) => (
          <Row key={`row-${index}`}>
            {
                row.map((cell, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    type={cell}
                    width={cellSize}
                    height={cellSize}
                  />
                ))
              }
          </Row>
        ))
      }
      <Ball size={cellSize} x={x} y={y} />
    </div>
  );
};
