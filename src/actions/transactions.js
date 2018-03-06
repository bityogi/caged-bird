import {
  PENDING_TRANSACTIONS,
  TRANSACTION_DETAIL,

  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  FETCH_CANCEL,
} from './types';

// temporary code
const pendingTransactionsPayload = [
  {
    id: '1234',
    client: 'Conger Inv',
    coin: 'Bitcoin',
    account: 'OffShore',
    amount: 231.66,
    genTime: '1/1/2018'
  },
  {
    id: '1235',
    client: 'Conger Inv',
    coin: 'Bitcoin',
    account: 'OffShore',
    amount: 1234.60,
    genTime: '1/1/2018'
  },
  {
    id: '1236',
    client: 'DACC Advisors',
    coin: 'Litecoin - ugh',
    account: 'OffShore',
    amount: 56.22,
    genTime: '1/1/2018'
  },
  {
    id: '1237',
    client: 'Swaleela',
    coin: 'Ethereum - ugh',
    account: 'Western',
    amount: 4531.99,
    genTime: '1/1/2018'
  },
];

const transactionDetailPayload = {
  id: 1234,
  client: 'Conger Inv',
  coin: 'Bitcoin',
  account: 'Offshore',
  coldWallet: 'Wallet 1',
  hotWallet: '1f4567yggt',
  amount: 231.66,
  fee: 12.55,
  memo: 'This transaction is good and will be executed soon',
  genTime: '1/1/2018 2:36PM'
};

//


export const pendingTransactions = () => {
  console.log('getting pending Transactions ');

  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    return setTimeout(() => {

      dispatch({
        type: PENDING_TRANSACTIONS,
        payload: pendingTransactionsPayload
      });

      dispatch({
        type: FETCH_END
      });

    }, 1000)
  }
}

export const transactionDetail = (id) => {
  console.log('getting transaction Detail for id: ', id);

  return dispatch => {
    dispatch({
      type: FETCH_START
    });

    dispatch({
      type: TRANSACTION_DETAIL,
      payload: {
        loading: true,
        data: {}
      }
    })

    return setTimeout(() => {
      dispatch({
        type: TRANSACTION_DETAIL,
        payload: {
          loading: false,
          data: transactionDetailPayload
        }
      })
      dispatch({
        type: FETCH_END
      });

    }, 3000)
  }
}
