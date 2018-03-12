import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import { HeaderComponent } from 'components/header';
import store from 'store';

describe('Header Component', () => {
  it('renders correctly', () => {
    // const rendered = renderer.create(
    //   <Provider store={store}>
    //       <HeaderComponent />
    //   </Provider>
    //
    // );
    // expect(rendered.toJSON()).toMatchSnapshot();
  });

});
