import { chance, getRandomInt, getRandomItem } from './randomUtils.js';

// --- Mineral & Element Database ---
const mineralPools = {
    'Rocky': ['Bauxite', 'Iron Ore', 'Silica', 'Copper'],
    'Gas Giant': [], // No solid resources
    'Ice World': ['Water Ice', 'Methane Clathrates', 'Ammonia Crystals'],
    'Exotic': ['Xenocrystals', 'Bioluminescent Fungi', 'Sentient Spores'],
    'Oceanic': ['Magnesium Nodules', 'Bioluminescent Algae', 'Coral Fragments'],
    'Volcanic': ['Sulfur', 'Basalt', 'Obsidian', 'Heavy Metals'],
    'Barren': ['Iron Ore', 'Nickel', 'Cobalt', 'Helium-3'],
    'Crystaline': ['Quartz', 'Diamond Dust', 'Resonant Crystals'],
    'Radiated': ['Uranium', 'Thorium', 'Mutagenic Slime'],
    'Artificial': ['Nanites', 'Alloy Plates', 'Data Cores'],
    'Metallic': ['Iron Ore', 'Titanium', 'Platinum', 'Gold'],
    'Carbonaceous': ['Hydrocarbons', 'Graphite', 'Organic Polymers']
};

const elementSymbols = ['Fe', 'O', 'Si', 'Mg', 'S', 'Ni', 'Ca', 'Al', 'Na', 'K'];

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
