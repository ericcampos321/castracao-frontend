import api from "../../api";
import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { ShowAlert } from "../../components/showAlertComponent";
import { CircularProgress } from "@mui/material";
import './style.css';

const DeleteConfirmComponent = (props) => {
  const [statusPromise, setStatusPromise] = useState(true);
  const [msg, setMsg] = useState('');
  const [statusAlert, setStatusAlert] = useState('');
  const [loading, setLoading] = useState(false);


  const deleteRegister = async () => {
    let operationPromise;

    switch (props.operation) {
      case 'user':
        operationPromise = await api.delete(`/users/userDelete/${props.id}`);
        if (operationPromise.data && operationPromise.data.status === 1) {
          setMsg(operationPromise.data.msg);
          setStatusPromise(true);
          setLoading(true);
          setStatusAlert('success');
          timer();
        } else {
          setMsg(operationPromise.data.msg);
          setStatusPromise(true);
          setStatusAlert('error');
        }
        break;
      default:
        break;
    }
  }

  const timer = () => {
    setTimeout(() => {
      setLoading(false)
      setStatusPromise(false);
      if (props.operation === 'user') {
        window.location.href = '/users';
      }
    }, 1000)
  }


  return (
    <Box>
      <div class="card">
        <div class="header">
          <div class="image"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg></div>
          <div class="content">
            <Typography fontSize={24} fontWeight={'bold'}>Deletar registro</Typography>
          </div>
          <div className="msg-delete">
            <Typography fontSize={18} >{props.msg}</Typography>
          </div>
          <div class="actions">
            <Button class="desactivate" type="button" onClick={() => deleteRegister()}>{loading ? <CircularProgress color="inherit" size={20} /> : 'Confirmar'}</Button>
            <Button class="cancel" type="button" onClick={props.onClose}>Cancelar</Button>
          </div>
        </div>
        {statusPromise ? <ShowAlert status={statusAlert} msg={msg} /> : null}
      </div>
    </Box>

  )

}


export default DeleteConfirmComponent;