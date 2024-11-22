import { Router } from "express";
import registerBloodBank from "../Controllers/BloodBank/register.js";



const router = Router()


router.post("/register", registerBloodBank)


export default router