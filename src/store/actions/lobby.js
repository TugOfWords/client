import shortid from 'shortid';
import * as actionTypes from './actionTypes';
import socket from '../../socket';
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
 * Handle the JOIN_TEAM_SUCCESS action
 * @param {Number} teamNumber
 *   the number of the team joined
 */
export const joinTeamSuccess = teamNumber => ({
  type: actionTypes.JOIN_TEAM_SUCCESS,
  teamNumber,
});

/**
 * Add a user to a team
 * @param {String} lid
 *   the unique lobbyid
 * @param {String} uid
 *   the unique userid
 * @param {Number} teamNumber
 *   the number of the team to join
 */
export const joinTeam = (lid, teamNumber, uid) => (dispatch) => {
  dispatch(lobbyActionStart());
  const data = { lid, teamNumber, uid };
  try {
    socket.joinTeam(data);
    localStorage.setItem('teamNumber', teamNumber);
    dispatch(joinTeamSuccess(teamNumber));
  } catch (e) {
    dispatch(lobbyActionFailure(e));
  }
};

/**
 * Handle the JOIN_LOBBY_SUCCESS action
 * @param {String} lid
 *   the unique lobbyid
 * @param {Bool} isPrivate
 *   true if the lobby is private, false otherwise
 */
export const joinLobbySuccess = (lid, isPrivate) => ({
  type: actionTypes.JOIN_LOBBY_SUCCESS,
  lid,
  isPrivate,
});

/**
 * Add a user to a lobby
 * @param {String} lid
 *   the unique lobbyid
 * @param {String} uid
 *   the unique userid of the user joining the lobby
 */
export const joinLobby = (lid, uid, isPrivate) => (dispatch) => {
  dispatch(lobbyActionStart());
  const data = { lid, uid, isPrivate };
  socket.connect(lid, uid)
    .then(() => {
      socket.joinLobby(data);
      localStorage.setItem('lid', lid);
      localStorage.setItem('isPrivate', isPrivate);
      localStorage.removeItem('teamNumber');
      dispatch(joinLobbySuccess(lid, isPrivate));
    })
    .catch(e => dispatch(lobbyActionFailure(e)));
};

/**
 * Add user to a publid lobby
 * @param {String} uid
 *   the unique userid of the user joining the lobby
 */
export const joinPublicLobby = uid => (dispatch) => {
  dispatch(lobbyActionStart());
  api.lobbys.getLobby()
    .then((res) => {
      dispatch(joinLobby(res.lid, uid, false));
    })
    .catch(e => dispatch(lobbyActionFailure(e)));
};

/**
 * Join a lobby automatically if the user has valid values in localStorage
 */
export const joinLobbyAuto = () => (dispatch) => {
  const lid = localStorage.getItem('lid');
  const uid = localStorage.getItem('uid');
  const isPrivate = localStorage.getItem('isPrivate');
  const teamNumber = localStorage.getItem('teamNumber');

  if (lid && uid && isPrivate !== null) {
    socket.connect(lid, uid);
    dispatch(joinLobbySuccess(lid, isPrivate === 'true'));
    if (teamNumber === '1') dispatch(joinTeamSuccess(1));
    else if (teamNumber === '2') dispatch(joinTeamSuccess(2));
  }
};

/**
 * Remove a user from a lobby
 * @param {String} lid
 *   the unique lobbyid
 * @param {String} uid
 *   the unique userid
 */
export const leaveLobby = (lid, uid) => (dispatch) => {
  dispatch(lobbyActionStart());
  const data = { lid, uid };
  try {
    localStorage.removeItem('lid');
    localStorage.removeItem('teamNumber');
    localStorage.removeItem('isPrivate');
    socket.leaveLobby(data);
  } catch (e) {
    dispatch(lobbyActionFailure(e));
  }
};

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

/**
 * Handle the creation of a new lobby
 * @param {String} lobbyname
 *   the lobbynam entered by the lobby
 */
export const createLobby = uid => (dispatch) => {
  dispatch(lobbyActionStart());
  const lid = encodeURIComponent(shortid.generate());
  const lobbyData = { lid, uid };
  api.lobbys.createLobby(lobbyData)
    .then(() => {
      dispatch(createLobbySuccess());
      dispatch(joinLobby(lid, uid, true));
    })
    .catch(e => dispatch(lobbyActionFailure(e)));
};

