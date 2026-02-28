import { nightTemperatureNames, radiationLevelNames, temperatureNames, toxicityNames, weatherNames, windNames } from "./libraries/conditions.js";

// Weighted random selection
export const getWeightedRandom = (options, weights) => {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const roll = Math.random() * totalWeight;
    let acc = 0;
    for (let i = 0; i < options.length; i++) {
        acc += weights[i];
        if (roll <= acc) return options[i];
    }
    return options[options.length - 1]; // Fallback
};

// Get conditions based on planet type
export const getConditionsForPlanetType = (type) => {
    const conditions = {};
    switch (type) {
        case "Ice World":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [1, 1, 5, 3, 1, 1, 3, 1, 1, 1, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [1, 3, 3, 3, 2, 1, 1, 2, 1, 2, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 1, 1, 1, 3, 1, 1, 2, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Oceanic":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
            conditions.temperature = getWeightedRandom(temperatureNames, [3, 1, 1, 1, 3, 1, 1, 1, 1, 2, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Volcanic":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Gas Giant":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Rocky":
        case "Barren":
            conditions.weather = getWeightedRandom(weatherNames, [3, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Radiated":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Exotic":
        case "Crystaline":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        case "Artificial":
            conditions.weather = getWeightedRandom(weatherNames, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1]);
            conditions.temperature = getWeightedRandom(temperatureNames, [1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1]);
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1]);
            conditions.wind = getWeightedRandom(windNames, [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]);
            conditions.toxicity = getWeightedRandom(toxicityNames, [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            conditions.radiation = getWeightedRandom(radiationLevelNames, [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            break;
        default:
            // Fallback for unknown types
            conditions.weather = getWeightedRandom(weatherNames, Array(weatherNames.length).fill(1));
            conditions.temperature = getWeightedRandom(temperatureNames, Array(temperatureNames.length).fill(1));
            conditions.nightTemperature = getWeightedRandom(nightTemperatureNames, Array(nightTemperatureNames.length).fill(1));
            conditions.wind = getWeightedRandom(windNames, Array(windNames.length).fill(1));
            conditions.toxicity = getWeightedRandom(toxicityNames, Array(toxicityNames.length).fill(1));
            conditions.radiation = getWeightedRandom(radiationLevelNames, Array(radiationLevelNames.length).fill(1));
    }
    return conditions;
};

export const getRandomConditions = () => {
    const conditions = {
        weather: getWeightedRandom(weatherNames, Array(weatherNames.length).fill(1)),
        temperature: getWeightedRandom(temperatureNames, Array(temperatureNames.length).fill(1)),
        nightTemperature: getWeightedRandom(nightTemperatureNames, Array(nightTemperatureNames.length).fill(1)),
        wind: getWeightedRandom(windNames, Array(windNames.length).fill(1)),
        toxicity: getWeightedRandom(toxicityNames, Array(toxicityNames.length).fill(1)),
        radiation: getWeightedRandom(radiationLevelNames, Array(radiationLevelNames.length).fill(1)),
    };
    return conditions;
};


export function generateConditions(type) {
    if (typeof type !== 'string') return getRandomConditions();
    return getConditionsForPlanetType(type);
}