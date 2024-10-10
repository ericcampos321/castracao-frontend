import React, { useState } from 'react';
import Header from "../../../components/headerComponent"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserFormComponent from '../../../components/userFormComponent';
import { Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import './style.css'




const Usuarios = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [operation, setOperation] = useState('');
  /*useEffect(() => {
  
  
  }, []);*/

  const openAdd = () => {
    setShowAdd(true);
    setOperation('register');  
  }

  return (
    <div>
      <Header />
      <div className='user-box'>
        <div className="box-link">
          <Link className='link' to="/admin"><Typography>Painel de Admin</Typography></Link>
          <ArrowForwardIosIcon style={{ color: 'rgba(0,0,0,0.5)' }} fontSize='small' />
          <Link className='link' to="/users"><Typography>Usuários</Typography></Link>
        </div>
        <div className="box-title">
          <Typography className='title' component='span' fontSize={25} >Registros de Usuários</Typography>
          <Typography className='title' component='span' fontSize={15} >Aqui você pode <Typography component='span' color='#751b1b'>consultar</Typography> e <Typography component='span' color='#751b1b'>adicionar</Typography> registro de usuários</Typography>
        </div>
        <div className="box-add1">
          <Button onCLick={()=> openAdd()}>Adicionar novo registro</Button>
        </div>
      </div>
    </div>
  )
}

export default Usuarios;