import React,{useEffect} from 'react'

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'




const About = () => {
       let navigate = useNavigate();
         const callAboutpage=async()=>{
            try {
               const res = await fetch('/about',{
                   method:"GET",
                    headers:{
                      Accept:"application/json",  
                       'jtoken': Cookies.get('jtoken'),             
                      "Content-Type":"application/json"
                     },
                     credentials:"include"

          })
                  const data= await res.json()
                    console.log(data)
                    if(res.status===401 ||res.status===400){
                        alert('invalid token of the user there')
                        navigate('/login')
                    }
                   else {

                            alert('user is the authorized')
                    }
            } catch (error) {
                console.log(error)
            }
        }
        useEffect(() => {
           callAboutpage();
        
       }, [])
    
    return (
        <>
            <div className='container my-3'>
                <form method='GET'  >
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className=' col-md-4'>
                          
                            </div>

                        </div>
                        <div className='col-md-4'>

                            <h4>shoaib zaki</h4>
                            <h5>web developer </h5>
                            <p className='profile-rating mt-3 mb-5'> Ranking <span> 1:10</span></p>
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link " id='home-tab' htmlFor="#home" >About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id='profile-tab' htmlFor="#profile">Timeline</a>
                                </li>


                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        {/* right side url */}
                        <div className='col-md-4 '>
                            <div className='profile-work '>
                                <p> Work links </p>
                                <div className='mt-3'>
                                <a  htmlFor=" "   >    You tube</a>

                                </div>
                                <div className='mt-3'>
                                <a htmlFor=" "  >  Instagram</a>

                                </div>
                                <div className='mt-3'>
                                <a htmlFor=" "  >  facebook</a>

                                </div>
                                <div className='mt-3'>
                                <a htmlFor=" "  >  Linkden</a>

                                </div>
                                
                               
                            </div>
                        </div>

                        
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default About
