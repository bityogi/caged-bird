import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Landing from 'components/landing';
import store from 'store';

describe('Landing', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider>
          <MemoryRouter initialEntries={['/', '/landing']}>
            <Landing />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
