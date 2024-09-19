import { DB } from '$lib/services/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ObjectId } from 'mongodb';

interface TeamRequest {
	name: string;
	description?: string;
}


interface TeamDb extends TeamRequest {
	_id: ObjectId;
}

export const load: PageServerLoad = async ({ params }) => {
	const team = await DB.teams.findOne<TeamDb>({ "_id": ObjectId.createFromHexString(params.id) });
	if (team) {
		return {
			name: team.name,
			description: team.description,
			id: params.id
		};
	}
	fail(404, { id: params.id, notFound: true });
};

export const actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name) {
			await DB.teams.insertOne({ name });
		} else {
			return new Response('Name is required', { status: 400 });
		}
	},
} satisfies Actions;
