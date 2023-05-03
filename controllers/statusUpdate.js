
const User = require('../models/employee');


module.exports = {
    put: async (req, res) => {
        try {
            let { value, username } = req.body;
            if ((value) && (username)) {
                let updates = await User.update({ isActive: value },{ where: { userName: username } });
    
                if (updates!=0) {
                    return res.status(200).send({ message: "Status Updated Successfully" })
                }
                else {
                    return res.status(404).send({ message: "Status Not Updated" })
                }
            } else if ((value == '') || (username == '')) {
                return res.status(404).send({ message: "invalid request" })

            }
        }
        catch (error) {
            console.log(error);
        }
    }
}