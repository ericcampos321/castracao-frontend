import img from "../../assets/images/logo.jpeg";
import React, { useState } from "react";
import { setStorage } from '../../services/localStorage';
import { Button, Typography, CircularProgress } from "@mui/material";
import { ShowAlert } from "../../components/showAlertComponent";
import "./style.css";
import api from "../../api/index"

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [alert, setAlert] = useState(false);
   const [status, setStatus] = useState('');
   const [msg, setMsg] = useState('');
   const [loading, setLoading] = useState(false);

   const getPassword = (password) => {
      setPassword(password);
   }

   const getEmail = (email) => {
      setEmail(email);
   }

   const login = async (e) => {
      e.preventDefault();
      const response = await api.post('/users/login', {
         email, password
      });

      if (response.data.status === 0) {
         setAlert(true);
         setLoading(true);
         setStatus('error');
         setMsg(response.data.msg);
         timerError();
      } else if (response.data.status === 1) {
         setLoading(true);
         setAlert(true);
         setStatus('success');
         setMsg(response.data.msg);
         timerSuccess();
         setStorage('token', response.data.token);
         setStorage('id', response.data.idUser);
         setStorage('auth', response.data.auth);
      }
   }

   const timerSuccess = () => {
      setTimeout(() => {
         setLoading(false);
         setAlert(false);
         window.location.href = '/home';
      }, 3000)
   }

   const timerError = () => {
      setTimeout(() => {
         setLoading(false);
         setAlert(false);
      }, 3000)
   }

   return (
      <div className="background-login">
         <div class="form-control">
            <div className="box-image">
               <img src={img} alt="logo" />
            </div>
            <div className="box-title-acessar">
               <Typography className="title-acessar" component={'span'} fontSize={25} color="#751b1b">Acesse sua conta</Typography><br />
               <Typography component={'span'} fontSize={15} color="#1009" fontWeight={500} >Informe seu usuário e senha para entrar no sistema.</Typography>
            </div>
            <form onSubmit={(e) => login(e)}>
               <div class="input-field">
                  <input required className="input" type="text" value={email} onChange={(e) => getEmail(e.target.value)} variant="outlined" />
                  <label class="label" for="input"> Usúario </label>
               </div>
               <div class="input-field">
                  <input required class="input" type="password" value={password} onChange={(e) => getPassword(e.target.value)} variant="outlined" />
                  <label class="label" for="input"> Senha </label>
               </div>
               <div className="box-submit-login">
                  <Button type='submit' class="submit-btn" sx={{ width: "200px" }} >{loading ? <CircularProgress color='inherit' size={28} /> : 'Entrar'}</Button>
               </div>
            </form>
            <div className="box-support">
               <Typography fontSize={13}>Suporte: +55 14 99127-0311 | oneclickengenhariadesoftware@gmail.com</Typography>
            </div>
         </div>
         {alert ? <ShowAlert status={status} msg={msg} /> : null}
      </div>
   );
};

export default Login;
