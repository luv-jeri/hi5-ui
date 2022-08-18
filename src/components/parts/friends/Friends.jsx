import React from 'react';
import useRequest from '../../../context/Request.context';
import { useNavigate } from 'react-router-dom';
import { Accordion } from '@mantine/core';
import {
  ActionIcon,
  useMantineTheme,
  Box,
  Space,
  Title,
  Avatar,
  Text,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import useFriend from '../../../context/Friends.context';

const accept = async (id) => {
  const { data } = await axios.get(`/friend/accept/${id}`);
  console.log('data', data);
};

const FriendCard = ({ friend_details, setter }) => {
  const mainTheme = useMantineTheme();
  const { name, photo, _id, email } = friend_details;
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors[mainTheme.primaryColor][3],
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: theme.spacing.sm,
        flex: 1,
      })}
    >
      <Avatar
        style={{
          borderColor:
            mainTheme.colorScheme === 'dark'
              ? mainTheme.colors.dark[8]
              : mainTheme.colors[mainTheme.primaryColor][8],
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
        radius='xl'
        size='md'
        src={photo}
      />
      <div
        style={{
          marginLeft: mainTheme.spacing.md,
        }}
      >
        <Title order={5}>{name}</Title>
      </div>
      <ActionIcon
        size='xl'
        radius='xl'
        onClick={async () => {
          try {
            showNotification({
              title: 'Hey !',
              message: 'Accepted friend request',
            });
            setter((list) => {
              return list.filter((item) => item._id !== _id);
            });
            await accept(_id);
          } catch (e) {
            console.log(e);
            setter((list) => {
              return [...list, friend_details];
            });
            showNotification({
              title: 'Hey !',
              message: e.message,
            });
          }
        }}
      >
        <IconCircleCheck size='xl' radius='xl' />
      </ActionIcon>
    </Box>
  );
};

export default function Friends() {
  const { requests, setRequests } = useRequest();
  const { friends } = useFriend();
  const navigate = useNavigate();

  return (
    <Accordion
      variant='separated'
      radius='md'
      chevronPosition='left'
      defaultValue='friends'
    >
      <Accordion.Item value='request'>
        <Accordion.Control>Request</Accordion.Control>
        <Accordion.Panel>
          {requests.map((el) => {
            return <FriendCard friend_details={el} setter={setRequests}></FriendCard>;
          })}
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='friends'>
        <Accordion.Control>Friends</Accordion.Control>
        <Accordion.Panel>
          {friends.map((el) => {
            return (
              <div
                onClick={() => {
                  navigate(`/chat`, {
                    state: {
                      friend: el,
                    },
                  });
                }}
              >
                <FriendCard friend_details={el} setter={setRequests}></FriendCard>
              </div>
            );
          })}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
