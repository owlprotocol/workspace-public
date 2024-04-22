/**
 * Demo - Gaming Data
 *
 * This file contains all the raw static data for a specific demo
 *
 * Data is used by `admin/controllers/projectDemo.ts` to create the final models without IDs for core-trpc's teamProjectDemoCreate
 */

import { ProjectDemoData } from "./index-demo.js";
import { ProjectData, ProjectUserData } from "../models/index.js";
import { getRandomExternalId } from "../utils/randomExternalId.js";

// project
export const project: Pick<ProjectData, "name" | "description" | "coverImage"> = {
    name: "Event Tickets and POAPs Demo",
    description:
        "For event organizers or ticketing. Easily create POAPs (Proof-of-Active-Participations) and reward badges for event attendees or as prizes during events.",
    coverImage: "/demo/event-cover.jpg",
};

// project user - we don't create Clerk users for them so userId is fake
export const projectUsers: Omit<ProjectUserData, "userId">[] = [
    {
        email: "alice.thompson@example.com",
        fullName: "Alice Thompson",
        externalId: getRandomExternalId(),
    },
    {
        email: "bob.anderson@example.com",
        fullName: "Bob Anderson",
        externalId: getRandomExternalId(),
    },
    {
        email: "charlie.simpson@example.com",
        fullName: "Charlie Simpson",
        externalId: getRandomExternalId(),
    },
];

export const collections = [
    {
        name: "Event Attendance Badge (POAP)",
        symbol: "OWL_EVT",
        contractImageUrlOverride: "/demo/event-poaps.jpg",
        itemTypes: [
            {
                metadata: {
                    name: "Celestia Infinite Space Bazaar POAP - Lumentree",
                    image: "/demo/event-poap-lumentree.jpg",
                    attributes: [
                        {
                            trait_type: "Description",
                            value: "POAP for participating as House Lumentree",
                        },
                        {
                            trait_type: "House",
                            value: "Lumentree",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "Celestia Infinite Space Bazaar POAP - Mindflux",
                    image: "/demo/event-poap-mindflux.jpg",
                    attributes: [
                        {
                            trait_type: "Description",
                            value: "POAP for participating as House Mindflux",
                        },
                        {
                            trait_type: "House",
                            value: "Mindflux",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "Celestia Infinite Space Bazaar POAP - Whimsfall",
                    image: "/demo/event-poap-whimsfall.jpg",
                    attributes: [
                        {
                            trait_type: "Description",
                            value: "POAP for participating as House Whimsfall",
                        },
                        {
                            trait_type: "House",
                            value: "Whimsfall",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "Celestia Infinite Space Bazaar POAP - Puddletrail",
                    image: "/demo/event-poap-puddletrail.jpg",
                    attributes: [
                        {
                            trait_type: "Description",
                            value: "POAP for participating as House Puddletrail",
                        },
                        {
                            trait_type: "House",
                            value: "Puddletrail",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
        ],
    },
    {
        name: "Ticket Raffle Prizes",
        symbol: "OWL_TICKET",
        contractImageUrlOverride: "/demo/event-reward-ticket.jpg",
        itemTypes: [
            {
                metadata: {
                    name: "REGULAR ENTRY - Celestia Meetup Ticket",
                    image: "/demo/event-reward-ticket.jpg",
                    attributes: [
                        {
                            trait_type: "Ticket Type",
                            value: "Regular",
                        },
                        {
                            trait_type: "Winner Name",
                            value: "",
                        },
                        {
                            trait_type: "Description",
                            value: "Ticket to the next meetup",
                        },
                        {
                            trait_type: "Received Date",
                            value: "",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "GOLD ENTRY - Celestia Meetup Ticket",
                    image: "/demo/event-reward-ticket-gold.jpg",
                    attributes: [
                        {
                            trait_type: "Ticket Type",
                            value: "Gold",
                        },
                        {
                            trait_type: "Winner Name",
                            value: "",
                        },
                        {
                            trait_type: "Description",
                            value: "Ticket to the next meetup",
                        },
                        {
                            trait_type: "Received Date",
                            value: "",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
            {
                metadata: {
                    name: "VIP PLATINUM ENTRY - Celestia Meetup Ticket",
                    image: "/demo/event-reward-ticket-platinum.jpg",
                    attributes: [
                        {
                            trait_type: "Ticket Type",
                            value: "Platinum",
                        },
                        {
                            trait_type: "Winner Name",
                            value: "",
                        },
                        {
                            trait_type: "Description",
                            value: "Ticket to the next meetup",
                        },
                        {
                            trait_type: "Received Date",
                            value: "",
                        },
                        {
                            trait_type: "Year",
                            value: "2024",
                        },
                    ],
                },
            },
        ],
    },
];

export const dataDemoEvents: ProjectDemoData = {
    project,
    projectUsers,
    collections,
};
