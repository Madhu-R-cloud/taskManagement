const empData = require('../models/employee')
const bcrypt = require('bcryptjs');

module.exports = {
    post: async (req, res) => {
        try {
            let { newpasscode, confirmpasscode, Phone, otp } = req.body;
            console.log(Phone)
            let changedPasscode;
            if (!otp) {
                res.status(200).send({ message: "first verify the user by entering valid mobile number and otp " });
            }
            else if (otp == "1234") {
                // console.log("user verified");
                if (newpasscode != confirmpasscode) {
                    res.status(403).send({ message: "newpassword and confirm passwords are not matching " });
                }
                else {
                    const useremail = await empData.findOne({ where: { mobileNumber: Phone }, attributes: ['mobileNumber', 'firstName', 'lastName'] });

                    if (!useremail) {
                        res.status(401).send({ message: "You are not registered user" });
                    }

                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(newpasscode, salt);
                    changedPasscode = await empData.update({ password: hashedPassword }, { where: { mobileNumber: Phone } })

                    if (changedPasscode == true) {
                        res.status(200).send({ message: "Password Changed" });
                    }
                    else {
                        res.status(400).send({ message: "Password Not Changed" });
                    }
                }
            }
            else {
                res.status(400).send({ message: 'Invalid otp' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}