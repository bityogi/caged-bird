import {
  ALERT,
  CLEAR_ALERT
} from 'actions/types';

const initialState = {
  key: '',
  message: ''
}


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ALERT:
      console.log('New ALERT message - ', action.payload);
      return action.payload;

    case CLEAR_ALERT:
      return initialState;

    default:
      return state;
  }
}
