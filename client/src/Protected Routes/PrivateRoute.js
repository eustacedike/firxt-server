import { Navigate } from 'react-router-dom';
import { useCookies, useLocation } from 'react-cookie';

// import Login from "../components/auth/login";


function PrivateRoute({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const isAuthenticated = (cookies.isAuthenticated === 'true');


    return isAuthenticated ? children : <Navigate to="/login" />;
    

}


export default PrivateRoute;