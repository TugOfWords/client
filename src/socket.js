import socketioClient from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'localhost:8000';
let socket = null;

export default {
  connect: id => new Promise((resolve) => {
    if (socket === null) {
      socket = socketioClient(SERVER_URL, { query: `id=${id}` });
    }
    resolve(socket);
  }),
  joinLobby: data => socket.emit('joinLobby', data),
  onJoinLobby: (data, cb) => {
    socket.on(`user joined lobby ${data.lid}`, res => cb(res));
  },
  leaveLobby: data => socket.emit('leaveLobby', data),
  joinTeam: data => socket.emit('joinTeam', data),
  onJoinTeam: (data, cb) => {
    socket.on(`user joined team ${data.lid}`, res => cb(res));
  },
  leaveTeam: data => socket.emit('leaveTeam', data),
  isConnected: () => (!!socket),
};
