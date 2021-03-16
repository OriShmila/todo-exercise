import { QueriesType, DbAction } from "../db-queries";
import { MongoActions } from "./actions";
import { User } from "./schema";

export class UsersActions implements DbAction {
  private _actions: MongoActions<User>;
  private _actionsMethod = new Map<
    QueriesType,
    (values?: unknown) => Promise<unknown>
  >([
    [
      QueriesType.INSERT_USER,
      async ({ id, name }: { id: number; name: string }) =>
        await this._actions.create({ _id: id, name }),
    ],
    [
      QueriesType.SELECE_USERS,
      async () => await this._actions.select("_id name"),
    ],
    [
      QueriesType.DELETE_TASK,
      async ([id]: [number]) =>
        await this._actions.update(
          { "tasks._id": id },
          { $pull: { tasks: { _id: id } } }
        ),
    ],
    [
      QueriesType.INSERT_TASK,
      async ({
        user_id,
        id,
        description,
      }: {
        user_id: number;
        id: number;
        description: string;
      }) =>
        await this._actions.update(
          { _id: user_id },
          { $push: { tasks: { _id: id, description } } }
        ),
    ],
    [
      QueriesType.SELECT_TASKS_BY_USER,
      async ([id]: [number]) => {
        const result = await this._actions.select(
          "tasks._id tasks.description tasks.completed",
          {
            _id: id,
          }
        );
        return result[0].tasks;
      },
    ],
    [
      QueriesType.UPDATE_TASK,
      async ([completed, id]: [boolean, number]) =>
        this._actions.update(
          { "tasks._id": id },
          { "tasks.$.completed": completed }
        ),
    ],
  ]);

  constructor(actions: MongoActions<User>) {
    this._actions = actions;
  }

  public execute = (queryType: QueriesType, values?: unknown) => {
    const actionMethod = this._actionsMethod.get(queryType);

    return actionMethod(values);
  };
}
