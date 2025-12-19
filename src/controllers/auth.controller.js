import User from "../models/User.model.js";
import { createToken } from "./jwt.js";
import { ValidateFields } from "../utils/validation.js";


const handelUnexpectedError = (req, res, error, functionName) => {
  console.log(`Error occurred in ${functionName}:`, error);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!ValidateFields(name, email, password)) {
      return res
        .status(422)
        .json({ message: "One or more fields are invalid" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user= new User({name, email, password, role})
    await user.save();
    res.status(201).json({user})

  } catch (error) {
    return handelUnexpectedError(req, res, error, signup.name);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
       if (!ValidateFields( email, password)) {
      return res
        .status(422)
        .json({ message: "One or more fields are invalid" });
    }

    const existingUser= await User.findOne({email});
    if(!existingUser){
        return res.status(400).json({message: "Invalid email or password"})
    }
    const isPasswordCorrect= await comparePassword("password")
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid email or password"})
    }

    // Generate JWT
    const token= createToken(existingUser.id, existingUser.email, role)

    return res.status(200).json({token})

  } catch (error) {
    return handelUnexpectedError(req, res, error, login.name);
  }
};
