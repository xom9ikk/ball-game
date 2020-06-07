import { handleActions } from 'redux-actions';
import { ProgressActions } from '../actions';
import { IProgress } from '../../types';

const initialState: IProgress = {
  level: 0,
};

export const ProgressReducer = handleActions<IProgress, IProgress>({
  [ProgressActions.Type.SET_PROGRESS]:
      (state, action) => (action.payload),
}, initialState);
