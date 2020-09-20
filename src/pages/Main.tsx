import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { GameField } from '../components/GameField';
import { MapsEffects, ProgressEffects, ThemeEffects } from '../store/effects';
import { EnumKeyCodes } from '../types/keycodes';
import {
  IColumn, IGrid, IRow, EnumCell as E, EnumTheme,
} from '../types';
import { IRootState } from '../store/reducers/state';
import { Controls } from '../components/Controls';
import { ProgressActions } from '../store/actions';

const getColumn = (data: IGrid, columnIndex: number) => data.map((row) => row[columnIndex]);
const setColumn = (data: IGrid, columnIndex: number, column: IColumn) => {
  column.forEach((cell: E, index) => {
    // eslint-disable-next-line no-param-reassign
    data[index][columnIndex] = cell;
  });
  return data;
};

const random = (min: number, max: number) => Math.floor(
  Math.random() * (Math.floor(max) - Math.ceil(min) + 1),
) + Math.ceil(min);

const maxSize = 800;

export const Main: FC = () => {
  const maps = useSelector((state: IRootState) => state.maps);
  const progress = useSelector((state: IRootState) => state.progress);
  const appTheme = useSelector((state: IRootState) => state.theme);
  const theme = appTheme === EnumTheme.Dark ? 'container--dark' : 'container--light';
  const dispatch = useDispatch();
  const [gameFieldVisible, setGameFieldVisible] = useState(false);
  const [cellSize, setCellSize] = useState(0);
  const [x, _setX] = useState(0);
  const [y, _setY] = useState(0);
  const [isMoved, _setIsMoved] = useState(false);
  const [grid, _setGrid] = useState();
  const xRef = React.useRef(x);
  const yRef = React.useRef(y);
  const isMovedRef = React.useRef(isMoved);
  const gridRef = React.useRef(grid);

  const setX = (value: number) => {
    xRef.current = value;
    _setX(value);
  };

  const setY = (value: number) => {
    yRef.current = value;
    _setY(value);
  };

  const setIsMoved = (value: boolean) => {
    isMovedRef.current = value;
    _setIsMoved(value);
  };

  const setGrid = (value: IGrid) => {
    gridRef.current = value;
    _setGrid(value);
  };

  const isFilled = () => {
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

  const copyMatrix = (data: IGrid) => data.map((row) => [...row]);

  const drawMap = () => {
    setGameFieldVisible(false);
    const animationDuration = 300;
    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (progress.level >= maps.length) {
        return dispatch(ProgressEffects.resetLevels());
      }
      const {
        initialX, initialY, initialGrid,
      } = maps[progress.level];
      setX(initialX);
      setY(initialY);
      setGrid(copyMatrix(initialGrid));
      const rowLength = initialGrid[0].length;
      const columnLength = initialGrid.length;
      const size = rowLength > columnLength ? rowLength : columnLength;
      setCellSize(maxSize / size);
    }, animationDuration);
    setTimeout(() => {
      setGameFieldVisible(true);
    }, animationDuration * 2);
  };

  const calculateTargetPosition = (keyCode: EnumKeyCodes) => {
    if (isMovedRef.current) return;
    if (!gridRef.current?.length) return;
    if (!progress.isFirstInteraction) {
      dispatch(ProgressActions.setInteraction(true));
    }
    setIsMoved(true);
    switch (keyCode) {
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
    setTimeout(() => {
      setIsMoved(false);
    }, 200);
  };

  const keydownHandler = (event: any) => {
    if ([EnumKeyCodes.ArrowUp,
      EnumKeyCodes.ArrowDown,
      EnumKeyCodes.ArrowLeft,
      EnumKeyCodes.ArrowRight].indexOf(event.key) > -1) {
      event.preventDefault();
    }
    switch (event.key) {
      case EnumKeyCodes.ArrowUp: { calculateTargetPosition(EnumKeyCodes.ArrowUp); break; }
      case EnumKeyCodes.ArrowDown: { calculateTargetPosition(EnumKeyCodes.ArrowDown); break; }
      case EnumKeyCodes.ArrowLeft: { calculateTargetPosition(EnumKeyCodes.ArrowLeft); break; }
      case EnumKeyCodes.ArrowRight: { calculateTargetPosition(EnumKeyCodes.ArrowRight); break; }
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(MapsEffects.fetchMaps());
    dispatch(ProgressEffects.restoreLevel());
    dispatch(ThemeEffects.restoreTheme());
  }, [dispatch]);


  useEffect(() => {
    if (!maps.length) return;
    drawMap();
  }, [maps, progress.level]);

  useEffect(() => {
    if (!grid) return;
    if (isFilled()) {
      setTimeout(() => {
        dispatch(ProgressEffects.increaseLevel(progress.level));
      }, 400);
    }
  }, [grid, dispatch]);

  const prevHandler = () => {
    dispatch(ProgressEffects.decreaseLevel(progress.level));
  };

  const nextHandler = () => {
    dispatch(ProgressEffects.increaseLevel(progress.level));
  };

  const randomHandler = () => {
    const randomLevel = random(0, maps.length - 1);
    dispatch(ProgressEffects.saveLevel(randomLevel));
  };

  return (
    <div className={`container ${theme}`}>
      <Header />
      <main>
        <Controls
          lvl={progress.level + 1}
          onPrev={prevHandler}
          onNext={nextHandler}
          onRandom={randomHandler}
        />
        <GameField
          isVisible={gameFieldVisible}
          grid={grid}
          cellSize={cellSize}
          x={x}
          y={y}
        />
      </main>
    </div>

  );
};
