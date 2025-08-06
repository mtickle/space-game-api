import { v4 as uuidv4 } from 'uuid'; // Assuming you have uuid installed (npm install uuid)

const stationNameSuffixes = {
    "The Solar Accord": ["Bastion", "Citadel", "Nexus", "Beacon", "Gateway", "Harmonizer"],
    "The Obsidian Syndicate": ["Vault", "Blacksite", "Shadow", "Den", "Haven", "Conclave"],
    "The Luma Ascendancy": ["Sanctuary", "Ascension", "Harmony", "Enlightenment", "Nexus", "Vanguard"],
    "The Vireli Swarm": ["Hive", "Spire", "Nexus", "Growth", "Colony", "Bio-Forge"],
    "The Ember Crown": ["Forge", "Stronghold", "Crucible", "Glory", "Pillar", "Pyre"],
    "The Continuum Archive": ["Vault", "Librarium", "Chronos", "Nexus", "Observation", "Knowledge"]
};

const stationPrefixes = [
    "Alpha", "Omega", "Prime", "Outer", "Deep", "Zenith", "Nadir", "Apex", "Core", "Celestial"
];

// Add more thematic words based on faction descriptions if needed
const thematicAdjectives = {
    "The Solar Accord": ["Accordian", "Harmonic", "Regal", "Unified", "Bureaucratic"],
    "The Obsidian Syndicate": ["Shadowy", "Ruthless", "Hidden", "Clandestine", "Smugglers'"],
    "The Luma Ascendancy": ["Spiritual", "Technocratic", "Enlightened", "Stellar", "Harmonious"],
    "The Vireli Swarm": ["Biological", "Hive", "Consuming", "Propagating", "Devouring"],
    "The Ember Crown": ["Nomadic", "Glorious", "Fiery", "Honorable", "Warrior"],
    "The Continuum Archive": ["Ancient", "Neutral", "Archival", "Eerie", "Observant"]
};


export const generateStation = (faction, starId, starName) => {
    if (!faction) return null;

    const stationId = uuidv4();

    // Choose a name generation style
    let stationName;
    if (Math.random() < 0.7) { // 70% chance of "Faction_Adjective Structure_Type"
        const adj = thematicAdjectives[faction.name]?.[Math.floor(Math.random() * thematicAdjectives[faction.name].length)] || faction.name.split(' ')[1];
        const suffix = stationNameSuffixes[faction.name]?.[Math.floor(Math.random() * stationNameSuffixes[faction.name].length)] || "Station";
        stationName = `${adj} ${suffix}`;
    } else { // 30% chance of "Star_Name [Prefix] Structure_Type"
        const prefix = stationPrefixes[Math.floor(Math.random() * stationPrefixes.length)];
        const suffix = stationNameSuffixes[faction.name]?.[Math.floor(Math.random() * stationNameSuffixes[faction.name].length)] || "Station";
        stationName = `${starName} ${prefix} ${suffix}`;
    }

    // Determine size based on alignment/description (simplified)
    let stationSize = 10; // Default size
    if (faction.alignment === "Lawful Good" || faction.alignment === "Lawful Neutral") {
        stationSize = 12; // Larger, more established
    } else if (faction.alignment === "Chaotic Evil" || faction.alignment === "Neutral Evil") {
        stationSize = 8; // Smaller, more clandestine
    } else if (faction.alignment === "True Neutral") {
        stationSize = 15; // Massive archives
    }

    // Determine type for visual differentiation if needed (e.g., 'military', 'trade', 'research')
    let stationType = 'general';
    if (faction.name === "The Solar Accord") stationType = 'bureaucratic';
    if (faction.name === "The Obsidian Syndicate") stationType = 'covert';
    if (faction.name === "The Luma Ascendancy") stationType = 'scientific';
    if (faction.name === "The Ember Crown") stationType = 'military';

    return {
        stationId,
        stationName,
        stationSize,
        stationType, // Can be used for custom drawing
        factionId: faction.id,
        factionColor: faction.color
    };
};