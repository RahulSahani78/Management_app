import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Students = () => {
  const [studentList, setStudentList] = useState([]); 
  const navigate=useNavigate()

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = () => {
    axios
      .get('http://localhost:4200/student/all-students', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res.data);
        
        setStudentList(res.data.student); 
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };
  return (
    <div>
       {studentList.length > 0 ? (
   <div className='students-container'><table border="1">
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

export default Students
