import { buildingBlueprints } from './libraries/buildingBlueprints.js';
import { settlementThemes } from './libraries/settlementThemes.js';
import { getRandomItem } from './randomUtils.js';

/**
 * Generates a detailed layout for a settlement, including a theme and list of buildings.
 * @param {object} settlement - The settlement object, containing population.
 * @param {object} planet - The planet object, containing planetType and resourceList.
 * @returns {object} A layout object with a theme, condition, and list of buildings.
 */
export const generateSettlementLayout = (settlement, planet) => {
    let themeKey = 'Agrarian'; // Default theme

    // Determine theme based on planet type and economy
    if (['Artificial', 'Metallic'].includes(planet.planetType) || planet.economy?.techLevel > 7) {
        themeKey = 'High-Tech';
    } else if (planet.industry?.name === 'Mining' || planet.industry?.name === 'Manufacturing') {
        themeKey = 'Industrial';
    } else if (planet.planetType === 'Barren' || planet.planetConditions?.toxicity === 'High') {
        themeKey = 'Scavenger';
    }

    const theme = settlementThemes[themeKey];
    const condition = getRandomItem(theme.condition);
    const buildings = [];

    // Determine number of buildings based on population
    const buildingCount = Math.max(1, Math.floor(settlement.population / 100000));

    const availableBuildings = new Set(theme.buildings);
    // Add some generic buildings to the pool
    Object.values(buildingBlueprints).forEach(list => list.forEach(b => availableBuildings.add(b)));

    for (let i = 0; i < buildingCount; i++) {
        if (availableBuildings.size === 0) break;

        const buildingName = getRandomItem(Array.from(availableBuildings));
        availableBuildings.delete(buildingName); // Ensure unique buildings

        const type = Object.keys(buildingBlueprints).find(key => buildingBlueprints[key].includes(buildingName)) || 'Misc';

        buildings.push({
            name: buildingName,
            type: type,
        });
    }

    return {
        theme: themeKey,
        condition: condition,
        buildings: buildings,
    };
};
