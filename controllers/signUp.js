var bcrypt = require('bcryptjs');
const employee = require('../models/employee');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validator = require('validator');
const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;

module.exports = async (req, res) => {
    try {

        if (req.body.otp == 1234) {
            let validateNumber, validateUsername, validateEmail

            //generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            // console.log(hashedPassword)
            let otp = req.body.otp;
            // console.log(otp)

            //validating to check number is numeric or not and checking it is present already
            if (validator.isNumeric(req.body.mobileNumber)) {

                if (req.body.mobileNumber.length == 10) {
                    validateNumber = await employee.findOne({
                        attributes: ['mobileNumber'],
                        where: {
                            mobileNumber: req.body.mobileNumber
                        }
                    });

                    if (validateNumber == null) {
                        //username should contain only alphabets, numbers and underscore, and should be between 5 and 20 characters long
                        //validating to check username already present
                        if (usernameRegex.test(req.body.userName)) {
                            validateUsername = await employee.findOne({
                                attributes: ['userName'],
                                where: {
                                    userName: req.body.userName
                                }
                            });

                            if (validateUsername == null) {
                                //to check that entered email is in valid format or not and is already in use
                                if (emailRegex.test(req.body.email)) {
                                    validateEmail = await employee.findOne({
                                        attributes: ['email'],
                                        where: {
                                            email: req.body.email
                                        }
                                    });
                                    if (validateEmail == null) {
                                        if (validateNumber == null) {
                                            if (validateUsername == null) {
                                                if (validateEmail == null) {
                                                    let data1 = await employee.create({
                                                        mobileNumber: req.body.mobileNumber,
                                                        firstName: req.body.firstName,
                                                        lastName: req.body.lastName,
                                                        userName: req.body.userName,
                                                        email: req.body.email,
                                                        designation: req.body.designation,
                                                        password: hashedPassword,
                                                        verified:"pending"
                                                    })
                                                    res.status(200).json({message:'User signup successful!'});
                                                }
                                            }
                                        }
                                    }
                                    else if (validateEmail != null) {
                                        if (validateEmail.email == req.body.email) {
                                            res.status(422).json({message:"email already in use"})
                                        }
                                    }

                                } else {
                                    res.status(403).json({message:"Email format is not valid"});
                                }
                            }

                            else if (validateUsername != null) {
                                if (validateUsername.userName == req.body.userName) {
                                    res.status(422).json({message:"username already in use"})
                                }
                            }

                        } else {
                            res.status(403).json({message:"username should contain only alphabets, numbers and underscore, and should be between 5 and 20 characters long"})
                        }

                    }


                } else {
                    res.status(403).json({ message: 'Invalid mobile number length' })
                }


                if (validateNumber != null) {
                    if (validateNumber.mobileNumber == req.body.mobileNumber) {
                        res.status(422).json({ message:"mobile number already in use"})
                    }
                }

            } else {
                res.status(403).json({ message:"mobile number not valid"})
            }











        } else if (req.body.otp == null) {
            res.status(411).send({ message:'otp is required'})
        } else if (req.body.otp.length < 4 || req.body.otp.length > 4) {
            res.status(411).send({ message:'Invalid Otp'})
        }else{
            res.status(411).send({ message:"wrong otp"})
        }
    }
    catch (err) {
        console.error(err);
    }
}      