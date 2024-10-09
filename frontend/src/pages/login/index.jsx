import React, { useState } from "react";
import img from "../../assets/images/logo.jpeg";

import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  return (
    <div className="background-login">
      <div class="form-control">
        <div className="box-image">
          <img src={img} alt="logo" />
        </div>
        <form action="">
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
