import { useState, useEffect, useContext, createContext, useRef } from 'react';
import useAuth from '../../../context/Auth.context';
import './Profile.css';
import {
  Modal,
  Button,
  Group,
  Box,
  Stack,
  Space,
  Paper,
  Text,
  Image,
  Textarea,
  ActionIcon,
} from '@mantine/core';
import { Input } from '@mantine/core';
import { IconAt, IconUser, IconSignature } from '@tabler/icons';
import { Avatar } from '@mantine/core';
import EditFields from '../../parts/EditFields';
import axios from 'axios';

const ProfileModal = createContext();

const useProfileModal = () => {
  return useContext(ProfileModal);
};

export function ProfileModalProvider({ children }) {
  const [file, setFile] = useState(null);
  const [opened, setOpened] = useState(true);
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState(user?.email);

  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [photo, setPhoto] = useState(user?.photo);
  const [bio, setBio] = useState(user?.bio);

  const [isDisabled, setIsDisabled] = useState(true);

  const upload = async () => {
    console.log('uploading', file);
    const toUpload = new FormData();

    toUpload.append('file', file);

    const { data } = await axios.post('/upload', toUpload, {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        // const percent = Math.floor((loaded * 100) / total);
      },
    });

    const updateUser = await axios.patch(`/user`, {
      photo: data.data,
    });

    setUser(updateUser.data.data);
  };

  useEffect(() => {
    file && upload();
  }, [file]);

  const value = {
    openProfileModal: () => {
      setOpened(!opened);
    },
  };

  return (
    <ProfileModal.Provider value={value}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text size='xl' weight={900}>
            Hello, {user?.name}
          </Text>
        }
        size='xl'
      >
        <Space h='md' />
        <Stack
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            justifyContent: 'space-evenly',
            padding: theme.spacing.md,
          })}
        >
          <div className='f ai-c'>
            <div className='photo'>
              <input
                className='file-picker'
                onChange={(e) => setFile(e.target.files[0])}
                id='photo'
                accept='.png, .jpeg'
                type='file'
              />

              <Avatar
                radius='xl'
                size='xl'
                src={user?.photo}
              />
            </div>

            <Textarea
              placeholder={bio || 'Please enter your bio'}
              label='Bio 😀'
              style={{
                flex: 1,
                marginLeft: '10px',
              }}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </div>
          <EditFields
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            icon={<IconAt />}
            placeholder={user?.email}
            label='email'
          />
          <EditFields
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            icon={<IconSignature />}
            placeholder={user?.name}
            label='name'
          />
          <EditFields
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            icon={<IconUser />}
            placeholder={user?.username}
            label='username'
          />
        </Stack>
      </Modal>
      {children}
    </ProfileModal.Provider>
  );
}

export default useProfileModal;
