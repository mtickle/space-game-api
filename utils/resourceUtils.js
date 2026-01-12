import { chance, getRandomInt, getRandomItem } from './randomUtils.js';

// --- Mineral & Element Database ---
const mineralPools = {
    // Original entries (unchanged)
    'Rocky': ['Bauxite', 'Iron Ore', 'Silica', 'Copper'],
    'Gas Giant': [], // No solid resources (but atmospheric harvesting possible in some settings: Hydrogen, Helium, Methane)
    'Ice World': ['Water Ice', 'Methane Clathrates', 'Ammonia Crystals'],
    'Exotic': ['Xenocrystals', 'Bioluminescent Fungi', 'Sentient Spores'],
    'Oceanic': ['Magnesium Nodules', 'Bioluminescent Algae', 'Coral Fragments'],
    'Volcanic': ['Sulfur', 'Basalt', 'Obsidian', 'Heavy Metals'],
    'Barren': ['Iron Ore', 'Nickel', 'Cobalt', 'Helium-3'],
    'Crystaline': ['Quartz', 'Diamond Dust', 'Resonant Crystals'],
    'Radiated': ['Uranium', 'Thorium', 'Mutagenic Slime'],
    'Artificial': ['Nanites', 'Alloy Plates', 'Data Cores'],
    'Metallic': ['Iron Ore', 'Titanium', 'Platinum', 'Gold'],
    'Carbonaceous': ['Hydrocarbons', 'Graphite', 'Organic Polymers'],

    // Expanded realistic / semi-realistic types
    'Desert': ['Silica Sand', 'Gypsum', 'Rare Earth Elements', 'Borax', 'Lithium Brine Traces'],
    'Arid': ['Copper', 'Uranium Ore', 'Phosphates', 'Potash'],
    'Tundra': ['Permafrost Volatiles', 'Natural Gas Hydrates', 'Rare Metals', 'Tungsten'],
    'Alpine': ['Titanium', 'Chromium', 'Molybdenum', 'Gemstones (Emeralds, Sapphires)'],
    'Savanna': ['Iron Oxides', 'Bauxite', 'Kaolin Clay', 'Zinc'],
    'Continental': ['Coal', 'Oil Shale', 'Limestone', 'Fertile Soil Minerals (Potassium, Phosphorus)'],
    'Tropical': ['Bauxite', 'Tin', 'Gem-quality Quartz', 'Bismuth'],
    'Super-Earth': ['Compressed Iron-Nickel', 'High-Pressure Silicates', 'Exotic Alloys', 'Dense Rare Metals'],
    'Tidally Locked': ['Day-side: Refractory Metals (Tungsten, Rhenium)', 'Twilight Zone: Volatiles & Hydrates', 'Night-side: Cryogenic Ices (Nitrogen, CO2)'],
    'Rogue Planet': ['Frozen Methane', 'Helium-3', 'Dark Silicates', 'Primordial Organics'],
    'Subterranean / Subsurface Ocean': ['Manganese Nodules', 'Hydrothermal Vent Minerals (Copper Sulfides, Zinc)', 'Magnesium Salts', 'Exotic Sulfur Compounds'],

    // Volcanic / tectonic variants
    'Lava World': ['Magma Chambers (Olivine, Pyroxene)', 'Chromite', 'Palladium', 'Iridium'],
    'Cryovolcanic': ['Ammonia Ice', 'Nitrogen Ice', 'Carbon Dioxide Ice', 'Tholins'],

    // Exotic / alien sci-fi types
    'Gaia / Biosphere Rich': ['Rare Biological Catalysts', 'Exotic Pollens', 'Neuroactive Compounds', 'Self-Replicating Nanofibers'],
    'Relic / Ruined': ['Ancient Alloys', 'Quantum Residue', 'Lost Isotopes', 'Memory Crystals'],
    'Shattered / Fragmented': ['Exposed Core Metals (Iridium, Osmium)', 'Planetary Mantle Fragments', 'Differentiated Silicates'],
    'Diamond Planet': ['Carbonado Diamonds', 'Lonsdaleite', 'Metallic Hydrogen Traces'],
    'Chthonian': ['Exposed Core (Iron-Nickel)', 'Silicon Carbide', 'Ultra-Dense Refractories'],
    'Neutronium Contaminated': ['Neutronium Dust (hyper-dense)', 'Strange Matter', 'Degenerate Matter Fragments'],
    'Plasma World': ['Ionized Metals', 'Exotic Particles', 'Magnetic Monopoles (speculative)'],
    'Hive / Organic World': ['Chitin Polymers', 'Bioplastics', 'Enzyme Crystals', 'Symbiotic Spores'],
    'Fungal / Mycelial': ['Mycelium Networks', 'Psilocybin Derivatives', 'Fungal Metals (Copper Oxides)'],
    'Silicon-Based': ['Silane Compounds', 'Silicon Carbide Structures', 'Quartz Networks'],
    'Ammonia-Based': ['Ammonium Salts', 'Ammonia Ice', 'Methane-Ammonia Slurries'],

    // Industrial / artificial / tech-heavy types
    'Forge World': ['Refined Steel', 'Tungsten Carbide', 'Depleted Uranium', 'Superconductors'],
    'Ecumenopolis / City Planet': ['Recycled Alloys', 'E-Waste Metals', 'Synthetic Rare Earths'],
    'Ringworld Segment': ['Advanced Composites', 'Carbon Nanotubes', 'Monofilament Wires'],
    'Dyson Swarm Remnant': ['Solar-Grade Silicon', 'Antimatter Containment Residue', 'Quantum Dots'],

    // Gas / fluid worlds (atmospheric / cloud mining focus)
    'Venusian / Hellworld': ['Sulfuric Acid Aerosols', 'Mercury Vapors', 'Carbon Dioxide Crystals'],
    'Storm Giant': ['Helium-3', 'Deuterium', 'Exotic Atmospheric Metals (via aerostat mining)'],
    'Hot Jupiter': ['Metallic Hydrogen', 'Alkali Metals (Sodium, Potassium vapors)']
};

const elementSymbols = ['Fe', 'O', 'Si', 'Mg', 'S', 'Ni', 'Ca', 'Al', 'Na', 'K'];

/**
 * Generates a list of resources for a given planet type.
 * @param {string} planetType - The type of the planet (e.g., 'Rocky', 'Volcanic').
 * @returns {Array} An array of resource objects.
 */
export const generateResources = (planetType) => {
    const resources = [];
    const pool = mineralPools[planetType];

    if (!pool || pool.length === 0) {
        return [];
    }

    const resourceCount = getRandomInt(2, 5); // Generate between 2 and 5 resources

    for (let i = 0; i < resourceCount; i++) {
        const mineralName = getRandomItem(pool);
        const elementCount = getRandomInt(1, 4);
        const elements = [];

        for (let j = 0; j < elementCount; j++) {
            elements.push(getRandomItem(elementSymbols));
        }

        const resource = {
            mineralName,
            elements: [...new Set(elements)], // Ensure unique elements
        };

        // Small chance to add an "unknown" element for flavor
        if (chance(0.15)) {
            resource.unknownElements = [{
                symbol: `X${getRandomInt(10, 99)}`,
                name: `Unknown-${getRandomInt(100, 999)}`
            }];
        }

        resources.push(resource);
    }

    return resources;
};
