import { useState, useEffect, useCallback } from 'react';
import useAuth from '../../context/Auth.context';
import { Avatar } from '@mantine/core';
import { setNavigationProgress } from '@mantine/nprogress';
import { showNotification } from '@mantine/notifications';

import axios from 'axios';

export default function EditPhoto({}) {
  const [file, setFile] = useState(null);

  const { user, setUser } = useAuth();

  const upload = useCallback(async () => {
    console.log('uploading', file);
    const toUpload = new FormData();

    toUpload.append('file', file);

    const { data } = await axios.post('/upload', toUpload, {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        setNavigationProgress(percent);
      },
    });

    showNotification({
      title: 'Uploaded',
      message: 'Photo uploaded successfully',
    });

    const updateUser = await axios.patch(`/user`, {
      photo: data.data,
    });

    showNotification({
      title: `Hey ${updateUser.data.data.name}`,
      message: updateUser.data.message,
    });
    setUser(updateUser.data.data);
  }, [file, setUser]);

  useEffect(() => {
    file && upload();
  }, [file, upload]);

  return (
    <div className='photo'>
      <input
        className='file-picker'
        onChange={(e) => setFile(e.target.files[0])}
        id='photo'
        accept='.png, .jpeg'
        type='file'
      />

      <Avatar radius='xl' size='xl' src={user?.photo} />
    </div>
  );
}
