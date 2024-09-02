import { DB } from '$lib/services/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ObjectId } from 'mongodb';

interface TeamRequest {
	name: string;
}

interface Team extends TeamRequest {
	id: string;
}

interface TeamDb extends TeamRequest {
	_id: ObjectId;
}

export const load: PageServerLoad = async () => {
	return {
		teams: (await DB.teams.find<TeamDb>({}).toArray()).map<Team>(({ name, _id }) => ({
			name,
			id: _id.toString()
		}))
	};
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name) {
			await DB.teams.insertOne({ name });
		} else {
			return new Response('Name is required', { status: 400 });
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		if (id) {
			await DB.teams.deleteOne({ _id: ObjectId.createFromHexString(id.toString()) });
		} else {
			return fail(400, { id, incorrect: true });
		}
	}
} satisfies Actions;
