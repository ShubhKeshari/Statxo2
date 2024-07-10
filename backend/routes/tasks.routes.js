const express = require("express");
const { Task } = require("../models/task.model");
const { authenticateUser } = require("../middleware/users.middleware");
const tasksRoute = express.Router();

tasksRoute.get("/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: `Some error occurred, error : ${error}` });
  }
});

tasksRoute.patch("/update", authenticateUser, async (req, res) => {
  try {
    const tasksToUpdate = req.body.tasks;
    const isAdmin = req.isAdmin;

    const updatedTasks = await Promise.all(
      tasksToUpdate.map(async (taskData) => {
        const { _id, amount, actionType, actionName, status } = taskData;
        if (!["Type1", "Type2", "Type3"].includes(actionType)) {
          return res
            .status(400)
            .json({ error: true, message: "Invalid Action Type" });
        }

        if (!["Action1", "Action2", "Action3"].includes(actionName)) {
          return res
            .status(400)
            .json({ error: true, message: "Invalid Action Name" });
        }
        if (!["Pending", "InProgress", "Approved"].includes(status)) {
          return res.status(400).json({ error: true, message: "Invalid Status" });
        }
        const updateFields = isAdmin
          ? { amount, actionType, actionName, status }
          : { amount, actionType, actionName };
        const updatedTask = await Task.findByIdAndUpdate(_id, updateFields, {
          new: true,
        });
        if (!updatedTask) {
          return res.status(400).json({
            error: true,
            message: `Task with ID ${_id} not found or update failed`,
          });
        }
        return updatedTask;
      })
    );

    return res
      .status(200)
      .json({ message: "Fields updated successfully", data: updatedTasks });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Some error occurred, error: ${error}`,
    });
  }
});

tasksRoute.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { tasksRoute };
