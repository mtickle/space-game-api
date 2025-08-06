import { generateAtmosphere } from '@utils/atmosphereUtils';
import { generateConditions } from '@utils/conditionUtils';
import { generateEconomy } from '@utils/economyUtils';
import { generateFaction } from '@utils/factionUtils';
import { generateFauna } from '@utils/faunaUtils';
import { generateFlora } from '@utils/floraUtils';
import { generateIndustry } from '@utils/industryUtils';
import { generateMineral } from '@utils/mineralUtils';
import { generateMoons } from '@utils/moonUtils';
import { planetTypes, settlementNames, uniquePlanetNames } from '@utils/namingUtils';
import { generateStation } from './stationUtils';
//import { generatePlanetName } from '@utils/planetUtils';
import { generateFullStarProfile } from '@utils/starUtils';
import { v4 as uuidv4 } from 'uuid';

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
            atmosphere: generateAtmosphere(planetType.type),
        };

        // Generate resources (2–4)
        const resourceCount = Math.floor(Math.random() * 3) + 2;
        for (let r = 0; r < resourceCount; r++) {
            planet.resourceList.push(generateMineral(planetType.type));
        }

        // Settlements + Economy (only for uniquely named planets)
        if (isUniqueName) {
            const numSettlements = Math.floor(Math.random() * 11);
            const availableSettlementNames = [...settlementNames];

            for (let j = 0; j < numSettlements; j++) {
                const settlementName = availableSettlementNames[Math.floor(Math.random() * availableSettlementNames.length)];
                availableSettlementNames.splice(availableSettlementNames.indexOf(settlementName), 1);
                planet.settlements.push({
                    name: settlementName,
                    population: j === 0
                        ? Math.floor(Math.random() * 200001) + 900000
                        : Math.floor(Math.random() * 499001) + 1000,
                });
            }

            if (planet.settlements.length > 0) {
                const capitalIndex = Math.floor(Math.random() * planet.settlements.length);
                planet.settlements[capitalIndex].isCapital = true;
                planet.economy = generateEconomy()
                planet.industry = generateIndustry()
            }
        }

        planets.push(planet);
    }

    return planets;
};
