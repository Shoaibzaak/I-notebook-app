const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const validator=require('validator')

 const AutoIncrement = require('mongoose-sequence')(mongoose);
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

    description:{
        type: String,
        required: true, minlength:[2,'Name can not be smaller than 2 characters'],
    },
});
 userSchema.plugin(AutoIncrement, {_id:'order_seq',inc_field: 'id'});
module.exports = mongoose.model("CRUD", userSchema);