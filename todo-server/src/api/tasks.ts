import { Router } from "express";
import { QueriesType } from "../db/db-queries";
import { dbQueries } from "../server";
import { isNullOrUndefined } from "../utils/is-null-or-undefined";

export const tasks = Router();

tasks.use((req, res, next) => {
  console.log(`request tasks at: ${new Date().toLocaleString()}`);
  next();
});

tasks.get("/:userId", async (req, res) => {
  const userId = +req.params.userId;

  try {
    const result = await dbQueries.get(QueriesType.SELECT_TASKS_BY_USER, [
      userId,
    ]);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

tasks.post("/", async (req, res) => {
  if (
    isNullOrUndefined(req.body.description) ||
    isNullOrUndefined(req.body.userId)
  ) {
    res.status(422).send("missing properties");
    return;
  }

  const values = [req.body.description, req.body.userId];

  try {
    await dbQueries.save(QueriesType.INSERT_TASK, values);

    res.status(201).send("task add");
  } catch (error) {
    res.status(404).send("Not found");
  }
});

tasks.put("/:id", async (req, res) => {
  const id = +req.params.id;
  const completed = req.body.completed;

  if (isNullOrUndefined(completed)) {
    res.status(422).send("missing Completed property");
    return;
  }

  try {
    await dbQueries.save(QueriesType.UPDATE_TASK, [completed, id]);

    res.status(200).send("task updated");
  } catch (error) {
    res.status(404).send("Not found");
  }
});

tasks.delete("/:id", async (req, res) => {
  const id = +req.params.id;

  try {
    await dbQueries.save(QueriesType.DELETE_TASK, [id]);

    res.status(200).send("task removed");
  } catch (error) {
    res.status(404).send("Not found");
  }
});
