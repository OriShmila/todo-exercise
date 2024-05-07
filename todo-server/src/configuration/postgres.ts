import pg, { Pool } from "pg";

pg.defaults.ssl = {
  rejectUnauthorized: false,
};

export const POSTGRES_URI =
  process.env.POSTGRES_DATABASE_URL;

export const connectPostgresDb = async (connectionString: string) => {
  try {
    const connection: Pool = new Pool({
      connectionString,
    });

    await connection.connect();
    console.log("Connected to Postgres database");

    return connection;
  } catch (error) {
    console.log(error.message);

    return null;
  }
};
