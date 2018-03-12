import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import TransactionDetail from 'components/transactionDetail';
import store from 'store';

describe('Landing', () => {
  it('renders correctly', () => {

    const detail = {
      loading: false,
      data: {
        id: 1234,
        client: 'Conger Inv',
        coin: 'Bitcoin',
        account: 'Offshore',
        coldWallet: 'Wallet 1',
        hotWallet: '1f4567yggt',
        amount: 231.66,
        fee: 12.55,
        memo: 'This transaction is good and will be executed soon',
        genTime: '2018-03-07T09:18:26-05:00'
      }
    }
    const rendered = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider>
          <TransactionDetail detail={detail}/>
        </MuiThemeProvider>
      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
