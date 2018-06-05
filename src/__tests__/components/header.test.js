jest.mock('util/axiosClient');

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { MemoryRouter } from 'react-router';

import HeaderComponent from 'components/header';
import store from 'store';

describe('Header Component', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider>
          <MemoryRouter initialEntries={['/', '/landing']}>
            <HeaderComponent />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>

    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
