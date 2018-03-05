
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from 'actions/types';

const initialState = {
  loading: false,
  data: []
}

export default function usersReducer (state = initialState, action) {

  switch (action.type) {
    case LOGIN:
      return { ...initialState, loading: true };

    case LOGIN_SUCCESS:
      return { loading: false, ...state };

    case LOGIN_FAILURE:
      return { loading: false, data: [] };

    default:
      return state;
  }
  
}
