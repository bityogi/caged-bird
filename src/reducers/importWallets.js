import {
    IMPORT_WALLETS
} from 'actions/types';

const initialState = {
    importedWallets: []
}

export default function importWalletsReducer(state = initialState, action) {
    switch (action.type) {
        case IMPORT_WALLETS:
            return action.payload;
        default:
            return state;
    }
}
