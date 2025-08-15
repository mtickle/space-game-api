import { chance, getRandomItem } from './randomUtils.js';

// --- Sentient Species Database ---
// NEW: Added 'societalTypes' to each species
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
    }
];

/**
 * Generates the sentient inhabitants for a given planet.
 * @param {object} planet - The planet object, containing planetType and isUniqueName.
 * @returns {Array} An array containing the species object, or an empty array if none.
 */
export const generateInhabitants = (planet) => {
    const uninhabitableTypes = ['Gas Giant', 'Volcanic', 'Barren'];
    if (uninhabitableTypes.includes(planet.planetType) && planet.planetType !== 'Artificial') {
        return [];
    }

    // --- REVISED LOGIC ---
    if (planet.isUniqueName) {
        // Named planets ALWAYS have a civilized species.
        const potentialInhabitants = speciesList.filter(s =>
            s.homePlanetType.includes(planet.planetType) &&
            s.societalTypes.includes('Civilization')
        );
        if (potentialInhabitants.length > 0) {
            const species = getRandomItem(potentialInhabitants);
            return [{ ...species, societalType: 'Civilization' }];
        }
    } else {
        // Unnamed planets have a CHANCE to have primitive life.
        if (chance(0.3)) { // 30% chance for primitives
            const potentialInhabitants = speciesList.filter(s =>
                s.homePlanetType.includes(planet.planetType) &&
                s.societalTypes.includes('Primitive')
            );
            if (potentialInhabitants.length > 0) {
                const species = getRandomItem(potentialInhabitants);
                return [{ ...species, societalType: 'Primitive' }];
            }
        }
    }

    return [];
};
