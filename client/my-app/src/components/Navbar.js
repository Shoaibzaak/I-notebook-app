import React from 'react'
import {
    Link
  } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';
  import Cookies from 'js-cookie'

const Navbar = () => {
  let navigate = useNavigate();
  const logout=async(e)=>{
    
      
      const res=await fetch('/login',{
        method:"GET",
        headers:{
          Accept:"application/json",  
           'jtoken': Cookies.remove('jtoken'),             
          "Content-Type":"application/json"
        },
        
        });
        const data = res.json()
      if(  !res.status===200 ||!data ){
        
        const error =new Error(res.error)
        throw error
      }else{
        
        navigate('/login')
   
    }

        
  
  }

    return (

        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        
      
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/adduser">Adduser</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/alluser">Allusers</Link>
        </li>
        
        </ul>
         {!Cookies.get('jtoken')?<form className='d-flex'>

          <Link className="nav-link" to="/register">Register</Link>
          <Link className="nav-link" to="/login">Login</Link>
         </form>: <button type="button" onClick={logout} className="btn btn-primary">Logout</button>
          
        }
    </div>
  </div>
</nav> 

        </>
    )
}

export default Navbar
