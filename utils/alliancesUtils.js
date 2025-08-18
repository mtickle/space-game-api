import { chance, getRandomItem } from './randomUtils.js';

// --- Alliance Database ---
// A list of major power blocs that factions can belong to.
export const alliances = [
    {
        allianceId: 'terran_federation',
        allianceName: 'The Terran Federation',
        alignment: 'Lawful Good',
        description: 'A democratic union of worlds dedicated to peace, exploration, and mutual defense.'
    },
    {
        allianceId: 'cygnian_hegemony',
        allianceName: 'The Cygnian Hegemony',
        alignment: 'Lawful Neutral',
        description: 'A technologically advanced and isolationist state that values knowledge above all else.'
    },
    {
        allianceId: 'krell_imperium',
        allianceName: 'The Krell Imperium',
        alignment: 'Lawful Evil',
        description: 'A rigid, caste-based empire focused on conquest and the perfection of their species.'
    },
    {
        allianceId: 'concord_of_suns',
        allianceName: 'The Concord of Suns',
        alignment: 'Neutral Good',
        description: 'A loose confederation of independent systems united by free trade and cultural exchange.'
    },
    {
        allianceId: 'unaligned_worlds',
        allianceName: 'League of Unaligned Worlds',
        alignment: 'True Neutral',
        description: 'A pact of non-intervention and neutrality, formed by systems wary of galactic politics.'
    },
    {
        allianceId: 'obsidian_syndicate',
        allianceName: 'The Obsidian Syndicate',
        alignment: 'Chaotic Evil',
        description: 'A powerful criminal enterprise masquerading as a legitimate faction, specializing in smuggling and black market tech.'
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
