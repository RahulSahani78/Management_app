const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  _id:mongoose.Types.ObjectId,
  fullName:{type:String,required:true},
  email:{
    type:String,required:true
  } ,
  phone:{type:String,required:true},
  password:{
    type:String,required:true
  } ,
  imageUrl:{
    type:String
  } ,
  imageId:{
    type:String
  }

})
module.exports=mongoose.model('User',userSchema);