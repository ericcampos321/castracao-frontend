import React, { useEffect, useState } from "react";
import "./style.css";
import api from "../../../api/index";
import { ShowAlert } from "../../showAlertComponent";
import { CircularProgress } from "@mui/material";
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Typography } from "@mui/material";

const UserFormComponent = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [name_permission, setNamePermission] = useState("");
  const [statusPromise, setStatusPromise] = useState(true);
  const [msg, setMsg] = useState('');
  const [statusAlert, setStatusAlert] = useState('');



  useEffect(() => {
    const getPermission = async () => {
      try {
        const res = await api.get("/users/permissionGet");
        if (res.data.status === 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            setPermissions(res.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  }, [props.operation, props.id]);

  const registerOurUpdate = async (e, operation) => {
    try {
      e.preventDefault();
      let result;

      if (operation === "register") {
        result = await api.post("/users/register", {
          name: name,
          email: email,
          password: password,
          permissions: name_permission,
        });
      }

      if (operation === "update") {
        result = await api.patch(`/users/update/${props.id}`, {
          name: name,
          email: email,
          password: password,
          permissions: name_permission,
        });
      }

      if (result.data) {
        switch (result.data.status) {
          case 1:
            setLoading(true);
            setStatusPromise(true);
            setMsg(result.data.msg);
            setStatusAlert('success');
            timerUpdate();
            break;
          case 0:
            setLoading(true);
            setStatusPromise(true);
            setMsg(result.data.msg);
            setStatusAlert('error');
            timer();
            break;
          default:
        }
      }


    } catch (err) {
      console.log(err);
    }
  };

  const changePermissionUser = async (e) => {
    try {
      setNamePermission(e);
    } catch (err) {
      console.log(err);
    }
  };

  const timer = () => {
    setTimeout(() => {
      setStatusPromise(false);
      setLoading(false);
    }, 1200)
  }

  const timerUpdate = () => {
    setTimeout(() => {
      setLoading(false);
      setStatusPromise(false);
      window.location.href = '/users';
      props.onClose();
    }, 1400)
  }

  return (
    <div className="container-user-form">
      <form
        className="modal-user-form"
        action=""
        onSubmit={(e) => registerOurUpdate(e, props.operation)}
      >
        <div className="title-user-form">
          <Typography component={"span"} ontSize={22} fontWeight={"bold"} color={"#5b1c30"} >
            {props.operation === "register" ? "Formulario de Usuário" : null}
            {props.operation === "update" ? "Atualização de Usuário" : null}
            {props.operation === "view" ? "Visualização de Usuário" : null}
          </Typography>
          <Typography component={"span"} fontSize={16}>
            {props.operation === "register" ? "Preencha o formulário para adicionar um novo usuário" : null}
            {props.operation === "update" ? "Preencha o formulário para atualizar os dados do usuário" : null}
            {props.operation === "view" ? "Aqui você pode ver os dados do usuário" : null}
          </Typography>
        </div>

        <div className="field-input">
          <TextField onChange={(e) => setName(e.target.value)} style={{ width: "320px" }} label="Nome" type="text" size="small" value={name} disabled={props.operation === "view" ? true : false} />
        </div>
        <div className="field-input">
          <TextField onChange={(e) => setEmail(e.target.value)} style={{ width: "320px" }} label="Email" type="email" required={true} size="small" value={email} disabled={props.operation === "view" ? true : false} />
        </div>
        <div className="field-input">
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "320px" }} label="Password" variant="outlined" type="password" size="small" required={props.operation === "update" ? false : true} disabled={props.operation === "view" ? true : false} />
        </div>

        <div className="field-input">
          <FormControl>
            <InputLabel required>Permissão</InputLabel>
            <Select value={name_permission} label="Permissão" onChange={(e) => { changePermissionUser(e.target.value); }} style={{ width: "320px" }} size="small" defaultValue="" required disabled={props.operation === "view" ? true : false} >
              {permissions.length >= 1 ? permissions.map((per) => (<MenuItem key={per._id} value={per._id}>{per.name_permission}</MenuItem>)) : null}
            </Select>
          </FormControl>
        </div>

        {props.operation === "register" || props.operation === "update" ? (

          <div className="button-fields-user">
            <Button onClick={props.onClose} className="button-cancel" sx={{ width: "100px" }} variant="contained" > Cancelar </Button>
            <Button type="submit" className="button-save" sx={{ width: "100px" }} >{loading ? <CircularProgress color="inherit" size={20} /> : "Salvar"} </Button>
          </div>

        ) : (

          <div className="button-fields-user">
            <Button onClick={props.onClose} className="button-cancel" sx={{ width: "150px" }} > Fechar </Button>
          </div>
        )}
      </form>
      {statusPromise ? <ShowAlert status={statusAlert} msg={msg} /> : null}
    </div>
  );
};

export default UserFormComponent;
