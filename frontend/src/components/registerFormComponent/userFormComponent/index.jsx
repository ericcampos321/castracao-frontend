import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../../api/index'
import { Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';



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
    <div className='container-user-form'>
            <form className='modal-user-form' action="" onSubmit={(e) => registerOurUpdate(e, props.operation)}>
                <div className="title-user-form">
                <Typography component={'span'} fontSize={22} fontWeight={'bold'} color={'#5b1c30'} >
                        {props.operation === 'register' ? "Formulario de Usuário" : null}
                        {props.operation === 'update' ? "Atualização de Usuário" : null}
                        {props.operation === 'view' ? "Visualização de Usuário" : null}
                    </Typography>
                    <Typography component={'span'} fontSize={16} >
                        {props.operation === 'register' ? "Preencha o formulário para adicionar um novo usuário" : null}
                        {props.operation === 'update' ? "Preencha o formulário para atualizar os dados do usuário" : null}
                        {props.operation === 'view' ? "Aqui você pode ver os dados do usuário" : null}
                    </Typography>
                </div>
                <div className="field-input">
                    <TextField onChange={(e) => setName(e.target.value)} label='Nome' type='text' size='small' value={name} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
                    <TextField onChange={(e) => setEmail(e.target.value)} label='Email' type='email' required={true} size='small' value={email} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" type="password" size='small' required={props.operation === 'update' ? false : true} disabled={props.operation === 'view' ? true : false} />
                </div>
                <div className="field-input">
        
                </div>
                {props.operation === 'register' || props.operation === 'update' ? (
                    <div className="button-fields-user">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} variant="contained">Cancelar</Button>
                        <Button type='submit' className='button-save' sx={{ width: '100px' }}> Salvar</Button>  
                    </div>
                ) : (
                    <div className="button-fields-user">
                        <Button onClick={props.onClose} className='button-cancel' sx={{ width: '150px' }} >Fechar</Button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default UserFormComponent;
