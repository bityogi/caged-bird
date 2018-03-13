import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import App from 'App';
import store from 'store';

describe('App', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/', '/landing']}>
          <App />
        </MemoryRouter>

      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
