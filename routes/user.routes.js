import { Router } from "express";
import registerUser from "../Controllers/User/registerUser.js";
import loginUser from "../Controllers/User/loginUser.js";
import logoutUser from "../Controllers/User/logoutuser.js";
import isLoggedIn from "../middlewares/isLoggedin.js";
import profile from "../Controllers/User/profile.js";
import donationHistory from "../Controllers/donation/donationHistory.js";
import donationSchedule from "../Controllers/donation/donationSchedule.js";


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/profile', isLoggedIn, profile);
router.get('/donationHistory', isLoggedIn, donationHistory);
router.post('/donationSchedule', isLoggedIn, donationSchedule);


export default router;