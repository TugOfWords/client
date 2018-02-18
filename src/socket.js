import socketioClient from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'localhost:8000';
let socket = null;

const joinTeam = (tnum) => {
  socket.emit('joinTeam', tnum);
};

export default {
  connect: (id) => {
    if (socket === null) {
      socket = socketioClient(SERVER_URL, { query: `id=${id}` });
    }
  },
  joinTeam,
};
