import reducer, { initialState } from './lobby';
import * as actionTypes from '../actions/actionTypes';

describe('lobby reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('should create a lobby', () => {
    expect(reducer({
      ...initialState,
    }, { type: actionTypes.CREATE_LOBBY_SUCCESS, lid: 'some-id' })).toEqual({
      ...initialState,
    });
  });
});
