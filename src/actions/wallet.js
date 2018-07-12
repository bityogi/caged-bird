import _ from 'lodash';

import { authClient } from 'util/axiosClient';
import {
  SET_WALLET_FILES,
  FETCH_START,
  FETCH_END,
  FETCHING_SEED,
  FETCH_SEED_SUCCESS,
  FETCH_SEED_FAILURE,
} from './types';
import {
  handleError,
  showNotification,
} from './index';
import {
  getSeedName
} from 'util/usb';

export const submitWallets = () => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_START
    });
    const wallet = getState().wallet;
    let formData = new FormData();

    console.log('wallet (from state): ', wallet);

    _.map(wallet.wallets, w => {
      formData.append('FileList', w);
    })
    
    
    return authClient().post(`/seeds/${wallet.seed.seed}/coldWallets`, formData)
      .then(response => {
        console.log('resonse from authenticate: ', response);
        dispatch({
          type: FETCH_END
        });
        dispatch(showNotification('Addresses imported', 'info'));

      })
      .catch(error => {
        console.log('Error importing wallet addresses: ', error.response);
        dispatch(handleError(error.response, true));
        dispatch(showNotification('Error importing wallet addresses', 'warning'));
        
      });

  }
}

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