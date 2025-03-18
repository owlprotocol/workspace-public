import { v4 as uuidv4 } from "uuid";
import { teamApiKeyResource } from "../admin/resources.js";
import { teamApiKeyPrefix } from "../models/TeamApiKey.js";

export async function createTeamApiKey() {
    if (process.argv.length != 3) throw new Error("Usage: node createTeamApiKey.js <teamId>");
    const teamId = process.argv[2];

    const apiKey = teamApiKeyPrefix + uuidv4();

    const numTeamApiKeys = await teamApiKeyResource.getWhereCount({ teamId });

    if (numTeamApiKeys > 0) {
        throw new Error("Team already has an API key");
    }
    await teamApiKeyResource.set({ teamId, apiKey, createdAt: Date.now() });

    console.log(`Created API key for team ${teamId}: ${apiKey}`);
}

createTeamApiKey().then(() => console.log("Done"));
