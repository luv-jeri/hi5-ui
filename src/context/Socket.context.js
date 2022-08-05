import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import useAuth from './Auth.context';

const SocketContext = createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

export let socket = null;

const setter = (value) => {
  socket = value;
};

export function SocketProvider({ children }) {
  const { token } = useAuth();

  const socket = io('http://localhost:8000', {
    auth: {
      token: token,
    },
  });

  useEffect(() => {
    setter(socket);
  }, [token, socket]);

  // ! ERROR handling
  socket.on('error', (err) => {
    console.log(err);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default useSocket;
