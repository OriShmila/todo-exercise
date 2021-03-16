import { QueriesType } from "../db-queries";

export const queriesString = new Map([
  [
    QueriesType.INSERT_USER,
    `INSERT INTO todo_exercise.users(name)
          VALUES ($1) RETURNING id, name;`,
  ],
  [QueriesType.SELECE_USERS, `SELECT id, name FROM todo_exercise.users;`],
  [
    QueriesType.DELETE_TASK,
    `DELETE FROM todo_exercise.tasks
          WHERE id=$1;`,
  ],
  [
    QueriesType.INSERT_TASK,
    `INSERT INTO todo_exercise.tasks(
      description, user_id)
      VALUES ($1, $2) RETURNING description, user_id, id;`,
  ],
  [
    QueriesType.UPDATE_TASK,
    `UPDATE todo_exercise.tasks
	    SET completed=$1
	    WHERE id=$2;`,
  ],
  [
    QueriesType.SELECT_TASKS_BY_USER,
    `SELECT id, description, completed
	    FROM todo_exercise.tasks  WHERE user_id=$1;`,
  ],
]);
