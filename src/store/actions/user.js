import shortid from 'shortid';
import * as actionTypes from './actionTypes';
// import socket from '../socket-client';
import api from '../../api';

/**
 * Handle the USER_ACTION_START action
 * @returns {Object}
 *   the data for USER_ACTION_START
 */
export const userActionStart = () => ({
  type: actionTypes.USER_ACTION_START,
});

/**
 * Handle the USER_ACTION_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for USER_ACTION_FAILURE
 */
export const userActionFailure = error => ({
  type: actionTypes.USER_ACTION_FAILURE,
  error,
});

/**
 * Handle the CREATE_USER_SUCCESS action
 * @param {String} uid
 *   the unique uselid that identifies the current user
 * @param {String} username
 *   the name the user has chosen
 * @returns {Object}
 *   the data for CREATE_USER_SUCCESS
 */
export const createUserSuccess = (uid, username) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  uid,
  username,
});


/**
 * Handle the REMOVE_USER action
 * @returns {Object}
 *   the data for the REMOVE_USER action
 */
export const removeUser = () => {
  const uid = localStorage.getItem('uid');
  const userData = { uid };
  api.users.removeUser(userData);
  localStorage.removeItem('uid');
  localStorage.removeItem('username');
  localStorage.removeItem('currentLobby');
  return {
    type: actionTypes.REMOVE_USER,
  };
};

/**
 * Handle the CREATE_USER_AUTO action
 * @returns {Object}
 *   the data for the CREATE_USER_AUTO action
 */
export const createUserAuto = () => (dispatch) => {
  const username = localStorage.getItem('username');
  const uid = localStorage.getItem('uid');
  if (!username || !uid) {
    dispatch(removeUser());
    localStorage.removeItem('currentLobby');
  } else {
    dispatch(createUserSuccess(uid, username));
  }
};

/**
 * Handle the creation of a new user
 * @param {String} username
 *   the username entered by the user
 */
export const createUser = username => (dispatch) => {
  dispatch(userActionStart());
  const uid = shortid.generate();
  const userData = { uid, username };
  try {
    api.users.createUser(userData);
    localStorage.setItem('uid', uid);
    localStorage.setItem('username', username);
    dispatch(createUserSuccess(uid, username));
  } catch (e) {
    dispatch(userActionFailure(e));
  }
};

