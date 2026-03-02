import { v4 as uuidv4 } from 'uuid'; // Assuming you have uuid installed (npm install uuid)
import { stationNamePrefixes, stationNameSuffixes, thematicAdjectives } from './libraries/stations.js';

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
        const prefix = stationNamePrefixes[Math.floor(Math.random() * stationNamePrefixes.length)];
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