import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCourses=()=>{
const[courseName,setCourseName]=useState('');
const[description,setDescription]=useState('');
const[price,setPrice]=useState('');
const[startingDate,setStartingDate]=useState('');
const[endDate,setEndDate]=useState('');
const[image,setImage]=useState(null);
const[imageUrl,setImageUrl]=useState('');
const[isLoading,setLoading]=useState('');
const navigate=useNavigate();
const location=useLocation();
useEffect(()=>{
  if(location.state){
  console.log(location.state.course);
  setCourseName(location.state.course.courseName);
  setDescription(location.state.course.description);
  setPrice(location.state.course.price);
  setStartingDate(location.state.course.startingDate);
  setEndDate(location.state.course.endDate);
  setImageUrl(location.state.course.imageUrl);
  }
  else{
    setCourseName('');
  setDescription('');
  setPrice('')
  setStartingDate('');
  setEndDate('')
  setImageUrl('')
  }
},[location])
const submitHandler=(e)=>{
e.preventDefault();
setLoading(true);
    // console.log(courseName,description,price,startingDate,endingDate,image);
    const formData=new FormData();
    formData.append('courseName',courseName);
    formData.append('description',description);
    formData.append('price',price);
    formData.append('startingDate',startingDate);
    formData.append('endDate',endDate);
    if(image){
      formData.append('image',image);
    }
   
    
    if(location.state){
      axios.put('https://management-app-backenedd.onrender.com/course/'+location.state.course._id,formData,{
        headers:{
          Authorization:'Bearer '+localStorage.getItem('token')
        }
      })
      .then(res=>{
        setLoading(false)
        // console.log(res.data);
        toast.success('new courses added');
        navigate('/dashboard/course-details/'+location.state.course._id);//isko bad me dekhte h
      })
      .catch(err=>{
        setLoading(false);
        console.log(err)
        toast.error('something went wrong')
      })
  
    }
    else{
      axios.post('https://management-app-backenedd.onrender.com/course/add-course',formData,{
        headers:{
          Authorization:'Bearer '+localStorage.getItem('token')
        }
      })
      .then(res=>{
        setLoading(false)
        // console.log(res.data);
        toast.success('new courses added');
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
      <form onSubmit={submitHandler} className='form'>
        <h1>{location.state ? 'Edit course':'Add new Course'}</h1>
        <input value={courseName} required onChange={e=>{setCourseName(e.target.value)}} type="text"placeholder='course name'/>
        <input value={description} required onChange={e=>{setDescription(e.target.value)}} type="text"placeholder='description'/>
        <input value={price} required onChange={e=>{setPrice(e.target.value)}} type="number"placeholder='price'/>
        <input value={startingDate} required onChange={e=>{setStartingDate(e.target.value)}} type="date"placeholder='starting date (dd-mm-yy)'/>
        <input value={endDate} required onChange={e=>{setEndDate(e.target.value)}} type="date"placeholder='ending date (dd-mm-yy)'/>
        <input required ={!location.state} onChange={fileHandler} type="file"/>
        { imageUrl && <img className='your-logo'alt="logo" src={imageUrl}/>}

        <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>

      </form>
    </div>
  )
}

export default AddCourses
