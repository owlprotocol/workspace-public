import { v4 as uuidv4 } from "uuid";
import { isUUID } from "../../utils/uuid.js";
import { Team } from "../../models/index.js";
import { teamMemberResource, teamResource } from "../resources.js";
import { getTeamsFactory } from "../../controllers/index.js";
import { teamMemberGroupQuery } from "../groupQueries.js";

export const getTeams = getTeamsFactory(teamMemberGroupQuery, teamResource);

export class TeamSlugExistsError extends Error {
    constructor(slug?: string, options?: ErrorOptions) {
        super(`Team slug "${slug}" already exists. Please choose a unique slug.`, options);
    }
}

/**
 * Create Team
 * - check slug uniquenes
 * - generate teamId (always generated)
 * - set team
 * - add owner as member
 * @param project
 * @returns
 */
export async function createTeam(team: Omit<Team, "teamId">): Promise<string> {
    const { slug } = team;

    //TODO: Check if slug is url safe (maybe in zod is better)
    const slugExists = !!(await teamResource.getWhereFirst({ slug }));
    if (slugExists) {
        throw new TeamSlugExistsError(slug);
    }

    if (isUUID(slug)) {
        throw new Error("Slug cannot be a UUID");
    }

    const teamId = uuidv4();
    await Promise.all([
        teamResource.set({ ...team, teamId }),
        teamMemberResource.set({
            teamId,
            userId: team.owner,
            role: "owner",
        }),
    ]);

    return teamId;
}
