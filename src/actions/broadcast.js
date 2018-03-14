
import { authClient } from 'util/axios';
import { getUSBData } from 'util/usb';

import {
  BROADCAST_DETAIL,
  BROADCAST_STATUS,
  FETCH_START,
  FETCH_END,
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


export const signedTransaction = () => {
  console.log('get signed transaction (from USB)');

  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: BROADCAST_STATUS,
      payload: RETRIEVING
    });

    return getUSBData()
      .then(data => {
        console.log('response from getUSBData: ', data);

        dispatch({
            type: BROADCAST_DETAIL,
            payload: {
              loading: false,
              data: data
            }
          });

          dispatch({
            type: BROADCAST_STATUS,
            payload: RETRIEVED
          });

          dispatch({
              type: FETCH_END
          });
      })
      .catch(error => {
        console.error('Error retrieving USB data: ', error);
        dispatch(handleError(error, true));
      });

  }
}

export const broadcastTransaction = () => {
  console.log('broadcast transaction');
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: BROADCAST_STATUS,
      payload: SUBMITTING
    });

    const { broadcast } = getState().signed

    const id = broadcast.data.transactionId;
    const data = {
      transactionId : id,
      payload: broadcast.data.payload
    };

    return authClient().patch(`/transactions/${id}/broadcast`, data)
      .then((response) => {
        console.log('response from broadcast transaction: ', response);
        dispatch({
          type: BROADCAST_STATUS,
          payload:  SUBMITTED
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
