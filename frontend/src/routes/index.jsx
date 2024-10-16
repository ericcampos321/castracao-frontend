import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Admin from "../pages/admin/index";
import Usuario from "../pages/admin/usuario/index";
import { PrivateRoutes } from '../routes/privateRoutes';



export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }/>

          <Route path="/admin" element={
            <PrivateRoutes>
            <Admin />
            </PrivateRoutes>
            } />

          <Route path="/users" element={<Usuario />} />
          <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};


