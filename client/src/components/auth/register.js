

import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import axios from "axios";


import './auth.css';



function Register() {


  const navigate = useNavigate();


  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const newUser = {
          firstname: fName,
          lastname: lName,
          Email: email,
          Psw: password,
          Psw2: password2,
          link: `${fName}-${lName}-${Math.floor(Math.random()*10000)}`.toLowerCase().replace(/^\s+|\s+$/gm,''),
          gender: gender,
      }

      const registerUser = (e) => {
        e.preventDefault();

        axios
          .post("/api/users/register", newUser)
          .then(res => navigate('/login'))
          .catch((err) => {
            const errors = err.response.data;
            setErrors(value => errors)
            console.log(errors.Email)
        })
          
      };

    const onChange = (b,a) => {
        b(value => a);

        // console.log(newUser)
    }



  return (
    <div className="Auth">
      
      <h1>Register</h1>
      <form onSubmit={registerUser} noValidate>
        <input type="text"
        placeholder='First Name'
        onChange={(e)=>{onChange(setFName, e.target.value)}}
        />
        <p className='errors'>{errors.firstname}</p>
        <br />
        <input type="text"
        placeholder='Last Name'
        onChange={(e)=>{onChange(setLName, e.target.value)}}
        />
        <p className='errors'>{errors.lastname}</p>
        <br />
        <input type="email"
        placeholder='Enter your email' 
        onChange={(e)=>{onChange(setEmail, e.target.value)}}
        />
        <p className='errors'>{errors.Email}</p>
        <br />
        <select
        onChange={(e)=>{onChange(setGender, e.target.value)}}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className='errors'>{errors.Email}</p>
        <br />
        <input type="password"
        placeholder='Password'
        onChange={(e)=>{onChange(setPassword, e.target.value)}}
        />
        <p className='errors'>{errors.Psw}</p>
        <br />
        <input type="password"
        placeholder='Confirm Password'
        onChange={(e)=>{onChange(setPassword2, e.target.value)}}
        />
        <p className='errors'>{errors.Psw2}</p>
        <br />
        {/* <input type="checkbox" /> <p>Remember me</p> */}
        <button>Register</button>

      </form>

    <p><Link to="/login">Login</Link>, if you already have an account...</p>
    </div>
  );
}

export default Register;
