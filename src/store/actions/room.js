import shortid from 'shortid';
import * as actionTypes from './actionTypes';
// import socket from '../socket-client';
import api from '../../api';
import socket from '../../socket';

/**
 * Handle the ROOM_ACTION_START action
 * @returns {Object}
 *   the data for ROOM_ACTION_START
 */
export const roomActionStart = () => ({
  type: actionTypes.ROOM_ACTION_START,
});

/**
 * Handle the CREATE_ROOM_FAILURE action
 * @param {String} error
 *   the current application error message
 * @returns {Object}
 *   the data for CREATE_ROOM_FAILURE
 */
export const roomActionFailure = error => ({
  type: actionTypes.ROOM_ACTION_FAILURE,
  error,
});

/**
 * Handle the CREATE_ROOM_SUCCESS action
 * @param {String} rid
 *   the unique roomid
 * @returns {Object}
 *   the data for CREATE_ROOM_SUCCESS
 */
export const createRoomSuccess = rid => ({
  type: actionTypes.CREATE_ROOM_SUCCESS,
  rid,
});

/**
 * Handle the JOIN_ROOM_SUCCESS action
 * @param {String} rid
 *   the unique roomid
 * @returns {Object}
 *   the data for CREATE_ROOM_SUCCESS
 */
export const joinRoomSuccess = rid => ({
  type: actionTypes.JOIN_ROOM_SUCCESS,
  rid,
});

/**
 * Handle the creation of a new room
 * @param {String} roomname
 *   the roomname entered by the room
 */
export const createRoom = uid => (dispatch) => {
  dispatch(roomActionStart());
  const rid = encodeURIComponent(shortid.generate());
  const roomData = { rid, uid };
  try {
    api.rooms.createRoom(roomData);
    localStorage.setItem('currentRoom', rid);
    dispatch(createRoomSuccess(rid));
  } catch (e) {
    dispatch(roomActionFailure(e));
  }
};

/**
 * Handle the joining of a new room
 * @param {String} roomname
 *   the roomname entered by the room
 */
export const joinRoom = rid => (dispatch) => {
  dispatch(roomActionStart());
  try {
    socket.connect(rid);
    dispatch(createRoomSuccess(rid));
  } catch (e) {
    dispatch(roomActionFailure(e));
  }
};
