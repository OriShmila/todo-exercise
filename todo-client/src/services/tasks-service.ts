import axios from "./api";

export class TasksService {
  private _pathname = "/tasks";

  public fetchTasksBy = async (userId: number): Promise<Task[]> => {
    const { data } = await axios.get(`${this._pathname}/${userId}`);

    return data || [];
  };

  public createTask = async (userId: number, description: string) => {
    const { data } = await axios.post(this._pathname, { description, userId });

    return data;
  };

  public deleteTask = async (id: number) => {
    const { data } = await axios.delete(`${this._pathname}/${id}`);

    return data;
  };

  public updateCompeletedTask = async (id: number, completed: boolean) => {
    const { data } = await axios.put(`${this._pathname}/${id}`, {
      completed,
    });

    return data;
  };
}

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export const tasksService = new TasksService();
