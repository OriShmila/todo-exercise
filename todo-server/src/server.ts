import express from "express";
import cors from "cors";
import { PostgresQueries } from "./db/postgres/actions";
import { queriesString as postgresQueriesString } from "./db/postgres/queries";
import { DbQueries } from "./db/db-queries";
import { tasksApi, usersApi } from "./api";
import { connectPostgresDb, POSTGRES_URI } from "./configuration/postgres";
import { userSchema } from "./db/mongo/schema";
import { MongoActions } from "./db/mongo/actions";
import { UsersActions } from "./db/mongo/users-actions";
import { connectMongoDb } from "./configuration/mongo";

const server = express();
const port = process.env.PORT || 5000;

export let dbQueries: DbQueries;

const initDb = async () => {
  const [postgresDbConnection, mongoDbConnection] = await Promise.all([
    connectPostgresDb(POSTGRES_URI),
    connectMongoDb(),
  ]);
  const mongoActions = new MongoActions(userSchema);
  const mongoUserActions = new UsersActions(mongoActions);

  const postgresQueries = new PostgresQueries(
    postgresDbConnection,
    postgresQueriesString
  );

  dbQueries = new DbQueries(postgresQueries, mongoUserActions);
};

initDb();
server.use(express.json());
server.use(cors());
server.use("/users", usersApi);
server.use("/tasks", tasksApi);

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
