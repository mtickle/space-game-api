import { v4 as uuidv4 } from 'uuid';
import { generateFaction } from './factionUtils.js';
import { generateStarName, getStarDescription } from './starUtils.js';

// Star classification schema
export const STAR_CLASSES = [
    { type: 'O', color: '#A3BFFA', temp: '>30,000K', size: 10, weight: 0.05 },
    { type: 'B', color: '#BEE3F8', temp: '10,000–30,000K', size: 8, weight: 0.1 },
    { type: 'A', color: '#EBF8FF', temp: '7,500–10,000K', size: 7, weight: 0.1 },
    { type: 'F', color: '#FEFCBF', temp: '6,000–7,500K', size: 6, weight: 0.1 },
    { type: 'G', color: '#FFFF99', temp: '5,200–6,000K', size: 5, weight: 0.15 },
    { type: 'K', color: '#FBD38D', temp: '3,700–5,200K', size: 4, weight: 0.2 },
    { type: 'M', color: '#F56565', temp: '<3,700K', size: 3, weight: 0.4 },
];

/**
 * Creates the basic "map pin" data for a single star.
 * Used by the API to generate stars for both the 2D and 3D clients.
 */
export const createStarData = () => {
    const rand = Math.random();
    let cumulative = 0;
    let starClass = STAR_CLASSES[STAR_CLASSES.length - 1];

    for (const c of STAR_CLASSES) {
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
