const express=require('express');
const router=express.Router();
const cloudinary=require('cloudinary').v2;
require('dotenv').config();
const mongoose=require('mongoose');
const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//signup
router.post('/signup', async (req, res) => {
    try {
        console.log("Received signup request:", req.body);

        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' }); // ✅ Fix: Return to prevent further execution
        }

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            imageUrl: uploadResult.secure_url,
            imageId: uploadResult.public_id
        });

        // Save user to DB
        const savedUser = await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: savedUser });

    } catch (err) {
        console.error("Signup Error:", err);

        // ✅ Fix: Check if response has already been sent
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

//login
router.post('/login',(req,res)=>{
    User.find({email:req.body.email})
    .then(users=>{
       
        if(users.length==0){
            return res.status(500).json({
                msg:"email not registered"
            })
        }
        bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
           
            if(!result){
                return res.status(500).json({
                    err:"password matching fail"
                })
            }
            //install jsonwebtoken
            const token=jwt.sign({
                fullName:users[0].fullName,
                email:users[0].email,
                phone:users[0].phone,
                uId:users[0]._id
            },
            'sm 123',
            {
                expiresIn:'365d'
            }
        );
        res.status(200).json({
            _id:users[0]._id,
            fullName:users[0].fullName,
            email:users[0].email,
            phone:users[0].phone,
            imageUrl:users[0].imageUrl,
            imageId:users[0].imageId,
            token:token

        })
        })
    })
})

module.exports=router;