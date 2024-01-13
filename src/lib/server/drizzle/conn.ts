import { type LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import { createClient as clientFile } from '@libsql/client';
import { createClient as clientHttp } from '@libsql/client/http';
import * as schema from './schema.js';
import conn from '../../../../drizzle.config.js';

const client = conn.dbCredentials.url.startsWith('file:') ? clientFile : clientHttp;

export function tursoClient(): LibSQLDatabase<typeof schema> {
	return drizzle(client(conn.dbCredentials), { schema });
}
