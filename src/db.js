import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: '127.0.0.1',
    user: 'admin',
    password: 'americo',
    port: 3306,
    database: 'db_bible'
})