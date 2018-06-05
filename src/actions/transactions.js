import { writeToUSB } from 'util/usb';
import { authClient } from 'util/axiosClient';

import {
  PENDING_TRANSACTIONS,
  TRANSACTION_DETAIL,
  TRANSACTION_EXECUTION,
  FETCH_START,
  FETCH_END,
} from './types';


import {
  PENDING,
  CREATING,
  SAVING,
  SAVED,
  UPDATING_STATUS,
  STATUS_UPDATED,
  SAVE_ERROR,
  CREATE_ERROR,
} from 'util/transactionStatus';

import { showNotification } from './notification';
import { handleError } from './util';
import { writeInfoToUSB } from '../util/usb';


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

export const transactionDetail = (transaction) => {
  console.log('getting transaction Detail for id: ', transaction.transactionId);

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

    return authClient().get(`transactions/${transaction.transactionId}`)
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
        dispatch({
          type: TRANSACTION_DETAIL,
          payload: {
            loading: false,
            data: {},
            error: true,
            errorMessage: 'Error fetching transaction-detail'
          }
        });
      });

  }
}

export const transactionExecute = (transaction) => {
  console.log('executing transaction with id: ', transaction.transactionId);

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

    return authClient().patch(`transactions/${transaction.transactionId}/unsigned`, {})
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
        return writeToUSB(response.data)
          .then(() => {
            writeInfoToUSB(transaction).then(() => {
            console.log('successfully written data to USB');
            dispatch({
              type: TRANSACTION_EXECUTION,
              payload: {
                status: SAVED
              }
            });
            //Update transaction status
            const status = 'In Progress'
            dispatch(updateTransactionStatus(transaction.transactionId, status));
          })
          .catch(error => {
            dispatch(handleError(error, false));
          });
      })
      .catch(error => {
        dispatch({
          type: TRANSACTION_EXECUTION,
          payload: {
            status: SAVE_ERROR
          }
        });
        dispatch(handleError(error.response, false));
      });
    })
    .catch(error => {
      dispatch({
        type: TRANSACTION_EXECUTION,
        payload: {
          status: CREATE_ERROR
        }
      });
      dispatch(handleError(error.response, true));
    });
}
}

const updateTransactionStatus = (id, status) => {
  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: TRANSACTION_EXECUTION,
      payload: {
        status: UPDATING_STATUS
      }
    });

    return authClient().patch(`transactions/${id}/${status}`, {})
      .then(response => {
        console.log('response from updateTxStatus: ', response);
        dispatch({
          type: FETCH_END
        });

        dispatch({
          type: TRANSACTION_EXECUTION,
          payload: {
            status: STATUS_UPDATED
          }
        });

      })
      .catch(error => {
        console.log('error while updating status');
        dispatch(handleError(error, true));
      })
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
