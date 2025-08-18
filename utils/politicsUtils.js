import { alliances, assignFactionToAlliance } from './alliancesUtils.js';
import { factions } from './factionUtils.js';

// This object will hold the persistent political state of the galaxy.
const galacticState = {
    factionToAllianceMap: new Map(),
    alliances: alliances // We can also store the alliance list here for easy access
};

/**
 * Generates the political landscape for the galaxy.
 * This function should be run ONLY ONCE when the server starts.
 */
export const initializeGalacticPolitics = () => {
    console.log("👑 Initializing Galactic Politics...");

    // Loop through every possible faction and assign it to an alliance.
    factions.forEach(faction => {
        const allianceId = assignFactionToAlliance(faction);
        galacticState.factionToAllianceMap.set(faction.id, allianceId);
    });

    //console.log("Political map generated:", galacticState.factionToAllianceMap);
};

/**
 * Retrieves the alliance ID for a given faction ID.
 * @param {string} factionId - The ID of the faction.
 * @returns {string|null} The alliance ID.
 */
export const getAllianceForFaction = (factionId) => {
    return galacticState.factionToAllianceMap.get(factionId);
};
