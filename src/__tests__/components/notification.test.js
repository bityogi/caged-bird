import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Notification from 'components/notification';
import store from 'store';

describe('Landing', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider>
          <Notification />
        </MuiThemeProvider>
      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
