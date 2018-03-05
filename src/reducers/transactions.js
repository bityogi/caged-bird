
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

const initialState = {
  loading: false,
  data: []
}

export default function transactionsReducer (state = initialState, action) {

  if (action.type === GET_TRANSACTIONS) {
    console.log('GET_TRANSACTIONS --> payload: ', action.payload);
    return action.payload;
  } else {
    return state;
  }

}
