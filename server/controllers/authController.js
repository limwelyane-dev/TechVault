const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { 
    createUser,
    findUserByEmail,
 } = require("../services/authService");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await createUser(name, email, password);

        res.status(201).json(user);

    } catch (error){
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if(!user){
            return res.status(401).json({
                message : "Invalid Email or Password",
            });
        }
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordMatch){
            return res.status(401).json({
                message : "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.json({
            message : "Login successfull",
            token,
            user: {
                id : user.id,
                name: user.name,
                email : user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};