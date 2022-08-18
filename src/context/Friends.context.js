import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const FriendContext = createContext();

const useFriend = () => {
  return useContext(FriendContext);
};

export function FriendProvider({ children }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('friend/friends').then((res) => {
      setFriends(res.data.data);
    });
  }, []);

  console.log('friends', friends);

  const value = {
    friends,
    setFriends,
  };

  return <FriendContext.Provider value={value}>{children}</FriendContext.Provider>;
}

export default useFriend;
