import React from 'react';
import { useState } from 'react';
import useAuth from '../../context/Auth.context';
import { TextInput, Container, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import logo from '../.././assets/images/hi5.png';
import  '../.././styles/pages/login.css';
import  '../.././styles/util.css';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <div className="s-main m-t-10">

   
   <div className='s-container f jc-c ai-c m-t-10'>
    <div className='s-content f-1'>
        <img src={logo} alt="logo" />
        <p>"First Chat App With Amazing Features, 
      Connect with people whome you want to"</p>
    </div>
    <div className='s f-2'>
    <Container
      style={{
        height: '40vh',
        width: '40vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
      }}
    >
      <Text size='xl' weight={700}  style={{
          marginBottom: '1rem',
          textAlign: 'center', }}>
        LOGIN HERE
      </Text>
      <TextInput
      style={{
  
        marginBottom: '1rem',
        
         }}

        placeholder='Email Address'
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextInput
        style={{
        marginBottom: '1rem',
      }}
        placeholder='Password'
        type='password'
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
      style={{
        height: '3rem',
        textAlign: 'center',
        border: '1px #FEFBF6 solid',
        
        paddingBlock: '0.5rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '1.3rem',
        
      }}
        variant='gradient'
        gradient={{ from: '#0fb219', to: 'rgba(200, 246, 196, 1)' }}
        onClick={handleLogin}
      >
        LOGIN
      </Button>
      <div className="f jc-b m-t-10 f-sm ai-c" > <p>Forget Password?</p>
      
      <Text
        style={{
         
          textAlign: 'center',
          border: '1px #FEFBF6 solid',
          paddingBlock: '0.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize:'12px',
          
        }}
        onClick={() => {
          navigate('/join');
        }}
      >
         <p>Not a Member? <a>JOIN NOW</a> </p>
       
        
      </Text>
      </div>
    </Container>
    </div>
   </div>
   </div>
  
  );
}
