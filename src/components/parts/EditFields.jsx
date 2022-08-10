import { useState, useEffect } from 'react';
import { ActionIcon } from '@mantine/core';
import { Input } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import axios from 'axios';
import useAuth from '../../context/Auth.context';

export function EditFields({ placeholder, value, onChange, icon, label }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const {  setUser } = useAuth();

  const update = async () => {
    try {
      const { data } = await axios.patch(`/user`, {
        [label]: value,
      });
      console.log(data.data);
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='f ai-c jc-b'>
      <Input
        style={{
          flex: 1,
        }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        icon={icon}
        disabled={isDisabled}
      />
      <ActionIcon
        style={{
          marginLeft: '10px',
        }}
        color='primary'
        variant={isDisabled ? 'filled' : 'outline'}
        onClick={() => {
          setIsDisabled(!isDisabled);
          !isDisabled && update();
        }}
      >
        <IconPencil size={16} />
      </ActionIcon>
    </div>
  );
}

export default EditFields;
