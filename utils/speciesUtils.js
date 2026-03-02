import { speciesList } from './libraries/species.js';
import { chance, getRandomInt, getRandomItem } from './randomUtils.js';

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
