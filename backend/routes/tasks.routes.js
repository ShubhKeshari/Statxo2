const express = require("express");

const { authenticateUser } = require("../middleware/users.middleware");
const { getTask, updateTask, addTask } = require("../controller/tasks.controller");
const tasksRoute = express.Router();

//To Get all the data
tasksRoute.get("/task", getTask);

//Update the table data
tasksRoute.patch("/update", authenticateUser, updateTask);

//Add item to the table
tasksRoute.put('/add', authenticateUser,addTask );

tasksRoute.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { tasksRoute };
