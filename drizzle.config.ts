import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

const { TURSO_DB_URL, TURSO_DB_AUTH_TOKEN } = process.env;

if (TURSO_DB_URL === undefined) {
	throw new Error('TURSO_DB_URL is not defined');
}

if (TURSO_DB_AUTH_TOKEN === undefined && !TURSO_DB_URL.startsWith('file:')) {
	new Error('TURSO_DB_AUTH_TOKEN is not defined');
}
console.log('DB_URL: ', TURSO_DB_URL);

export default {
	schema: './src/lib/server/drizzle/schema.js',
	out: './db/migrations',
	driver: 'turso',
	dbCredentials: {
		url: TURSO_DB_URL as string,
		authToken: TURSO_DB_AUTH_TOKEN as string
	}
} satisfies Config;
