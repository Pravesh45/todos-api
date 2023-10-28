import { type Request, type Response, type NextFunction } from "express";
// import { taskSchema } from "../validation/validate.js";

export const validateTaskData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const postData = req.body;

  try {
    // Validate the incoming data against TaskSchema
    // const validatedData = taskSchema.parse(postData);
    // req.validatedData = validatedData;
    next();
  } catch (error) {
    // Handle validation error
    res
      .status(400)
      .json({ message: `${error.errors[0].path} ${error.errors[0].message}` });
  }
};
