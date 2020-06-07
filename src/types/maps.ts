import { EnumCell as E } from './cell';

export interface IMap {
  moves: number;
  initialX: number;
  initialY: number;
  initialGrid: IGrid;
}

export type IRow = Array<E>;
export type IColumn = Array<E>;
export type IGrid = Array<IRow>;
