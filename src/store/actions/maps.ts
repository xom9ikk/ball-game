import { createAction } from 'redux-actions';

enum Type {
  SET_MAPS = 'MAPS/SET_MAPS',
}

const setMaps = createAction(
  Type.SET_MAPS,
  (payload: Object) => payload,
);

export const MapsActions = {
  Type,
  setMaps,
};
