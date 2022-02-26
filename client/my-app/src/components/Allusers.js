import React,{useEffect,useState,} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const Allusers = () => {

    const [users, setusers] = useState([]);

 useEffect(() => {
  async function getAllStudent() {
   try {
    const employes = await axios.get(`/fetchallnotes`)
    // console.log(students.data);
    setusers(employes.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllStudent();
 }, [])

    const deletedata = async(_id)=>{
      
        await axios.delete(`/deletenote/${_id}`);
        var newstudent = users.filter((item) => {
        //   console.log(item);
        return item._id !== _id;
    })
    setusers(newstudent);     
    toast.error('User has been deleted successfully')
    
    }
    return (
        <>
        <h1 style={{textAlign:'center' }}> Our add table exits </h1>
        
        <Table style={{width:'90%',margin:'50px 50px 50px 50px'}}>

        <TableHead >
          <TableRow style={{background:'black'}} >
            <TableCell style={{color:"red", fontSize:'30px'}}>id</TableCell>
            <TableCell style={{color:"red" ,fontSize:'30px'}} >name</TableCell>
            <TableCell style={{color:"red",fontSize:'30px'}} >email</TableCell>
            <TableCell style={{color:"red",fontSize:'30px'}} >phone</TableCell>
            <TableCell style={{color:"red",fontSize:'30px'}} >description</TableCell>
            <TableCell  ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {
             users.map(user=>(
                 <TableRow>
                     <TableCell>{user._id}</TableCell>
                     <TableCell>{user.name}</TableCell>
                     <TableCell>{user.email}</TableCell>
                     <TableCell>{user.phone}</TableCell>
                     <TableCell>{user.description}</TableCell>
                     <TableCell>
                     <Button style={{padding:'5px 4px',margin:'3px 2px'}} variant="contained" color='primary' LinkComponent={Link} to={`/updatenote/${user._id}`} >Edit</Button>
                     <Button   onClick={()=> deletedata(user._id) } style={{padding:'5px 4px',margin:'3px 2px'}} variant="contained"  color='secondary'>Delete</Button>
                     <ToastContainer position="top-center" autoClose={5000} />
                     </TableCell>
                     
                     
                     
                 </TableRow>
             ))
         }
            
        </TableBody>
        </Table>
        </>
    )
}

export default Allusers
