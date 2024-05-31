import React, { useState,useContext} from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'firebase/firestore';
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore"; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  let userv
   
  const handleSubmit = (e)=>{
    e.preventDefault()
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,password).then((result)=>{

    const user = result.user
    updateProfile(user, { displayName: username }) 

    console.log(user)
    userv = user.uid
    
    }).then(()=>{
        addDoc(collection(db,"users"),{
        userv,
        username:username,
        phone:phone
    });
  
    }).then(()=>{history.push("/login")}).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
     
      alert(errorMessage)
      
    
   
  });

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder='Enter Your Name'
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder='Enter Email'
            required
          
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            placeholder='Enter Phone'
            
            
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
          <button>Signup</button>
        </form>
        <a style={{textDecorationLine:'underline'}} onClick={()=>{history.push('/login')}}>Login</a>
      </div>
    </div>
  );
}
