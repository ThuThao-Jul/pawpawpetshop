const User = require("../models/user");
const bcrypt = require('bcrypt');
const utilHelper = require("../helpers/utils.helper");

const authController = {}


authController.register = async (req,res,next) => {
    try {
        let {email, password, ...data} = { ...req.body};
        let user = await User.findOne({ email });
        if (user) return next(new Error('401 - Email already exists'));

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);
        
        if (email === "admin@gmail.com") {
            user = await User.create({
                ...data,
                role: "admin",
                email,
                password
            })
        } else {
        user = await User.create({
            ...data,
            email,
            password
        });}
        utilHelper.sendResponse(
            res,
            200,
            true,
            { user },
            null,
            "Create new account successfully."
        )
    } catch (error) {
        next(error)
    }
};

authController.login = async (req,res,next) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return next(new Error('401 - Email doesnt exist'));

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new Error('401 - Wrong password'));

        const accessToken = await user.generateToken();
        utilHelper.sendResponse(
            res,
            200,
            true,
            {user, accessToken},
            null,
            "Login successfully."
        )
    } catch (error) {
        next(error)
    }
};

module.exports = authController;