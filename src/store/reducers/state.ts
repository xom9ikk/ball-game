import { IMap, IProgress } from '../../types';

export interface IRootState {
  maps: Array<IMap>,
  progress: IProgress,
}
