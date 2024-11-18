import ApiResponse from "../../utils/ApiResponse.js";


const profile = async (req, res, next) => {
  try {
    const user = req.user;

    if(!user) {
      return res.status(404).json(ApiResponse.error(404, "User not found"));
    }

    return res.status(200).json(ApiResponse.success(200, "User profile", user));
  } catch (error) {
    next(new ApiError(500, "Internal server error"));
  }
}

export default profile;