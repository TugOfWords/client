import shortid from 'shortid';
import * as actionTypes from './actionTypes';
// import socket from '../socket-client';
import api from '../../api';

/**
 * Handle the LOBBY_ACTION_START action
 * @returns {Object}
 *   the data for LOBBY_ACTION_START
 */
export const lobbyActionStart = () => ({
  type: actionTypes.LOBBY_ACTION_START,
});

/**
 * Handle the CREATE_LOBBY_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for CREATE_LOBBY_FAILURE
 */
export const lobbyActionFailure = error => ({
  type: actionTypes.LOBBY_ACTION_FAILURE,
  error,
});

/**
 * Handle the CREATE_LOBBY_SUCCESS action
 * @param {String} lid
 *   the unique lobbyid
 * @returns {Object}
 *   the data for CREATE_LOBBY_SUCCESS
 */
export const createLobbySuccess = () => ({
  type: actionTypes.CREATE_LOBBY_SUCCESS,
});

export const joinLobbySuccess = lid => ({
  type: actionTypes.JOIN_LOBBY_SUCCESS,
  lid,
});

export const joinLobby = (lid, uid) => (dispatch) => {
  dispatch(lobbyActionStart());
  const data = { lid, uid };
  api.lobbys.joinLobby(data);
  localStorage.setItem('currentLobby', lid);
  dispatch(joinLobbySuccess(lid));
};

/**
 * Handle the creation of a new lobby
 * @param {String} lobbyname
 *   the lobbynam entered by the lobby
 */
export const createLobby = uid => (dispatch) => {
  dispatch(lobbyActionStart());
  const lid = encodeURIComponent(shortid.generate());
  const lobbyData = { lid, uid };
  try {
    api.lobbys.createLobby(lobbyData);
    dispatch(createLobbySuccess());
    dispatch(joinLobby(lid, uid));
  } catch (e) {
    dispatch(lobbyActionFailure(e));
  }
};
