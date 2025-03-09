import React from 'react'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCourses from './components/AddCourses'
import PaymentHistory from './components/PaymentHistory'
import CollectFee from './components/CollectFee'
import Home from './components/Home'
import Courses from './components/Courses'
import Students from './components/Students'
import AddStudents from './components/AddStudents'
import CourseDetails from './components/CourseDetails'
import StudentDetail from './components/StudentDetail'
const App = () => {
  const myRouter=createBrowserRouter([
    {path:'',Component:Login},
    {path:'login',Component:Login},
    {path:'signup',Component:Signup},
    {path:'dashboard',Component:Dashboard,children:[
      {path:'',Component:Home},
      {path:'home',Component:Home},
      {path:'courses',Component:Courses},
      {path:'add-courses',Component:AddCourses},
      {path:'students',Component:Students},
      {path:'add-students',Component:AddStudents},
      {path:'collect-fee',Component:CollectFee},
      {path:'payment-history',Component:PaymentHistory},
      {path:'course-details/:id',Component:CourseDetails},
      {path:'update-course/:id',Component:AddCourses},
      {path:'student-detail/:id',Component:StudentDetail},
      {path:'update-student/:id',Component:AddStudents}
      

    ]

    }
  ])
  return (
    <>
      <RouterProvider router={myRouter}/>
      <ToastContainer />
    </>
  )
}

export default App
