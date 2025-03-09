const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoute=require('./routes/user');
const courseRoute=require('./routes/course');
const studentRoute=require('./routes/student');
const feeRoute=require('./routes/fee');
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb+srv://sm123:1234@cluster0.tsful.mongodb.net/?retryWrites=true&w=majority&appName=sm')
.then(()=>{
   console.log("connected db"); 
})
.catch(err=>{
  console.log(err)  ;
})
app.use(fileUpload({
    useTempFiles : true
    // tempFileDir : '/tmp/'
}));

app.use(bodyParser.json());
app.use(cors());
app.use('/user',userRoute);
app.use('/course',courseRoute);
app.use('/student',studentRoute);
app.use('/fee',feeRoute);

app.use('*',(req,res)=>{
res.status(404).json({
  msg:'bad request'  
});

});




module.exports=app;