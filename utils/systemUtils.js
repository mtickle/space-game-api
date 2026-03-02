import { v4 as uuidv4 } from 'uuid';
import { generateFaction } from './factionUtils.js';
import { starClasses } from './libraries/stars.js';
import { generateStarName, getStarDescription } from './starUtils.js';

/**
 * Creates the basic "map pin" data for a single star.
 * Used by the API to generate stars for both the 2D and 3D clients.
 */
export const createStarData = () => {
    const rand = Math.random();
    let cumulative = 0;
    let starClass = starClasses[starClasses.length - 1];

    for (const c of starClasses) {
        cumulative += c.weight;
        if (rand < cumulative) {
            starClass = c;
            break;
        }
    }

    const name = generateStarName();

    // --- FIX: Call generateFaction() with no arguments ---
    const faction = generateFaction();

    return {
        id: uuidv4(),
        name,
        type: starClass.type,
        color: starClass.color,
        temp: starClass.temp,
        size: starClass.size,
        description: getStarDescription(starClass.type),
        faction,
        x: 0, // Coordinates are assigned by the sector generator
        y: 0,
        z: 0,
    };
};
