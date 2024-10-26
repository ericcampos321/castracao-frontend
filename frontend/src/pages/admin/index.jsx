import React from "react";
import Header from "../../components/headerComponent";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './style.css'



const Admin = ({ children }) => {
  return (

    <Box>
      <div>
      <Header />
      <div className="container-admin">
        <div className="title-admin">
          <Typography component={'span'} fontSize={25} >Painel de Admin</Typography>
        </div>
        <div className="box-title-link">
          <div className="box-title-menu">
            <Typography component={'span'} fontSize={18} >Cadastros</Typography>
          </div>
          <ul>
            <Link className='link' to='/users'><li>  <Typography component={'span'} fontSize={14}>Usuários</Typography></li></Link>
          </ul>
        </div>
        <div className="box-title-link">
          <div className="box-title-menu">
            <Typography component={'span'} fontSize={18} >Configurações</Typography>
          </div>
          <ul>
            <Link className='link' to='/admin/perfil'><li>  <Typography component={'span'} fontSize={14}>Perfil</Typography></li></Link>
            <Link className='link' to='/admin/permission'><li> <Typography component={'span'} fontSize={14}>Permissões</Typography></li></Link>
          </ul>
        </div>
      </div>
    </div >

    </Box>
    
  )
}

export default Admin;
