import { getRandomItem, chance, getRandomInt } from './randomUtils.js';

// --- Building Database ---
const buildingBlueprints = {
    'Residential': ['Habitation Blocks', 'Communal Shelters', 'Luxury Sky-Towers', 'Scrap-Built Shanties'],
    'Commerce': ['Open-Air Market', 'Trade Depot', 'Shady Cantina', 'Corporate Emporium'],
    'Food': ['Hydroponics Farm', 'Agri-Dome', 'Nutrient Vats', 'Fungus Caverns'],
    'Energy': ['Fusion Power Core', 'Geothermal Vents', 'Solar Array', 'Scavenged Generators'],
    'Medical': ['Medbay Clinic', 'Cryo-Stasis Facility', 'Herbalist Den', 'Cybernetics Lab'],
    'Science': ['Stellar Observatory', 'Xeno-Biology Lab', 'Geological Survey Post', 'Forbidden Archives'],
    'Industry': ['Ore Refinery', 'Automated Factory', 'Ship Scrapyard', 'Bio-Forge'],
};

// --- Settlement Themes ---
const themes = {
    'High-Tech': { condition: ['Pristine', 'Sterile', 'Functional'], buildings: ['Luxury Sky-Towers', 'Corporate Emporium', 'Fusion Power Core', 'Cybernetics Lab', 'Stellar Observatory'] },
    'Agrarian': { condition: ['Verdant', 'Rustic', 'Peaceful'], buildings: ['Communal Shelters', 'Open-Air Market', 'Hydroponics Farm', 'Herbalist Den'] },
    'Industrial': { condition: ['Polluted', 'Functional', 'Grimy'], buildings: ['Habitation Blocks', 'Trade Depot', 'Nutrient Vats', 'Ore Refinery', 'Automated Factory'] },
    'Scavenger': { condition: ['Dilapidated', 'Chaotic', 'Makeshift'], buildings: ['Scrap-Built Shanties', 'Shady Cantina', 'Fungus Caverns', 'Scavenged Generators', 'Ship Scrapyard'] }
};

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

    const theme = themes[themeKey];
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
