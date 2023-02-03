import { Navigate } from 'react-router-dom';
// import { useCookies, useLocation } from 'react-cookie';
import { useState, useEffect } from 'react';

// import Login from "../components/auth/login";

import {getCurrentUser} from "../components/actions/getCurrentUser";


function PrivateRoute({ children }) {
    // const [cookies, setCookie, removeCookie] = useCookies(['user']);
    // const isAuthenticated = (cookies.isAuthenticated === 'true');

    const [user, setUser] = useState({isAuthenticated: "loading"});

    // useEffect(() => {
    //   setUser(getCurrentUser());
    // }, [user]);

    // console.log(user.isAuthenticated)

    if (user.isAuthenticated === 'loading'){
        setUser(getCurrentUser());} else if (user.isAuthenticated)
    {return children} else {return <Navigate to="/login" />};
    

}


export default PrivateRoute;