import { authClient } from 'util/axios';

import {
  PENDING_TRANSACTIONS,
  TRANSACTION_DETAIL,
  TRANSACTION_EXECUTION,

  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  // FETCH_CANCEL,
} from './types';


import {
  PENDING,
  CREATING,
  // CREATED,
  // CREATE_ERROR,
  SAVING,
  SAVED,
  // SAVE_ERROR,
} from 'util/transactionStatus';

import { showNotification } from './notification';
import { handleError } from './util';

// temporary code

const transactionDetailPayload = {
  id: 1234,
  client: 'Conger Inv',
  coin: 'Bitcoin',
  account: 'Offshore',
  coldWallet: 'Wallet 1',
  hotWallet: '1f4567yggt',
  amount: 231.66,
  fee: 12.55,
  memo: 'This transaction is good and will be executed soon',
  genTime: '2018-03-07T09:18:26-05:00'
};

//


export const pendingTransactions = () => {
  console.log('getting pending Transactions ');

  return dispatch => {
    dispatch({
      type: FETCH_START
    });
    dispatch(showNotification('Getting Pending Transactions'));

    return authClient().get('/pendingTransactions')
      .then(response => {
        console.log('response for pendingTransactions: ', response.data);

        dispatch({
          type: PENDING_TRANSACTIONS,
          payload: response.data
        });

        dispatch({
          type: FETCH_END
        });
      })
      .catch(error => {
        dispatch(handleError(error.response, true));
      });

  }
}

export const transactionDetail = (id) => {
  console.log('getting transaction Detail for id: ', id);

  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: TRANSACTION_DETAIL,
      payload: {
        loading: true,
        data: {}
      }
    })

    return authClient().get(`transactions/${id}`)
      .then(response => {
        console.log('response from transactionDetail: ', response);
        dispatch({
          type: TRANSACTION_DETAIL,
          payload: {
            loading: false,
            data: response.data
          }
        });
      })
      .catch(error => {
        dispatch(handleError(error.response, true));
      });

  }
}

export const transactionExecute = (id) => {
  console.log('executing transaction with id: ', id);

  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: TRANSACTION_EXECUTION,
      payload: {
        status: CREATING
      }
    });

    return authClient().patch(`transactions/${id}/unsigned`, {})
      .then(response => {
        console.log('response from transaction-execution: ', response);

        dispatch({
          type: TRANSACTION_EXECUTION,
          payload: {
            status: SAVING
          }
        });
        //Make a call to save transaction on USB

        return setTimeout(() => {

          dispatch({
            type: TRANSACTION_EXECUTION,
            payload: {
              status: SAVED
            }
          });
          dispatch({
            type: FETCH_END
          });

        }, 3000);

      })
      .catch(error => {
        dispatch(handleError(error.response, true));
      });


  }
}


export const initializeTransaction = () => {
  console.log('initializing transaction');
  return dispatch => {
    dispatch({
      type: TRANSACTION_EXECUTION,
      payload: {
        status: PENDING
      }
    });

    dispatch({
      type: TRANSACTION_DETAIL,
      payload: {
        loading: false,
        data: {}
      }
    });
  }
}
