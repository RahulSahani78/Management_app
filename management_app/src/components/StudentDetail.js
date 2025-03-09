import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentDetail = () => {
    const params=useParams();
    const navigate=useNavigate();
    const [student,setStudent]=useState({});
    const [course,setCourse]=useState({});
    const [paymentList,setPaymentList]=useState([]);
    useEffect(()=>{
        getStudentDetail();
    },[])
    const getStudentDetail=()=>{
        axios.get('http://localhost:4200/student/student-detail/'+params.id,{
          headers:{
            Authorization:'Bearer '+localStorage.getItem('token')
          }
        })
        .then(res=>{
          console.log(res.data);
          setStudent(res.data.studentDetail);
          setPaymentList(res.data.feeDetail);
          setCourse(res.data.courseDetail)
          console.log(student);
          
         
        })
        .catch(err=>{
          console.log(err);
          toast.error('something went wrong')
        })
      }

      const deleteStudent=(studentId)=>{
        if(window.confirm('are you sure to delete ?? ')){
          
          axios.delete('http://localhost:4200/student/'+studentId, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .then((res) => {
            console.log(res.data);
            navigate('/dashboard/course-details/'+course._id)
            toast.success("student data is deleted")
          })
          .catch((err) => {
            console.log(err);
            toast.error('Something went wrong');
          });
        }
      }

  return (
    <div className='student-detail-main-wrapper'>
      <div className='student-detail-wrapper'>
       <div className='student-detail-header'>
          <h2>Student Detail</h2>
          <div className='sd-btn-container'>
              <button className='primary-btn'onClick={()=>{navigate('/dashboard/update-student/'+student._id,{state:{student}})}} >edit</button>
              <button className='secondary-btn' onClick={()=>{deleteStudent(student._id)}}>delete</button>
            </div>
       </div>
       <div className='sd-detail'>
       
        <img alt='student pic'src={student.imageUrl}/>
        <div>
          <h2>{student.fullName}</h2>
          <p>Phone: {student.phone}</p>
          <p>Email: {student.email}</p>
          <p>Address: {student.address}</p>
          <h4>Course Name: {course.courseName}</h4>
        </div>
      
    
       </div>
      </div>
 <br/>
 <h3 className='payment-history'>Payment history</h3>
      <div className='fee-detail-wrapper'>
        {paymentList.length>0?<table>
      <thead>
        <th>Date and Time</th>
        <th>Amount</th>
        <th>Remark</th>
        
      </thead>
      <tbody>
  {
    paymentList.map((payment) => (
      <tr key={payment._id}>
        <td>{payment.createdAt}</td>
        <td>{payment.amount}</td>
        <td>{payment.remark}</td>
      </tr>
    ))
  }
</tbody>
     </table>:<p>No payment history is here</p>}
     
      </div>
    </div>
  )
}

export default StudentDetail
