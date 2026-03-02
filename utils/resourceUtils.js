import { mineralPools } from './libraries/minerals.js';
import { chance, getRandomInt, getRandomItem } from './randomUtils.js';

/**
 * Generates a list of resources for a given planet type.
 * @param {string} planetType - The type of the planet (e.g., 'Rocky', 'Volcanic').
 * @returns {Array} An array of resource objects.
 */
export const generateResources = (planetType) => {
    const resources = [];
    const pool = mineralPools[planetType];

    if (!pool || pool.length === 0) {
        return [];
    }

    const resourceCount = getRandomInt(2, 5); // Generate between 2 and 5 resources

    for (let i = 0; i < resourceCount; i++) {
        const mineralName = getRandomItem(pool);
        const elementCount = getRandomInt(1, 4);
        const elements = [];

        for (let j = 0; j < elementCount; j++) {
            elements.push(getRandomItem(elementSymbols));
        }

        const resource = {
            mineralName,
            elements: [...new Set(elements)], // Ensure unique elements
        };

        // Small chance to add an "unknown" element for flavor
        if (chance(0.15)) {
            resource.unknownElements = [{
                symbol: `X${getRandomInt(10, 99)}`,
                name: `Unknown-${getRandomInt(100, 999)}`
            }];
        }

        resources.push(resource);
    }

    return resources;
};
