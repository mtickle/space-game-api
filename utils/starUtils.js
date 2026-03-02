// Procedural star name generator

import { starDescriptions, starPrefixes, starSuffixes, starTemperatures, starTypes } from "./libraries/stars.js";
import { getRandomItem } from './randomUtils.js';

export const generateStarName = () => {
    return `${getRandomItem(starPrefixes)}-${getRandomItem(starSuffixes)}`;
};

export function getStarTemperature(type) {
    return starTemperatures[type] || 'Unknown';
}

// Star descriptions based on MK class
export const getStarDescription = (type) => {
    return starDescriptions[type] || 'An enigmatic star of unknown properties.';
};

export function loadOrGenerateStars(generateFn) {
    try {
        const saved = localStorage.getItem('starweaveStars');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (err) {
        console.warn('Failed to parse stored stars:', err);
    }
    generateFn();
    return null;
}

export function generateStarType() {
    return starTypes[Math.floor(Math.random() * starTypes.length)];
}

export function generateFullStarProfile() {
    const type = generateStarType();         // e.g., 'G'
    const temp = getStarTemperature(type);   // e.g., 'Moderate'
    const description = getStarDescription(type); // existing function
    return { type, temp, description };
}
