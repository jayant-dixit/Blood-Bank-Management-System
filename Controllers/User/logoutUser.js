import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";


const logoutUser = async (req, res, next) => {
    try {
        const cookie = req.cookies.token;
        if(!cookie) {
            return next(new ApiError(400, "User not logged in"));
        }

        res.status(200).clearCookie("token").json(ApiResponse.success(200, "Logout successful"));
    } catch (error) {
        next(new ApiError(400, "Logout failed"))
    }

}

export default logoutUser;