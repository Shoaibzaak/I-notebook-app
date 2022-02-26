import {FormControl, FormGroup,Input, InputLabel ,Button } from '@mui/material'

// import { adduser } from '../service/api';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from 'react-router-dom';

import React from 'react'
import { useState } from "react";
const initialState={
    name:'',
    email:'',
    phone:'',
    description:''
}

const Addusers  =  () => {
    let navigate = useNavigate();
    const [user, setuser] = useState(initialState)
    const {name,email,phone,description}=user
    const onvaluechange=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
        
    }
    const useradded=async()=>{
         adduser();  
    }
    const adduser=async()=>{
        
        const response= await axios.post('/Addnote',user)
        if(response){

            toast.success("Resgistered successfully") 
            setTimeout(() => {
      

                navigate('/alluser')
              }, 3000);
        }
        else{
            toast.error("Resgistered unsucess") 
        }
    }

    return (

        <>
          <h1 style={{textAlign:'center',color:'red',margin:'40px',paddingRight:'30px'}}> USER ADD</h1>
          

        <FormGroup style={{width:'50%',paddingRight:'20px 20px',marginRight:"20px 20px"}}>
         <FormControl  >
             <InputLabel style={{width:'70px'}}> Name </InputLabel>
              <Input onChange={(e)=>onvaluechange(e)} style={{marginBottom:'20px'}}  name='name'  value={name}  />
             </FormControl >  
             <FormControl>
             <InputLabel > Email </InputLabel>
              <Input   onChange={(e)=>onvaluechange(e)} style={{marginBottom:'20px'}} name ='email' required='please enter the enter email'  value={email} />
             </FormControl>  
             <FormControl>
             <InputLabel> Phone </InputLabel>
              <Input  onChange={(e)=>onvaluechange(e)}  style={{marginBottom:'20px'}} name='phone'  value={phone}  />
             </FormControl>  
             <FormControl>
             <InputLabel> Description </InputLabel>
              <Input  onChange={(e)=>onvaluechange(e)} style={{marginBottom:'20px'}} name='description' value={description}   />
             </FormControl>
             <Button style={{backgroundColor:"blue",color:'white'}} onClick={useradded}   > Add user </Button>   
          
             
</FormGroup>
<ToastContainer position="top-center" autoClose={5000} />
 </>
    )
}

export default Addusers
