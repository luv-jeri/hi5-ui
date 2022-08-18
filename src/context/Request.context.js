import { useState, useEffect, useContext, createContext } from 'react';
import useAuth from './Auth.context';
import axios from 'axios';

const RequestContext = createContext();

const useRequest = () => {
  return useContext(RequestContext);
};

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      axios.get('friend/request').then((res) => {
        setRequests(res.data.data);
      });
    }
  }, [user]);

  console.log('request', requests);

  const value = {
    requests,
    setRequests,
  };

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>;
}

export default useRequest;
