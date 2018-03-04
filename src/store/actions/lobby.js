import * as actionTypes from '../actions/actionTypes';

// import socket from '../socket-client
// import api from '../../api';

/**
 * Handle the LOBBY_ACTION_START action
 * @returns {Object}
 *   the data for LOBBY_ACTION_START
 */
export const lobbyActionStart = () => ({
  type: actionTypes.LOBBY_ACTION_START,
});
/**
 * Handle the LOBBY_ACTION_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for LOBBY_ACTION_FAILURE
 */
export const lobbyActionFailure = error => ({
  type: actionTypes.LOBBY_ACTION_FAILURE,
  error,
});

/**
 * Handle the CREATE_ROOM_SUCCESS action
 * @param {String} rid
 *   the unique roomid
 * @returns {Object}
 *   the data for CREATE_ROOM_SUCCESS
 */
export const joinTeamSuccess = teamNumber => ({
  type: actionTypes.JOIN_TEAM_SUCCESS,
  teamNumber,
});

export const joinTeam = teamNumber => (dispatch) => {
  dispatch(lobbyActionStart());
  // const uid = localStorage.getItem('uid');
  // const rid = localStorage.getItem('currentRoom');
  // const data = { uid, rid, teamNumber };
  // TODO: socket call to joinTeam
  localStorage.setItem('currentTeam', teamNumber);
  dispatch(joinTeamSuccess(teamNumber));
};
