import Auth from './pages/auth/index';
import Application from './pages/app/index';

import useAuth from './context/Auth.context';  
 
function App() {
  const { user } = useAuth();

  return <>{user ? <Application /> : <Auth />}</>;
}

export default App;
