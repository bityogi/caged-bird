
import { authClient } from 'util/axiosClient';
import { getUSBData } from 'util/usb';

import {
  BROADCAST_DETAIL,
  BROADCAST_STATUS,
  BROADCAST_ERROR,
  FETCH_START,
  FETCH_END,
} from './types';

import {
  RETRIEVING,
  RETRIEVED,
  RETRIEVE_ERROR,
  SUBMITTING,
  SUBMITTED,
  SUBMIT_ERROR
} from 'util/broadcastStatus';

// import { showNotification } from './notification';
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
        dispatch({
          type: BROADCAST_STATUS,
          payload: RETRIEVE_ERROR
        });
        dispatch({
          type: BROADCAST_ERROR,
          payload: error
        });
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
        dispatch({
          type: BROADCAST_STATUS,
          payload:  SUBMIT_ERROR
        });
        dispatch(handleError(error.response, true));
      });

  }
}
