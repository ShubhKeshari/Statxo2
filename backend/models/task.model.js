const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id:{
    type:Number,
    required:true
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  postingYear: {
    type: Number,
    required: true,
  },
  postingMonth: {
    type: String,
    required: true,
  },
  actionType: {
    type: String,
    enum: ["Type1", "Type2", "Type3"],
    required: true,
  },
  actionName: {
    type: String,
    enum: ["Action1", "Action2", "Action3"],
    required: true,
  },
  actionNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "InProgress", "Approved"],
    required: true,
  },
  Impact: {
    type: String,
    enum: ["High", "Low", "Mid"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = { Task };
