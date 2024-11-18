import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json(ApiResponse.error(401, "Please login first"));
    }
  
    const {email} = jwt.verify(token, process.env.JWT_SECRET);
  
    if (!email) {
      return res.status(401).json(ApiResponse.error(401, "Please login first"));
    }
  
    const user = await User.findOne({ email }).select("-password");
  
    if (!user) {
      return res.status(401).json(ApiResponse.error(401, "Please login first"));
    }
  
    req.user = user;
  
    next();
  } catch (error) {
    next(new ApiError(500, "Internal server error"));    
  }
}


export default isLoggedIn;