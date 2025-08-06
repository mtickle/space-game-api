// faunaUtils.js

//--- Animal Behavior Types
export const behaviorTypes = [
    'peaceful', 'edible', 'hostile', 'territorial', 'skittish', 'parasitic', 'symbiotic', 'curious', 'sentient', 'pack hunter'
];

export const lifeformTypes = [
    { type: 'mammal', name: 'Mammal', icon: 'PawPrint' },
    { type: 'reptile', name: 'Reptile', icon: 'Turtle' },
    { type: 'avian', name: 'Avian', icon: 'Feather' },
    { type: 'amphibian', name: 'Amphibian', icon: 'Droplet' },
    { type: 'insectoid', name: 'Insectoid', icon: 'Bug' },
    { type: 'crustacean', name: 'Crustacean', icon: 'Shell' },
    { type: 'rodent', name: 'Rodent', icon: 'MousePointer' },
    { type: 'cephalopod', name: 'Cephalopod', icon: 'Octagon' },
    { type: 'plantimal', name: 'Plantimal', icon: 'Leaf' },
    { type: 'hybrid', name: 'Hybrid', icon: 'Sparkles' },
    { type: 'synthetic', name: 'Synthetic', icon: 'Cpu' }
];

//--- Biomes
export const biomes = [
    'surface', 'marine', 'subterranean', 'aerial', 'amphibious'
];

//--- Planetary Fauna Density Rules
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

//--- Base Pools
const nameSyllables = [
    'zor', 'vex', 'tal', 'nir', 'lux', 'garn', 'ska', 'dro', 'fel', 'mek', 'quor', 'zin', 'rax', 'yil', 'xen', 'um', 'ol', 'tra'
];

// export const getFaunaIcon(type) => {
//     const iconMap = {
//         'Mammal': <PawPrint className="inline w-4 h-4 mr-1 text-red-400" />,
//         'Reptile': <Turtle className="inline w-4 h-4 mr-1 text-green-400" />,
//         'Avian': <Feather className="inline w-4 h-4 mr-1 text-yellow-400" />,
//         'Amphibian': <Droplet className="inline w-4 h-4 mr-1 text-blue-400" />,
//         'Insectoid': <Bug className="inline w-4 h-4 mr-1 text-purple-400" />,
//         'Crustacean': <Shell className="inline w-4 h-4 mr-1 text-teal-400" />,
//         'Rodent': <MousePointer className="inline w-4 h-4 mr-1 text-gray-400" />,
//         'Cephalopod': <Octagon className="inline w-4 h-4 mr-1 text-indigo-400" />,
//         'Plantimal': <Leaf className="inline w-4 h-4 mr-1 text-lime-400" />,
//         'Hybrid': <Sparkles className="inline w-4 h-4 mr-1 text-pink-400" />,
//         'Synthetic': <Cpu className="inline w-4 h-4 mr-1 text-gray-500" />
//     };
//     return iconMap[type] || <PawPrint className="inline w-4 h-4 mr-1 text-gray-400" />; // Default to PawPrint
// };

export function generateCreatureName() {
    const syllableCount = Math.floor(Math.random() * 2) + 2;
    let name = '';
    for (let i = 0; i < syllableCount; i++) {
        name += nameSyllables[Math.floor(Math.random() * nameSyllables.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function generateFauna({ planetType }) {
    const density = faunaDensityByPlanetType[planetType] || 'moderate';
    if (density === 'none') return [];

    const count = {
        sparse: Math.floor(Math.random() * 2) + 1,
        moderate: Math.floor(Math.random() * 4) + 2,
        abundant: Math.floor(Math.random() * 10) + 5,
        aquaticOnly: Math.floor(Math.random() * 5) + 3,
        bizarreOnly: Math.floor(Math.random() * 3) + 2,
        syntheticOnly: Math.floor(Math.random() * 4) + 1
    }[density];

    const creatures = [];
    for (let i = 0; i < count; i++) {
        const name = generateCreatureName();
        const behavior = randomFrom(behaviorTypes);
        const type = (density === 'syntheticOnly') ? 'synthetic' : randomFrom(lifeformTypes);
        const biome = (density === 'aquaticOnly') ? 'marine' : randomFrom(biomes);
        const feet = type === 'cephalopod' ? 8 : type === 'synthetic' ? randomInt(0, 12) : randomInt(0, 6);
        const hasGender = Math.random() > 0.2;
        const laysEggs = ['reptile', 'avian', 'insectoid', 'amphibian'].includes(type);
        const description = `A ${behavior} ${type.name} that prefers the ${biome} biome.`;


        creatures.push({
            name,
            type,
            behavior,
            biome,
            feet,
            gendered: hasGender,
            laysEggs,
            description
        });
    }

    return creatures;
}

// faunaIconUtils.js
import {
    Bug,
    Cpu,
    Droplet,
    Feather,
    Leaf,
    MousePointer,
    Octagon,
    PawPrint,
    Shell,
    Sparkles,
    Turtle
} from 'lucide-react';

export const getFaunaIcon = (type) => {
    const iconMap = {
        Mammal: <PawPrint className="inline w-4 h-4 mr-1 text-red-400" />,
        Reptile: <Turtle className="inline w-4 h-4 mr-1 text-green-400" />,
        Avian: <Feather className="inline w-4 h-4 mr-1 text-yellow-400" />,
        Amphibian: <Droplet className="inline w-4 h-4 mr-1 text-blue-400" />,
        Insectoid: <Bug className="inline w-4 h-4 mr-1 text-purple-400" />,
        Crustacean: <Shell className="inline w-4 h-4 mr-1 text-teal-400" />,
        Rodent: <MousePointer className="inline w-4 h-4 mr-1 text-gray-400" />,
        Cephalopod: <Octagon className="inline w-4 h-4 mr-1 text-indigo-400" />,
        Plantimal: <Leaf className="inline w-4 h-4 mr-1 text-lime-400" />,
        Hybrid: <Sparkles className="inline w-4 h-4 mr-1 text-pink-400" />,
        Synthetic: <Cpu className="inline w-4 h-4 mr-1 text-gray-500" />
    };

    return iconMap[type] || (
        <PawPrint className="inline w-4 h-4 mr-1 text-gray-400" />
    );
};


function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
