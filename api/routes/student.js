const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const Student = require('../model/Student');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const Fee = require('../model/Fee');
const Course=require('../model/Courses')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


//add new student
router.post('/add-student', checkAuth, (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');
    //   console.log(verify);

    cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {



        const newStudent = new Student({
            _id: new mongoose.Types.ObjectId,
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            courseId: req.body.courseId,
            address: req.body.address,
            uId: verify.uId,
            imageUrl: result.secure_url,
            imageId: result.public_id


        })

        newStudent.save()
            .then(result => {
                res.status(200).json({
                    newstudent: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })
});
//get all student

router.get('/all-students', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');

    Student.find({ uId: verify.uId })
        .select('_id uId fullName phone email courseId imageUrl imageId')
        .then(result => {
            res.status(200).json({
                student: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});
//get own all student for a course
router.get('/all-students/:courseID', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');

    Student.find({ uId: verify.uId, courseID: req.params.courseId })
        .select('_id uId fullName phone email courseId imageUrl imageId')
        .then(result => {
            res.status(200).json({
                student: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});
//delete
router.delete('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');


    Student.findById(req.params.id)
        .then(student => {
            console.log(student);
            if (student.uId == verify.uId) {
                //delete
                Student.findByIdAndDelete(req.params.id)
                    .then(result => {
                        cloudinary.uploader.destroy(student.imageId, (deletedimage) => {
                            res.status(200).json({
                                result: result
                            })
                        })

                    })
                    .catch(err => {
                        res.status(500).json({
                            msg: err
                        })
                    })
            }
            else {
                res.status(500).json({
                    msg: 'bad request'
                })
            }
        })

});

//update student
router.put('/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');
    console.log(verify.uId);
    Student.findById(req.params.id)
        .then(student => {
            // console.log(course)
            if (verify.uId != student.uId) {
                return res.status(500).json({
                    error: "u are not eligible for update"
                })
            }
            if (req.files) {
                console.log('file is there')
                cloudinary.uploader.destroy(student.imageId, (deletedimage) => {
                    cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {



                        const newUpdatedStudent = {

                            fullName: req.body.fullName,
                            phone: req.body.phone,
                            email: req.body.email,
                            courseId: req.body.courseId,
                            address: req.body.address,
                            uId: verify.uId,
                            imageUrl: result.secure_url,
                            imageId: result.public_id


                        }

                        Student.findByIdAndUpdate(req.params.id, newUpdatedStudent, { new: true })
                            .then(data => {
                                res.status(200).json({
                                    updatedStudent: data
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })

                    })

                })

            }
            else {
                // console.log('file is not there')
                const updatedData = {
                    fullName: req.body.fullName,
                    phone: req.body.phone,
                    email: req.body.email,
                    courseId: req.body.courseId,
                    address: req.body.address,
                    uId: verify.uId,
                    imageUrl: student.imageUrl,
                    imageId: student.imageId

                }
                Student.findByIdAndUpdate(req.params.id, updatedData, { new: true })
                    .then(data => {
                        res.status(200).json({
                            updatedData: data
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
    // .catch(err=>{
    //     res.status(500).json({
    //         error:err
    //     })
    // })
})
//get latest 5 student
router.get('/latest-students', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');
    Student.find({ uId: verify.uId })
        .sort({ $natural: -1 }).limit(5)
        .then(result => {
            res.status(200).json({
                students: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
//api for get one student
router.get('/student-detail/:id', checkAuth, (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'sm 123');
    Student.findById(req.params.id)
        .select('_id uId fullName phone email courseId imageUrl imageId address')
        .then(result => {
            Fee.find({ uId: verify.uId, courseId: result.courseId,phone:result.phone })
          .then(FeeData=>{
            Course.findById(result.courseId)
            .then(courseDetail=>{
                res.status(200).json({
                    studentDetail:result,
                    feeDetail:FeeData,
                    courseDetail:courseDetail
                })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
              }) 
           
          }) 
          .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
          }) 
        })

    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});



module.exports = router;