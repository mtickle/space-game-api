import dotenv from 'dotenv';
import fs from 'fs';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

// The pool now uses individual environment variables to build the connection.
// This is more flexible than a single connection string.
const pool = new pg.Pool({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync("ca.pem").toString(),
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const query = (text, params) => pool.query(text, params);

export default pool;

