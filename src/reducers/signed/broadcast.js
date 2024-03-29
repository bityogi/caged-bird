import {
  BROADCAST_DETAIL
} from 'actions/types';

const initialState = {
  loading: false,
  data: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case BROADCAST_DETAIL:
      return action.payload;

    default:
      return state;
  }
}
