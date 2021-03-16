import { Pool } from "pg";

export const connectPostgresDb = async (connectionString: string) => {
  try {
    const connection: Pool = new Pool({
      connectionString,
    });

    await connection.connect();
    console.log("connected to database");

    return connection;
  } catch (error) {
    console.log(error.message);

    return null;
  }
};
