import React, { useState, useEffect } from 'react';
import Header from "../../../components/headerComponent"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import { TableUsersComponent } from '../../../components/tableComponents/tableUsersComponent';
import { Typography, Button, Box } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import api from '../../../api/index'
import { Link } from "react-router-dom"
import UserFormComponent from '../../../components/registerFormComponent/userFormComponent/index';
import './style.css'



const Usuarios = () => {

  const [showAdd, setShowAdd] = useState(false);
  const [operation, setOperation] = useState('');
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPagination] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [ msg, setMsg ] = useState('');
  const [filterUser, setFilterUser] = useState(Object);
  const [totalPageLastClick, setTotalPageLastClick] = useState(0);
  const [disableButtonNext, setDisableButtonNext] = useState(false);
  const [disableButtonBack, setDisableButtonBack] = useState(false);

  
  
 useEffect(() => {
    getUsers(filterUser, currentPage);
    const pagesNumbers = Math.ceil(totalUsers / 5);
    if (pagesNumbers - 1 === totalPageLastClick) setDisableButtonNext(true);
    if (totalPageLastClick === 0) setDisableButtonBack(true);
}, [filterUser, currentPage, totalPageLastClick, totalUsers]);

  const getUsers = async (filter, currentPage) => {
    try {
      const { data } = await api.post(`/users/userList/${currentPage}/${5}`,{
        filter
      });

      switch (data.status) {
        case 1:
          setUsers(data.data);
          setTotalUsers(data.total);
          setColumns(data.columns);
          break;
        case 0:
          setUsers([]);
          setMsg(data.msg);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const applyFilter = async (e) => {
    if (e) e.preventDefault();
    setFilterUser({
      name: nameFilter,
      email: emailFilter
    });
  };

  const nextPagination = async () => {
    setTotalPageLastClick(totalPageLastClick + 1);
    setCurrentPagination(currentPage + 5);
    await getUsers(filterUser, currentPage);
    setDisableButtonBack(false);
}

const backPagination = async () => {
    setTotalPageLastClick(totalPageLastClick - 1);
    setCurrentPagination(currentPage - 5);
    await getUsers(filterUser, currentPage);
    setDisableButtonNext(false)
}

  const openAdd = () => {
    setShowAdd(true);
    setOperation('register');  
  }

  const closeModal = () => {
    setShowAdd(false);
}

  return (
    <Box>
      <Header />
      <div>
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
        <div className="box-add">
          <Button className='button-add' onClick={()=> openAdd()}>Adicionar novo registro</Button>
        </div>

        <div className='box-filter' >
          <div className='filter-box'>
            <TextField value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className='filter' label="Nome" size='small' />
            <TextField value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} className='filter' id="outlined-basic" label="Email" size='small'/>
            <Button onClick={() => applyFilter()}>Filtrar <SearchIcon /></Button>
          </div>
        </div>
        {showAdd ? <UserFormComponent operation={operation} onClose={closeModal} /> : null }


        {users.length >= 1 ? ( 

         <>
           <TableUsersComponent data={users} columns={columns} />
              <div className="table-users-pagination">
                <div className="table-users-quantity">
               <Typography component={'span'} fontFamily={'sans-serif'}>Qtd: {totalUsers}</Typography>
              </div>
           <div className="table-users-button">
             <button className={disableButtonBack ? 'button-pagination-user-disabled' : 'button-pagination-user'} disabled={disableButtonBack} onClick={() => backPagination()} ></button>
             <button className={disableButtonNext ? 'button-pagination-user-disabled' : 'button-pagination-user'} disabled={disableButtonNext} onClick={() => nextPagination()}></button>
             </div>
              </div>
          </>
    
    ) : (
      <Typography>{msg}</Typography>
    )}
      </div>
    </div>
    </Box>
  )
};

export default Usuarios;