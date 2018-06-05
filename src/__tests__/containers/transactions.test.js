jest.mock('util/axios');

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Transactions from 'containers/transactions';
import store from 'store';

describe('Login', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider>
          <Transactions />
        </MuiThemeProvider>
      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
