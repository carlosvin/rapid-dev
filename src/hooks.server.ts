import type { Handle } from '@sveltejs/kit';
import { DB } from '$lib/services/db';
import { env } from '$env/dynamic/private';

// It runs before every request to the server
export const handle: Handle = async ({ event, resolve }) => {
	// Connect to the MongoDB database
	await DB.connect(env.VITE_DB_CONN, env.VITE_DB_NAME);

	return resolve(event);
};
