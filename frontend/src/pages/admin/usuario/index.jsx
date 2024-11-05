import React, { useState, useEffect } from "react";
import Header from "../../../components/headerComponent";
import LoadingComponentBanco from "../../../components/loadingComponentBanco";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TextField from "@mui/material/TextField";
import { TableUsersComponent } from "../../../components/tableComponents/tableUsersComponent";
import { Typography, Button, Box, MenuItem} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../../api/index";
import { Link } from "react-router-dom";
import UserFormComponent from "../../../components/registerFormComponent/userFormComponent/index";
import "./style.css";

const Usuarios = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [operation, setOperation] = useState("");
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPagination] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [msg, setMsg] = useState("");
  const [filterUser, setFilterUser] = useState(Object);
  const [totalPageLastClick, setTotalPageLastClick] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsList, setRowsList] = useState([
    {
      value: 10,
      label: "10",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 250,
      label: "250",
    },
  ]);

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getUsers(filterUser, currentPage, limit);
  }, [filterUser, currentPage, limit, totalPageLastClick, totalUsers]);

  const getUsers = async (filter, currentPage, limit) => {
    try {
      const { data } = await api.post(
        `/users/userList/${currentPage}/${limit}`,
        {
          filter,
        }
      );

      switch (data.status) {
        case 1:
          timer();
          setUsers(data.data);
          setTotalUsers(data.totalFilter >= 1 ? data.totalFilter : data.total);
          setColumns(data.columns);
          setLoading(true);
          break;
        case 0:
          timer();
          setUsers([]);
          setMsg(data.msg);
          setLoading(true);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilter = async (e) => {
    if (e) e.preventDefault();
    setFilterUser({
      name: nameFilter,
      email: emailFilter,
    });
  };
  const openAdd = () => {
    setShowAdd(true);
    setOperation("register");
  };

  const closeModal = () => {
    setShowAdd(false);
  };


  const timer = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleChangeRow = (options) => {
    setLimit(options.value);
    getUsers(filterUser, currentPage, options.value);
  };

  return (
    <Box>
      <Header />
      <div>
        <div className="user-box">
          <div className="box-link">
            <Link className="link" to="/admin">
              <Typography>Painel de Admin</Typography>
            </Link>
            <ArrowForwardIosIcon
              style={{ color: "rgba(0,0,0,0.5)" }}
              fontSize="small"
            />
            <Link className="link" to="/users">
              <Typography>Usuários</Typography>
            </Link>
          </div>
          <div className="box-title">
            <Typography className="title" component="span" fontSize={25}>
              Registros de Usuários
            </Typography>
            <Typography className="title" component="span" fontSize={15}>
              Aqui você pode{" "}
              <Typography component="span" color="#751b1b">
                consultar
              </Typography>{" "}
              e{" "}
              <Typography component="span" color="#751b1b">
                adicionar
              </Typography>{" "}
              registro de usuários
            </Typography>
          </div>
          <div className="box-add">
            <Button className="button-add" onClick={() => openAdd()}>
              Adicionar novo registro
            </Button>
          </div>

          <div className="box-filter">
            <form
              className="filter-box"
              action=""
              onSubmit={(e) => applyFilter(e)}
            >
              <TextField
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="filter"
                label="Nome"
                size="small"
              />
              <TextField
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="filter"
                id="outlined-basic"
                label="Email"
                size="small"
              />
              <Button onClick={() => applyFilter()}>
                Filtrar <SearchIcon />
              </Button>
            </form>
          </div>
          {showAdd ? (
            <UserFormComponent operation={operation} onClose={closeModal} />
          ) : null}

          {users.length >= 1 ? (
            <>
              {loading ? (
                <div className="loading">
                  <LoadingComponentBanco />
                </div>
              ) : (
                <>
                  <TableUsersComponent data={users} columns={columns} />
                  <div className="table-users-pagination">
                    <div className="table-users-quantity">
                      <Typography component={"span"} fontFamily={"sans-serif"}>
                        Total: {totalUsers}
                      </Typography>
                      <TextField
                        sx={{ width: "100px" }}
                        select
                        size="small"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        label="Qtd linhas"
                        color="primary"
                        id="outlined-basic"
                      >
                        {rowsList.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            onClick={() => handleChangeRow(option)}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </>
              )
              }
            </>
          ) : (
            <Typography>{msg}</Typography>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Usuarios;
