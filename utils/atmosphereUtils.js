/**
 * @fileoverview Generates random atmospheric conditions
 * @module utils/atmosphereUtils.js 
 * @author Mike
 * @reviewed 2025-10-27 
 */

import { atmosphereProfiles } from './libraries/atmosphereProfiles.js';
import { getRandomItem } from './randomUtils.js';

/**
 * Generates an atmospheric composition for a planet based on its type.
 * Selects a predefined profile matching the planet type or provides a default.
 * @param {string} planetType - The type of the planet (e.g., 'Rocky', 'Gas Giant').
 * @returns {object} An object containing an array of atmospheric elements with names and percentages. Example: { elements: [{ name: 'Nitrogen', percent: 0.78 }, { name: 'Oxygen', percent: 0.21 }] }
 */
export function generateAtmosphere(planetType) {
    const profile = atmosphereProfiles[planetType];
    if (profile) {
        // Pick a random profile for the given planet type
        return getRandomItem(profile);
    }
    // Fallback to a basic atmosphere if type is unknown
    return { elements: [{ name: 'Nitrogen', percent: 0.8 }, { name: 'Oxygen', percent: 0.2 }] };
}



