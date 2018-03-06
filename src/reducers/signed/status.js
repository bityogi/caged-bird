import {
  BROADCAST_STATUS
} from 'actions/types';

import {
  PENDING,
  SUBMITTED,
  SAVED
} from 'util/broadcastStatus';

const initialState = {
  status: PENDING
}

export default function transactionDetailReducer (state = initialState, action) {
  switch (action.type) {
    case BROADCAST_STATUS:
      return action.payload;

    default:
      return state;
  }
}
