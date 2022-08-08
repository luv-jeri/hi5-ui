import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
  auth: {
    token: localStorage.getItem('token'),
  },
});

socket.on('connect', () => {
  console.log('connected');
});


export default socket;