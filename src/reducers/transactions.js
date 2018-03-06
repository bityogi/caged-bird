
export const PENDING_TRANSACTIONS = 'PENDING_TRANSACTIONS';

const initialState = {
  data: []
}

export default function transactionsReducer (state = initialState, action) {

  if (action.type === PENDING_TRANSACTIONS) {
    console.log('PENDING_TRANSACTIONS --> payload: ', action.payload);
    return action.payload;
  } else {
    return state;
  }

}
