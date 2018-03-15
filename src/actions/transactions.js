import { authClient } from 'util/axios';
import { writeToUSB } from 'util/usb';

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
          type: FETCH_END
        });

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
          type: FETCH_END
        });

        dispatch({
          type: TRANSACTION_EXECUTION,
          payload: {
            status: SAVING
          }
        });

        //Make a call to save transaction on USB
        writeToUSB(response.data)
          .then(() => {
            console.log('successfully written data to USB');
            dispatch({
              type: TRANSACTION_EXECUTION,
              payload: {
                status: SAVED
              }
            });
          })
          .catch(error => {
            dispatch(handleError(error, false));
          });


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
