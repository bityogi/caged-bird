import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    FETCH_CANCEL,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from 'actions/types';



export default (previousState = 0, { type }) => {
    switch (type) {
        case FETCH_START:
        case LOGIN:
            return previousState + 1;
        case FETCH_END:
        case FETCH_ERROR:
        case FETCH_CANCEL:
        case LOGIN_SUCCESS:
        case LOGIN_FAILURE:
            return Math.max(previousState - 1, 0);
        default:
            return previousState;
    }
};
