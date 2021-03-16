import axios from "./api";

class UsersService {
  private _pathname = "/users";

  public fetchAllUsers = async (): Promise<User[]> => {
    const { data } = await axios.get(this._pathname);

    return data || [];
  };

  public createUser = async (name: string): Promise<User> => {
    const { data } = await axios.post(this._pathname, { name });

    return data;
  };
}

export interface User {
  id: number;
  name: string;
}

export const usersService = new UsersService();
