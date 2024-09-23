import { ObjectId } from "mongodb";
import { DB, type Db } from "../db";
import { fail, type Actions } from "@sveltejs/kit";

interface TeamRequest {
    name: string;
    description?: string;
}

interface TeamDb extends TeamRequest {
    _id: ObjectId;
}

interface Team extends TeamRequest {
    id: string;
}

export function toTeamRequest(team: FormData): TeamRequest {
    const name = team.get('name')?.toString();
    if (name === undefined) {
        throw new Error('Name is required');
    }
    return {
        name,
        description: team.get('description')?.toString()
    };
}

function toTeam(teamDb: TeamDb): Team {
    return {
        id: teamDb._id.toHexString(),
        name: teamDb.name,
        description: teamDb.description,
    };
}


class TeamsRepository {
    constructor(private readonly db: Db) { }

    async findAll() {
        return (await this.db.teams.find<TeamDb>({}).toArray()).map(toTeam);
    }

    async findOne(id: string) {
        const team = await this.db.teams.findOne<TeamDb>({ "_id": ObjectId.createFromHexString(id) });
        if (team) {
            return {
                name: team.name,
                description: team.description,
                id
            };
        }
    }

    async updateOne(id: string, team: TeamRequest) {
        return await this.db.teams.updateOne({ "_id": ObjectId.createFromHexString(id) }, { "$set": team });
    }

    async deleteOne(id: string) {
        return await this.db.teams.deleteOne({ "_id": ObjectId.createFromHexString(id) });
    }

    async insertOne(team: TeamRequest) {
        return await this.db.teams.insertOne(team);
    }

}

export const teamsRepository = new TeamsRepository(DB);

export const teamActions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        await teamsRepository.insertOne(toTeamRequest(formData));
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const idStr = formData.get('id')?.toString();
        if (!idStr) {
            return fail(400, { idStr, incorrect: true });
        }
        return await teamsRepository.deleteOne(idStr);
    },
    save: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id')?.toString();
        if (!id) {
            return new Response('ID is required', { status: 400 });
        }
        const team = toTeamRequest(formData);
        await teamsRepository.updateOne(id, team);
    },
} satisfies Actions;