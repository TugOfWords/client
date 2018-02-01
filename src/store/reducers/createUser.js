import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  username: null,
  uid: null,
  loading: false,
  error: null,
};

const createUserStart = state => updateObject(state, { loading: true });

const createUserFailure = (state, action) => updateObject(state, {
  loading: false,
  error: action.error,
});

const createUserSuccess = (state, action) => {
  const updatedState = {
    ...state,
    username: action.username,
    uid: action.uid,
    loading: false,
    error: null,
  };
  return updateObject(state, updatedState);
};

const removeUser = (state) => {
  const updatedState = {
    ...state,
    username: null,
    uid: null,
    error: null,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_START:
      return createUserStart(state);
    case actionTypes.CREATE_USER_FAILURE:
      return createUserFailure(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.REMOVE_USER:
      return removeUser(state);
    default:
      return state;
  }
};

export default reducer;
