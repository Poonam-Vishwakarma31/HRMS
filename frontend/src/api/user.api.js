// src/api/user.api.js
import api from "./axios.js";

// SELF
export const getMyProfile = () => {
  return api.get("/users/me");
};

// VIEW ANY (admin / hr)
export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

// UPDATE
export const updateUser = (userId, payload) => {
  return api.put(`/users/${userId}`, payload);
};

// LIST USERS (admin / hr)
export const getUsers = () => {
  return api.get("/users");
};
