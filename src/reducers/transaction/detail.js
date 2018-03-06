import {
  TRANSACTION_DETAIL
} from 'actions/types';

const initialState = {
  loading: false,
  data: {}
}

export default function transactionDetailReducer (state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_DETAIL:
      return action.payload;

    default:
      return state;
  }
}
