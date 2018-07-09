import {
    FETCHING_SEED,
    FETCH_SEED_SUCCESS,
    FETCH_SEED_FAILURE
} from 'actions/types';

export const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_SEED:
            return { loading: true };
        case FETCH_SEED_SUCCESS:
            return { loading: false, ...action.payload };
        case FETCH_SEED_FAILURE:
            return { loading: false, ...action.payload };
        default:
            return state;
    }
}