import { chance, getRandomInt, getRandomItem } from './randomUtils.js';


// utils/speciesUtils.js

export const speciesList = [
    // Original entries (unchanged)
    {
        speciesId: 'humanoid-terran',
        speciesName: 'Terran Descendants',
        description: 'Adaptable and resilient humanoids, descendants of ancient colonial efforts. Technologically adept and socially complex.',
        disposition: 'Pragmatic and Expansionist',
        homePlanetType: ['Rocky', 'Oceanic'],
        techLevel: 'Advanced',
        societalTypes: ['Civilization'],
        canSettle: true // They are colonists
    },
    {
        speciesId: 'aquatic-cygnian',
        speciesName: 'Cygnian Aquatics',
        description: 'Graceful, amphibious beings with a deep connection to their planet\'s oceans. They are masters of biotechnology.',
        disposition: 'Philosophical and Territorial',
        homePlanetType: ['Oceanic'],
        techLevel: 'Biological Mastery',
        societalTypes: ['Civilization', 'Primitive'],
        canSettle: false // Tend to stay on their home worlds
    },
    {
        speciesId: 'silicon-krell',
        speciesName: 'The Krell',
        description: 'A silicon-based species that communicates through crystalline resonance. Their logic is as flawless as it is alien.',
        disposition: 'Scholarly and Cautious',
        homePlanetType: ['Crystaline', 'Barren'],
        techLevel: 'Post-Singularity',
        societalTypes: ['Civilization', 'Scattered Enclaves'],
        canSettle: true // Their advanced tech allows them to settle harsh worlds
    },
    {
        speciesId: 'synthetic-automata',
        speciesName: 'The Automata',
        description: 'A self-replicating synthetic consciousness born from a long-dead civilization. They endlessly seek data and purpose.',
        disposition: 'Logical and Inquisitive',
        homePlanetType: ['Artificial', 'Metallic'],
        techLevel: 'Machine Intelligence',
        societalTypes: ['Civilization'],
        canSettle: true // Can establish outposts anywhere
    },
    {
        speciesId: 'avian-avior',
        speciesName: 'Avior Ascendants',
        description: 'Feathered bipeds with hollow bones, perfectly adapted to low-gravity worlds or gas giant moons.',
        disposition: 'Artistic and Fiercely Independent',
        homePlanetType: ['Rocky', 'Gas Giant'],
        techLevel: 'Intermediate',
        societalTypes: ['Civilization', 'Primitive'],
        canSettle: true // Space-faring nomads
    },
    {
        speciesId: 'fungoid-mycelian',
        speciesName: 'Mycelian Collective',
        description: 'A hive-mind intelligence that exists as a vast, interconnected fungal network beneath the planet\'s surface.',
        disposition: 'Collective and Patient',
        homePlanetType: ['Exotic', 'Carbonaceous'],
        techLevel: 'Organic',
        societalTypes: ['Civilization', 'Primitive', 'Scattered Enclaves'],
        canSettle: false // Intrinsically tied to their home planet
    },
    {
        speciesId: 'ursine-glacialis',
        speciesName: 'Glacial Ursines',
        description: 'Massive, fur-covered beings adapted to sub-zero temperatures. They are formidable hunters who live in small, nomadic clans across the ice sheets.',
        disposition: 'Stoic and Territorial',
        homePlanetType: ['Ice World'],
        techLevel: 'Primitive',
        societalTypes: ['Primitive', 'Scattered Enclaves'],
        canSettle: false // Not space-faring
    },
    {
        speciesId: 'insectoid-cryo',
        speciesName: 'Cryo-Insectoids',
        description: 'A hive-minded insectoid species that burrows deep beneath the ice, thriving near geothermal vents. They build intricate cities of ice and organic resin.',
        disposition: 'Collective and Industrious',
        homePlanetType: ['Ice World'],
        techLevel: 'Geothermal',
        societalTypes: ['Civilization', 'Primitive'],
        canSettle: false // Tied to their specific environment
    },
    {
        speciesId: 'lithovore-igneous',
        speciesName: 'Igneous Lithovores',
        description: 'A slow-moving, silicon-based lifeform that consumes minerals for sustenance. They are impervious to extreme heat and pressure.',
        disposition: 'Patient and Unflinching',
        homePlanetType: ['Volcanic'],
        techLevel: 'Geological',
        societalTypes: ['Primitive', 'Scattered Enclaves'],
        canSettle: false
    },
    {
        speciesId: 'phasic-anomaly',
        speciesName: 'Phasic Beings',
        description: 'Beings of pure energy that thrive in high-radiation environments. Their physical form is unstable and difficult for scanners to resolve.',
        disposition: 'Enigmatic and Unpredictable',
        homePlanetType: ['Radiated'],
        techLevel: 'Exotic',
        societalTypes: ['Scattered Enclaves'], // They don't build traditional civilizations
        canSettle: false
    },

    // --- Greatly Expanded Additions ---

    // Mammalian / warm-blooded archetypes
    {
        speciesId: 'mammalian-predator',
        speciesName: 'Vorathian Apex Hunters',
        description: 'Pack-oriented carnivores with keen senses and powerful builds. They value strength, loyalty, and ritualistic hunts.',
        disposition: 'Honorable and Militaristic',
        homePlanetType: ['Savanna', 'Arid'],
        techLevel: 'Intermediate',
        societalTypes: ['Civilization', 'Tribal Clans'],
        canSettle: true // Aggressive colonizers
    },
    {
        speciesId: 'reptilian-imperial',
        speciesName: 'Saurian Dominion',
        description: 'Cold-blooded reptilians with hierarchical castes and ancient warrior traditions. They build vast pyramid-cities and conquer relentlessly.',
        disposition: 'Authoritarian and Expansionist',
        homePlanetType: ['Volcanic', 'Desert'],
        techLevel: 'Advanced',
        societalTypes: ['Civilization', 'Empire'],
        canSettle: true
    },

    // Plant / sessile life
    {
        speciesId: 'plantoid-symbiont',
        speciesName: 'Verdant Symbiotes',
        description: 'Mobile plant-animal hybrids that form symbiotic relationships with lesser species. They photosynthesize and spread vast living megastructures.',
        disposition: 'Harmonious and Communal',
        homePlanetType: ['Tropical', 'Gaia / Biosphere Rich'],
        techLevel: 'Biological Mastery',
        societalTypes: ['Civilization', 'Hive Network'],
        canSettle: true // Terraform via biomass
    },

    // Arthropod / hive variants
    {
        speciesId: 'arthropoid-swarm',
        speciesName: 'Zorath Swarm',
        description: 'Relentless hive-minded arthropods driven by consumption and adaptation. They strip worlds bare and evolve rapidly.',
        disposition: 'Devouring and Adaptive',
        homePlanetType: ['Carbonaceous', 'Exotic'],
        techLevel: 'Organic Evolution',
        societalTypes: ['Hive Mind'],
        canSettle: true // Invasive colonizers
    },

    // Exotic / non-traditional
    {
        speciesId: 'gaseous-nomad',
        speciesName: 'Nebulons',
        description: 'Floating, plasma-based entities that drift through gas giant atmospheres. They manipulate magnetic fields and communicate via auroras.',
        disposition: 'Elusive and Mystical',
        homePlanetType: ['Gas Giant', 'Storm Giant'],
        techLevel: 'Exotic',
        societalTypes: ['Scattered Enclaves', 'Nomadic Fleet'],
        canSettle: false // Atmosphere-bound
    },
    {
        speciesId: 'amoeboid-shifter',
        speciesName: 'Morphic Amoebae',
        description: 'Shapeshifting protoplasmic beings capable of mimicking other lifeforms. They infiltrate and observe.',
        disposition: 'Curious and Deceptive',
        homePlanetType: ['Oceanic', 'Subterranean / Subsurface Ocean'],
        techLevel: 'Adaptive',
        societalTypes: ['Infiltration Cells'],
        canSettle: true // Via mimicry
    },

    // Advanced / precursor-like
    {
        speciesId: 'precursor-relic',
        speciesName: 'Eldari Remnant',
        description: 'Ancient, long-lived beings who retreated into stasis after a cataclysm. They possess forgotten technologies and view younger races as children.',
        disposition: 'Isolationist and Condescending',
        homePlanetType: ['Relic / Ruined', 'Diamond Planet'],
        techLevel: 'Precursor',
        societalTypes: ['Fallen Empire', 'Enclaves'],
        canSettle: false // Dormant
    },

    // Nomadic / fleet-based
    {
        speciesId: 'nomadic-voidborn',
        speciesName: 'Void Wanderers',
        description: 'Spacefaring crustacean-like beings born aboard generation ships. They never settle planets, living eternally in mobile habitats.',
        disposition: 'Exploratory and Detached',
        homePlanetType: ['Rogue Planet', 'Shattered / Fragmented'],
        techLevel: 'Intermediate',
        societalTypes: ['Nomadic Fleet'],
        canSettle: false
    },

    // Aggressive / conquest-focused
    {
        speciesId: 'berserker-mech',
        speciesName: 'Kragthar Berserkers',
        description: 'Cybernetically enhanced mammalian warriors obsessed with glorious combat. They raid and conquer for honor and resources.',
        disposition: 'Aggressive and Glory-Seeking',
        homePlanetType: ['Metallic', 'Barren'],
        techLevel: 'Cybernetic',
        societalTypes: ['Warrior Clans'],
        canSettle: true // Raid-settlers
    },

    // Peaceful / trader
    {
        speciesId: 'cephalopod-merchant',
        speciesName: 'Tentacled Traders',
        description: 'Highly intelligent, multi-limbed cephalopods renowned for cunning deals and vast trade networks. They avoid conflict through economics.',
        disposition: 'Mercantile and Opportunistic',
        homePlanetType: ['Oceanic', 'Tropical'],
        techLevel: 'Advanced',
        societalTypes: ['Trade Guilds', 'Civilization'],
        canSettle: true // Commercial outposts
    },

    // Eldritch / horror
    {
        speciesId: 'eldritch-abyss',
        speciesName: 'Abyssal Whisperers',
        description: 'Multidimensional entities that corrupt minds and reality. Contact drives most species insane.',
        disposition: 'Malevolent and Insidious',
        homePlanetType: ['Exotic', 'Radiated'],
        techLevel: 'Beyond Comprehension',
        societalTypes: ['Cult Enclaves'],
        canSettle: false // Infects rather than settles
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
