import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const loginUser = async (req, res, next) => {
    try {
        const  { email, password } = req.body;

        const cookie = req.cookies.token;
        if(cookie) {
            return next(new ApiError(400, "User already logged in"));
        }

        if(!email || !password) {
            return next(new ApiError(400, "Please provide all the fields"));
        }

        const user = await User.findOne({ email });
        if(!user) {
            return next(new ApiError(400, "User not found"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return next(new ApiError(400, "Invalid credentials"));;
        }

        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).cookie("token",token).json(ApiResponse.success(200, "Login successful", user));
    } catch (error) {
        next(new ApiError(400, "Login failed"))
    }
    
}

export default loginUser;