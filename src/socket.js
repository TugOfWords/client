import socketioClient from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'localhost:8000';
let socket = null;

export default {
  connect: id => new Promise((resolve) => {
    if (socket === null) {
      socket = socketioClient(SERVER_URL, { query: `id=${id}` });
    }
    resolve();
  }),
  joinLobby: data => socket.emit('joinLobby', data),
  leaveLobby: data => socket.emit('leaveLobby', data),
  joinTeam: data => socket.emit('joinTeam', data),
  leaveTeam: data => socket.emit('leaveTeam', data),
};
