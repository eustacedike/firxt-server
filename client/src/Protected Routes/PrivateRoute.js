import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


import {getCurrentUser} from "../components/actions/getCurrentUser";


function PrivateRoute({ children }) {


    const [user, setUser] = useState({isAuthenticated: "loading"});



    if (user.isAuthenticated === 'loading'){
        setUser(getCurrentUser());} else if (user.isAuthenticated)
    {return children} else {return <Navigate to="/login" />};
    

}


export default PrivateRoute;