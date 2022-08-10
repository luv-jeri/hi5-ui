import useAuth from '../../context/Auth.context';
import { Button, Input } from '@mantine/core';
// import useSocket from '../../context/Socket.context';
import axios from 'axios';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { showNotification } from '@mantine/notifications';
import { TextInput } from '@mantine/core';
import useProfileModal from '../../components/wrappers/modals/Profile';
import socket from '../../socket';

export default function Home() {
  const file = useRef(null);

  const { openProfileModal } = useProfileModal();

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
  }, []);

  useEffect(() => {
    axios.get('/user').then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  const upload = async () => {
    const data = new FormData();
    data.append('file', file.current.files[0]);
    setMsg('Uploading');

    await axios.post('/upload', data, {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        setPercent(percent);
      },
    });

    setPercent(0);
    setMsg('');

    showNotification({
      title: 'Uploaded',
      message: 'File uploaded successfully',
    });
  };

  return (
    <div>
      <h1>
        {msg} - Percent {percent}
      </h1>

      <input
        ref={file}
        id='photo'
        // multiple
        // accept='.png, .jpeg'
        type='file'
      />

      <Button onClick={upload}>Upload</Button>
    </div>
  );
}

// const upload_ = useCallback(() => {
//   console.log(file.current.files[0]);

//   const file_ = new FileReader();

//   file_.readAsArrayBuffer(file.current.files[0]);

//   file_.onload = (e) => {
//     console.log('uploading', e.target.result);

//     const CHUNK_SIZE = 8000;

//     const chunkCount = e.target.result.byteLength / CHUNK_SIZE;

//     for (let chunkId = 0; chunkId < chunkCount + 1; chunkId++) {
//       const chunk = e.target.result.slice(
//         chunkId * CHUNK_SIZE,
//         chunkId * CHUNK_SIZE + CHUNK_SIZE
//       );

//       // fetch('/upload', {
//       //   method: 'POST',
//       //   body: chunk,
//       //   headers: {
//       //     'Content-Type': 'application/octet-stream',
//       //   },
//       // });

//       // axios.post(
//       //   '/upload',
//       //   {
//       //     chunk,
//       //   },
//       //   {
//       //     headers: {
//       //       'Content-Type': 'application/octet-stream',
//       //     },
//       //   }
//       // );

//       socket.emit(
//         'file',
//         {
//           chunk,
//           fileName: file.current.files[0].name,
//         },

//         () => {
//           console.log('sent', chunk);
//           setPercent(Math.round((chunkId / chunkCount) * 100));
//         }
//       );
//     }
//   };
// }, []);
