import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AppShell, MediaQuery, Burger, useMantineTheme, Box } from '@mantine/core';

import NavBar from '../../components/layout/nav/NavBar';
import Home from './Home';
import Chat from './Chat';

import AsideComponent from '../../components/layout/aside/AsideComponent';

export default function Index() {
  // const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

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
      navbar={<NavBar></NavBar>}
      aside={<AsideComponent />}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </AppShell>
  );
}
