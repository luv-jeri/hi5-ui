import Auth from './pages/auth/index';
import Application from './pages/app/index';
import { useState, useEffect } from 'react';
import useAuth from './context/Auth.context';
import { SocketProvider } from './context/Socket.context';

function App() {
  const { user } = useAuth();

  return <>{user ? <Application /> : <Auth />}</>;
}

export default App;
