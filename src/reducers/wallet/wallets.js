import {
    SET_WALLET_FILES,
    INITIALIZE_WALLET_FILES
} from 'actions/types';

const initialState = [];

export default function importWalletsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WALLET_FILES:
            return action.payload;
        case INITIALIZE_WALLET_FILES:
            return initialState;
        default:
            return state;
    }
}
