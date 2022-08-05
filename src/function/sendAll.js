import { socket } from '../context/Socket.context';

const sendToAll = () => {
  socket.emit('to all');
};

export default sendToAll;
