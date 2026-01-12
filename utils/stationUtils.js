import { v4 as uuidv4 } from 'uuid'; // Assuming you have uuid installed (npm install uuid)

const stationNameSuffixes = {
    "The Solar Accord": ["Bastion", "Citadel", "Nexus", "Beacon", "Gateway", "Harmonizer"],
    "The Obsidian Syndicate": ["Vault", "Blacksite", "Shadow", "Den", "Haven", "Conclave"],
    "The Luma Ascendancy": ["Sanctuary", "Ascension", "Harmony", "Enlightenment", "Nexus", "Vanguard"],
    "The Vireli Swarm": ["Hive", "Spire", "Nexus", "Growth", "Colony", "Bio-Forge"],
    "The Ember Crown": ["Forge", "Stronghold", "Crucible", "Glory", "Pillar", "Pyre"],
    "The Continuum Archive": ["Vault", "Librarium", "Chronos", "Nexus", "Observation", "Knowledge"],

    "The Terran Federation": ["Embassy", "Outpost", "Haven", "Frontier", "Accord", "Beacon"],
    "The Cygnian Hegemony": ["Enclave", "Spire", "Archive", "Citadel", "Observatory", "Vault"],
    "The Krell Imperium": ["Fortress", "Bastion", "Legion", "Throne", "Dominion", "Pinnacle"],
    "The Concord of Suns": ["Exchange", "Forum", "Port", "Bazaar", "Haven", "Crossroads"],
    "League of Unaligned Worlds": ["Sanctuary", "Watchpost", "Buffer", "Neutral", "Refuge", "Observatory"],
    "The Arcanum": ["Sanctum", "Reliquary", "Enigma", "Labyrinth", "Vault", "Arcana"],
    "United Mining Conglomerate": ["Refinery", "Extractor", "Depot", "Forge", "Platform", "Rig"],
    "Path of the Starlight": ["Shrine", "Waystation", "Pilgrim", "Beacon", "Sanctuary", "Halo"],
    "The Scourge": ["Lair", "Ravager", "Plunder", "Wreck", "Den", "Marauder's"],
    "Sentinels of the Gate": ["Gatehouse", "Vigil", "Sentinel", "Portal", "Bastion", "Watch"],
    "Free Systems Alliance": ["Liberty", "Stronghold", "Rebel", "Vanguard", "Haven", "Outpost"]
};

const stationPrefixes = [
    "Alpha", "Omega", "Prime", "Outer", "Deep", "Zenith", "Nadir", "Apex", "Core", "Celestial",
    // Positional / Orbital / Navigational
    "Inner", "Mid", "Far", "Rim", "Edge", "Perimeter", "Orbital", "Lagrange", "Trojan", "Halo",
    "Equatorial", "Polar", "Geosync", "Stationary", "Drift", "Anchor", "Relay", "Waypoint", "Beacon", "Sentinel",

    // Hierarchical / Designation
    "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda",
    "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Secondary", "Tertiary", "Quaternary", "Quintus",

    // Cosmic / Astronomical
    "Nova", "Supernova", "Nebula", "Void", "Eclipse", "Aurora", "Corona", "Magnetar", "Quasar", "Pulsar",
    "Singularity", "Event", "Horizon", "Wormhole", "Gate", "Anomaly", "Voidborn", "Starborn", "Galactic", "Interstellar",

    // Technological / Industrial
    "Forge", "Nexus", "Hub", "Array", "Node", "Quantum", "Hyper", "Fusion", "Plasma", "Cryo",
    "Nano", "Droid", "Cyber", "Synth", "Vector", "Grid", "Matrix", "Lattice", "Pulse", "Resonance",

    // Ominous / Militaristic / Mysterious
    "Shadow", "Phantom", "Specter", "Abyss", "Oblivion", "Vanguard", "Bastion", "Fortress", "Citadel", "Stronghold",
    "Dominion", "Overwatch", "Ironclad", "Black", "Dark", "Ebon", "Void", "Dread", "Ruin", "Eclipse",

    // Exotic / Alien / Mystical
    "Aether", "Elysium", "Arcana", "Ethereal", "Luminary", "Stellar", "Astral", "Voidwalker", "Starforge", "Eon",
    "Chronos", "Eternal", "Primordial", "Ancient", "Relic", "Oracle", "Enigma", "Mirage", "Illusion", "Dream"
];

