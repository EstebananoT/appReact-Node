import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';


function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginstatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const register = () =>{
    Axios.post('http://localhost:3001/addUser',{
      correo: usernameReg,
      password: passwordReg
    }).then((response) =>{
      if(response.data.Status){
        setRegisterStatus(response.data.Status);
      }
    });
  };

  const login = () =>{
    Axios.post('http://localhost:3001/loginUser',{
      correo: username,
      password: password
    }).then((response) =>{
      if(response.data.message){
        setLoginstatus(response.data.message);
      }else{
        setLoginstatus(response.data[0].correo);
      }
    });
  };

  
  return (
    <div className="App">
      <div className = "login">
        <h1>Login</h1>
        <input type = "text" 
        onChange={(e) =>{
          setUsername(e.target.value);
        }}
        placeholder ="Username..."/>
        <input type = "text" 
        onChange={(e) =>{
          setPassword(e.target.value);
        }}
        placeholder ="Password..."/>
        <button onClick = {login}> Login</button>
      </div>
      <br></br>
        <h1>{loginStatus}</h1>
        <br></br>
      <div className = "Register">
        <h1>Registration</h1>
        <input type = "text" 
        onChange={(e) =>{
          setUsernameReg(e.target.value);
        }}
        placeholder ="Username..."/>
        <input type = "text" 
        onChange={(e) =>{
          setPasswordReg(e.target.value);
        }}
        placeholder ="Password..."/> 
        <button onClick={register}>Register</button>
      </div>
      <h1>{registerStatus}</h1>
    </div>
  );
}

export default App;