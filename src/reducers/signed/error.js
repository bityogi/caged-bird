import {
  BROADCAST_ERROR
} from 'actions/types';

import {
  // RETRIEVING,
  // RETRIEVED,
  // SUBMITTED,
  // SAVED
} from 'util/broadcastStatus';

const initialState = null


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case BROADCAST_ERROR:
      console.log('New Broadcast ERROR - ', action.payload);
      return action.payload;

    default:
      return state;
  }
}
