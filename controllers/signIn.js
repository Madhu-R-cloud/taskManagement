const bcrypt = require('bcryptjs');
const User = require('../models/employee');
const Userdata = require('../models/data');

module.exports = {
    post: async (req, res) => {
        try {
            // let saltRounds = 10;
            let { password, username } = req.body;
            if ((!password) || (!username)) {
                return res.status(400).send({ message: 'UserName and Password fields are required' })
            }
            const user = await User.findOne({ where: { userName: username }, attributes: ['verified','id','password','mobileNumber','isActive'] });
            if(!user) {
                return res.status(404).json({ message: "user not found, Please SigUn first or Enter Valid User Name" });
            }
        
            if(user.isActive!=true){
                return res.status(400).send({ message: 'This User is Deactivated, Please Wait for Admin to Active'});
            } 
            else if (user.verified == 'pending') {
                return res.status(400).send({ message: "Please Wait For the Admin Approval" });
            }
            else if (user.verified == 'rejected') {
                return res.status(400).send({ message: "Sorry, Admin Rejected You Request" });
            }
            else if(user.verified == 'approved') {

                const validPassword = await bcrypt.compare(password, user.password)
                // console.log(validPassword);
                if (!validPassword) {
                    return res.status(400).json({ message: "Invalid Passwoed, please Enter correct one" });
                }
                else {
                    let userName = await User.findOne({ where: { mobileNumber: user.mobileNumber }, attributes: ['id','userName'] });
                    return res.status(200).json({ message: "Login successfull", userName });

                }
            }
        } catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }
    }
}