import { chance, getRandomInt, getRandomItem } from './randomUtils.js';


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
    let inhabitants = [];

    // 1. Determine Native Species
    const potentialNatives = speciesList.filter(s => s.homePlanetType.includes(planet.planetType));
    let nativeSpecies = null;
    if (potentialNatives.length > 0 && chance(0.6)) {
        nativeSpecies = getRandomItem(potentialNatives);
    }

    // 2. Handle based on whether the world is civilized
    if (planet.hasCivilization) {
        // If there's a native species that can form a civilization, add it.
        if (nativeSpecies && nativeSpecies.societalTypes.includes('Civilization')) {
            inhabitants.push({ ...nativeSpecies, type: 'Native', societalType: 'Civilization' });
        }

        // Add settler species
        const settlerSpecies = speciesList.filter(s => s.canSettle && s.speciesId !== nativeSpecies?.speciesId);

        // --- FIX: Ensure at least one species exists on a civilized world ---
        const needsPrimaryCivilization = inhabitants.length === 0;
        const numSettlerGroups = needsPrimaryCivilization ? getRandomInt(1, 4) : getRandomInt(0, 4);

        for (let i = 0; i < numSettlerGroups; i++) {
            if (settlerSpecies.length === 0 || inhabitants.length >= 5) break;
            const settler = settlerSpecies.splice(Math.floor(Math.random() * settlerSpecies.length), 1)[0];
            inhabitants.push({ ...settler, type: 'Settler', societalType: 'Civilization' });
        }
    } else {
        // For uncivilized worlds, only add the native species if it can be primitive.
        if (nativeSpecies && nativeSpecies.societalTypes.includes('Primitive')) {
            inhabitants.push({ ...nativeSpecies, type: 'Native', societalType: 'Primitive' });
        }
    }

    // 3. Calculate Population Percentages
    if (inhabitants.length > 0) {
        let weights = inhabitants.map((species) => {
            // Give native species a higher population weight
            return species.type === 'Native' ? Math.random() * 50 + 50 : Math.random() * 20 + 5;
        });

        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        if (totalWeight === 0) return []; // Avoid division by zero

        inhabitants.forEach((species, index) => {
            species.populationPercentage = Math.round((weights[index] / totalWeight) * 100);
        });

        // Adjust percentages to ensure they sum to exactly 100
        const currentTotal = inhabitants.reduce((sum, s) => sum + s.populationPercentage, 0);
        if (currentTotal !== 100 && inhabitants.length > 0) {
            inhabitants[0].populationPercentage += 100 - currentTotal;
        }
    }

    return inhabitants;
};
