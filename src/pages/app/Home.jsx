import useAuth from '../../context/Auth.context';
import { Button } from '@mantine/core';
import useSocket from '../../context/Socket.context';
export default function Home() {
  
  const { logout, user } = useAuth();

  const { socket } = useSocket();


  console.log(user);

  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <Button onClick={logout}>Logout</Button>
      <Button
        onClick={() => {
          socket.emit('test', 'Hello from the client');
        }}
      >
        EMIT HELLO
      </Button>
    </div>
  );
}
