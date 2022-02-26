import React from 'react'

const contact = () => {
    return (
        <>
   
       <h1 className='container my-4' style={{border:'5px solid',textAlign:"center"}}> Get in touch with us</h1>
       <form className="row container-fluid">
     <div className="col-md-6">
     <label for="inputEmail4" className="form-label">Email</label>
      <input type="email" className="form-control" id="email"/>
     </div>
  <div className="col-md-6">
    <label for="inputPassword4" className="form-label">Your name</label>
    <input type="password" className="form-control" id="password"/>
  </div>
  <div className="col-12">
    <label for="inputAddress" className="form-label">Your phone number</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="phone number"/>
   </div>
   <div className="mb-3">  
  <label for="exampleFormControlTextarea1" className="form-label">Message</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
  </div>
</form>
        </>
    )
}

export default contact
