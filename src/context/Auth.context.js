import { useContext, createContext, useState, useLayoutEffect, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = token;

      axios.get('auth/whoami').then((res) => {
        setUser(res.data.data);
      });
    }
  }, [token]);

  useLayoutEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setToken(token);
        axios.defaults.headers.common.Authorization = token;
        axios.get('auth/whoami').then((res) => {
          setUser(res.data.data);
        });
      }
    } catch (e) {
      console.log('Who am i');
      console.log(e);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data } = await axios.post('auth/sign_in', {
        email,
        password,
      });

      localStorage.setItem('token', data.data.token);
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async (params) => {
    try {
      const { data } = await axios.post('auth/sign_up', {
        ...params,
        phone: `+91${params.phone}`,
      });

      console.log(data.token);
      localStorage.setItem('token', data.token);

      setToken(data.token);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = null;
  };

  const value = {
    token,
    signIn,
    signUp,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default useAuth;
