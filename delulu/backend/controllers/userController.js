import userModel from "../models/userModel.js";
// validator is an npm package used to validate strings.
import validator from "validator";
// bcrypt is used to hash passwords before storing them in the database.
import bcrypt from "bcrypt";
import { response } from "express";
// For creating the token
import jwt from "jsonwebtoken";
// Frontend Request
//         ↓
// Route
//         ↓
// Controller
//         ↓
// Model(Database)
//         ↓
// Response

// token is a secret unique string created after login.
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
        try {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User dosen't exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = createToken(user._id);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
} catch (error) {
  console.log(error);
  res.json({ success: false, message: error.message });
}
};

// Route for user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }
    // Hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// Route for admin login

const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD  ){
      // jwt.sign() is used to create a JWT (JSON Web Token).
      const token = jwt.sign(email+password , process.env.JWT_SECRET)
      res.json({success:true , token})
    }
    else{
      res.json({success:false , message:"Invalid crdentials"})
    }
  } catch (error) {
    res.json({success:false , message:error.message})
  }
};
export { loginUser, registerUser, adminLogin };
