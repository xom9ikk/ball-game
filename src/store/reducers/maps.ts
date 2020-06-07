import { handleActions } from 'redux-actions';
import { MapsActions } from '../actions';
import { IMap } from '../../types';

const initialState: Array<IMap> = [];

export const MapsReducer = handleActions<Array<IMap>, Array<IMap>>({
  [MapsActions.Type.SET_MAPS]:
      (state, action) => (action.payload),
}, initialState);
