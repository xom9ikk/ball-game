import { MapsActions } from '../actions';


const fetchMaps = () => async (dispatch: Function) => {
  try {
    const response = await fetch('/maps.json');
    const maps = await response.json();

    const sortedMaps = [...maps];
    sortedMaps.sort((a, b) => a.moves - b.moves);
    dispatch(MapsActions.setMaps(sortedMaps));
  } catch (error) {
    console.error('fetchMaps', error);
  }
};


export const MapsEffects = {
  fetchMaps,
};
