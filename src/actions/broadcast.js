import { authClient } from 'util/axios';

import {
  BROADCAST_DETAIL,
  BROADCAST_STATUS,

  FETCH_START,
  FETCH_END,
  // FETCH_ERROR,
  // FETCH_CANCEL,
} from './types';

import {
  RETRIEVING,
  RETRIEVED,
  SUBMITTING,
  // SUBMIT_ERROR,
  SUBMITTED,
} from 'util/broadcastStatus';

import { showNotification } from './notification';
import { handleError } from './util';
// temporary code

const broadcastTransactionPayload = {
  id: 26,
  client: 'Conger Inv',
  coin: 'Bitcoin',
  account: 'Offshore',
  coldWallet: 'Wallet1',
  hotWallet: '123hhsdfsfasfd65',
  amount: 231.66,
  fee: 0.0123,
  memo: 'This is a memo for the transaction',
  genTime: '3/15/2018'
}

//

export const signedTransaction = () => {
  console.log('get signed transactions');

  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: BROADCAST_STATUS,
      payload: RETRIEVING
    });

    // Stub in code to retrieve signed tx payload from USB
    return setTimeout(() => {
      dispatch({
        type: BROADCAST_DETAIL,
        payload: {
          loading: false,
          data: broadcastTransactionPayload
        }
      });

      dispatch({
        type: BROADCAST_STATUS,
        payload: RETRIEVED
      });

      dispatch({
        type: FETCH_END
      });

    }, 3000)
  }
}

export const broadcastTransaction = (id) => {
  console.log('broadcast transaction');
  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: BROADCAST_STATUS,
      payload: SUBMITTING
    });

    return authClient().patch(`/transactions/${id}/broadcast`)
      .then((response) => {
        console.log('response from broadcast transaction: ', response);
        dispatch({
          type: BROADCAST_STATUS,
          payload:  SUBMITTED
        });
      })
      .catch(error => {
        dispatch(handleError(error.response, true));
      });
    
  }
}
