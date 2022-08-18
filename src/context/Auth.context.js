import {
  useContext,
  createContext,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import app from '../firebase';

const AuthContext = createContext();

const messaging = getMessaging(app); 

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  showNotification({
    title: payload.notification.title,
    message: payload.notification.body,
  });
});

const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = null;
  };

  const whoami = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      if (!token) throw new Error('No token');

      axios.defaults.headers.common['Authorization'] = token;
      const { data } = await axios.get('auth/whoami');
      setUser(data.data);
    } catch (e) {
      logout();
    }
    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    whoami();
  }, [whoami, token]);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const push_token = await getToken(messaging, {
        vapidKey:
          'BC5goiM2wdvatMfHlwk4E4FFLOj_8vPewZOnXHu5TvWGvZblIJ34WTO6gi11jInQGrICBApWKWN2l7r33Xv-49g',
      });

      console.log('push_token', push_token);

      const { data } = await axios.post(`auth/sign_in`, {
        email,
        password,
        push_token: push_token,
      });

      console.log(data.data);

      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async (params) => {
    try {
      const push_token = await getToken(messaging, {
        vapidKey:
          'BC5goiM2wdvatMfHlwk4E4FFLOj_8vPewZOnXHu5TvWGvZblIJ34WTO6gi11jInQGrICBApWKWN2l7r33Xv-49g',
      });

      const { data } = await axios.post('auth/sign_up', {
        ...params,
        phone: `+91${params.phone}`,
        push_token,
      });

      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    token,
    signIn,
    signUp,
    logout,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <h1>Loader</h1> : children}
    </AuthContext.Provider>
  );
}

export default useAuth;
