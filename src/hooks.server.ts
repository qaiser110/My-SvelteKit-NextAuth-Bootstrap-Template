import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import Twitter from '@auth/core/providers/twitter';
import { GOOGLE_ID, GOOGLE_SECRET, TWIT_ID, TWIT_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import { db } from './lib/server/drizzle/schema.js';
import { tursoClient } from '$lib/server/drizzle/conn.js';
import { dev } from '$app/environment';

const db = tursoClient();

import { accounts, sessions, users, verificationTokens } from '$lib/server/drizzle/schema';
import { type PgTableFn, sqliteTable } from 'drizzle-orm/pg-core';
import type { Adapter } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

const tableHijack: PgTableFn = (name, columns, extraConfig) => {
	switch (name) {
		case 'user':
			return users;
		case 'account':
			return accounts;
		case 'session':
			return sessions;
		case 'verificationToken':
			return verificationTokens;
		default:
			return sqliteTable(name, columns, extraConfig);
	}
};

function getAdapter(): Adapter {
	return {
		...DrizzleAdapter(db, tableHijack),
		async getUserByAccount(providerAccountId) {
			const results = await db
				.select()
				.from(accounts)
				.leftJoin(users, eq(users.id, accounts.userId))
				.where(
					and(
						eq(accounts.provider, providerAccountId.provider),
						eq(accounts.providerAccountId, providerAccountId.providerAccountId)
					)
				)
				.get();

			return results?.user ?? null;
		}
	};
}

export const handle = SvelteKitAuth({
	debug: dev === true,
	adapter: getAdapter(),
	providers: [
		Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET }),
		Twitter({ clientId: TWIT_ID, clientSecret: TWIT_SECRET })
	],
	callbacks: {
		async session({ session, user, token }) {
			console.log('session.user');
			console.log(session.user);
			session.user.usrRole = user.usrRole;
			return session;
		}
	}
});
