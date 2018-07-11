
import {
  SET_WALLET_FILES,
  FETCH_START,
  FETCH_END,
  FETCHING_SEED,
  FETCH_SEED_SUCCESS,
  FETCH_SEED_FAILURE,
} from './types';

import {
  getSeedName
} from 'util/usb';

export const importWallets = (files) => {
  return { 
    type: SET_WALLET_FILES, 
    payload: files 
  }
}

export const getSeed = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_START
    });
    dispatch({
      type: FETCHING_SEED
    });

    getSeedName()
      .then(seed => {
        dispatch({
          type: FETCH_SEED_SUCCESS,
          payload: {
            seed
          }
        });
        dispatch({
          type: FETCH_END
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_SEED_FAILURE,
          payload: {
            error: error
          }
        });

      })
  }
}