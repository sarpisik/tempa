import { Pool, PoolClient } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.PGADMIN_DEFAULT_PASSWORD,
    port: 5432,
});

export type Table = PoolClient;

export default function database() {
    return pool.connect();
}
