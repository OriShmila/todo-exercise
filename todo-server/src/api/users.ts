import { Router } from "express";
import { extractFromArray } from "../utils/extract-from-array";
import { QueriesType } from "../db/db-queries";
import { dbQueries } from "../server";
import { isNullOrUndefined } from "../utils/is-null-or-undefined";

export const users = Router();

users.use((req, res, next) => {
  console.log(`request users at: ${new Date().toLocaleString()}`);
  next();
});

users.get("/", async (req, res) => {
  try {
    const result = await dbQueries.get(QueriesType.SELECE_USERS);

    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Not found");
  }
});

users.post("/", async (req, res) => {
  const name = req.body.name;

  if (isNullOrUndefined(name)) {
    res.status(422).send("missing Name property");
    return;
  }

  try {
    const result = await dbQueries.save(QueriesType.INSERT_USER, [name]);

    res.status(201).send(extractFromArray(result));
  } catch (error) {
    res.status(404).send("Not found");
  }
});
