

const jwt = require('jsonwebtoken');
JWT_SECRET = "shoaibzakiisagood"
const User =require('../model/userschema')


const fetchuser =async (req,res,next) => {

   
    const token = req.header('jtoken');
    if (!token) {
      return  res.status(400).send({ error: "tokon not found" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
           return;
    }
}
module.exports=fetchuser