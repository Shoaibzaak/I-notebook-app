
import React,{useState,useEffect} from 'react'
import {FormControl, FormGroup,Input, InputLabel ,Button } from '@mui/material'
import {  useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const Edit = () => {
  let navigate = useNavigate();
    const {_id} = useParams();
 
 const [user, setuser] = useState({
  name: "",
 email : "",
 phone:"",
 description:""
 });
 useEffect(() => {
  async function getStudent() {
   try {
     const employee = await axios.get(`/fetchallnotes/${_id}`)
     console.log(employee.data);
     setuser(employee.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getStudent();
 }, [_id]);

 function onTextFieldChange(e) {
  setuser({
   ...user,
   [e.target.name]: e.target.value
  })
 }

 async function onformsubmit(e) {
  e.preventDefault()
  try {
    // we are not going to put : before the $id otherwise it will give error
    // but in the backened we must put this 
   await axios.put(`/updatenote/${_id}`, user)
   toast.success("updated successfully") 
   setTimeout(() => {
   

     navigate('/alluser')
   }, 3000);

  } catch (error) {
   console.log("Something is Wrong");
  }
 }

    return (
        <>
<h1 style={{textAlign:'center',color:'red',margin:'40px',paddingRight:'30px'}}> EDIT ADD</h1>
          

          <FormGroup style={{width:'50%',paddingRight:'20px 20px',marginRight:"20px 20px"}}>
           <FormControl  >
               <InputLabel style={{width:'70px'}}> Name </InputLabel>
                <Input onChange={e => onTextFieldChange(e)}  style={{marginBottom:'20px'}}  name='name'  value={user.name}  />
               </FormControl >  
               <FormControl>
               <InputLabel > Email </InputLabel>
                <Input   onChange={e => onTextFieldChange(e)} style={{marginBottom:'20px'}} name ='email' value={user.email} required='please enter the enter email'   />
               </FormControl>  
               <FormControl>
               <InputLabel> Phone </InputLabel>
                <Input   onChange={e => onTextFieldChange(e)} style={{marginBottom:'20px'}} name='phone'  value={user.phone}   />
               </FormControl>  
               <FormControl>
               <InputLabel> Description </InputLabel>
                <Input  onChange={e => onTextFieldChange(e)} style={{marginBottom:'20px'}} name='description'  value={user.description}  />
               </FormControl>
               <Button style={{backgroundColor:"blue",color:'white'}}  onClick={onformsubmit} > Edit user </Button>   
            
               <ToastContainer position="top-center" autoClose={5000} />
  </FormGroup>

        </>
    )
}

