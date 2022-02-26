const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json())
const port = 5000
require('./db/conn')

// const registration=require('./model/userschema')
app.use(require('./route/auth'))
// this is the middleware which is used to login when logged user is available
const middleware=(req,res,next)=>{
  console.log('this is the middleware')
  next();
}

// it is the code of the express.js which is used to req and res responses 
 app.get('/', (req, res) => {
  res.send('Hello World!')
})

 app.get('/contact',middleware, (req, res) => {
  res.send('contact it is!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})