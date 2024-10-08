import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/login'


const Routers = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Routers;
