// src/utils/factionUtils.js

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

// Assign a faction based on a star's name (or ID)
export const assignFaction = (starName) => {
    // 25% chance a system is unaffiliated
    if (Math.random() < 0.25) return null;

    // Choose a random faction from the codex
    const factionKeys = Object.keys(factions);
    const randomFaction = factionKeys[Math.floor(Math.random() * factionKeys.length)];

    return {
        name: randomFaction,
        ...factions[randomFaction],
    };
};
// Get full faction by ID
export const getFactionById = (id) => {
    return factions.find(f => f.id === id);
};

// Get display properties (useful in UI)
export const getFactionColor = (id) => getFactionById(id)?.color || '#888';
export const getFactionSymbol = (id) => getFactionById(id)?.symbol || '?';

// Assign factions to all stars in a list
export const assignFactionsToStars = (stars) => {
    return stars.map(star => ({
        ...star,
        faction: assignFactionToStar(star.name)
    }));
};

export function generateFaction() {
    return factions[Math.floor(Math.random() * factions.length)];
}