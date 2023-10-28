import { type Request, type Response } from "express";
import { validateTaskData } from "../middleware/data-validator.js";
import { TodoManager } from "../db/lowdb.js";

export const createTodo = [
  validateTaskData,
  async (req: Request, res: Response) => {
    try {
      const { title, description, due_date } = req.body;
      const todoManager = new TodoManager();
      const newTask = await todoManager.createTodo({
        title,
        description,
        due_date,
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
];

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todoManager = new TodoManager();
    const tasks = await todoManager.getTodos();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todoManager = new TodoManager();
    const task = await todoManager.getTodoById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoManager = new TodoManager();
    const tasks = await todoManager.getTodoById(req.params.id);
    if (tasks) {
      await todoManager.deleteTodo(req.params.id);
      res.status(200).json({
        message: `Todo with id ${req.params.id} deleted successfully`,
      });
    } else {
      res
        .status(404)
        .json({ message: `Task with id ${req.params.id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateTodo = [
  validateTaskData,
  async (req: Request, res: Response) => {
    try {
      const todoManager = new TodoManager();
      const tasks = await todoManager.getTodoById(req.params.id);
      if (tasks) {
        const { title, description, due_date } = req.body;
        const updatedTask = await todoManager.updateTodo(req.params.id, {
          title,
          description,
          due_date,
        });
        res.status(200).json(updatedTask);
      } else {
        res
          .status(404)
          .json({ message: `Task with id ${req.params.id} not found` });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
];
