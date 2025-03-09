import React from 'react'
import '../components/style.css'
import {Link, useLocation } from 'react-router-dom';

const SideNav = () => {
    const location=useLocation();
    return (
        <div className='nav-container'>
            <div className='brand-container'>
                <img className='profile-logo' alt='brand-logo' src={require('../assets/imag.png')} />
                <div>
                    <h2 className='brand-name'>management app</h2>
                    <p className='brand-slogan'>Manage Your app...</p>
                </div>
            </div>
       <div className='menu-container'>
       <Link to ='/dashboard/home' className={location.pathname==='/dashboard/home'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-house"></i>Home</Link>
       <Link to ='/dashboard/courses' className={location.pathname==='/dashboard/courses'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-book"></i>All Course</Link>
       <Link  to ='/dashboard/add-courses' className={location.pathname==='/dashboard/add-courses'?'menu-active-link':'menu-link'}> <i className="fa-solid fa-plus"></i>Add Course</Link>
       <Link to ='/dashboard/students' className={location.pathname==='/dashboard/students'?'menu-active-link':'menu-link'}><i className="fa-solid fa-user-group"></i>All Student</Link>
       <Link to ='/dashboard/add-students' className={location.pathname==='/dashboard/add-students'?'menu-active-link':'menu-link'}><i className="fa-solid fa-user-plus"></i>Add Student</Link>
       <Link to ='/dashboard/collect-fee' className={location.pathname==='/dashboard/collect-fee'?'menu-active-link':'menu-link'}><i className="fa-solid fa-money-check-dollar"></i>Collect Fee</Link>
       <Link to ='/dashboard/payment-history' className={location.pathname==='/dashboard/payment-history'?'menu-active-link':'menu-link'}><i className="fa-solid fa-list"></i>Payment History</Link>

       </div>
       <div className='contact-me'>
        <p><i className="fa-solid fa-address-card"></i>Contact me</p>
        <p><i className="fa-solid fa-phone-volume"></i>7887061739</p>
       </div>
        </div>
    )
}

export default SideNav
