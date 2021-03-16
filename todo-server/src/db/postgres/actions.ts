import { Pool, QueryResult } from "pg";
import { DbAction, QueriesType } from "../db-queries";

export class PostgresQueries implements DbAction {
  private _connection: Pool;
  private _queriesString: Map<QueriesType, string>;

  constructor(connection: Pool, queriesString: Map<QueriesType, string>) {
    this._connection = connection;
    this._queriesString = queriesString;
  }

  public execute = async (queryType: QueriesType, values: []) => {
    try {
      const result = await this._connection.query(
        this._queriesString.get(queryType),
        values
      );

      console.log("Postgres query succesfull");

      return result.rows;
    } catch (error) {
      throw error;
    }
  };
}
