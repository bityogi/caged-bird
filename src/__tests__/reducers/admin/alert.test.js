import reducer from 'reducers/admin/alert';
import * as types from 'actions/types';

describe('Admin alert reducer', () => {
  it('should return the initial state', () => {
    const initialState = { key: '', message: '' };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
