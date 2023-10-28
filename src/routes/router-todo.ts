import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/router-controller.js";

const router = Router();

router.route("/").post(createTodo);

router.route("/").get(getTodos);

router.route("/:id").get(getTodoById);

router.route("/:id").delete(deleteTodo);

router.route("/:id").put(updateTodo);

export default router;
