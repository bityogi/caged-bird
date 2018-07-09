import {
    IMPORT_WALLETS_SUCCESS
} from 'actions/types';

const initialState = [];

export default function importWalletsReducer(state = initialState, action) {
    switch (action.type) {
        case IMPORT_WALLETS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
