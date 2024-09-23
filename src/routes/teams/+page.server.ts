import type { PageServerLoad, Actions } from './$types';
import { teamActions, teamsRepository } from '$lib/services/repositories/teamsRepository';


export const load: PageServerLoad = async () => {
	return { teams: await teamsRepository.findAll() }
};

export const actions = {
	create: teamActions.create,
	delete: teamActions.delete,
} satisfies Actions;
