import { getRandomInt, getRandomItem } from './randomUtils.js';

export const behaviorTypes = [
    'peaceful', 'edible', 'hostile', 'territorial', 'skittish', 'parasitic', 'symbiotic', 'curious', 'sentient', 'pack hunter'
];

export const lifeformTypes = [
    { type: 'mammal', name: 'Mammal' },
    { type: 'reptile', name: 'Reptile' },
    { type: 'avian', name: 'Avian' },
    { type: 'amphibian', name: 'Amphibian' },
    { type: 'insectoid', name: 'Insectoid' },
    { type: 'crustacean', name: 'Crustacean' },
    { type: 'rodent', name: 'Rodent' },
    { type: 'cephalopod', name: 'Cephalopod' },
    { type: 'plantimal', name: 'Plantimal' },
    { type: 'hybrid', name: 'Hybrid' },
    { type: 'synthetic', name: 'Synthetic' }
];

export const biomes = [
    'surface', 'marine', 'subterranean', 'aerial', 'amphibious'
];

export const faunaDensityByPlanetType = {
    'Rocky': 'moderate',
    'Gas Giant': 'none',
    'Ice World': 'sparse',
    'Exotic': 'abundant',
    'Oceanic': 'aquaticOnly',
    'Volcanic': 'sparse',
    'Barren': 'none',
    'Crystaline': 'moderate',
    'Radiated': 'bizarreOnly',
    'Artificial': 'syntheticOnly',
    'Metallic': 'syntheticOnly',
    'Carbonaceous': 'moderate'
};

const nameSyllables = [
    'zor', 'vex', 'tal', 'nir', 'lux', 'garn', 'ska', 'dro', 'fel', 'mek', 'quor', 'zin', 'rax', 'yil', 'xen', 'um', 'ol', 'tra'
];

export function generateCreatureName() {
    const syllableCount = getRandomInt(2, 3);
    let name = '';
    for (let i = 0; i < syllableCount; i++) {
        name += getRandomItem(nameSyllables);
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function generateFauna({ planetType }) {
    const density = faunaDensityByPlanetType[planetType] || 'moderate';
    if (density === 'none') return [];

    const countMap = {
        sparse: getRandomInt(1, 2),
        moderate: getRandomInt(2, 5),
        abundant: getRandomInt(5, 15),
        aquaticOnly: getRandomInt(3, 8),
        bizarreOnly: getRandomInt(2, 5),
        syntheticOnly: getRandomInt(1, 5)
    };
    const count = countMap[density];

    const creatures = [];
    for (let i = 0; i < count; i++) {
        const name = generateCreatureName();
        const behavior = getRandomItem(behaviorTypes);
        const biome = (density === 'aquaticOnly') ? 'marine' : getRandomItem(biomes);

        let lifeform;
        if (density === 'syntheticOnly') {
            lifeform = lifeformTypes.find(l => l.type === 'synthetic');
        } else {
            lifeform = getRandomItem(lifeformTypes);
        }

        const feet = lifeform.type === 'cephalopod' ? 8 : lifeform.type === 'synthetic' ? getRandomInt(0, 12) : getRandomInt(0, 6);
        const laysEggs = ['reptile', 'avian', 'insectoid', 'amphibian'].includes(lifeform.type);
        const description = `A ${behavior} ${lifeform.name.toLowerCase()} that prefers the ${biome} biome.`;

        creatures.push({
            name,
            type: lifeform.type,
            behavior,
            biome,
            feet,
            gendered: Math.random() > 0.2,
            laysEggs,
            description
        });
    }

    return creatures;
}