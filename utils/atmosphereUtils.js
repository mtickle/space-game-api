// atmosphereUtils.js

// Define different profiles of atmospheric compositions based on planet type.
const atmosphereProfiles = {
    'Rocky': [
        { elements: [{ name: 'Nitrogen', percent: 0.78 }, { name: 'Oxygen', percent: 0.21 }, { name: 'Argon', percent: 0.01 }] }, // Earth-like
        { elements: [{ name: 'Carbon Dioxide', percent: 0.95 }, { name: 'Nitrogen', percent: 0.03 }, { name: 'Argon', percent: 0.02 }] }, // Venus/Mars-like
        { elements: [{ name: 'Nitrogen', percent: 0.99 }, { name: 'Helium', percent: 0.01 }] }, // Titan-like
    ],
    'Gas Giant': [
        { elements: [{ name: 'Hydrogen', percent: 0.9 }, { name: 'Helium', percent: 0.1 }] },
        { elements: [{ name: 'Hydrogen', percent: 0.85 }, { name: 'Helium', percent: 0.15 }] },
        { elements: [{ name: 'Hydrogen', percent: 0.8 }, { name: 'Helium', percent: 0.15 }, { name: 'Methane', percent: 0.05 }] },
    ],
    'Ice World': [
        { elements: [{ name: 'Nitrogen', percent: 0.9 }, { name: 'Methane', percent: 0.1 }] },
        { elements: [{ name: 'Water Vapor', percent: 0.8 }, { name: 'Nitrogen', percent: 0.2 }] },
    ],
    'Exotic': [
        { elements: [{ name: 'Xenon', percent: 0.4 }, { name: 'Neon', percent: 0.4 }, { name: 'Nitrogen', percent: 0.2 }] },
        { elements: [{ name: 'Radon', percent: 0.5 }, { name: 'Chlorine', percent: 0.5 }] },
    ],
    'Oceanic': [
        { elements: [{ name: 'Nitrogen', percent: 0.7 }, { name: 'Oxygen', percent: 0.3 }] },
        { elements: [{ name: 'Water Vapor', percent: 0.9 }, { name: 'Oxygen', percent: 0.1 }] },
    ],
    'Volcanic': [
        { elements: [{ name: 'Sulfur Dioxide', percent: 0.8 }, { name: 'Carbon Dioxide', percent: 0.2 }] },
        { elements: [{ name: 'Chlorine', percent: 0.6 }, { name: 'Fluorine', percent: 0.4 }] },
    ],
    'Barren': [
        { elements: [{ name: 'Carbon Dioxide', percent: 0.99 }] },
        { elements: [{ name: 'Argon', percent: 0.95 }, { name: 'Nitrogen', percent: 0.05 }] },
    ],
    'Crystaline': [
        { elements: [{ name: 'Xenon', percent: 0.8 }, { name: 'Krypton', percent: 0.2 }] },
    ],
    'Radiated': [
        { elements: [{ name: 'Radon', percent: 0.7 }, { name: 'Xenon', percent: 0.3 }] },
    ],
    'Artificial': [
        { elements: [{ name: 'Nitrogen', percent: 0.78 }, { name: 'Oxygen', percent: 0.21 }, { name: 'Helium', percent: 0.01 }] },
        { elements: [{ name: 'Argon', percent: 0.5 }, { name: 'Neon', percent: 0.5 }] },
    ]
};

export function generateAtmosphere(planetType) {
    const profile = atmosphereProfiles[planetType];
    if (profile) {
        // Pick a random profile for the given planet type
        return profile[Math.floor(Math.random() * profile.length)];
    }
    // Fallback to a basic atmosphere if type is unknown
    return { elements: [{ name: 'Nitrogen', percent: 0.8 }, { name: 'Oxygen', percent: 0.2 }] };
}



