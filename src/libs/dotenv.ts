import dotenv from 'dotenv';

dotenv.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, JWT_SECRET } = process.env;

export { DB_HOST, DB_NAME, DB_USER, DB_PASS, JWT_SECRET };
