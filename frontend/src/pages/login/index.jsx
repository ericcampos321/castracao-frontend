import React, { useState } from "react";
import img from "../../assets/images/logo.jpeg";
import { setStorage } from '../../services/localStorage';
import { Button, Typography, CircularProgress } from "@mui/material";
import "./style.css";
import api from "../../api/index"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState('');
  const [ loading, setLoading ] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const response = await api.post('/users/login', {
        email, password
    });

    if (response.data.status === 0) {
      setStatus('error');
      setMsg(response.data.msg);
  } else if (response.data.status === 1) {
      setLoading(true);
      setStatus('success');
      setMsg(response.data.msg);
      setStorage('token', response.data.token);
      setStorage('id', response.data.idUser);
      setStorage('auth', response.data.auth);
  }

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';
    }
  };

  return (
    <div className="background-login">
      <div class="form-control">
        <div className="box-image">
          <img src={img} alt="logo" />
        </div>
        <div className="box-title-acessar">
          <Typography className="title-acessar" component={'span'} fontSize={25} color="#751b1b">Acesse sua conta</Typography><br/>
          <Typography component={'span'} fontSize={15} color="#1009" >Informe seu usuário e senha para entrar no sistema.</Typography>
        </div>
        <form onSubmit= {(e) => login(e)}>
          <div class="input-field">
            <input
              required
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label class="label" for="input">
              Usúario
            </label>
          </div>
          <div class="input-field">
            <input
              required
              class="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label class="label" for="input">
              Senha
            </label>
          </div>
          <div className="box-submit-login">
            <Button type='submit' class="submit-btn" sx={{ width: "200px" }} >{loading ? <CircularProgress color='secondary' size={28} /> : 'Entrar'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
