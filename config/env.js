import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { jwt_secret, jwt_expires_in, PORT, NODE_ENV, DB_URI } =
  process.env;
