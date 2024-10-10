import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../services/api';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

const UserFormComponent = (props) => {
  const [name, setName] = useState(props.name || '');
  const [email, setEmail] = useState(props.email || '');
  const [password, setPassword] = useState(props.password || '');
  const [permissions, setPermissions] = useState(props.permissions || '');
  const [name_permission, setName_permission] = useState('');
  const [statusPromise, setStatusPromise] = useState(true);

  useEffect(() => {
    if (props.name) setName(props.name);
    if (props.email) setEmail(props.email);
    if (props.password) setPassword(props.password);
    if (props.permissions) setPermissions(props.permissions);
  }, [props.name, props.email, props.id, props.operation, props.password, props.permissions]);


  const registerOurUpdate = async (e, operation) => {
    try {
      e.preventDefault();
      let result;

      if (operation === 'register') {
        result = await api.post('/userInsert', {
          name: name,
          email: email,
          password: password,
          permissions: name_permission
        });
      }

      if (operation === 'update') {
        result = await api.put(`/userUpdate/${props.id}`, {
          name: name,
          email: email,
          password: password,
          permissions: name_permission
        });
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      
    </div>
    )
}

