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

    const file_ = new FileReader();

    file_.onload = (e) => {
      console.log('uploading', e.target.result);

      const CHUNK_SIZE = 8000;
      const chunkCount = e.target.result.byteLength / CHUNK_SIZE;

      for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
        const chunk = e.target.result.slice(
          chunkId * CHUNK_SIZE,
          chunkId * CHUNK_SIZE + CHUNK_SIZE
        );

        socket.emit(
          'file',
          {
            chunk,
            fileName: file.current.files[0].name,
          },
          () => {
            console.log('sent', chunk);
            setPercent(Math.round((chunkId / chunkCount) * 100));
          }
        );
      }
    };

    file_.readAsArrayBuffer(file.current.files[0]);
  }, []);

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <h1>Percent {percent}</h1>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={upload}>Upload</Button>

      <input ref={file} id='photo' type='file' />

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
