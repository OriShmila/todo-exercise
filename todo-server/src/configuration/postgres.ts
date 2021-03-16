import pg, { Pool } from "pg";

pg.defaults.ssl = {
  rejectUnauthorized: false,
};

export const POSTGRES_URI =
  process.env.POSTGRES_DATABASE_URL ||
  `postgres://hcyiowfmiindvk:ff3188920c4c5c6aa9ccf2d46c4fa937636f1b05d98308746e26d05f37b8ca23@ec2-54-158-222-248.compute-1.amazonaws.com:5432/d1l4p8g32nnv2g`;

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
