import reducer, { initialState } from './room';
import * as actionTypes from '../actions/actionTypes';

describe('room reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should create a room', () => {
    expect(reducer({
      ...initialState,
    }, { type: actionTypes.CREATE_ROOM_SUCCESS, rid: 'some-id' })).toEqual({
      ...initialState,
      rid: 'some-id',
    });
  });
});
