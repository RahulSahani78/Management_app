import React, { useState } from 'react'
import '../components/style.css'
import axios from 'axios'
import { toast} from 'react-toastify';
import {Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [isLoading,setLoading]=useState(false);

  const navigate=useNavigate();

  const submitHandler=(event)=>{
event.preventDefault();
setLoading(true);
// console.log(fullName,email,phone,password,image)
//install axios for api call


axios.post('http://localhost:4200/user/login',{
  email:email,
  password:password
})
.then(res=>{
  setLoading(false);
  localStorage.setItem('token',res.data.token);
  localStorage.setItem('fullName',res.data.fullName);
  localStorage.setItem('imageUrl',res.data.imageUrl);
  localStorage.setItem('imageId',res.data.imageId);
  localStorage.setItem('email',res.data.email);
  toast.success('welcome')
  navigate('/dashboard');
  console.log(res);
})
.catch(err=>{
  setLoading(false);
toast.error('something is wrong');
  console.log(err)
})
  }

  
  return (
    <div className='signup-wrapper'>
      <div className='signup-box'>
        <div className='signup-left'>
 <img src={require('../assets/imag.png')} width={150} height={200}/>
 <h1 className='signup-left-heading'>Institute Management App</h1>
 <p className='signup-left-para'>Manage Your All Data in Easy Way</p>
        </div>
        <div className='signup-right'>
          
          <form onSubmit={submitHandler} className='form'>
          <h1>Login Your Account</h1>

          <input required  onChange={e=>{setEmail(e.target.value)}} type="email" placeholder='Email'/>
          <input required  onChange={e=>{setPassword(e.target.value)}} type="password" placeholder='Password'/>
          <button type="submit">{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
          <Link className='link' to ='/signup'>Create Your Account</Link>

          </form>
          
          </div>

         </div>
    </div>
  )
}

export default Login
