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
      axios.defaults.headers.common['Authorization'] = token;

      axios.get('auth/whoami').then((res) => {
        setUser(res.data.data);
      });
    }
  }, [token]);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log(email, password);
      const { data } = await axios.post('auth/sign_in', {
        email,
        password,
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
      const { data } = await axios.post('auth/sign_up', {
        ...params,
        phone: `+91${params.phone}`,
      });

      localStorage.setItem('token', data.data.token);
      setToken(data.data.token);
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
