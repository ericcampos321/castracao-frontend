import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Admin from "../pages/admin/index";
import Users from "../pages/admin/usuario/index";
import { PrivateRoutes } from '../routes/privateRoutes';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }/>

          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
