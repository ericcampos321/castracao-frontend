import * as React from "react";
import "./style.css";
import img from "../../assets/images/logo.jpeg";
import { AppBar, Toolbar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const Header = () => {
  return (
    <box>
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
            <li>
              <HomeRoundedIcon fontSize="small"  /> Dashboard
            </li>
            <li>
              <FormatListBulletedIcon fontSize="small" /> Castrações
            </li>
            <li>
              <PersonIcon fontSize="small" /> Admin
            </li>
          </ul>
        </nav>
      </div>
    </box>
  );
};

export default Header;
