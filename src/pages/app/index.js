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
  ColorSwatch,
  Group,
} from '@mantine/core';
import AddFriend from '../../components/AddFriend';
import UserMenu from '../../components/layout/menu/Menu';
import { Avatar } from '@mantine/core';
import useAuth from '../../context/Auth.context';
import { useToggle } from '@mantine/hooks';
import useTheme from '../../components/wrappers/config/Theme';
import Home from './Home';
import { IconSearch } from '@tabler/icons';
export default function Index() {
  const addFriendRef = useRef();
  const [value, toggle] = useToggle(['dark', 'light']);
  const { updateTheme } = useTheme();

  useEffect(() => {
    updateTheme('colorScheme', value);
  }, [value]);

  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();
  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      style={{
        cursor: 'pointer',
      }}
      key={color}
      color={theme.colors[color][6]}
      onClick={() => {
        console.log(color);
        updateTheme('primaryColor', color);

        // setOpened(false);
      }}
    />
  ));

  const { user } = useAuth();

  return (
    <AppShell
      padding='xl'
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors[theme.primaryColor][0],
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
          sx={{
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors[theme.primaryColor][0],
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
          <Button color={value} onClick={() => toggle()}>
            {value}
          </Button>
          <ActionIcon
            onClick={() => {
              addFriendRef.current.openModal();
            }}
          >
            <IconSearch
              style={{
                width: '250px',
              }}
              radius='xl'
              leftIcon={<IconSearch />}
            />
          </ActionIcon>

          <UserMenu>
            <ActionIcon
              style={{
                marginRight: '10px',
              }}
            >
              <Avatar radius='xl' size='md' src={user?.photo} />
            </ActionIcon>
          </UserMenu>
        </Footer>
      }
      // header={
      //   <Header
      //     height={20}
      //     style={{
      //       display: 'flex',
      //       alignItems: 'center',
      //       justifyContent: 'space-between',
      //     }}
      //     p='md'
      //   ></Header>
      // }
    >
      <AddFriend ref={addFriendRef}></AddFriend>
      <Group position='center' spacing='xs'>
        {swatches}
      </Group>
      {/* <Routes>
        <Route path='/' element={<Home />} />
      </Routes> */}
    </AppShell>
  );
}
