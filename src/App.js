import Auth from './pages/auth/index';
import Application from './pages/app/index';
import { useState, useEffect } from 'react';
import useAuth from './context/Auth.context';
import { SocketProvider } from './context/Socket.context';

function App() {
  const { token } = useAuth();

  return <>{token ? <Application /> : <Auth />}</>;
}

export default App;
