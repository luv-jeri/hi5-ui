import { Routes, Route } from 'react-router-dom';
import { Box } from '@mantine/core';
import { Menu, Button, Text } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconTrash,
  IconArrowsLeftRight,
  IconUserPlus,
} from '@tabler/icons';
import Home from './Home';
import AddFriend from '../../components/AddFriend';
import { useRef } from 'react';

export default function Index() {
  const addFriendRef = useRef();

  return (
    <div
      style={{
        width: '80%',
        margin: '0 auto',
      }}
    >
      <AddFriend ref={addFriendRef}></AddFriend>

      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
          },
        })}
      >
        {' '}
        <Button
          onClick={() => {
            addFriendRef.current.openModal();
          }}
        >
          <IconUserPlus size={14} />
        </Button>
        <Menu shadow='md' width={200} trigger='hover' openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Button>
              <IconSearch size={14} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label textAlign='left'>
              <Text size='md' align='left'>
                Application
              </Text>
            </Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>
              <Text size='md' align='left'>
                Settings
              </Text>
            </Menu.Item>
            <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size='lg' color='dimmed'>
                  ⌘K
                </Text>
              }
            >
              <Text size='md' align='left'>
                Search
              </Text>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>
              {' '}
              <Text size='md' align='left'>
                User
              </Text>
            </Menu.Label>
            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              <Text size='md' align='left'>
                Profile
              </Text>
            </Menu.Item>
            <Menu.Item color='red' icon={<IconTrash size={14} />}>
              <Text size='md' align='left'>
                Logout
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
      <Box>Side bar</Box>
      <Box>Chatting</Box>
      <Box>Details</Box>
    </div>
  );
}

{
  /* <Routes>
  <Route path='/' element={<Home />} />
</Routes>; */
}
