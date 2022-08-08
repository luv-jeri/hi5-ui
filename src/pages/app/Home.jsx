import useAuth from '../../context/Auth.context';
import { Button } from '@mantine/core';
// import useSocket from '../../context/Socket.context';
import axios from 'axios';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { showNotification } from '@mantine/notifications';
import { TextInput } from '@mantine/core';
import socket from '../../socket';

export default function Home() {
  const file = useRef(null);
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const [percent, setPercent] = useState(0);

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

  const upload = useCallback(() => {
    console.log(file.current.files[0]);
    const formData = new FormData();
    formData.append('file', file.current.files[0]);
    formData.append('name', file.current.files[0].name);
    formData.append('user', user.id);
    axios
      .post('/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded / total) * 100);
          console(percent);
        },
      })
      .then(() => {
        setPercent(0);
        setMsg('');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Button onClick={upload}>Upload</Button>
      <input ref={file} id='photo' type='file' />
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '20px',
        }}
      ></div>
    </div>
  );
}
