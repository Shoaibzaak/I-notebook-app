const mongoose=require('mongoose')
const DB='mongodb+srv://zaki:427836Ea@cluster0.p279e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(DB,
  err => {
      if(err) throw err;
      console.log('connected to MongoDB')
  });