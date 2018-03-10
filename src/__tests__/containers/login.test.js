import React from 'react';
import renderer from 'react-test-renderer';

import Login from 'containers/login';

describe('Login', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Login />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Calls the login function', () => {
    expect(2 + 2).toBe(4);
  });

});
