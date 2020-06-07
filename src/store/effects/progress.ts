import { ProgressActions } from '../actions';
import { IProgress } from '../../types';


const restoreLevel = () => async (dispatch: Function) => {
  try {
    const level = JSON.parse(localStorage.getItem('level') || '');
    dispatch(ProgressActions.setLevel(level));
  } catch (error) {
    console.error('restoreLevel', error);
  }
};

const saveLevel = (payload: number) => async (dispatch: Function) => {
  try {
    localStorage.setItem('level', JSON.stringify(payload));
    dispatch(ProgressActions.setLevel(payload));
  } catch (error) {
    console.error('saveLevel', error);
  }
};

const increaseLevel = (payload: number) => async (dispatch: Function) => {
  try {
    dispatch(saveLevel(payload + 1));
  } catch (error) {
    console.error('restoreLevel', error);
  }
};

const resetLevels = () => async (dispatch: Function) => {
  try {
    dispatch(saveLevel(0));
  } catch (error) {
    console.error('resetLevels', error);
  }
};

export const ProgressEffects = {
  restoreLevel,
  saveLevel,
  increaseLevel,
  resetLevels,
};
