import { Navigate } from 'react-router-dom';
import { getStorage } from '../services/localStorage';

export const PrivateRoutes = ({ children }) => {
    const token = getStorage('token');
    const auth = getStorage('auth');

    return token && auth ? children : <Navigate to='/login' />;
}


export const OnlyAdminRoutes = ({ children }) => {
    return <Navigate to='/home' />;
}
