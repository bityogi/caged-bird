import {
  PENDING_TRANSACTIONS
} from 'actions/types';


const initialState = [];

export default function transactionsReducer (state = initialState, action) {

  if (action.type === PENDING_TRANSACTIONS) {
    console.log('PENDING_TRANSACTIONS --> payload: ', action.payload);
    return action.payload;
  } else {
    return state;
  }

}
