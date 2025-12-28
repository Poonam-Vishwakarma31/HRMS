import { registerService, loginService, assignManagerService } from "./auth.service.js";

const handelUnexpectedError = (req, res, error, functionName) => {
  console.error(`Error in ${functionName}:`, error);
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).json({ success: false, message });
};

// register controller
export const register = async (req, res) => {
  try {
    const user = await registerService({
      ...req.body,
      createdBy: req.user
    });

    res.status(201).json(user);
  } catch (error) {
    handelUnexpectedError(req, res, error, register.name);
  }
};


export const assignManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;

    const employee = await assignManagerService({
      employeeId: id,
      managerId
    });

    res.status(200).json({
      message: "Manager assigned successfully",
      employee
    });
  } catch (error) {
    handelUnexpectedError(req, res, error, assignManager.name);
  }
};


// Login controller
export const login = async (req, res) => {
  try {
    const { user, token } = await loginService(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    handelUnexpectedError(req, res, error, login.name);
  }
};

