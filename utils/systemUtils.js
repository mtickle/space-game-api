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

    //starClasses is an array of star class objects, each with a weight property. We want to select a star class based on the weights.
    let starClass = starClasses[starClasses.length - 1];

    // Select a star class based on the weights
    for (const c of starClasses) {
        cumulative += c.weight;
        if (rand < cumulative) {
            starClass = c;
            break;
        }
    }

    // Generate a unique name for the star
    const name = generateStarName();

    // Generate a faction for the star
    const faction = generateFaction();

    // Return the basic star data
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
