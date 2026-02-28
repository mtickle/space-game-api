export const floraTypes = [
    { type: 'tree', name: 'Tree' },
    { type: 'shrub', name: 'Shrub' },
    { type: 'flower', name: 'Flower' },
    { type: 'vine', name: 'Vine' },
    { type: 'seaweed', name: 'Seaweed' },
    { type: 'fungus', name: 'Fungus' },
    { type: 'moss', name: 'Moss' },
    { type: 'bush', name: 'Bush' },
    { type: 'grass', name: 'Grass' },
    { type: 'coral-like', name: 'Coral-like' }
];

export const utilities = [
    'Healing', 'Fuel', 'Food', 'Building Material', 'Ornamental', 'Fiber', 'Hallucinogen', 'Tech Component'
];

export const appearances = [
    'glowing', 'bioluminescent', 'twisting', 'translucent', 'vibrant', 'mossy', 'crystalline',
    'blackened', 'shimmering', 'scaled', 'hairy', 'tubular', 'fan-like', 'drooping', 'spiked'
];

export const rarityTable = [
    'Common', 'Common', 'Common', 'Uncommon', 'Uncommon', 'Rare', 'Rare', 'Legendary'
];

export const typeFloraPresence = {
    'Rocky': { count: [2, 6] },
    'Gas Giant': { count: [0, 0] },
    'Ice World': { count: [1, 3] },
    'Exotic': { count: [6, 15] },
    'Oceanic': { count: [3, 8], marineOnly: true },
    'Volcanic': { count: [0, 2] },
    'Barren': { count: [0, 0] },
    'Crystaline': { count: [2, 7], specialAppearance: 'crystalline' },
    'Radiated': { count: [2, 5], mutated: true },
    'Artificial': { count: [3, 6], synthetic: true },
    'Metallic': { count: [1, 4], synthetic: true },
    'Carbonaceous': { count: [3, 7] }
};

export const jokes = [
    `Avoid picking unless you want a rash shaped like your regrets.`,
    `This specimen once tried to unionize with nearby fungi.`,
    `Known to scream when plucked. Local chefs recommend earplugs.`,
    `Its pollen causes mild euphoria and uncontrollable dance moves.`,
    `Harvest with caution: last botanist grew a second shadow.`
];

export const prefixes = ['Zor', 'Xan', 'Blor', 'Neh', 'Tri', 'Lum', 'Vel', 'Quar', 'Thy', 'Irr'];

export const middles = ['ro', 'li', 'ka', 'zu', 'mi', 'the', 'pha', 'chi'];

export const suffixes = ['plant', 'weed', 'root', 'vine', 'stem', 'blossom', 'bud', 'tree'];