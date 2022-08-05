import React from 'react';
import { useState } from 'react';
import useAuth from '../../context/Auth.context';
import { TextInput, Container, Text, Button, Checkbox } from '@mantine/core';

export default function SingUp() {
  const { signUp } = useAuth();

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
    <Container className='f f-c ai-c jc-c container'>
      <Text size='xl' weight={700}>
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
        variant='gradient'
        className='m-t-10'
        gradient={{ from: 'indigo', to: 'cyan' }}
        onClick={handleClick}
      >
        Sign Up
      </Button>
    </Container>
  );
}
