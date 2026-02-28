/**
 * @fileoverview Generates alliance relationships based on the assigned faction.
 * @module utils/alliancesUtils.js 
 * @author Mike
 * @reviewed 2025-10-27 
 */

import { alliances } from './libraries/alliances.js';
import { chance, getRandomItem } from './randomUtils.js';

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
