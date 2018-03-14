import reducer from 'reducers/admin/notification';
import * as types from 'actions/types';

describe('Users reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
        text: '',
        type: 'info',
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });


});
