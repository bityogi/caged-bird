import {
  IMPORT_WALLETS_SUCCESS
} from './types';

export const importWallets = () => {
  return { type: IMPORT_WALLETS_SUCCESS, payload: [{}, {}, {}, {}] }
}
