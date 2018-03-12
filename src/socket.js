import socketioClient from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'localhost:8000';
let socket = null;

export default {
  connect: (id, uid) => new Promise((resolve) => {
    if (socket === null) {
      socket = socketioClient(SERVER_URL, { query: `lid=${id}&uid=${uid || 'None'}` });
    }
    resolve(socket);
  }),
  joinLobby: data => socket.emit('joinLobby', data),
  onJoinLobby: (data, cb) => {
    socket.on(`user joined lobby ${data.lid}`, res => cb(res));
  },
  getTeams: (data, cb) => {
    socket.emit('getTeams', data);
    socket.on(`got teams ${data.lid}`, res => cb(res));
  },
  joinPublicLobby: data => socket.emit('joinPublicLobby', data),
  leaveLobby: data => socket.emit('leaveLobby', data),
  onLeaveLobby: (data, cb) => {
    socket.on(`user left lobby ${data.lid}`, res => cb(res));
  },
  joinTeam: data => socket.emit('joinTeam', data),
  onJoinTeam: (data, cb) => {
    socket.on(`user joined team ${data.lid}`, res => cb(res));
  },
  leaveTeam: data => socket.emit('leaveTeam', data),
  startGame: () => socket.emit('startGame'),
  newWord: () => socket.emit('newWord'),
  submitWord: word => socket.emit('submitWord', { word }),
  isConnected: () => (!!socket),
  onStartCountdown: (data, cb) => {
    socket.on(`start countdown ${data.lid}`, res => cb(res));
  },
  onCountdown: (data, cb) => {
    socket.on(`countdown ${data.lid}`, res => cb(res));
  },
  onStopCountdown: (data, cb) => {
    socket.on(`stop countdown ${data.lid}`, () => cb());
  },
  onFinishCountdown: (data, cb) => {
    socket.on(`finish countdown ${data.lid}`, () => cb());
  },
  onStartGame: (cb) => {
    socket.on('startGame', () => cb());
  },
  onScore: (cb) => {
    socket.on('score', data => cb(data.t1, data.t2));
  },
  onSendWord: (cb) => {
    socket.on('sendWord', data => cb(data.word));
  },
  socket,
};
