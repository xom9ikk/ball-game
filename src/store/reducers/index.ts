import { combineReducers } from 'redux';
import { IRootState } from './state';
import { MapsReducer } from './maps';
import { ProgressReducer } from './progress';
import { ThemeReducer } from './theme';

export const rootReducer = combineReducers<IRootState>({
  maps: MapsReducer as any,
  progress: ProgressReducer as any,
  theme: ThemeReducer as any,
});
