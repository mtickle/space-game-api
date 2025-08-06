// utils/systemUtils.js

import { assignFaction } from '@utils/factionUtils';
import { generateStarName, getStarDescription } from '@utils/starUtils';
import { v4 as uuidv4 } from 'uuid';

// Star classification schema (moved here for reuse)
export const STAR_CLASSES = [
    { type: 'O', color: '#A3BFFA', temp: '>30,000K', size: 10, weight: 0.05 },
    { type: 'B', color: '#BEE3F8', temp: '10,000–30,000K', size: 8, weight: 0.1 },
    { type: 'A', color: '#EBF8FF', temp: '7,500–10,000K', size: 7, weight: 0.1 },
    { type: 'F', color: '#FEFCBF', temp: '6,000–7,500K', size: 6, weight: 0.1 },
    { type: 'G', color: '#FFFF99', temp: '5,200–6,000K', size: 5, weight: 0.15 },
    { type: 'K', color: '#FBD38D', temp: '3,700–5,200K', size: 4, weight: 0.2 },
    { type: 'M', color: '#F56565', temp: '<3,700K', size: 3, weight: 0.4 },
];

//--- This creates the star systems as we move about the galactic map.
export const generateStarSystem = (index = 0) => {
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
    const faction = assignFaction({ name });

    return {
        //id: `system-${index}`,
        id: uuidv4(), // 👈 Unique GUID here
        name,
        type: starClass.type,
        color: starClass.color,
        temp: starClass.temp,
        size: starClass.size,
        description: getStarDescription(starClass.type),
        faction,
        x: Math.random() * 1200 - 600,
        y: Math.random() * 800 - 400,
        //planets: generatePlanets(name),
    };
};

// Generate a full star field (with centering and optional count)
export const generateStarField = (count = 20) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(generateStarSystem(i));
    }

    const centerX = stars.reduce((sum, s) => sum + s.x, 0) / stars.length;
    const centerY = stars.reduce((sum, s) => sum + s.y, 0) / stars.length;

    return stars.map(s => ({
        ...s,
        x: s.x - centerX,
        y: s.y - centerY,
    }));
};
