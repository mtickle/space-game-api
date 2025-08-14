import { v4 as uuidv4 } from 'uuid';
import { generateAtmosphere } from './atmosphereUtils.js';
import { generateSettlementLayout } from './buildingUtils.js';
import { generateConditions } from './conditionUtils.js';
import { generateEconomy } from './economyUtils.js';
import { generateFaction } from './factionUtils.js';
import { generateFauna } from './faunaUtils.js';
import { generateFlora } from './floraUtils.js';
import { generateIndustry } from './industryUtils.js';
import { generateMineral } from './mineralUtils.js';
import { generateMoons } from './moonUtils.js';
import { planetTypes, settlementNames, uniquePlanetNames } from './namingUtils.js';
import { generateInhabitants } from './speciesUtils.js';
import { generateFullStarProfile } from './starUtils.js';
import { generateStation } from './stationUtils.js';

const generatePlanetName = (starName, index, uniqueNames) => {
    if (uniqueNames && uniqueNames.length > 0 && Math.random() < 0.4) { // 40% chance for a unique name
        const name = uniqueNames[Math.floor(Math.random() * uniqueNames.length)];
        uniqueNames.splice(uniqueNames.indexOf(name), 1); // Remove used name to avoid duplicates
        return name;
    }
    const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
    return `${starName} ${letters[index]}`;
};

export function synthesizeStarSystem(star) {
    // console.log(star)
    if (!star || !star.id || !star.name) {
        // console.warn('[Synthesis] Invalid star object:', star);
        return null;
    }

    //--- Let's make babies, baby.
    const planets = synthesizePlanetarySystem(star.name, star.id);

    if (!planets || !Array.isArray(planets)) {
        // console.warn('[Synthesis] Failed to generate planets for star:', star.name);
        return null;
    }

    const catalogedFlora = planets.flatMap(p => p.floraList || []);
    const catalogedFauna = planets.flatMap(p => p.faunaList || []);
    const { type, temp, description } = generateFullStarProfile();
    const faction = generateFaction(); // { name, symbol }

    // --- NEW: Generate Space Station Data ---
    let spaceStation = null;
    if (faction && faction.id) { // Only generate a station if a valid faction object is assigned
        // console.log("[Synthesis] Faction is valid, attempting to generate space station..."); // Debug log
        // Pass the full faction object, starId, and starName to generate station data
        spaceStation = generateStation(faction, star.id, star.name);
        //console.log("[Synthesis] Result of generateStationData:", spaceStation); // Debug log: Check if spaceStation is null here
    } else {
        // console.log("[Synthesis] No valid faction found for station generation. Faction:", faction); // Debug log
    }

    const starSystem = {
        starId: star.id,
        starName: star.name,
        starX: star.x,
        starY: star.y,
        starSize: star.size,
        starType: type,
        starTemp: temp,
        starDescription: description,
        starFaction: faction,
        spaceStation: spaceStation,
        planets,
        catalogedFauna,
        catalogedFlora,
        version: 1,
        faction
    };

    //saveStarSystemToStorage(starSystem);

    return starSystem;
}

export const synthesizePlanetarySystem = (starName, starId) => {
    const numPlanets = Math.floor(Math.random() * 5) + 2; // 2–6 planets
    const planets = [];
    const availableUniqueNames = [...uniquePlanetNames];

    for (let i = 0; i < numPlanets; i++) {
        // Weighted planet type selection
        const rand = Math.random();
        let cumulative = 0;
        let planetType = planetTypes[planetTypes.length - 1];
        for (const p of planetTypes) {
            cumulative += p.weight;
            if (rand < cumulative) {
                planetType = p;
                break;
            }
        }

        const planetName = generatePlanetName(starName, i, availableUniqueNames);
        const isUniqueName = !planetName.includes(starName);
        const planetId = uuidv4()

        const planet = {
            starId,
            starName,
            planetId,
            planetName,
            planetConditions: generateConditions(planetType.type),
            planetType: planetType.type,
            planetColor: planetType.color,
            planetSize: Math.floor(Math.random() * 10) + 1,
            orbitRadius: 20 + i * 15,
            isUniqueName,
            floraList: generateFlora(planetType.type),
            faunaList: generateFauna(planetType.type),
            resourceList: [],
            moons: generateMoons(starId, planetName, planetId, planetType.type),
            settlements: [],
            economy: generateEconomy(planetType.type),
            industry: generateIndustry(planetType.type),
            atmosphere: generateAtmosphere(planetType.type),
            inhabitants: []
        };

        // Generate inhabitants after the main planet object is created
        planet.inhabitants = generateInhabitants(planet);

        // Generate resources (2–4)
        const resourceCount = Math.floor(Math.random() * 3) + 2;
        for (let r = 0; r < resourceCount; r++) {
            planet.resourceList.push(generateMineral(planetType.type));
        }

        // Settlements + Economy (only for uniquely named planets)
        if (isUniqueName) {
            const numSettlements = Math.floor(Math.random() * 4) + 1; // 1-4 settlements
            const availableSettlementNames = [...settlementNames];

            for (let j = 0; j < numSettlements; j++) {
                if (availableSettlementNames.length === 0) break; // Avoid errors if we run out of names

                const settlementName = availableSettlementNames.splice(
                    Math.floor(Math.random() * availableSettlementNames.length), 1
                )[0];

                // 1. Create the basic settlement object first
                const newSettlement = {
                    name: settlementName,
                    population: j === 0
                        ? Math.floor(Math.random() * 200001) + 900000 // Capital city population
                        : Math.floor(Math.random() * 499001) + 1000,   // Smaller settlement population
                };

                // 2. Now, generate the layout using the complete settlement object
                newSettlement.layout = generateSettlementLayout(newSettlement, planet);

                // 3. Push the final object to the array
                planet.settlements.push(newSettlement);
            }

            if (planet.settlements.length > 0) {
                const capitalIndex = Math.floor(Math.random() * planet.settlements.length);
                planet.settlements[capitalIndex].isCapital = true;
                planet.economy = generateEconomy();
                planet.industry = generateIndustry();
            }
        }
        console.log(planet);

        planets.push(planet);
    }

    return planets;
};
