/**
 * Demo - Gaming Data
 *
 * This file contains all the raw static data for a specific demo
 *
 * Data is used by `admin/controllers/projectDemo.ts` to create the final models without IDs for core-trpc's teamProjectDemoCreate
 */

// import { randomUUID } from "crypto";
import { ProjectDemoData } from "./index-demo.js";
import { ProjectData, ProjectUserData } from "../models/index.js";
import { getRandomExternalId } from "../utils/randomExternalId.js";

// project
export const project: Pick<ProjectData, "name" | "description" | "coverImage"> = {
    name: "OWL Gaming Collectibles Demo",
    description:
        "For integrating with games. Easily create item types for in-game items, and issue digital items on-chain based on an API trigger.",
    coverImage: "/demo/gaming-cover.jpg",
};

// project user - we don't create Clerk users for them so userId is fake
export const projectUsers: Omit<ProjectUserData, "userId">[] = [
    {
        email: "gamer.john.777@example.com",
        fullName: "John Smith",
        externalId: getRandomExternalId(),
    },
    {
        email: "mary.jane@example.com",
        fullName: "Mary Jane",
        externalId: getRandomExternalId(),
    },
    {
        email: "j.potter@example.com",
        fullName: "Joseph Potter",
        externalId: getRandomExternalId(),
    },
];

export const collections = [
    {
        name: "Rare Weapons",
        symbol: "OWL_WEAPON",
        contractImageUrlOverride: "/demo/gaming-coll-weapons.jpg",
        itemTypes: [
            {
                metadata: {
                    name: "Dancing Edge",
                    image: "/demo/gaming-item_type-weapon-1.jpg",
                    attributes: [
                        {
                            trait_type: "Attack Power",
                            value: "50",
                        },
                        {
                            trait_type: "Equip Level",
                            value: "8",
                        },
                        {
                            trait_type: "Durability",
                            value: "99",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "Mythril Sword",
                    image: "/demo/gaming-item_type-weapon-2.jpg",
                    attributes: [
                        {
                            trait_type: "Attack Power",
                            value: "88",
                        },
                        {
                            trait_type: "Equip Level",
                            value: "12",
                        },
                        {
                            trait_type: "Durability",
                            value: "149",
                        },
                    ],
                },
            },
        ],
    },
    {
        name: "Achievement Medals",
        symbol: "OWL_MEDALS",
        contractImageUrlOverride: "/demo/gaming-coll-medals.jpg",
        itemTypes: [
            {
                metadata: {
                    name: "Fire Temple Medal",
                    image: "/demo/gaming-medal-1.jpg",
                    attributes: [
                        {
                            trait_type: "Fire Resist",
                            value: "+50",
                        },
                        {
                            trait_type: "Equip Level",
                            value: "21",
                        },
                        {
                            trait_type: "Intelligence Boost",
                            value: "+33",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "Water Temple Medal",
                    image: "/demo/gaming-medal-2.jpg",
                    attributes: [
                        {
                            trait_type: "Water Resist",
                            value: "+50",
                        },
                        {
                            trait_type: "Equip Level",
                            value: "24",
                        },
                        {
                            trait_type: "Intelligence Boost",
                            value: "+50",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "Poison Amulet",
                    image: "/demo/gaming-medal-3.jpg",
                    attributes: [
                        {
                            trait_type: "Poison Resist",
                            value: "+50",
                        },
                        {
                            trait_type: "Equip Level",
                            value: "18",
                        },
                        {
                            trait_type: "Stamina Boost",
                            value: "+25",
                        },
                    ],
                },
            },
        ],
    },
];

export const dataDemoGaming: ProjectDemoData = {
    project,
    projectUsers,
    collections,
};
