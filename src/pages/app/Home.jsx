import useAuth from '../../context/Auth.context';
import { Button } from '@mantine/core';
import useSocket from '../../context/Socket.context';
import axios from 'axios';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { showNotification } from '@mantine/notifications';
import { TextInput } from '@mantine/core';

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('msg', (data) => {
      console.log('HELLO A NEW MESSAGE HAS BEEN RECEIVED');

      showNotification({
        title: `${data.name} send nudge`,
        message: data.msg,
      });
    });

    return () => {
      socket.off('msg');
    };
  }, [socket]);

  useEffect(() => {
    axios.get('/user').then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  console.log('users', users);

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <Button onClick={logout}>Logout</Button>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '20px',
        }}
      >
        <TextInput
          placeholder='Your name'
          label='Full name'
          radius='md'
          size='md'
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        {users.map((user_) => {
          return (
            <Button
              color='yellow'
              radius='xl'
              size='md'
              uppercase
              style={{
                width: '30%',
                marginTop: '10px',
              }}
              onClick={() => {
                socket.emit('send_msg', {
                  name: user.name,
                  to: user_._id,
                  msg,
                });
              }}
            >
              {user_.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
