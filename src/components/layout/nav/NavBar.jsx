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
  Title,
  Tabs,
} from '@mantine/core';
import { IconBrandMessenger, IconBell } from '@tabler/icons';
import Messages from '../../parts/messages/Messages';
import Friends from '../../parts/friends/Friends';

export default function NavBar() {
  return (
    <Navbar p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          borderRadius: theme.radius.md,
          justifyContent: 'space-between',
          padding: theme.spacing.md,
          display: 'flex',
          height: '100%',
          alignItems: 'center',
        })}
      >
        <Tabs
          defaultValue='friends'
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          }}
        >
          <Tabs.Panel style={{ flex: 1 }} value='messages' pt='xs'>
            <Messages />
          </Tabs.Panel>

          <Tabs.Panel style={{ flex: 1 }} value='friends' pt='xs'>
            <Friends />
          </Tabs.Panel>

          <Tabs.List
            style={{
              width: '100%',

              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Tabs.Tab value='messages' icon={<IconBrandMessenger size={14} />}>
              Messages
            </Tabs.Tab>

            <Tabs.Tab value='friends' icon={<IconBell size={14} />}>
              Notification
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Box>
    </Navbar>
  );
}
