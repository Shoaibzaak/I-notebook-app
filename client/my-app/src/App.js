 import React  from 'react'
 import './App.css';
 import Navbar from './components/Navbar'
import Register from './components/Register';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Home from './components/Home';
import Addusers from './components/Addusers';
import Allusers from './components/Allusers';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Edit } from './components/Edit';


 function App() {
 
 return (
    
    <>
     
        
     <BrowserRouter>
    <Navbar/>
    <Routes>
<Route path="/" element={<Home />} />

<Route path="about" element={<About />} />
<Route path="register" element={<Register />} />
<Route path="contact" element={<Contact />} />
   
<Route path="login" element={<Login />} />
<Route path="adduser" element={<Addusers/>} />
<Route path="alluser" element={<Allusers />} />
<Route path="/updatenote/:_id" element={< Edit />} />
 

</Routes>   
   
        
    </BrowserRouter>
    
    
    
    </>
  );
}

export default App;
