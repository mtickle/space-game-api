import { factions } from './libraries/factions.js';
import { getAllianceForFaction } from './politicsUtils.js';
import { getRandomItem } from './randomUtils.js';

/**
 * Generates a single, complete faction object, including its alliance affiliation.
 * This is the primary function that should be used for faction generation.
 */
export const generateFaction = () => {
    if (Math.random() < 0.25) return null;

    const factionTemplate = getRandomItem(factions);

    const newFaction = {
        ...factionTemplate,
    };

    // --- MODIFIED: Look up the alliance instead of generating it ---
    // This ensures the faction's alliance is always the same.
    newFaction.allianceId = getAllianceForFaction(newFaction.id);

    return newFaction;
};

// --- Helper Functions ---

// Get full faction details by its ID.
export const getFactionById = (id) => {
    return factions.find(f => f.id === id);
};

// Get display properties (useful in UI).
export const getFactionColor = (id) => getFactionById(id)?.color || '#888';
export const getFactionSymbol = (id) => getFactionById(id)?.symbol || '?';
