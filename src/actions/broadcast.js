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

export const broadcastTransaction = () => {
  console.log('broadcast transaction');
  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: BROADCAST_STATUS,
      payload: SUBMITTING
    });

    return setTimeout(() => {
      dispatch({
        type: BROADCAST_STATUS,
        payload:  SUBMITTED
      });

    }, 3000)
  }
}
