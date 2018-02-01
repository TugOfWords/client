import * as actionTypes from './actionTypes';

export const createUserStart = () => ({
  type: actionTypes.CREATE_USER_START,
});

export const createUserFailure = error => ({
  type: actionTypes.CREATE_USER_FAILURE,
  error,
});

export const createUserSuccess = (username, uid) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  username,
  uid,
});

export const removeUser = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('uid');
  return {
    type: actionTypes.REMOVE_USER,
  };
};

export const createUserAuto = () => (dispatch) => {
  const uid = localStorage.getItem('uid');
  if (!uid) {
    dispatch(removeUser());
  } else {
    const username = localStorage.getItem('username');
    dispatch(createUserSuccess(username, uid));
  }
};

export const createUser = username => (dispatch) => {
  dispatch(createUserStart);
  console.log(username);
  // TODO: do something with this username ? real time data store
};

