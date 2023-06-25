const Task = require('../models/Task');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomClass } = require('../error/CustomError');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: task_ID } = req.params;
  const task = await Task.findOne({ _id: task_ID });
  if (!task) {
    return next(createCustomClass(`No task with id: ${task_ID}.`, 404));
    // return res.status(404).json({ msg: `There is no such id: ${task_ID}` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: task_ID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: task_ID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomClass(`No task with id: ${task_ID}.`, 404));
    // return res
    //   .status(404)
    //   .json({ msg: `There is no such item with id: ${task_ID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: task_ID } = req.params;
  const task = await Task.findOneAndDelete({ _id: task_ID });
  if (!task) {
    return next(createCustomClass(`No task with id: ${task_ID}.`, 404));
    // return res
    //   .status(404)
    //   .json({ msg: `There is no such item with id: ${task_ID}` });
  }
  // res.status(200).json(task);
  // res.status(200).send();
  res.status(200).json({ task: null, status: 'success' });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
