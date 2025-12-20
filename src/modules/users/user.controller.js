
import {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from "./user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ users });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await getUserByIdService(req.user.id);
    res.status(200).json({ user });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserService(
      req.params.id,
      req.body
    );
    res.status(200).json({ user: updatedUser });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
