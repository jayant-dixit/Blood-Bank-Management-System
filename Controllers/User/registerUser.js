import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const passwordHash = async (password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, contact, bloodGroup, gender, location } = req.body;

        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return next(new ApiError(400, "User with this email already exists"));
        }

        const hashedPassword = await passwordHash(password);
        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            contact,
            bloodGroup,
            gender,
            location,
        });

        const token = jwt.sign({email: newUser.email}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(201).cookie("token",token).json(ApiResponse.success(201, "User registered successfully", newUser));

    } catch (error) {
        console.log(error)
        next(new ApiError(400, "Registration failed"))
    }
}

export default registerUser;