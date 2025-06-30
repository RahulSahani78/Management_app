import React, { useState } from 'react'
import '../components/style.css'
import axios from 'axios'
import { toast} from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const [image,setImage]=useState(null);
  const [imageUrl,setImageUrl]=useState('');
  const [isLoading,setLoading]=useState(false);
  const navigate=useNavigate();

  const submitHandler=(event)=>{
event.preventDefault();
setLoading(true);
// console.log(fullName,email,phone,password,image)
//install axios for api call
const formData=new FormData();
formData.append('fullName',fullName);
formData.append('email',email)
formData.append('phone',phone)
formData.append('password',password)
formData.append('image',image);


axios.post('https://management-app-backenedd.onrender.com/user/signup',formData)
.then(res=>{
  setLoading(false);
  toast.success('your account is created')
navigate('/login');
  console.log(res)
})
.catch(err=>{
  setLoading(false);
toast.error('something is wrong');
  console.log(err)
})
  }

  const fileHandler=(e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
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
          <h1>Create Your Account</h1>

          <input required  onChange={e=>{setFullName(e.target.value)}} type="text" placeholder=' Institute fullName'/>
          <input required  onChange={e=>{setEmail(e.target.value)}} type="email" placeholder='Email'/>
          <input required  onChange={e=>{setPhone(e.target.value)}} type="number" placeholder='Phone'/>
          <input required  onChange={e=>{setPassword(e.target.value)}} type="password" placeholder='Password'/>
          <input required onChange={fileHandler}type="file"/>
          { imageUrl && <img className='your-logo'alt="logo" src={imageUrl}/>}
          <button type="submit">{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
          <Link className='link' to ='/login'>Login Your Account</Link>

          </form>
          
          </div>

         </div>
    </div>
  )
}

export default Signup
