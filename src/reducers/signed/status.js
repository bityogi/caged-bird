import {
  BROADCAST_STATUS
} from 'actions/types';

import {
  // RETRIEVING,
  // RETRIEVED,
  // SUBMITTED,
  // SAVED
} from 'util/broadcastStatus';

const initialState = null


export default function transactionDetailReducer (state = initialState, action) {
  switch (action.type) {
    case BROADCAST_STATUS:
      console.log('New Broadcast status - ', action.payload);
      return action.payload;

    default:
      return state;
  }
}
