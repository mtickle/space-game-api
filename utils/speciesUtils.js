import { chance, getRandomItem } from './randomUtils.js';


const speciesList = [
    {
        speciesId: 'humanoid-terran',
        speciesName: 'Terran Descendants',
        description: 'Adaptable and resilient humanoids, descendants of ancient colonial efforts. Technologically adept and socially complex.',
        disposition: 'Pragmatic and Expansionist',
        homePlanetType: ['Rocky', 'Oceanic'],
        techLevel: 'Advanced',
        societalTypes: ['Civilization'] // Can only form advanced societies
    },
    {
        speciesId: 'aquatic-cygnian',
        speciesName: 'Cygnian Aquatics',
        description: 'Graceful, amphibious beings with a deep connection to their planet\'s oceans. They are masters of biotechnology.',
        disposition: 'Philosophical and Territorial',
        homePlanetType: ['Oceanic'],
        techLevel: 'Biological Mastery',
        societalTypes: ['Civilization', 'Primitive'] // Can be found as either
    },
    {
        speciesId: 'silicon-krell',
        speciesName: 'The Krell',
        description: 'A silicon-based species that communicates through crystalline resonance. Their logic is as flawless as it is alien.',
        disposition: 'Scholarly and Cautious',
        homePlanetType: ['Crystaline', 'Barren'],
        techLevel: 'Post-Singularity',
        societalTypes: ['Civilization', 'Scattered Enclaves']
    },
    {
        speciesId: 'synthetic-automata',
        speciesName: 'The Automata',
        description: 'A self-replicating synthetic consciousness born from a long-dead civilization. They endlessly seek data and purpose.',
        disposition: 'Logical and Inquisitive',
        homePlanetType: ['Artificial', 'Metallic'],
        techLevel: 'Machine Intelligence',
        societalTypes: ['Civilization']
    },
    {
        speciesId: 'avian-avior',
        speciesName: 'Avior Ascendants',
        description: 'Feathered bipeds with hollow bones, perfectly adapted to low-gravity worlds or gas giant moons.',
        disposition: 'Artistic and Fiercely Independent',
        homePlanetType: ['Rocky', 'Gas Giant'],
        techLevel: 'Intermediate',
        societalTypes: ['Civilization', 'Primitive']
    },
    {
        speciesId: 'fungoid-mycelian',
        speciesName: 'Mycelian Collective',
        description: 'A hive-mind intelligence that exists as a vast, interconnected fungal network beneath the planet\'s surface.',
        disposition: 'Collective and Patient',
        homePlanetType: ['Exotic', 'Carbonaceous'],
        techLevel: 'Organic',
        societalTypes: ['Civilization', 'Primitive', 'Scattered Enclaves']
    },
    {
        speciesId: 'ursine-glacialis',
        speciesName: 'Glacial Ursines',
        description: 'Massive, fur-covered beings adapted to sub-zero temperatures. They are formidable hunters who live in small, nomadic clans across the ice sheets.',
        disposition: 'Stoic and Territorial',
        homePlanetType: ['Ice World'],
        techLevel: 'Primitive',
        societalTypes: ['Primitive', 'Scattered Enclaves']
    },
    {
        speciesId: 'insectoid-cryo',
        speciesName: 'Cryo-Insectoids',
        description: 'A hive-minded insectoid species that burrows deep beneath the ice, thriving near geothermal vents. They build intricate cities of ice and organic resin.',
        disposition: 'Collective and Industrious',
        homePlanetType: ['Ice World'],
        techLevel: 'Geothermal',
        societalTypes: ['Civilization', 'Primitive']
    }
];

/**
 * Generates the sentient inhabitants for a given planet.
 * @param {object} planet - The planet object, containing planetType and isUniqueName.
 * @returns {Array} An array containing the species object, or an empty array if none.
 */
export const generateInhabitants = (planet) => {

    let requiredSocietalType = null;

    if (planet.isUniqueName) {
        // Named planets are always civilized
        requiredSocietalType = 'Civilization';
    } else if (chance(0.3)) {
        // Unnamed planets have a 30% chance of being primitive
        requiredSocietalType = 'Primitive';
    }

    // If no societal type is required (e.g., the 30% chance failed), exit early.
    if (!requiredSocietalType) {
        return [];
    }

    // Now, run the filter logic once.
    const potentialInhabitants = speciesList.filter(s =>
        s.homePlanetType.includes(planet.planetType) &&
        s.societalTypes.includes(requiredSocietalType)
    );

    if (potentialInhabitants.length > 0) {
        const species = getRandomItem(potentialInhabitants);
        return [{ ...species, societalType: requiredSocietalType }];
    }

    return [];
};