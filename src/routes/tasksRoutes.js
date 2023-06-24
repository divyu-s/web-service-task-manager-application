import express from "express";
import {
  sendAllTasks,
  sendSpecificTask,
  deleteSpecificTask,
  createNewTask,
  updateSpecificTask,
} from "../controllers/tasksController.js";

const router = express.Router();

router.route("/").get(sendAllTasks).post(createNewTask);
router
  .route("/:taskId")
  .get(sendSpecificTask)
  .delete(deleteSpecificTask)
  .put(updateSpecificTask);

export default router;
