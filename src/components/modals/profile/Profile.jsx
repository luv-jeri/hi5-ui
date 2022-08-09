import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Modal,
  Button,
  Group,
  Box,
  Stack,
  Space,
  Paper,
  Text,
  Image,
} from '@mantine/core';
import { Input } from '@mantine/core';
import { IconUserSearch, IconPlus } from '@tabler/icons';
import { Avatar } from '@mantine/core';
import axios from 'axios';

function Profile({}, ref) {
  const [opened, setOpened] = useState(true);
  const [users, setUsers] = useState([]);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setOpened(!opened);
    },
  }));

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text size='xl' weight={900}>
            Add friends to your family !
          </Text>
        }
        size='xl'
      >
        <Space h='md' />
        <Stack
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            justifyContent: 'space-evenly',
            padding: theme.spacing.md,
          })}
        ></Stack>
      </Modal>
    </div>
  );
}

export default forwardRef(Profile);
