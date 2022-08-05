import Auth from './pages/auth/index';
import Application from './pages/app/index';
import { useState, useEffect } from 'react';
import useAuth from './context/Auth.context';

function App() {
  const { token } = useAuth();

  return <>{token ? <Application /> : <Auth />}</>;
}

export default App;
