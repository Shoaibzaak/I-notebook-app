
  import { useState } from "react";
  import { useNavigate } from 'react-router-dom';
  import {
    Link
  } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
 
  const Login = () => {
    let navigate = useNavigate();
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const ondata=async(e)=>{
      
      e.preventDefault();
      
      const res=await fetch('/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          
        },
        
        body: JSON.stringify({
          email,password
        })
        
      });
      
      const data = res.json()
      if(  res.status===400 ||!data ){
        
        toast.error('invalid credentials please filled the righy ')
        
      }else{
        
        toast.success("login successfully", {
          icon: "🚀"
        });
        
        
        // save the authtoken and redirect
        setTimeout(() => {
          
         
          navigate('/about')
        }, 3000);
   
    }

 
 }
    
 return (
        <>
       <form onSubmit={ondata} className="container">
       <div className="mb-3">
     <label for="exampleInputEmail1" className="form-label">Email </label>
     <input type="email" className="form-control" value={email} onChange={(e)=> setemail(e.target.value)} required="it should not be blank" name="email" id="email" aria-describedby="emailHelp"/>
    
    </div>
    <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setpassword(e.target.value) } name="password" required="it should not be blank" id="exampleInputPassword1"/>
   </div>
  
   <button type="submit" name="login" id= "login"  className="btn btn-primary">Login</button>
  </form>   
  <Link to="/register"  className="link-danger mx-3">Please create an account</Link>
  <ToastContainer position="top-center" autoClose={5000} />

        </>
    )
}

 export default Login

