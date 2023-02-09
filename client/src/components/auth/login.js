

import { Link, useNavigate } from 'react-router-dom';


import { useCookies } from 'react-cookie';

import { useState } from 'react';

import axios from "axios";

import jwt_decode from "jwt-decode";


import './auth.css';



function Login() {


  const [cookies, setCookie] = useCookies(['user']);


   const navigate = useNavigate();

   const [userDetails, setUserDetails] = useState({});
   
   const [email, setEmail] = useState("");
  
   const [password, setPassword] = useState("");
   
   const [errors, setErrors] = useState({});

   const logUser = {
       Email: email,
       Psw: password,
   }

   const setAuthToken = token => {
       if (token) {
         // Apply authorization token to every request if logged in
         axios.defaults.headers.common["Authorization"] = token;
       } else {
         // Delete auth header
         delete axios.defaults.headers.common["Authorization"];
       }
     };

   // Login - get user token
const loginUser = (e) => {

   e.preventDefault();

   axios
     .post("/api/users/login", logUser)
     .then(res => {
       // Save to localStorage
 
       // Set token to localStorage
       const { token } = res.data;
       localStorage.setItem("jwtToken", token);
       // Set token to Auth header
       setAuthToken(token);
       // Decode token to get user data
       const decoded = jwt_decode(token);
       // Set current user
      //  console.log(res.data);
       setCookie('isAuthenticated', res.data.success, { path: '/' });
       setCookie('FirstName', res.data.userFirstName, { path: '/' });
       setCookie('LastName', res.data.userLastName, { path: '/' });
       setCookie('Email', res.data.userEmail, { path: '/' });
       setCookie('JoinDate', res.data.userJoinDate, { path: '/' });
       setCookie('ProfileImage', res.data.userDP, { path: '/' });

       navigate('/profile');
       window.location.reload();

     })
     .catch(err => {
       const errors = err.response.data;
       setErrors(value => errors)
   
   });
 };
 
 



const onChange = (b,a) => {
   b(value => a);
}



  return (
    <div className="Auth">
      
      <h1>Welcome Back</h1>
      <form onSubmit={loginUser} noValidate>
        
        <div className='label'>
          <label>Email</label> <br/>  
        </div>
        
        <input type="email"
        placeholder='Enter your email'
        
                        onChange={(e)=>{onChange(setEmail, e.target.value)}}
                        />
                        <p className='errors'>
                            {errors.Email}
                            {errors.emailnotfound}
                        </p>
                         <br /> <br/>

        <div className='label'>
          <label>Password</label> <br/>  
        </div>
        <input type="password"
        placeholder='Password' 
        onChange={(e)=>{onChange(setPassword, e.target.value)}}
        />
        <p className='errors'>
            {errors.Psw}
            {errors.passwordincorrect}
        </p>
        <br />
        
        {/* <input type="checkbox" /> <p>Remember me</p> */}
        <button>Log In</button>

      </form>

    <p><Link to="/register">Register</Link>, if don't have an account yet...</p>
    </div>
  );
}

export default Login;
