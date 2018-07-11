import {
    SET_WALLET_FILES
} from 'actions/types';

const initialState = [];

export default function importWalletsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WALLET_FILES:
            return action.payload;
        default:
            return state;
    }
}
