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
        clientAccount: 'Offshore',
        coldWallet: 'Wallet 1',
        hotWallet: '1f4567yggt',
        formattedAmount: 231.66,
        formattedFee: 12.55,
        memo: 'This transaction is good and will be executed soon',
        generatedOn: '2018-03-25T23:54:53.603'
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
