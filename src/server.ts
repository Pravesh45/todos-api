import express from "express";
import routerTodo from "./routes/router-todo.js";

const app = express();

app.use(express.json());

app.use("/todos", routerTodo);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
