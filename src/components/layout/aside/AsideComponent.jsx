import {
  ActionIcon,
  Aside,
  MediaQuery,
  useMantineTheme,
  Box,
  Space,
  Title,
  Avatar,
} from '@mantine/core';
import UserMenu from '../menu/Menu';
import useAuth from '../../../context/Auth.context';

const Menu = () => {
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
  );
};

export default function AsideComponent() {
  const { user } = useAuth();
  return (
    <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
      <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            justifyContent: 'space-between',
            padding: theme.spacing.md,
            flex: 1,
          })}
        >
          <Title size='xl' weight={900}>
            Friend Request
          </Title>

          {}
        </Box>
        <Space h='md' />
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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
  );
}
