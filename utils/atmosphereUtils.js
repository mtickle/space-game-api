/**
 * @fileoverview Generates random atmospheric conditions
 * @module utils/atmosphereUtils.js 
 * @author Mike
 * @reviewed 2025-10-27 
 */

const atmosphereProfiles = {
    'Rocky': [
        { elements: [{ name: 'Nitrogen', percent: 0.78 }, { name: 'Oxygen', percent: 0.21 }, { name: 'Argon', percent: 0.01 }] }, // Earth-like
        { elements: [{ name: 'Carbon Dioxide', percent: 0.95 }, { name: 'Nitrogen', percent: 0.03 }, { name: 'Argon', percent: 0.02 }] }, // Venus/Mars-like
        { elements: [{ name: 'Nitrogen', percent: 0.99 }, { name: 'Helium', percent: 0.01 }] }, // Titan-like
        { elements: [{ name: 'Thin Carbon Dioxide', percent: 0.99 }] }, // Thin Martian
        { elements: [{ name: 'Sulfur Dioxide', percent: 0.8 }, { name: 'Nitrogen', percent: 0.2 }] }, // Io-like
        { elements: [{ name: 'Oxygen', percent: 0.35 }, { name: 'Nitrogen', percent: 0.65 }] }, // High Oxygen
        { elements: [{ name: 'Neon', percent: 0.5 }, { name: 'Nitrogen', percent: 0.5 }] }, // Noble
        { elements: [{ name: 'Argon', percent: 0.7 }, { name: 'Oxygen', percent: 0.3 }] }, // Inert
        { elements: [{ name: 'Chlorine', percent: 0.1 }, { name: 'Nitrogen', percent: 0.9 }] }, // Toxic
        { elements: [{ name: 'Ammonia', percent: 0.1 }, { name: 'Nitrogen', percent: 0.9 }] },
        { elements: [{ name: 'Carbon Monoxide', percent: 0.2 }, { name: 'Nitrogen', percent: 0.8 }] },
        { elements: [{ name: 'Formaldehyde', percent: 0.05 }, { name: 'Nitrogen', percent: 0.95 }] }
    ],
    'Gas': [ // Gas Giant
        { elements: [{ name: 'Hydrogen', percent: 0.9 }, { name: 'Helium', percent: 0.1 }] }, // Standard Jupiter
        { elements: [{ name: 'Hydrogen', percent: 0.85 }, { name: 'Helium', percent: 0.15 }] },
        { elements: [{ name: 'Hydrogen', percent: 0.8 }, { name: 'Helium', percent: 0.15 }, { name: 'Methane', percent: 0.05 }] }, // Saturn-like
        { elements: [{ name: 'Hydrogen', percent: 0.9 }, { name: 'Ammonia', percent: 0.1 }] },
        { elements: [{ name: 'Hydrogen', percent: 0.7 }, { name: 'Helium', percent: 0.1 }, { name: 'Neon', percent: 0.2 }] },
        { elements: [{ name: 'Helium', percent: 0.6 }, { name: 'Hydrogen', percent: 0.4 }] }, // Helium-rich
        { elements: [{ name: 'Hydrogen', percent: 0.95 }, { name: 'Sulfur', percent: 0.05 }] },
        { elements: [{ name: 'Hydrogen', percent: 0.88 }, { name: 'Helium', percent: 0.11 }, { name: 'Deuterium', percent: 0.01 }] },
        { elements: [{ name: 'Methane', percent: 0.5 }, { name: 'Hydrogen', percent: 0.5 }] }, // Ice Giant lean
        { elements: [{ name: 'Water Vapor', percent: 0.2 }, { name: 'Hydrogen', percent: 0.8 }] }, // Class II
        { elements: [{ name: 'Sodium', percent: 0.01 }, { name: 'Hydrogen', percent: 0.99 }] }, // Hot Jupiter
        { elements: [{ name: 'Silicate Vapor', percent: 0.05 }, { name: 'Hydrogen', percent: 0.95 }] }
    ],
    'Ice': [ // Ice World
        { elements: [{ name: 'Nitrogen', percent: 0.9 }, { name: 'Methane', percent: 0.1 }] }, // Pluto/Triton
        { elements: [{ name: 'Water Vapor', percent: 0.8 }, { name: 'Nitrogen', percent: 0.2 }] },
        { elements: [{ name: 'Carbon Dioxide', percent: 0.8 }, { name: 'Nitrogen', percent: 0.2 }] },
        { elements: [{ name: 'Ammonia', percent: 0.8 }, { name: 'Methane', percent: 0.2 }] },
        { elements: [{ name: 'Nitrogen', percent: 0.99 }, { name: 'Argon', percent: 0.01 }] },
        { elements: [{ name: 'Methane', percent: 0.6 }, { name: 'Nitrogen', percent: 0.4 }] },
        { elements: [{ name: 'Oxygen', percent: 0.1 }, { name: 'Nitrogen', percent: 0.9 }] }, // Tenacious
        { elements: [{ name: 'Neon', percent: 0.8 }, { name: 'Nitrogen', percent: 0.2 }] },
        { elements: [{ name: 'Helium', percent: 0.5 }, { name: 'Hydrogen', percent: 0.5 }] },
        { elements: [{ name: 'Argon', percent: 0.9 }, { name: 'Methane', percent: 0.1 }] },
        { elements: [{ name: 'Ozone', percent: 0.05 }, { name: 'Nitrogen', percent: 0.95 }] }
    ],
    'Exotic': [
        { elements: [{ name: 'Xenon', percent: 0.4 }, { name: 'Neon', percent: 0.4 }, { name: 'Nitrogen', percent: 0.2 }] },
        { elements: [{ name: 'Radon', percent: 0.5 }, { name: 'Chlorine', percent: 0.5 }] },
        { elements: [{ name: 'Plasma', percent: 1.0 }] },
        { elements: [{ name: 'Metallic Vapor', percent: 1.0 }] },
        { elements: [{ name: 'Silicate Vapor', percent: 1.0 }] },
        { elements: [{ name: 'Unknown Organic', percent: 0.2 }, { name: 'Nitrogen', percent: 0.8 }] }
    ],
    'Oceanic': [
        { elements: [{ name: 'Nitrogen', percent: 0.7 }, { name: 'Oxygen', percent: 0.3 }] },
        { elements: [{ name: 'Water Vapor', percent: 0.9 }, { name: 'Oxygen', percent: 0.1 }] },
        { elements: [{ name: 'Water Vapor', percent: 0.95 }, { name: 'Argon', percent: 0.05 }] },
        { elements: [{ name: 'Nitrogen', percent: 0.6 }, { name: 'Carbon Dioxide', percent: 0.4 }] },
        { elements: [{ name: 'Oxygen', percent: 0.5 }, { name: 'Helium', percent: 0.5 }] },
        { elements: [{ name: 'Hydrogen', percent: 0.2 }, { name: 'Water Vapor', percent: 0.8 }] }
    ],
    'Volcanic': [
        { elements: [{ name: 'Sulfur Dioxide', percent: 0.8 }, { name: 'Carbon Dioxide', percent: 0.2 }] },
        { elements: [{ name: 'Chlorine', percent: 0.6 }, { name: 'Fluorine', percent: 0.4 }] },
        { elements: [{ name: 'Sulfur Dioxide', percent: 0.9 }, { name: 'Argon', percent: 0.1 }] },
        { elements: [{ name: 'Carbon Dioxide', percent: 0.8 }, { name: 'Sulfur', percent: 0.2 }] },
        { elements: [{ name: 'Nitrogen', percent: 0.5 }, { name: 'Sulfur Dioxide', percent: 0.5 }] },
        { elements: [{ name: 'Methane', percent: 0.1 }, { name: 'Carbon Dioxide', percent: 0.9 }] },
        { elements: [{ name: 'Hydrogen Sulfide', percent: 0.3 }, { name: 'Carbon Dioxide', percent: 0.7 }] },
        { elements: [{ name: 'Ash (Particulate)', percent: 0.4 }, { name: 'Carbon Dioxide', percent: 0.6 }] }
    ],
    'Barren': [
        { elements: [{ name: 'Carbon Dioxide', percent: 0.99 }] },
        { elements: [{ name: 'Argon', percent: 0.95 }, { name: 'Nitrogen', percent: 0.05 }] },
        { elements: [{ name: 'None', percent: 0.0 }] }, // Vacuum
        { elements: [{ name: 'Trace Argon', percent: 1.0 }] },
        { elements: [{ name: 'Trace Sodium', percent: 1.0 }] },
        { elements: [{ name: 'Trace Oxygen', percent: 1.0 }] }
    ],
    'Crystaline': [
        { elements: [{ name: 'Xenon', percent: 0.8 }, { name: 'Krypton', percent: 0.2 }] },
        { elements: [{ name: 'Argon', percent: 0.5 }, { name: 'Neon', percent: 0.5 }] },
        { elements: [{ name: 'Crystal Dust', percent: 0.1 }, { name: 'Nitrogen', percent: 0.9 }] }
    ],
    'Radiated': [
        { elements: [{ name: 'Radon', percent: 0.7 }, { name: 'Xenon', percent: 0.3 }] },
        { elements: [{ name: 'Gamma Particles', percent: 0.5 }, { name: 'Ionized Gas', percent: 0.5 }] }
    ],
    'Artificial': [
        { elements: [{ name: 'Nitrogen', percent: 0.78 }, { name: 'Oxygen', percent: 0.21 }, { name: 'Helium', percent: 0.01 }] },
        { elements: [{ name: 'Argon', percent: 0.5 }, { name: 'Neon', percent: 0.5 }] },
        { elements: [{ name: 'Filtered Air', percent: 1.0 }] }
    ]
};

/**
 * Generates an atmospheric composition for a planet based on its type.
 * Selects a predefined profile matching the planet type or provides a default.
 * @param {string} planetType - The type of the planet (e.g., 'Rocky', 'Gas Giant').
 * @returns {object} An object containing an array of atmospheric elements with names and percentages. Example: { elements: [{ name: 'Nitrogen', percent: 0.78 }, { name: 'Oxygen', percent: 0.21 }] }
 */
export function generateAtmosphere(planetType) {
    const profile = atmosphereProfiles[planetType];
    if (profile) {
        // Pick a random profile for the given planet type
        return profile[Math.floor(Math.random() * profile.length)];
    }
    // Fallback to a basic atmosphere if type is unknown
    return { elements: [{ name: 'Nitrogen', percent: 0.8 }, { name: 'Oxygen', percent: 0.2 }] };
}



