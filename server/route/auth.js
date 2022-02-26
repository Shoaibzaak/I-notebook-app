const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetchuser')
 const cookieParser = require("cookie-parser");
 router.use(cookieParser());

JWT_SECRET = "shoaibzakiisagood"

require('../db/conn')

const User = require('../model/userschema');
const User1 = require('../model/userschema1');
const { response } = require('express');
const { deleteOne } = require('../model/userschema');



router.get('/', (req, res, next) => {
  res.send("this is the is server router");
});
 
 //  it is the signup route1

 router.post('/register', [
  body('name', 'enter the valid name').isLength({ min: 2 }),
  body('email', 'enter the valid email').isLength({ min: 2 }),
  body('phone', 'The phone must be letters less than 2').isLength({ min: 2 }),
  body('work', 'The phone must be letters less than 2').isLength({ min: 2 }),
  body('password', 'The phone must be letters less than 2').isLength({ min: 2 }),], async (req, res) => {

    // if there are errors then it will show the bad results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //  this should be equal to the schema model for example if there is username there then username should in the schema also
      const { name, email, phone, work, password } = req.body
      if (!name || !email || !phone || !work || !password) {
        return res.status(422).json({ error: 'sorry please filled the right fields' })
      }
      const userexits = await User.findOne({ email: email })
      if (userexits) {
        return res.status(422).json({ error: "user already exits" })
      }


      const user = new User({ name, email, phone, work, password })

      const register = await user.save()
      if (register) {
       return res.status(201).json({ message: "user registered successfully" })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      
      const authtoken = jwt.sign(data, JWT_SECRET)
      console.log(authtoken);
       res.cookie('jtoken',authtoken)
    
    } catch (err) {
      console.log(err)
    }
    
  });
  
//  it is the login route which will come after the our registration
router.post('/login', [

  body('email', 'enter the valid email').isEmail(),

  body('password', 'The password should be valid').exists()], async (req, res) => {


    try {

      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ error: 'sorry please filled the right fields' })
      }
      const userlogin = await User.findOne({ email: email })
      if (!userlogin) {
        return res.status(400).json({ error: "invalid credentials" })
      }
      const passwordcompare = await bcrypt.compare(password, userlogin.password)
       const data = {
           user: {
             id: userlogin.id
           }
         }
         const authtoken = jwt.sign(data, JWT_SECRET)
         console.log(authtoken);
          res.cookie('jtoken',authtoken)
      if (!passwordcompare) {
        return res.status(400).json({ error: "invalid credentials" })
      }
      else {
    return   res.status(201).json({ message: "user signin successfully" })
      
 }
        
        } catch (err) {
      console.log(err)
      res.status(500).json({ error: "internal server error" })
    }

  });

//  Router-3  login required and after that our that route will be come  for authentication of the user
 router.get('/about',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId)
   return res.send(user)
  } catch (error) {
    console.error(error.message);
   return res.status(500).send("Internal Server Error");
  
  }  

});

//  Router-4  this the logout route
router.get('/logout' , async (req, res) => {
 console.log('user is logout')
  res.send('logout user from this code')

});


// our coding of the crud app should be start from the there

// Route#1 for the crud c=> create
 
router.post('/Addnote', [
  // body('name', 'Enter a valid title').isLength({ min: 3 }),
  // body('email','Email should not be blank').exists({}),
  ], async (req, res) => {
      try {
          const { name, email,phone,description } = req.body;

          // If there are errors, return Bad request and the errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          const user = new User1({
              name, email, phone,description
          })
          const savedNote = await user.save()

          res.json(savedNote)

      } catch (error) {
           console.error(error.message);
           res.status(500).send("Internal Server Error");
      }
  })
  // get the user

  router.get('/fetchallnotes', async (req, res) => {
    try {
      
      //  we use the await to save the data in data in database for the later time
        const user = await User1.find({});
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Note using: PUT "/updatenote/". Login required
router.put('/updatenote/:id',  async (req, res) => {
  let user = await User1.findById(req.params.id);
  user = req.body;
  
  const editUser = new User1(user);
  try {
    
    await User1.updateOne({_id: req.params.id},editUser,{new:true});
        res.status(201).json(editUser);

} catch (error) {
     
  }
})
// Route:4 for the delete a id 
router.delete('/deletenote/:id',  async (req, res) => {
 
  try {
    await User1.deleteOne({_id:req.params.id })
    res.json('user deleted successfully')
      

      
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// Route 5 for the find the user by their id we are using the below code specially for the update side on the client side

router.get('/fetchallnotes/:id', async (req, res) => {
  try {        
 
                  _id= req.params.id
    //  we use the await to save the data in data in database for the later time
      const user = await User1.findById(_id);
      
      res.json(user)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

module.exports = router;