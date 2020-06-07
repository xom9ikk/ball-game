import { createAction } from 'redux-actions';
import { IProgress } from '../../types';

enum Type {
  SET_PROGRESS = 'PROGRESS/SET_PROGRESS',
}

const setProgress = createAction(
  Type.SET_PROGRESS,
  (payload: IProgress) => (payload),
);

export const ProgressActions = {
  Type,
  setProgress,
};
