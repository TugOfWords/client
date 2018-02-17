import reducer, { initialState } from './user';
import * as actionTypes from '../actions/actionTypes';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should create the user', () => {
    expect(reducer({
      ...initialState,
    }, { type: actionTypes.CREATE_USER_SUCCESS, uid: 'some-id', username: 'some-name' })).toEqual({
      ...initialState,
      uid: 'some-id',
      username: 'some-name',
    });
  });
});
