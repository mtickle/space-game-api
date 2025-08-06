
export const weatherNames = [
    "Arid", "Dust Storms", "Rainy", "Cyclonic", "Frozen Precipitation", "Volcanic Ashfall",
    "Crystal Showers", "Perpetual Overcast", "Unrelenting Sunlight", "Atmospheric Static",
    "Misty with a Chance of Regret", "Mood: Moist", "Punchy Winds with Sideways Hail",
    "Foggy Enough to Lose a Ship", "Thunderstorms You Can Taste"
];

export const temperatureNames = [
    "Temperate", "Blistering Heat", "Frosty", "Chilly", "Oppressively Humid",
    "Scorching but Dry (like bad humor)", "Cold Enough to Freeze a Plasma Line",
    "Just Right (for lizards)", "Sweater Weather (in a vacuum suit)", "Vaguely Sweaty",
    "Comfortably Inhospitable"
];

export const nightTemperatureNames = [
    "Mild", "Frigid", "Bitter Cold", "Subzero", "Frozen Solid", "Balmy",
    "Mild if You're On Fire", "Cozy for Ice Worms", "Tolerable, Assuming Cryosleep",
    "So Cold Even the Darkness Shivers", "Brisk But Deadly"
];

export const windNames = [
    "Gentle", "Steady", "Unpredictable Gusts", "Searing Winds", "Howling Winds",
    "Silent but Deadly", "Whispers of Madness", "Strong Enough to Peel Paint Off a Ship",
    "Sonic Boom Breezes", "You'll Need Ballast", "Unregistered Tornado Alley"
];

export const toxicityNames = [
    "None", "Low", "Moderate", "High", "Deadly", "Lethal Without Filters",
    "Melts Metal (and Mood)", "Get in the Suit and Don’t Breathe", "Certified No-No Air",
    "Toxic to the Touch", "Don't Even Think About It", "Toxicity 3000™",
    "Great for Robots, Bad for Everything Else", "Rated 'NOPE' by the Galactic Health Authority"
];

export const radiationLevelNames = [
    "Safe", "Background Only", "Elevated", "Unshielded Exposure Not Recommended",
    "Dangerous", "Suit-Melting", "Microwave-Worthy", "Hostile to DNA",
    "Glow in the Dark Guaranteed", "Turns Teeth Into Antennas", "Full Cosmic BBQ",
    "Congratulations, You’re a Radiator Now", "Only Survivable by Cockroaches"
];

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