import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { type Task } from "../validation/validate.js";

interface DatabaseType {
  tasks: Task[];
  idGenerator: number;
}

interface todoManagerType {
  createTodo: (newTodo: Task) => Promise<Task>;
}

export class TodoManager implements todoManagerType {
  private readonly db: Low<DatabaseType>;

  constructor() {
    const adapter = new JSONFile<{ tasks: Task[]; idGenerator: number }>(
      "tasks.json"
    );
    this.db = new Low(adapter, { tasks: [], idGenerator: 0 });
  }

  public async createTodo(newTodo: Task): Promise<Task> {
    await this.db.read();

    const { title, description, due_date } = newTodo;
    const finalNewTodo = {
      id: ++this.db.data.idGenerator,
      title,
      description,
      due_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.db.data.tasks.push(finalNewTodo);
    await this.db.write();

    return finalNewTodo;
  }

  public async getTodos(): Promise<Task[]> {
    await this.db.read();
    return this.db.data.tasks;
  }

  public async getTodoById(id: string): Promise<Task | undefined> {
    await this.db.read();
    return this.db.data.tasks.find((task) => task.id === +id);
  }

  public async deleteTodo(id: string) {
    await this.db.read();
    const filteredTodos = this.db.data.tasks.filter((task) => task.id !== +id);
    this.db.data.tasks = filteredTodos;
    await this.db.write();
  }

  public async updateTodo(id: string, newTodo: Task) {
    await this.db.read();
    let taskIndex = this.db.data.tasks.findIndex((task) => task.id === +id);
    const { title, description, due_date } = newTodo;
    const finalNewTodo = {
      id: +id,
      title,
      description,
      due_date,
      created_at: this.db.data.tasks[taskIndex].created_at,
      updated_at: new Date().toISOString(),
    };
    this.db.data.tasks[taskIndex] = finalNewTodo;
    await this.db.write();

    return finalNewTodo;
  }
}

// export const validateTaskData = async (request: Request): Promise<Task> => {
//   const validationResult = taskSchema.parse(request);
//   return validationResult;
// };
