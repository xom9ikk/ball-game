import { ProgressActions } from '../actions';
import { IProgress } from '../../types';


const restoreProgress = () => async (dispatch: Function) => {
  try {
    const progress = JSON.parse(localStorage.getItem('progress') || '');
    dispatch(ProgressActions.setProgress(progress));
  } catch (error) {
    console.error('restoreProgress', error);
  }
};

const saveProgress = (payload: IProgress) => async (dispatch: Function) => {
  try {
    localStorage.setItem('progress', JSON.stringify(payload));
    dispatch(ProgressActions.setProgress(payload));
  } catch (error) {
    console.error('saveProgress', error);
  }
};

const increaseLevel = (payload: IProgress) => async (dispatch: Function) => {
  try {
    const newProgress = { ...payload, level: payload.level + 1 };
    dispatch(saveProgress(newProgress));
  } catch (error) {
    console.error('restoreProgress', error);
  }
};

const resetLevels = (payload: IProgress) => async (dispatch: Function) => {
  try {
    const newProgress = { ...payload, level: 0 };
    dispatch(saveProgress(newProgress));
  } catch (error) {
    console.error('restoreProgress', error);
  }
};

export const ProgressEffects = {
  restoreProgress,
  saveProgress,
  increaseLevel,
  resetLevels,
};
