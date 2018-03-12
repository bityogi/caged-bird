import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import { Login } from 'containers/login';
import store from 'store';

describe('Login', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Provider store={store}>
          <Login />
      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
