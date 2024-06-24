import { teamResource } from "./resources.js";
import { teamMemberGroupQuery } from "./groupQueries.js";
import { getTeamsFactory } from "../controllers/index.js";

//teams
export const getTeams = getTeamsFactory(teamMemberGroupQuery, teamResource);
