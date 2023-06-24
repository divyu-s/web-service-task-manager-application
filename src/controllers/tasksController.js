import tasks from "../tasks.json" assert { type: "json" };
import {
  UI_CONSTANT_MESSAGES,
  TaskObjReqProps,
} from "../constants/appConstant.js";
import {
  isObjHasInvalidProps,
  isObjContainsReqProps,
  objHasEmptyProps,
} from "../helper/utility.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Method to send all tasks to client
 * @param {*} req
 * @param {*} res
 */
export const sendAllTasks = (req, res) => {
  res.status(200).json(tasks.tasks);
};

/**
 * Method to send a task with specific id from task list
 * @param {*} req
 * @param {*} res
 */
export const sendSpecificTask = (req, res) => {
  const taskId = req.params.taskId;
  const task = tasks.tasks.find((task) => task.id == taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send(UI_CONSTANT_MESSAGES.Invalid_Id);
  }
};

/**
 * Method to delete a task by id from task list
 * @param {*} req
 * @param {*} res
 */
export const deleteSpecificTask = (req, res) => {
  const taskId = req.params.taskId;
  const taskIndex = tasks.tasks.findIndex((task) => task.id == taskId);
  if (taskIndex >= 0) {
    const array = tasks.tasks.splice(taskIndex, 1);
    const writePath = path.join(__dirname, "..", "tasks.json");
    fs.writeFileSync(writePath, JSON.stringify(tasks), {
      encoding: "utf-8",
      flag: "w",
    });
    res
      .status(200)
      .send(`${array[0].title} is ${UI_CONSTANT_MESSAGES.Deleted_Succesfully}`);
  } else {
    res.status(404).send(UI_CONSTANT_MESSAGES.Invalid_Id);
  }
};

/**
 * Method to create a new task
 * @param {*} req
 * @param {*} res
 */
export const createNewTask = (req, res) => {
  const taskDetails = req.body;

  if (
    !isObjHasInvalidProps(taskDetails, TaskObjReqProps) &&
    isObjContainsReqProps(taskDetails, TaskObjReqProps) &&
    !objHasEmptyProps(taskDetails)
  ) {
    tasks.tasks.push({ id: Date.now(), ...taskDetails });
    const writePath = path.join(__dirname, "..", "tasks.json");
    console.log("fdg", writePath);
    fs.writeFileSync(writePath, JSON.stringify(tasks), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send(UI_CONSTANT_MESSAGES.New_Task_Added);
  } else if (
    !isObjHasInvalidProps(taskDetails, TaskObjReqProps) &&
    isObjContainsReqProps(taskDetails, TaskObjReqProps) &&
    objHasEmptyProps(taskDetails)
  ) {
    res.status(400).send(UI_CONSTANT_MESSAGES.Should_Not_Empty);
  } else {
    res.status(400).send(UI_CONSTANT_MESSAGES.Malformed_Data);
  }
};

/**
 * Method to update a specific task by id
 * @param {*} req
 * @param {*} res
 */
export const updateSpecificTask = (req, res) => {
  const taskId = req.params.taskId;
  const taskDetails = req.body;
  const taskIndex = tasks.tasks.findIndex((task) => task.id == taskId);
  if (!isObjHasInvalidProps(taskDetails, TaskObjReqProps) && taskIndex >= 0) {
    for (let property in taskDetails) {
      tasks.tasks[taskIndex][property] = taskDetails[property];
      const writePath = path.join(__dirname, "..", "tasks.json");
      fs.writeFileSync(writePath, JSON.stringify(tasks), {
        encoding: "utf-8",
        flag: "w",
      });
    }
    res.status(200).send(UI_CONSTANT_MESSAGES.Updated_Successfully);
  } else if (isObjHasInvalidProps(taskDetails, TaskObjReqProps)) {
    res.status(400).send(UI_CONSTANT_MESSAGES.Malformed_Data);
  } else {
    if (taskIndex < 0) {
      res.status(404).send(UI_CONSTANT_MESSAGES.Invalid_Id);
    }
  }
};
