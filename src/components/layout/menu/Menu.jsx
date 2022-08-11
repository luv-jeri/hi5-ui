import { Menu, Text } from '@mantine/core';
import { IconSettings, IconSearch, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import useAuth from '../../../context/Auth.context';
import useProfileModal from '../../wrappers/modals/profile/Profile';

export default function UserMenu({ children }) {
  const { logout } = useAuth();
    const { openProfileModal } = useProfileModal();
  return (
    <Menu
      styles={{
        zIndex: '100',
      }}
      shadow='md'
      width={200}
      trigger='hover'
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>{children}</Menu.Target>
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
          <Text size='md' align='left'>
            User
          </Text>
        </Menu.Label>
        <Menu.Item onClick={openProfileModal} icon={<IconArrowsLeftRight size={14} />}>
          <Text size='md' align='left'>
            Profile
          </Text>
        </Menu.Item>
        <Menu.Item color='red' icon={<IconTrash size={14} />}>
          <Text
            size='md'
            align='left'
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
