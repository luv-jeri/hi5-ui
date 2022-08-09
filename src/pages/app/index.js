import { Routes, Route } from 'react-router-dom';
import { Box, Input } from '@mantine/core';
import { Menu, Button, Text } from '@mantine/core';

import { useRef, useState, useEffect } from 'react';
import {
  ActionIcon,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
  Image,
} from '@mantine/core';
import AddFriend from '../../components/AddFriend';
import UserMenu from '../../components/layout/menu/Menu';
import { Avatar } from '@mantine/core';
import useAuth from '../../context/Auth.context';
import Home from './Home';
import { IconSearch } from '@tabler/icons';
export default function Index() {
  const addFriendRef = useRef();

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  console.log(theme);

  const { user } = useAuth();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          height={60}
          p='md'
        >
          <Button
            style={{
              width: '250px',
            }}
            onClick={() => {
              addFriendRef.current.openModal();
            }}
            radius='xl'
            leftIcon={<IconSearch />}
          >
            <Text size='md'>Find</Text>
          </Button>

          <UserMenu>
            <ActionIcon
              style={{
                marginRight: '10px',
              }}
            >
              <Avatar
                radius='xl'
                size='md'
                src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
              />
            </ActionIcon>
          </UserMenu>
        </Footer>
      }
      header={
        <Header height={70} p='md'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Image
                radius='md'
                src='/hi5.png'
                height={30}
                width={30}
                style={{
                  filter: 'invert(100%)',
                }}
                alt='Random unsplash image'
              />
              <Text
                size='xl'
                weight={800}
                variant='text'
                style={{
                  marginLeft: '10px',
                }}
              >
                Hi5, {user?.name}
              </Text>
            </Box>
          </div>
        </Header>
      }
    >
      <AddFriend ref={addFriendRef}></AddFriend>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </AppShell>
  );
}
