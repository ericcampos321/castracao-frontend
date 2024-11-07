import * as React from "react";
import { useState } from "react";
import "./style.css";
import img from "../../assets/images/logo.webp";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Avatar from "@mui/material/Avatar";






const Header = () => {
   const [showMenuMobile, setShowMenuMobile] = useState(false);


   const toggleShowMenu = () => {
      showMenuMobile ? setShowMenuMobile(false) : setShowMenuMobile(true);
   };

   return (
      <Box>
         <AppBar className="app-bar">
            <Toolbar className="nav-bar">
               <div className="box-logo">
                  <img src={img} alt="logo" />
               </div>
               <Avatar src="/broken-image.jpg" style={{ width: 40, height: 40, cursor: "pointer" }} />
            </Toolbar>
         </AppBar>
         <div className="submenu">
            <nav>
               <ul>
                  <Link to="/home">
                     <li>
                        <span className="icon-menu">
                           <HomeRoundedIcon fontSize="small" />
                        </span>
                        <span className="text-menu">Dashboard</span>
                     </li>
                  </Link>
                  <li>
                     <span className="icon-menu">
                        <EventAvailableIcon fontSize="small" />
                     </span>
                     <span className="text-menu">Agendamentos</span>
                  </li>
                  <li>
                     <span className="icon-menu">
                        <FormatListBulletedIcon fontSize="small" />
                     </span>
                     <span className="text-menu">Castrações</span>
                  </li>
                  <Link to="/admin">
                     <li>
                        <span className="icon-menu">
                           <PersonIcon fontSize="small" />
                        </span>
                        <span className="text-menu">Admin</span>
                     </li>
                  </Link>
               </ul>
            </nav>
         </div>

         <div className="open-menu-mobile">
            <MenuIcon fontSize="small" onClick={(() => toggleShowMenu())} />
         </div>

         {
            showMenuMobile ? (
               <div className="submenu-mobile">
                  <nav>
                     <ul>
                        <Link to="/home">
                           <li>
                              <span className="icon-menu">
                                 <HomeRoundedIcon fontSize="small" />
                              </span>
                              <span className="text-menu">Dashboard</span>
                           </li>
                        </Link>
                        <li>
                           <span className="icon-menu">
                              <EventAvailableIcon fontSize="small" />
                           </span>
                           <span className="text-menu">Agendamentos</span>
                        </li>
                        <li>
                           <span className="icon-menu">
                              <FormatListBulletedIcon fontSize="small" />
                           </span>
                           <span className="text-menu">Castrações</span>
                        </li>
                        <Link to="/admin">
                           <li>
                              <span className="icon-menu">
                                 <PersonIcon fontSize="small" />
                              </span>
                              <span className="text-menu">Admin</span>
                           </li>
                        </Link>
                     </ul>
                  </nav>
               </div>
            ) : null
         }
      </Box>
   );
};

export default Header;
