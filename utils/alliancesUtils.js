/**
 * @fileoverview Generates alliance relationships based on the assigned faction.
 * @module utils/alliancesUtils.js 
 * @author Mike
 * @reviewed 2025-10-27 
 */

import { chance, getRandomItem } from './randomUtils.js';

export const alliances = [
    {
        allianceId: 'terran_federation',
        allianceName: 'The Terran Federation',
        alignment: 'Lawful Good',
        description: 'A democratic union of worlds dedicated to peace, exploration, and mutual defense.',
        color: '#3b82f6' // Blue
    },
    {
        allianceId: 'cygnian_hegemony',
        allianceName: 'The Cygnian Hegemony',
        alignment: 'Lawful Neutral',
        description: 'A technologically advanced and isolationist state that values knowledge above all else.',
        color: '#8b5cf6' // Violet
    },
    {
        allianceId: 'krell_imperium',
        allianceName: 'The Krell Imperium',
        alignment: 'Lawful Evil',
        description: 'A rigid, caste-based empire focused on conquest and the perfection of their species.',
        color: '#ef4444' // Red
    },
    {
        allianceId: 'concord_of_suns',
        allianceName: 'The Concord of Suns',
        alignment: 'Neutral Good',
        description: 'A loose confederation of independent systems united by free trade and cultural exchange.',
        color: '#f59e0b' // Amber
    },
    {
        allianceId: 'unaligned_worlds',
        allianceName: 'League of Unaligned Worlds',
        alignment: 'True Neutral',
        description: 'A pact of non-intervention and neutrality, formed by systems wary of galactic politics.',
        color: '#9ca3af' // Gray
    },
    {
        allianceId: 'obsidian_syndicate',
        allianceName: 'The Obsidian Syndicate',
        alignment: 'Chaotic Evil',
        description: 'A powerful criminal enterprise masquerading as a legitimate faction, specializing in smuggling and black market tech.',
        color: '#111827' // Dark Gray/Black
    },
    // --- NEW ALLIANCES ---
    {
        allianceId: 'the_arcanum',
        allianceName: 'The Arcanum',
        alignment: 'True Neutral',
        description: 'A secretive order of technomancers who hoard ancient alien artifacts and forgotten technology.',
        color: '#06b6d4' // Cyan
    },
    {
        allianceId: 'united_mining',
        allianceName: 'United Mining Conglomerate',
        alignment: 'Lawful Evil',
        description: 'A ruthless corporate entity that strips entire solar systems of their resources for profit.',
        color: '#10b981' // Emerald
    },
    {
        allianceId: 'path_of_starlight',
        allianceName: 'Path of the Starlight',
        alignment: 'Neutral Good',
        description: 'Nomadic pilgrims traveling towards the galactic core, offering aid to those they encounter.',
        color: '#f472b6' // Pink
    },
    {
        allianceId: 'scourge_raiders',
        allianceName: 'The Scourge',
        alignment: 'Chaotic Evil',
        description: 'A decentralized fleet of marauders and pirates who raid outer rim settlements.',
        color: '#dc2626' // Deep Red
    },
    {
        allianceId: 'sentinels_gate',
        allianceName: 'Sentinels of the Gate',
        alignment: 'Lawful Neutral',
        description: 'Guardians sworn to protect the ancient wormhole network from misuse or destruction.',
        color: '#fb923c' // Orange
    },
    {
        allianceId: 'free_systems',
        allianceName: 'Free Systems Alliance',
        alignment: 'Chaotic Good',
        description: 'Rebel cells and freedom fighters united against the tyranny of the larger empires.',
        color: '#84cc16' // Lime
    }
];

/**
 * Assigns a faction to an alliance based on alignment.
 * @param {object} faction - The faction object, which must have an 'alignment' property.
 * @returns {string|null} The ID of the assigned alliance, or null if the faction remains independent.
 */
export const assignFactionToAlliance = (faction) => {
    // 70% chance that a faction will belong to a major alliance.
    if (!chance(0.7)) {
        return null;
    }

    // Find alliances that are a good political match for the faction.
    const potentialAlliances = alliances.filter(a => a.alignment === faction.alignment);

    if (potentialAlliances.length > 0) {
        return getRandomItem(potentialAlliances).allianceId;
    }

    // If no perfect match is found, they might join a neutral alliance as a fallback.
    if (chance(0.5)) {
        const neutralAlliance = alliances.find(a => a.alignment === 'True Neutral');
        return neutralAlliance ? neutralAlliance.allianceId : null;
    }

    return null; // The faction remains independent.
};
