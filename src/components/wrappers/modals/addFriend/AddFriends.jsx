import { useState, useEffect, useContext, createContext } from 'react';
import {
  Modal,
  Space,
  Paper,
  Text,
  Grid,
  ActionIcon,
  useMantineTheme,
  Indicator,
} from '@mantine/core';
import { Input } from '@mantine/core';
import { IconUserSearch, IconPlus, IconHexagonOff, IconX } from '@tabler/icons';
import { Avatar } from '@mantine/core';
import axios from 'axios';
import useAuth from '../../../../context/Auth.context';
import { showNotification } from '@mantine/notifications';
const AddFriendModalContext = createContext();

const useAddFriendModal = () => {
  return useContext(AddFriendModalContext);
};

const UserCard = ({ user: user_ }) => {
  const [user, setUser] = useState(user_);

  const theme = useMantineTheme();

  const { user: me, setUser: setMe } = useAuth();

  const date1 = new Date();
  const date2 = new Date(user.lastSeen);
  const diff = date1.getTime() - date2.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  const diffHours = Math.ceil(diff / (1000 * 3600));
  const diffMinutes = Math.ceil(diff / (1000 * 60));
  const diffSeconds = Math.ceil(diff / 1000);
  const diffMilliseconds = Math.ceil(diff);
  const lastSeen =
    diffDays > 0
      ? `${diffDays} days ago`
      : diffHours > 0
      ? `${diffHours} hours ago`
      : diffMinutes > 0
      ? `${diffMinutes} minutes ago`
      : diffSeconds > 0
      ? `${diffSeconds} seconds ago`
      : `${diffMilliseconds} milliseconds ago`;

  const request = async () => {
    console.log('here');
    try {
      const { data } = await axios.post(`/friend/${user._id}`);

      console.log('data', data);

      showNotification({
        title: 'Hey !',
        message: data.message,
      });

      setUser(data.data);
    } catch (e) {
      console.log(e);

      showNotification({
        title: 'Hey !',
        message: e.message,
      });
    }
  };

  const block = async () => {
    console.log('here');
    try {
      const { data } = await axios.post(`/friend/block/${user._id}`);

      console.log('data', data);

      showNotification({
        title: 'Hey !',
        message: data.message,
      });

      setMe(data.data);
    } catch (e) {
      console.log(e);

      showNotification({
        title: 'Hey !',
        message: e.message,
      });
    }
  };

  return (
    <Grid.Col span={3}>
      <Paper
        shadow='xl'
        withBorder
        p='md'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
          }}
        >
          {' '}
          {user?.online ? (
            <Indicator
              color='green'
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
              }}
              size='14px'
            />
          ) : null}
          <Avatar
            style={{
              borderColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors[theme.primaryColor][8],
              borderWidth: '2px',
              borderStyle: 'solid',
            }}
            radius='md'
            size='xl'
            src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
          />
        </div>

        <Space h='xs' />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            marginTop: '5px',

            width: '100%',

            justifyContent: 'space-evenly',
          }}
        >
          <Text size='md' weight={500}>
            {user.name}
          </Text>
          <Text size='xs'>{user.email}</Text>
          {/* <Text size='4px'>{lastSeen}</Text> */}
        </div>
        <Space h='xs' />
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',

            width: '100%',

            justifyContent: 'space-evenly',
          }}
        >
          {!user.requests.includes(me._id) ? (
            <ActionIcon
              onClick={request}
              size='lg'
              radius='xl'
              variant='subtle'
              color='primary'
            >
              <IconPlus size='xl' />
            </ActionIcon>
          ) : (
            <ActionIcon
              onClick={request}
              size='lg'
              radius='xl'
              variant='subtle'
              color='primary'
            >
              <IconX size='xl' />
            </ActionIcon>
          )}
          {!me.blocked.includes(user._id) ? (
            <ActionIcon
              color='red'
              onClick={block}
              size='lg'
              radius='xl'
              variant='filled'
            >
              <IconHexagonOff />
            </ActionIcon>
          ) : (
            <ActionIcon
              onClick={block}
              color='green'
              size='lg'
              radius='xl'
              variant='filled'
            >
              <IconHexagonOff />
            </ActionIcon>
          )}
        </div>
      </Paper>
    </Grid.Col>
  );
};

export function AddFriendModalProvider({ children }) {
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const theme = useMantineTheme();

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

  const handleAddFriendModal = () => {
    setOpened(true);
  };
  const value = {
    handleAddFriendModal,
    opened,
    setOpened,
  };

  return (
    <AddFriendModalContext.Provider value={value}>
      <Modal
        centered
        transition='slide-up'
        transitionDuration={300}
        transitionTimingFunction='ease'
        // fullScreen
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text size='xl' weight={900}>
            Add friends to your family !
          </Text>
        }
        size='xl'
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors[theme.primaryColor][3]
        }
        overlayOpacity={0.2}
        overlayBlur={3}
      >
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          icon={<IconUserSearch />}
          placeholder='You are looking for ?'
        />
        <Space h='md' />
        <Grid
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors[theme.primaryColor][1],
            borderRadius: theme.radius.md,
            justifyContent: 'space-evenly',
            padding: theme.spacing.md,
          })}
        >
          {users.map((user, i) => {
            return <UserCard key={i} user={user} />;
          })}
        </Grid>
      </Modal>
      {children}
    </AddFriendModalContext.Provider>
  );
}

export default useAddFriendModal;
