import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudents=()=>{
const[fullName,setFullName]=useState('')
const[phone,setPhone]=useState('')
const[email,setEmail]=useState('')
const[address,setAddress]=useState('')
const[courseId,setCourseId]=useState('')

const[image,setImage]=useState(null);
const[imageUrl,setImageUrl]=useState('');
const[isLoading,setLoading]=useState('');
const location=useLocation();
const[courseList,setCourseList]=useState([]);
const navigate=useNavigate();

useEffect(()=>{
  getCourses();
  if(location.state){
    setFullName(location.state.student.fullName);
    setPhone(location.state.student.phone);
    setEmail(location.state.student.email)
    setAddress(location.state.student.address)
    setCourseId(location.state.student.courseId)
    setImageUrl(location.state.student.imageUrl)
  }
  else{
    setFullName('');
    setPhone('');
    setEmail('')
    setAddress('')
    setCourseId('')
    setImageUrl('')
  }
},[location])
const getCourses=()=>{
  axios.get('https://management-app-backenedd.onrender.com/course/all-course',{
    headers:{
      Authorization:'Bearer '+localStorage.getItem('token')
    }
  })
  .then(res=>{
    // console.log(res.data.courses);
    setCourseList(res.data.courses);
  })
  .catch(err=>{
    console.log(err);
    toast.error('something went wrong')
  })
}
const submitHandler=(e)=>{
e.preventDefault();
setLoading(true);
    // console.log(courseName,description,price,startingDate,endingDate,image);
    const formData=new FormData();
    formData.append('fullName',fullName);
    formData.append('phone',phone);
    formData.append('email',email);
    formData.append('address',address);
    formData.append('courseId',courseId);
 if(image){
  formData.append('image',image);
 }
    
    
 if(location.state){
  axios.put('https://management-app-backenedd.onrender.com/student/'+location.state.student._id,formData,{
    headers:{
      Authorization:'Bearer '+localStorage.getItem('token')
    }
  })
  .then(res=>{
    setLoading(false)
    // console.log(res.data);
    toast.success('student updated');
    navigate('/dashboard/student-detail/'+location.state.student._id);
  })
  .catch(err=>{
    setLoading(false);
    console.log(err)
    toast.error('something went wrong')
  })
 }
 else{
  axios.post('https://management-app-backenedd.onrender.com/student/add-student',formData,{
    headers:{
      Authorization:'Bearer '+localStorage.getItem('token')
    }
  })
  .then(res=>{
    setLoading(false)
    // console.log(res.data);
    toast.success('new student added');
    navigate('/dashboard/courses');
  })
  .catch(err=>{
    setLoading(false);
    console.log(err)
    toast.error('something went wrong')
  })

 }
    
}
const fileHandler=(e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <div>
      <form onSubmit={submitHandler}  className='form'>
        <h1>{location.state?'Edit new student':'Add New Student'}</h1>
       <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} placeholder='Student Name'/>
       <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder='Mobile Number'/>
       <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
       <input value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='Address'/>
       <select disabled={location.state} value={courseId} onChange={(e)=>{setCourseId(e.target.value)}}>
  <option value="">Select Course</option>
  {courseList.map((course) => (
    <option  value={course._id}>{course.courseName}</option>
  ))}
</select>

        <input required={!location.state} onChange={fileHandler} type="file"/>
        { imageUrl && <img className='your-logo'alt="student-pic" src={imageUrl}/>}

        <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>

      </form>
    </div>
  )
}

export default AddStudents
