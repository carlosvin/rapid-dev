import type { Handle } from '@sveltejs/kit';
import { DB } from '$lib/services/db';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
	await DB.connect(env.VITE_DB_CONN, env.VITE_DB_NAME);
	const response = await resolve(event);
	return response;
};
