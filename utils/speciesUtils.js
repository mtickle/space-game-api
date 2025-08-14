import { getRandomItem, chance } from './randomUtils.js';

// --- Sentient Species Database ---
const speciesList = [
    {
        speciesId: 'humanoid-terran',
        speciesName: 'Terran Descendants',
        description: 'Adaptable and resilient humanoids, descendants of ancient colonial efforts. Technologically adept and socially complex.',
        disposition: 'Pragmatic and Expansionist',
        homePlanetType: ['Rocky', 'Oceanic'],
        techLevel: 'Advanced'
    },
    {
        speciesId: 'aquatic-cygnian',
        speciesName: 'Cygnian Aquatics',
        description: 'Graceful, amphibious beings with a deep connection to their planet\'s oceans. They are masters of biotechnology.',
        disposition: 'Philosophical and Territorial',
        homePlanetType: ['Oceanic'],
        techLevel: 'Biological Mastery'
    },
    {
        speciesId: 'silicon-krell',
        speciesName: 'The Krell',
        description: 'A silicon-based species that communicates through crystalline resonance. Their logic is as flawless as it is alien.',
        disposition: 'Scholarly and Cautious',
        homePlanetType: ['Crystaline', 'Barren'],
        techLevel: 'Post-Singularity'
    },
    {
        speciesId: 'synthetic-automata',
        speciesName: 'The Automata',
        description: 'A self-replicating synthetic consciousness born from a long-dead civilization. They endlessly seek data and purpose.',
        disposition: 'Logical and Inquisitive',
        homePlanetType: ['Artificial', 'Metallic'],
        techLevel: 'Machine Intelligence'
    },
    {
        speciesId: 'avian-avior',
        speciesName: 'Avior Ascendants',
        description: 'Feathered bipeds with hollow bones, perfectly adapted to low-gravity worlds or gas giant moons.',
        disposition: 'Artistic and Fiercely Independent',
        homePlanetType: ['Rocky', 'Gas Giant'], // Gas Giant implies moons
        techLevel: 'Intermediate'
    },
    {
        speciesId: 'fungoid-mycelian',
        speciesName: 'Mycelian Collective',
        description: 'A hive-mind intelligence that exists as a vast, interconnected fungal network beneath the planet\'s surface.',
        disposition: 'Collective and Patient',
        homePlanetType: ['Exotic', 'Carbonaceous'],
        techLevel: 'Organic'
    }
];

/**
 * Generates the sentient inhabitants for a given planet.
 * @param {object} planet - The planet object, containing planetType and planetConditions.
 * @returns {Array} An array containing the species object, or an empty array if none.
 */
export const generateInhabitants = (planet) => {
    // Planets that are unlikely to have native sentient life
    const uninhabitableTypes = ['Gas Giant', 'Volcanic', 'Barren'];
    if (uninhabitableTypes.includes(planet.planetType) && planet.planetType !== 'Artificial') {
        // Exception for settlements on barren worlds, but no native species
        return [];
    }
    
    // 50% chance for a habitable planet to actually have a dominant sentient species
    if (!chance(0.5)) {
        return [];
    }

    // Find species that could have evolved on this type of planet
    const potentialNatives = speciesList.filter(s => s.homePlanetType.includes(planet.planetType));
    
    if (potentialNatives.length > 0) {
        return [getRandomItem(potentialNatives)]; // Return an array with one species
    }

    return [];
};
