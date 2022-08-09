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
import { useRef } from 'react';
import { AppShell, Navbar, Header } from '@mantine/core';

export default function Index() {
  const addFriendRef = useRef();

  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar width={{ base: 300 }} height={500} p='xs'>
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p='xs'>
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
    </AppShell>
  );
}
