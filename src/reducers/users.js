
export const GET_USERS = 'GET_USERS';

const initialState = {
  loading: false,
  data: []
}

export default function usersReducer (state = initialState, action) {

  if (action.type === GET_USERS) {
    console.log('GET_USERS --> payload: ', action.payload);
    return action.payload;
  } else {
    return state;
  }

}
