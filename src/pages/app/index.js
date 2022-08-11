import { Routes, Route } from 'react-router-dom';
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
  Text,
  Box,
  Space,
} from '@mantine/core';
import UserMenu from '../../components/layout/menu/Menu';
import { Avatar, Title } from '@mantine/core';
import useAuth from '../../context/Auth.context';

import Home from './Home';

const Menu = () => {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  const { user } = useAuth();
  return (
    <UserMenu>
      <ActionIcon
        style={{
          marginRight: '10px',
        }}
      >
        <Avatar
          style={{
            borderWidth: '3px',
            borderColor: theme.colors[theme.primaryColor][5],
            borderStyle: 'solid',
          }}
          radius='xl'
          size='md'
          src={user?.photo}
        />
      </ActionIcon>
    </UserMenu>
    // <div
    //   style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //   }}
    //   height={60}
    //   p='md'
    //   sx={{
    //     background:
    //       theme.colorScheme === 'dark'
    //         ? theme.colors.dark[7]
    //         : theme.colors[theme.primaryColor][0],
    //   }}
    // >
    //   <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
    //     <Burger
    //       opened={opened}
    //       onClick={() => setOpened((o) => !o)}
    //       size='sm'
    //       color={theme.colors.gray[6]}
    //       mr='xl'
    //     />
    //   </MediaQuery>

    // </div>
  );
};

export default function Index() {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

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
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
                borderRadius: theme.radius.md,
                justifyContent: 'space-between',
                padding: theme.spacing.md,
                flex: 1,
              })}
            >
              Dataroom
            </Box>
            <Space h='md' />
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
                borderRadius: theme.radius.md,
                justifyContent: 'space-between',
                padding: theme.spacing.md,
                display: 'flex',
              })}
            >
              <Title order={4}> Hi5 👋🏻 {user?.name} </Title> <Menu />
            </Box>
          </Aside>
        </MediaQuery>
      }
      footer={
        <MediaQuery
          smallerThan='md'
          styles={{
            display: 'none',
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors[theme.primaryColor][3],
          }}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 40,
              zIndex: 10000,

              borderTopLeftRadius: theme.radius.md,
              borderTopRightRadius: theme.radius.md,
              padding: theme.spacing.md,
              flex: 1,
            }}
            p='md'
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors[theme.primaryColor][9]}
                mr='xl'
              />
            </MediaQuery>

          
          </Box>
        </MediaQuery>
      }
    >
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </AppShell>
  );
}
