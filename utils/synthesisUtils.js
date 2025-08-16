import { v4 as uuidv4 } from 'uuid';
import { generateAtmosphere } from './atmosphereUtils.js';
import { generateSettlementLayout } from './buildingUtils.js';
import { generateConditions } from './conditionUtils.js';
import { generateEconomy } from './economyUtils.js';
import { generateFaction } from './factionUtils.js';
import { generateFauna } from './faunaUtils.js';
import { generateFlora } from './floraUtils.js';
import { generateIndustry } from './industryUtils.js';
import { generateMoons } from './moonUtils.js';
import { planetTypes, settlementNames, uniquePlanetNames } from './namingUtils.js';
import { chance } from './randomUtils.js';
import { generateResources } from './resourceUtils.js';
import { generateInhabitants } from './speciesUtils.js';
import { generateFullStarProfile } from './starUtils.js';
import { generateStation } from './stationUtils.js';
// MODIFIED: This function now accepts a 'forceUnique' flag
const generatePlanetName = (starName, index, uniqueNames, forceUnique = false) => {
    const shouldUseUnique = forceUnique || (uniqueNames.length > 0 && chance(0.4));
    if (shouldUseUnique && uniqueNames.length > 0) {
        const name = uniqueNames.splice(Math.floor(Math.random() * uniqueNames.length), 1)[0];
        return name;
    }
    const letters = ['b', 'c', 'd', 'e', 'f', 'g'];
    return `${starName} ${letters[index]}`;
};

export function synthesizeStarSystem(star) {
    if (!star || !star.id || !star.name) {
        console.warn('[Synthesis] Invalid star object:', star);
        return null;
    }

    const planets = synthesizePlanetarySystem(star.name, star.id);

    if (!planets || !Array.isArray(planets)) {
        console.warn('[Synthesis] Failed to generate planets for star:', star.name);
        return null;
    }

    const catalogedFlora = planets.flatMap(p => p.floraList || []);
    const catalogedFauna = planets.flatMap(p => p.faunaList || []);
    const { type, temp, description } = generateFullStarProfile();
    const faction = generateFaction();

    let spaceStation = null;
    if (faction && faction.id) {
        spaceStation = generateStation(faction, star.id, star.name);
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

    //saveThingsToDatabase("postStarSystem", starSystem)
    return starSystem;
}

export const synthesizePlanetarySystem = (starName, starId) => {
    const numPlanets = Math.floor(Math.random() * 5) + 2;
    const planets = [];
    const availableUniqueNames = [...uniquePlanetNames];

    for (let i = 0; i < numPlanets; i++) {
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

        // 1. Decide if this planet will host a civilization. This is the key driver.
        const canHaveCivilization = !['Gas Giant', 'Volcanic'].includes(planetType.type);
        const hasCivilization = canHaveCivilization && chance(0.4);

        // 2. The presence of a civilization dictates the name.
        const planetName = generatePlanetName(starName, i, availableUniqueNames, hasCivilization);
        const isUniqueName = !planetName.includes(starName);
        const planetId = uuidv4();

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
            hasCivilization,
            floraList: generateFlora(planetType.type),
            faunaList: generateFauna({ planetType: planetType.type }),
            resourceList: generateResources(planetType.type),
            moons: generateMoons(starId, planetName, planetId, planetType.type),
            settlements: [],
            economy: null,
            industry: null,
            inhabitants: [],
            atmosphere: generateAtmosphere(planetType.type),
        };

        // 3. If it has a civilization, generate all related components.
        if (hasCivilization) {
            const numSettlements = Math.floor(Math.random() * 4) + 1;
            const availableSettlementNames = [...settlementNames];

            for (let j = 0; j < numSettlements; j++) {
                if (availableSettlementNames.length === 0) break;
                const settlementName = availableSettlementNames.splice(Math.floor(Math.random() * availableSettlementNames.length), 1)[0];
                const newSettlement = {
                    name: settlementName,
                    population: j === 0
                        ? Math.floor(Math.random() * 200001) + 900000
                        : Math.floor(Math.random() * 499001) + 1000,
                };
                newSettlement.layout = generateSettlementLayout(newSettlement, planet);
                planet.settlements.push(newSettlement);
            }

            if (planet.settlements.length > 0) {
                const capitalIndex = Math.floor(Math.random() * planet.settlements.length);
                planet.settlements[capitalIndex].isCapital = true;

                // Economy and industry are now correctly tied to having a civilization.
                planet.economy = generateEconomy();
                planet.industry = generateIndustry();
            }
        }

        // 4. Inhabitants are generated based on the final state of the planet.
        planet.inhabitants = generateInhabitants(planet);

        console.dir(planet, { depth: null });

        planets.push(planet);
    }

    return planets;
};
