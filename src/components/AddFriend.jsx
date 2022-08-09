import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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
} from '@mantine/core';
import { Input } from '@mantine/core';
import { IconUserSearch, IconPlus } from '@tabler/icons';
import { Avatar } from '@mantine/core';
import axios from 'axios';

function AddFriend({}, ref) {
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('looking for users');
    // * Debouncing the search

    axios
      .get(`/user/lookup?q=${search}`)
      .then((res) => {
        console.log('users', res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [search]);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setOpened(!opened);
    },
  }));

  const UserCard = ({ user }) => {
    // ! use datefns or momentjs to format date
    const date1 = new Date();
    const date2 = new Date(user.lastSeen);
    const diffTime = Math.abs(date2 - date1);

    const diffInMin = Math.ceil(diffTime / (1000 * 60));

    return (
      <Paper
        shadow='xs'
        p='lg'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Avatar
          radius='xl'
          size='xl'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
        />
        <Box>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Text size='xl' variant='gradient' weight={900}>
                {user.name}
              </Text>
              <Text size='xl' variant='gradient' weight={900}>
                {user.online ? 'online' : `${diffInMin} min`}
              </Text>
              <Text size='sm'>{user.email}</Text>
            </div>
            <Button radius='xl'>
              <IconPlus />
            </Button>
          </div>

          <div>
            <Text>
              {user.bio ||
                'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'}
            </Text>
          </div>
        </Box>
      </Paper>
    );
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text size='xl' weight={900}>
            Add friends to your family !
          </Text>
        }
        size='xl'
      >
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          icon={<IconUserSearch />}
          placeholder='You are looking for ?'
        />
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
          {users.map((user) => {
            return <UserCard user={user} />;
          })}
        </Stack>
      </Modal>
    </div>
  );
}

export default forwardRef(AddFriend);
