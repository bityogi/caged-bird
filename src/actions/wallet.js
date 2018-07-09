
import {
  IMPORT_WALLETS_SUCCESS,
  FETCH_START,
  FETCH_END,
  FETCHING_SEED,
  FETCH_SEED_SUCCESS,
  FETCH_SEED_FAILURE,
} from './types';

import {
  getSeedName
} from 'util/usb';

export const importWallets = () => {
  return { type: IMPORT_WALLETS_SUCCESS, payload: [{}, {}, {}, {}] }
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