import { getAllianceForFaction } from './politicsUtils.js';
import { getRandomItem } from './randomUtils.js';

// --- Faction Database ---
// This is the source of truth for all possible factions.
export const factions = [
    {
        "name": "The Solar Accord",
        "id": "solar_accord",
        "alignment": "Lawful Neutral",
        "symbol": "☀️",
        "color": "#FFD700",
        "description": "A powerful confederation of core worlds united by a common legal code and trade agreements. The Accord values diplomacy, bureaucracy, and strict regulation."
    },
    {
        "name": "The Obsidian Syndicate",
        "id": "obsidian_syndicate",
        "alignment": "Chaotic Evil",
        "symbol": "🜏",
        "color": "#8B0000",
        "description": "A shadowy criminal enterprise controlling trade routes, smuggling rings, and information black markets. Ruthless and efficient, they operate behind the scenes."
    },
    {
        "name": "The Luma Ascendancy",
        "id": "luma_ascendancy",
        "alignment": "Lawful Good",
        "symbol": "🌌",
        "color": "#66CCFF",
        "description": "A spiritual-technocratic society dedicated to enlightenment through science and stellar harmony. Often seen as idealistic but technologically superior."
    },
    {
        "name": "The Vireli Swarm",
        "id": "vireli_swarm",
        "alignment": "Neutral Evil",
        "symbol": "🦠",
        "color": "#AAFF00",
        "description": "A post-biological hive-mind species that devours entire biospheres. Motivated by survival and propagation, they view individual sentience as a flaw."
    },
    {
        "name": "The Ember Crown",
        "id": "ember_crown",
        "alignment": "Chaotic Neutral",
        "symbol": "🔥",
        "color": "#FF4500",
        "description": "A nomadic war-clan empire, forged in dying suns. They prize honor, conflict, and legacy, roaming the fringe for glory and battle."
    },
    {
        "name": "The Continuum Archive",
        "id": "continuum_archive",
        "alignment": "True Neutral",
        "symbol": "📚",
        "color": "#9370DB",
        "description": "An ancient, neutral faction obsessed with preserving galactic knowledge. They rarely interfere, but monitor all with eerie precision."
    }
];

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
