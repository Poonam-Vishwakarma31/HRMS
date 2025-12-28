import * as leaveService from "./leave.service.js"

const handleError = (res, err) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
};

export const createLeave = async (req, res) => {
  try {
    const leave = await leaveService.createLeave({
      user: req.user,
      payload: req.body
    });
    res.status(201).json(leave);
  } catch (err) {
    handleError(res, err);
  }
};

export const getLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getLeaves({
      user: req.user
    });
    res.json(leaves);
  } catch (err) {
    handleError(res, err);
  }
};

export const approveLeave = async (req, res) => {
  try {
    const leave = await leaveService.approveLeave({
      user: req.user,
      leaveId: req.params.id
    });
    res.json(leave);
  } catch (err) {
    handleError(res, err);
  }
};

export const rejectLeave = async (req, res) => {
  try {
    const leave = await leaveService.rejectLeave({
      user: req.user,
      leaveId: req.params.id,
      reason: req.body.reason
    });
    res.json(leave);
  } catch (err) {
    handleError(res, err);
  }
};

export const cancelLeave = async (req, res) => {
  try {
    const leave = await leaveService.cancelLeave({
      user: req.user,
      leaveId: req.params.id
    });
    res.json(leave);
  } catch (err) {
    handleError(res, err);
  }
};
