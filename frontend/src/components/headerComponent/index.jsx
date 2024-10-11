import * as React from "react";
import "./style.css";
import img from "../../assets/images/logo.webp";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import Box from '@mui/material/Box';
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Header = () => {
  return (
    <Box>
      <AppBar className="app-bar">
        <Toolbar className="nav-bar">
          <div className="box-logo">
            <img src={img} alt="logo" />
          </div>
        </Toolbar>
      </AppBar>
      <div className="submenu">
        <nav>
          <ul>
            <Link to="/home">
            <li>
              <span className="icon-menu"><HomeRoundedIcon fontSize="small" /></span>
              <span className="text-menu">Dashboard</span>
            </li>
            </Link>
            <li>
              <span className="icon-menu"><EventAvailableIcon fontSize="small" /></span>
              <span className="text-menu">Agendamentos</span>
            </li>
            <li>
              <span className="icon-menu"><FormatListBulletedIcon fontSize="small"  /></span>
              <span className="text-menu">Castrações</span>
            </li>
            <Link to="/admin">
            <li>
              <span className="icon-menu"><PersonIcon fontSize="small"  /></span>
              <span className="text-menu">Admin</span>
            </li>
            </Link>
          </ul>
        </nav>
      </div>
    </Box>
  );
};

export default Header;
