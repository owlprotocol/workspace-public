import { z } from "zod";

export enum ProjectDemoType {
    EVENT = "EVENT",
    GAMING = "GAMING",
    PHYGITAL = "PHYGITAL",
}

export const projectDemoZod = z.object({
    teamId: z.string().describe("teamId"),
    demoType: z.nativeEnum(ProjectDemoType).describe("Demo type, supported currently are EVENT, GAMING, PHYGITAL"),
});
