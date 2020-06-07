import { handleActions } from 'redux-actions';
import { ProgressActions } from '../actions';
import { IProgress } from '../../types';

const initialState: IProgress = {
  level: 0,
  isFirstInteraction: false,
};

export const ProgressReducer = handleActions<IProgress, IProgress>({
  [ProgressActions.Type.SET_LEVEL]:
      (state, action) => ({ ...state, level: action.payload.level }),
  [ProgressActions.Type.SET_INTERACTION]:
      (state, action) => ({ ...state, isFirstInteraction: action.payload.isFirstInteraction }),
}, initialState);
