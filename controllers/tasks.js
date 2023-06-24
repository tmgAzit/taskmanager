const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: task_ID } = req.params;
    const task = await Task.findOne({ _id: task_ID });
    if (!task) {
      return res.status(404).json({ msg: `There is no such id: ${task_ID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: task_ID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: task_ID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `There is no such item with id: ${task_ID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: task_ID } = req.params;
    const task = await Task.findOneAndDelete({ _id: task_ID });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `There is no such item with id: ${task_ID}` });
    }
    // res.status(200).json(task);
    // res.status(200).send();
    res.status(200).json({ task: null, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
