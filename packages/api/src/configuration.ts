import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DB_HOST: z.string().trim(),
  DB_NAME: z.string().trim(),
  DB_USER: z.string().trim(),
  DB_PASS: z.string().trim(),
  JWT_SECRET: z.string().trim(),
});

const { data, error } = envSchema.safeParse(process.env);

if (!data) {
  const message = error?.errors
    .map(({ message, path }) => ` - ${path} ${message}`)
    .join('\n');
  console.error('Bad environment configuration:');
  console.error(message);
  process.exit();
}

export const { DB_HOST, DB_NAME, DB_USER, DB_PASS, JWT_SECRET } = data;
