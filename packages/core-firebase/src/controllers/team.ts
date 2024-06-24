import { ResourceQueryOptions } from "@owlprotocol/crud-firebase";
import { Team, TeamMemberGroupQueryResource, TeamResource } from "../models/index.js";

/**
 * Get teams for user
 * @param userId
 */
export function getTeamsFactory(teamMemberGroup: TeamMemberGroupQueryResource, teamResource: TeamResource) {
    return async function getTeams(userId: string, options?: ResourceQueryOptions): Promise<Team[]> {
        const teamMembers = await teamMemberGroup.getWhere({ userId }, options);
        const teams = await teamResource.getBatch(
            teamMembers.map((t) => {
                return { teamId: t.teamId };
            }),
        );
        return teams.filter((t) => !!t) as Team[];
    };
}
