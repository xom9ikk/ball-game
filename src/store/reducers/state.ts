import { EnumTheme, IMap, IProgress } from '../../types';

export interface IRootState {
  maps: Array<IMap>,
  progress: IProgress,
  theme: EnumTheme,
}
