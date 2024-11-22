import BloodBank from "../../models/bloodBank.model.js";
import ApiResponse from "../../utils/ApiResponse.js"
import {randomBytes} from "crypto";
import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";

// Helper Function: Generate a 6-digit alphanumeric ID
const generateBloodBankID = () => {
  return randomBytes(3).toString("hex").toUpperCase(); // 3 bytes = 6 characters
};

// Register Blood Bank
const registerBloodBank = async (req, res, next) => {
  try {
    const { name, location, contactNumber, email, password } = req.body;

    // Validate required fields
    if (!name || !location || !contactNumber || !email || !password) {
      return res.status(400).json(ApiResponse.error(400, "All fields are required"));
    }

    // Check if email already exists
    const existingBloodBank = await BloodBank.findOne({ email });
    if (existingBloodBank) {
      return res.status(400).json(ApiResponse.error(400, "Blood bank with this email already exists."));
    }

    let hashpassword = await bcrypt.hash(password, 10)
    // Generate a unique 6-character alphanumeric ID
    let bloodBankID;
    do {
      bloodBankID = generateBloodBankID();
    } while (await BloodBank.findOne({ bloodBankID })); // Ensure uniqueness in the database

    // Create a new blood bank
    const newBloodBank = await BloodBank.create({
      name,
      location: {latitude: location.latitude, longitude: location.longitude},
      contactNumber,
      password: hashpassword,
      email,
      bloodBankId: bloodBankID
    });

    res.status(201).json(ApiResponse.success(201, "Blood bank registered successfully", newBloodBank.bloodBankId));
  } catch (error) {
    next(new ApiError(500, error.message))
  }
};

export default registerBloodBank
