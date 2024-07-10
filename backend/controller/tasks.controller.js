const { Task } = require("../models/task.model");

export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1, updatedAt: -1 });
    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: `Some error occurred, error : ${error}` });
  }
};

export const updateTask = async (req, res) => {
  try {
    const tasksToUpdate = req.body.tasks;
    const isAdmin = req.isAdmin;
    if (tasksToUpdate.length == 0) {
      return res.status(400).json({
        error: true,
        message: "No updated data given by user",
      });
    }
    const updatedTasksPromises = tasksToUpdate.map(async (taskData) => {
      const { _id, amount, actionType, actionName, status } = taskData;
      if (!["Type1", "Type2", "Type3"].includes(actionType)) {
        return { _id, error: true, message: "Invalid Action Type" };
      }
      if (!["Action1", "Action2", "Action3"].includes(actionName)) {
        return { _id, error: true, message: "Invalid Action Name" };
      }
      if (isAdmin && !["Pending", "InProgress", "Approved"].includes(status)) {
        return { _id, error: true, message: "Invalid Status" };
      }
      const updateFields = isAdmin
        ? { amount, actionType, actionName, status }
        : { amount, actionType, actionName };

      try {
        const updatedTask = await Task.findByIdAndUpdate(_id, updateFields, {
          new: true,
        });
        if (!updatedTask) {
          return {
            _id,
            error: true,
            message: `Task with ID ${_id} not found or update failed`,
          };
        }
        return { ...updatedTask.toObject(), error: false };
      } catch (updateError) {
        return {
          _id,
          error: true,
          message: `Update failed for task with ID ${_id}: ${updateError.message}`,
        };
      }
    });

    const results = await Promise.all(updatedTasksPromises);
    const errors = results.filter((result) => result.error);
    const updatedTasks = results.filter((result) => !result.error);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        message: "Some tasks could not be updated",
        errors,
      });
    }

    return res.status(200).json({
      message: "Fields updated successfully",
      data: updatedTasks,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Some error occurred, error: ${error}`,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const {
      quantity,
      amount,
      postingYear,
      postingMonth,
      actionType,
      actionName,
      actionNumber,
      status,
      Impact,
    } = req.body;

    if (
      !quantity ||
      !amount ||
      !postingYear ||
      !postingMonth ||
      !actionType ||
      !actionName ||
      !actionNumber ||
      !status ||
      !Impact
    ) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    const tasksCount = await Task.countDocuments();
    const newTask = new Task({
      _id: tasksCount + 1,
      quantity,
      amount,
      postingYear,
      postingMonth,
      actionType,
      actionName,
      actionNumber,
      status,
      Impact,
    });

    await newTask.save();

    res.status(201).json({
      message: "Task added successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Error adding task: ${error.message}`,
    });
  }
};