// Add more thematic words based on faction descriptions if needed
const thematicAdjectives = {
    "The Solar Accord": ["Accordian", "Harmonic", "Regal", "Unified", "Bureaucratic"],
    "The Obsidian Syndicate": ["Shadowy", "Ruthless", "Hidden", "Clandestine", "Smugglers'"],
    "The Luma Ascendancy": ["Spiritual", "Technocratic", "Enlightened", "Stellar", "Harmonious"],
    "The Vireli Swarm": ["Biological", "Hive", "Consuming", "Propagating", "Devouring"],
    "The Ember Crown": ["Nomadic", "Glorious", "Fiery", "Honorable", "Warrior"],
    "The Continuum Archive": ["Ancient", "Neutral", "Archival", "Eerie", "Observant"],
    // New entries for alliances (5 per faction, evocative of lore/alignment)
    "The Terran Federation": ["Terran", "Federal", "Democratic", "Exploratory", "United"],
    "The Cygnian Hegemony": ["Cygnian", "Hegemonic", "Scholarly", "Isolated", "Erudite"],
    "The Krell Imperium": ["Krell", "Imperial", "Rigid", "Conquering", "Caste"],
    "The Concord of Suns": ["Concordant", "Solar", "Merchant", "Cultural", "Free-Trading"],
    "League of Unaligned Worlds": ["Unaligned", "Neutral", "Independent", "Wary", "Sovereign"],
    "The Arcanum": ["Arcanum", "Technomantic", "Secretive", "Artifact", "Esoteric"],
    "United Mining Conglomerate": ["Corporate", "Industrial", "Ruthless", "Extractive", "Mega"],
    "Path of the Starlight": ["Starlight", "Pilgrim", "Nomadic", "Benevolent", "Celestial"],
    "The Scourge": ["Scourge", "Raider", "Pirate", "Savage", "Plundering"],
    "Sentinels of the Gate": ["Sentinel", "Gatekeeper", "Vigilant", "Guardian", "Wormhole"],
    "Free Systems Alliance": ["Free", "Rebel", "Libertarian", "Insurgent", "Allied"]
};


export const generateStation = (faction, starId, starName) => {
    if (!faction) return null;

    const stationId = uuidv4();

    // Choose a name generation style
    let stationName;
    if (Math.random() < 0.7) { // 70% chance of "Faction_Adjective Structure_Type"
        const adj = thematicAdjectives[faction.name]?.[Math.floor(Math.random() * thematicAdjectives[faction.name].length)] || faction.name.split(' ')[1];
        const suffix = stationNameSuffixes[faction.name]?.[Math.floor(Math.random() * stationNameSuffixes[faction.name].length)] || "Station";
        stationName = `${adj} ${suffix}`;
    } else { // 30% chance of "Star_Name [Prefix] Structure_Type"
        const prefix = stationPrefixes[Math.floor(Math.random() * stationPrefixes.length)];
        const suffix = stationNameSuffixes[faction.name]?.[Math.floor(Math.random() * stationNameSuffixes[faction.name].length)] || "Station";
        stationName = `${starName} ${prefix} ${suffix}`;
    }

    // Determine size based on alignment/description (simplified)
    let stationSize = 10; // Default size
    if (faction.alignment === "Lawful Good" || faction.alignment === "Lawful Neutral") {
        stationSize = 12; // Larger, more established
    } else if (faction.alignment === "Chaotic Evil" || faction.alignment === "Neutral Evil") {
        stationSize = 8; // Smaller, more clandestine
    } else if (faction.alignment === "True Neutral") {
        stationSize = 15; // Massive archives
    }

    // Determine type for visual differentiation if needed (e.g., 'military', 'trade', 'research')
    let stationType = 'general';
    if (faction.name === "The Solar Accord") stationType = 'bureaucratic';
    if (faction.name === "The Obsidian Syndicate") stationType = 'covert';
    if (faction.name === "The Luma Ascendancy") stationType = 'scientific';
    if (faction.name === "The Ember Crown") stationType = 'military';

    return {
        stationId,
        stationName,
        stationSize,
        stationType, // Can be used for custom drawing
        factionId: faction.id,
        factionColor: faction.color
    };
};