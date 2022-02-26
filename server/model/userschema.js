const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const validator=require('validator')

const bcrypt = require('bcrypt');

// create a schema
const userSchema = new Schema({
   
    name:{
        type: String,
        required: true,
        minlength:[2,'Name can not be smaller than 2 characters'],
    },
     email:{
        type: String,
        required: [true,'email should not be blank'],
        unique:true,
        index:true,
        minlength:[2,'Name can not be smaller than 2 characters'],
     },
    phone:{
        type: String,
        required: true, 
        minlength:[2,'Name can not be smaller than 2 characters'],
        },

    work:{
        type: String,
        required: true, minlength:[2,'Name can not be smaller than 2 characters'],
    },

    password:{
        type: String,
        required: [true,'password is required'],
        minlength:[2,'Name can not be smaller than 2 characters'],
     },
   
    
 });

// email validation 
userSchema.path('email').validate(async(email)=>{
    const emailcount = await mongoose.models.RIGISTRATION.countDocuments({email})
    return !emailcount
}),'email already exits'
 

// encrypt password if value  will be changed
userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12)
        
    }
    next()
})


module.exports = mongoose.model("RIGISTRATION", userSchema);