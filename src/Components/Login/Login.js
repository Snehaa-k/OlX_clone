import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const history = useHistory()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext)
  const handleLogin =(e) =>{
    e.preventDefault()
    const auth = getAuth()
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.messege)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
            placeholder='Enter Email'
            required
           
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
            placeholder='Enter Password'
            required
         
          />
          <br />
          <br />
          <button>Login</button>
        </form>
           <p>don't have an account ?
        <a style={{textDecorationLine:'underline'}} onClick={()=>{history.push('/signup')}}>SignUp</a> </p>
      </div>
    </div>
  );
}

export default Login;
