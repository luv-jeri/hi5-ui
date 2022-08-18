import useAuth from '../../context/Auth.context';

import { showNotification } from '@mantine/notifications';
import { Title, Avatar } from '@mantine/core';

import { useLocation } from 'react-router-dom';
export default function Chat() {
  const { state } = useLocation();
  const { friend } = state;

  return (
    <div>
      <Avatar
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
        radius='xl'
        size='md'
        src={friend.photo}
      />
      <Title> {friend.name}</Title>
    </div>
  );
}
