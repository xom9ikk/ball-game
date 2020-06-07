import { createAction } from 'redux-actions';

enum Type {
  SET_LEVEL = 'PROGRESS/SET_LEVEL',
  SET_INTERACTION = 'PROGRESS/SET_INTERACTION',
}

const setLevel = createAction(
  Type.SET_LEVEL,
  (payload: number) => ({ level: payload }),
);

const setInteraction = createAction(
  Type.SET_INTERACTION,
  (payload: boolean) => ({ isFirstInteraction: payload }),
);

export const ProgressActions = {
  Type,
  setLevel,
  setInteraction,
};
