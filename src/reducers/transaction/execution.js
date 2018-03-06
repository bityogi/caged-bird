import {
  TRANSACTION_EXECUTION
} from 'actions/types';

import {
  PENDING,
  CREATING,
  CREATED,
  CREATE_ERROR,
  SAVING,
  SAVED,
  SAVE_ERROR,
} from 'util/transactionStatus';

const initialState = {
  status: PENDING
}

export default function transactionExecutionReducer (state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_EXECUTION:
      return action.payload;

    default:
      return state;
  }
}
