import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { teamActions, teamsRepository } from '$lib/services/repositories/teamsRepository';


export const load: PageServerLoad = async ({ params }) => {
	const team = await teamsRepository.findOne(params.id);
	if (!team) {
		fail(404, { id: params.id, notFound: true });
	}
	return team;
};

export const actions = {
	save: teamActions.save,
	delete: (data) => {
		teamActions.delete(data);
		throw redirect(303, '/teams');
	},
} satisfies Actions;
