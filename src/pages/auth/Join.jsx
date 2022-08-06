import React from 'react';
import { useState } from 'react';
import useAuth from '../../context/Auth.context';
import { useNavigate } from 'react-router-dom';
import { TextInput, Container, Text, Button, Checkbox } from '@mantine/core';
import logo from '../.././assets/images/hi5.png';
import  '../.././styles/pages/login.css';
import  '../.././styles/util.css';


export default function SingUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = async () => {
    signUp({
      email,
      name,
      phone,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="s-main m-t-10">

   
   <div className='s-container f jc-c ai-c m-t-10'>
    <div className='s-content f-1'>
        <img src={logo} alt="logo" />
        <p>"First Chat App With Amazing Features, 
      Connect with people whome you want to"</p>
    </div>
    <div className='sign f-2'>
    <Container className='f f-c ai-c jc-c container' style={{
        width: '40vw',
       
      }}>
      <Text size='xl' weight={700} >
        Join Us!
      </Text>
      <TextInput
        placeholder='Name'
        required
        onChange={(e) => {
          setName(e.target.value);
        }}
        className='m-t-10'
        style={{
          width: '100%',
        }}
      />
      <TextInput
        placeholder='Phone'
        type='tel'
        required
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        className='m-t-10'
        style={{
          width: '100%',
        }}
      />
      <TextInput
        placeholder='Email Address'
        type='email'
        required
        className='m-t-10'
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={{
          width: '100%',
        }}
      />
      <TextInput
        placeholder='Password'
        type='password'
        required
        className='m-t-10'
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={{
          width: '100%',
        }}
      />
      <TextInput
        placeholder='Password Confirm'
        type='password'
        required
        className='m-t-10'
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        style={{
          width: '100%',
        }}
      />

      <Button
   
        className='m-t-10'
        variant='gradient'
        gradient={{ from: '#0fb219', to: 'rgba(200, 246, 196, 1)' }}
        style={{
          width: '100%',
          height: '3rem',
          textAlign: 'center',
          border: '1px #FEFBF6 solid',
          
          paddingBlock: '0.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1.3rem',
          
        }}
        onClick={handleClick}
      >
        Sign Up
      </Button>
      <Text
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          border: '1px #FEFBF6 solid',
          paddingBlock: '0.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          
        }}
        onClick={() => {
          navigate('/');
        }}
      >
        <p>Already Registered? <a>  LOGIN NOW</a></p>
        
      </Text>
    </Container>
    </div>
   </div>
   </div>
  );
}
