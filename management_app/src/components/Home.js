import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const[totalCourse,setTotalCourse]=useState(0);
  const[totalStudent,setTotalStudent]=useState(0);
  const[totalAmount,setTotalAmount]=useState(0);
  const[student,setStudent]=useState([]);
  const[fee,setFee]=useState([]);
  useEffect(()=>{
    getHomeDetail();
  },[]);
  
  const getHomeDetail=()=>{
    axios.get('https://management-app-backenedd.onrender.com/course/home',{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
      }
    })
    .then(res=>{
      console.log(res.data);
      setTotalCourse(res.data.totalCourses);
      setTotalStudent(res.data.totalStudent)
      setTotalAmount(res.data.totalAmount)
      setStudent(res.data.students);
      setFee(res.data.newFees);
      // console.log(res.data.studentList)
     
    })
    .catch(err=>{
      console.log(err);
      toast.error('something went wrong')
    })
  }
  return (
    <div className='home-wrapper'>
     <div className='count-box-wrapper'>
      <div className=' box box1' >
<h3>{totalCourse}</h3>
<p>Courses</p>
      </div>
      <div className=' box box2'>
      <h3>{totalStudent}</h3>
<p>Student</p>
      </div>
      <div className=' box box3'>
      <h3>{totalAmount}</h3>
<p>total amount</p>
      </div>


     </div>
     <div className='list-container'>
      <div className='table-Container'>
        {student.length>0? <table border="1">
    <thead>
      <tr>
        <th>Profile pic</th>
        <th>Full Name</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {student.map((student) => (
        <tr  key={student._id}>
          <td>
            <img src={student.imageUrl} alt="Student" className='profile-pic' />
          </td>
          <td>{student.fullName}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td> 
        </tr>
      ))}
    </tbody>
  </table>:<p>No student is here</p> }
      
      </div>
      <div className='table-Container'>
     {fee.length>0?  <table>
      <thead><tr>
        <th>Student's Name</th>
        <th>Date and Time</th>
        <th>Amount</th>
        <th>Remark</th>
        </tr>
        
      </thead>
      <tbody>
  {
    fee.map((payment) => (
      <tr key={payment._id}>
        <td>{payment.fullName}</td>
        <td>{payment.createdAt}</td>
        <td>{payment.amount}</td>
        <td>{payment.remark}</td>
      </tr>
    ))
  }
</tbody>
     </table>:<p>No payment history is here </p>}
      </div>
     </div>
    </div>
  )
}

export default Home
