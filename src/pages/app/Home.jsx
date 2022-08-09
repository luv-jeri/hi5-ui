import useAuth from '../../context/Auth.context';
import { Button } from '@mantine/core';
import useSocket from '../../context/Socket.context';
import './Home.css';
import ChatList from "../customComponents/ChatListComponents/ChatList.jsx";
import Message from "../customComponents/MessageComponent/Message.jsx";
import Profile from "../customComponents/ProfileComponent/Profile.jsx";

export default function Home() {
  
  const { logout, user } = useAuth();

  const { socket } = useSocket();


  return (
    <div className='Main-Container'>
      <ChatList />
      <Message />
      <Profile />
    </div>
  );
}
