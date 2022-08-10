import { useState, useContext, createContext } from 'react';
import useAuth from '../../../context/Auth.context';
import './Profile.css';
import { Modal, Stack, Space, Text, Textarea } from '@mantine/core';

import { IconAt, IconUser, IconSignature } from '@tabler/icons';

import EditFields from '../../parts/EditFields';
import EditPhoto from '../../parts/EditPhoto';


const ProfileModal = createContext();

const useProfileModal = () => {
  return useContext(ProfileModal);
};

export function ProfileModalProvider({ children }) {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email);

  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);

  const [bio, setBio] = useState(user?.bio);

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
            <EditPhoto />
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
