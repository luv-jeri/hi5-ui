import { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client';
import useAuth from './Auth.context';
import { Loader } from '@mantine/core';

const SocketContext = createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

export let socket = null;

const setter = (value) => {
  socket = value;
};

export const getter = (value) => {
  return socket;
};

export function SocketProvider({ children }) {
  const { token } = useAuth();

  const socket = useMemo(() => {
    return io('http://localhost:8000', {
      auth: {
        token: token,
      },
    });
  }, [token]);

  useEffect(() => {
    setter(socket);
  }, [token, socket]);

  useMemo(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  }, [socket]);

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
      {socket ? children : <h1>Loader</h1>}
    </SocketContext.Provider>
  );
}

export default useSocket;
