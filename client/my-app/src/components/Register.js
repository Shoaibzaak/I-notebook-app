import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Link
} from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  let navigate = useNavigate();
  const [user, setuser] = useState({
    name:" ",email:" ",phone:" ",work:"  ",password:" "
  })
  

  let name,value
  const handle =(e)=>{
    name=e.target.name
    value=e.target.value
    
    setuser({...user,[name]:value})
    
  }
 
  
  const handlesubmit =async (e)=>{
    e.preventDefault();
    const {name,email,phone,work,password}=user;
    const res=await fetch('/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },

     body: JSON.stringify({
        name,email,phone,work,password
      })
    })
    
    
      
    const data= await res.json();
    if (res.status=== 400 || res.status === 422 || !data ){
      toast.error("invalid registration")
      console.log('invalid registration')
    }
    else{
     
      toast.success("Resgistered successfully") 
      setTimeout(() => {
      

        navigate('/login')
      }, 3000);

     }    
   
  }

    return (

        <>
            
             <form onSubmit={handlesubmit}   className='container form'>
             <div className="mb-3">
               <h1 className='h23'> Our Registration  </h1>
               
     <label htmlFor="exampleInputEmail1" className="form-label">Name </label>
     <input type="text" className="form-control"  onChange={handle}  name="name" value={user.name} id="name" aria-describedby="emailHelp"/>
     </div>
   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
    <input type="email" className="form-control" onChange={handle}  value={user.email} name="email" required='Enter the valid email' id="email" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Phone </label>
    <input type="text" className="form-control" onChange={handle} value={user.phone} name="phone" id="phone" aria-describedby="emailHelp"/>
    
   </div>
   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Work </label>
    <input type="text" className="form-control" onChange={handle} value={user.work} name="work" id="work" aria-describedby="emailHelp"/>
    
   </div>
   <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Password </label>
    <input type="password" className="form-control" onChange={handle} value={user.password}  required='Enter the valid password' name="password" id="password" aria-describedby="emailHelp"/>
    
   </div>
 
     
   <button type="submit" name='submit'  id='submit'>Register</button>
   </form>
   <Link to="/login"  className="link-danger mx-3">i'm already registered</Link>
   <ToastContainer position="top-center" autoClose={5000} />
   </>
   
    )
}

export default Register
