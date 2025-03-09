import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const params=useParams();
  const [course,setCourse]=useState({});
  const [studentList,setStudentList]=useState([]);
  useEffect(()=>{
// console.log(params.id);
getCoursesDetail();
  },[])
  const navigate=useNavigate();



  const getCoursesDetail=()=>{
    axios.get('http://localhost:4200/course/course-detail/'+params.id,{
      headers:{
        Authorization:'Bearer '+localStorage.getItem('token')
      }
    })
    .then(res=>{
      // console.log(res.data);
      setCourse(res.data.course);
      
      setStudentList(res.data.studentList);
      // console.log(res.data.studentList)
     
    })
    .catch(err=>{
      console.log(err);
      toast.error('something went wrong')
    })
  }
  const deleteCourse=(courseId)=>{
    if(window.confirm('are you sure to delete ?? ')){
      
      axios.delete('http://localhost:4200/course/'+courseId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard/courses')
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });



    }
  }
  return (
    <div className='course-detail-main-wrapper'>
      {
     course && <div >
     <div className='course-detail-wrapper'>
        <img src={course.imageUrl}/>
        <div className='course-details-text'>
          <h1>{course.courseName}</h1>
          <p>Price: Rs {course.price}</p>
          <p>Starting- Date: {course.startingDate}</p>
          <p>Ending- Date: {course.endDate}</p>

        </div>
           
           <div className='course-btn'>
            <div className='btn-container'>
              <button className='primary-btn' onClick={()=>{navigate('/dashboard/update-course/'+course._id,{state:{course}})}}>edit</button>
              <button className='secondary-btn' onClick={()=>{deleteCourse(course._id)}}>delete</button>
            </div>
            <h3> course Description</h3>
            <div className='course-description'>
          
              <p>{course.description}</p>
           
            </div>
           </div>

        </div>
       
      </div>
      }
  {studentList.length > 0 ? (
   <div className='table-container'>
    <table border="1">
    <thead>
      <tr>
        <th>Profile pic</th>
        <th>Full Name</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {studentList.map((student) => (
        <tr onClick={()=>{navigate('/dashboard/student-detail/'+student._id)}} key={student._id}>
          <td>
            <img src={student.imageUrl} alt="Student" className='profile-pic' />
          </td>
          <td>{student.fullName}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
) : (
  <p>No students found.</p>
)}



    </div>
  )
}

export default CourseDetails
