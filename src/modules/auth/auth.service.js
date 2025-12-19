import User from "../model/User.model.js";
import { createToken } from "./token.service.js";
import { ValidateFields } from "../../utils/validation.js";

// register service
export const registerService = async ({ name, email, password, role }) => {
  if (!ValidateFields(name, email, password)) {
    throw { status: 422, message: "One or more fields are invalid" };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 409, message: "User already exists" };
  }

  const user = new User({ name, email, password, role });
  await user.save();
  return user;
};

// Login service
export const loginService = async ({ email, password }) => {
  if (!ValidateFields(email, password)) {
    throw { status: 422, message: "One or more fields are invalid" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 400, message: "Invalid email or password" };
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw { status: 400, message: "Invalid email or password" };
  }

  const token = createToken(user.id, user.email, user.role);
  return { user, token };
};
