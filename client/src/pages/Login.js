import React,{useState, useContext}from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../Context/AuthContext'
function Login() {
  const[state,setState]=useState({
    email:"",
    password:''
})
const {setAuthState}=useContext(AuthContext)
const navigate=useNavigate()
 const login=e=>{
    e.preventDefault()
   axios.post('http://localhost:5000/users/login', {
    email:state.email,
    password:state.password
   }).then((res)=>{
       if(res.data.error){
        alert(res.data.error)
       }else{
        localStorage.setItem("Token", res.data.securityToken)
        setAuthState({username:res.data.username, id:res.data.id,role:res.data.role, status:true})
          navigate('/')
       }
   })
}   
const handleChange=(evt)=>{
  const value = evt.target.value;
  setState({
    ...state,
    [evt.target.name]: value
  });
}

  return (
    <div className='container'>
      <div className='row'>
      <div className='col-md-4 offset-4 formlogin'>
      <form onSubmit={login}>
        <h3>User Login</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email" 
            // value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password" 
            // value={password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot Password
        </p>
      </form>
    </div>
      </div>
    </div>
  )
}
export default Login
