import React, { useState } from "react";
import img from "../../assets/images/logo.jpeg";
import { setStorage } from '../../services/localStorage';
import "./style.css";
import api from "../../api/index"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState('');
  const [msg, setMsg] = useState('');

  const login = async (e) => {
    e.preventDefault();
    const response = await api.post('/users/login', {
        email, password
    });

    if (response.data.status === 0) {
      setStatus('error');
      setMsg(response.data.msg);
  } else if (response.data.status === 1) {
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
              Enter Email
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
              Enter Password
            </label>
          </div>
          <div className="box-submit-login">
            <button class="submit-btn">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
