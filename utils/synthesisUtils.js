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

const generatePlanetName = (starName, index, uniqueNames, forceUnique = false) => {
    // If forced, or if there's a 60% chance, and names are available...
    const shouldUseUnique = forceUnique || (uniqueNames.length > 0 && chance(0.6));
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
    return {
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

        const hasCivilization = true;

        const planetName = generatePlanetName(starName, i, availableUniqueNames, hasCivilization);
        const isUniqueName = !planetName.includes(starName);
        const planetId = uuidv4();
        const planetSize = Math.floor(Math.random() * 10) + 1;

        const planet = {
            starId,
            starName,
            planetId,
            planetName,
            planetType: planetType.type,
            planetColor: planetType.color,
            planetSize: planetSize,
            orbitRadius: 20 + i * 15,
            isUniqueName,
            hasCivilization,
            atmosphere: generateAtmosphere(planetType.type),
            faunaList: generateFauna({ planetType: planetType.type }),
            floraList: generateFlora(planetType.type),
            moons: generateMoons(starId, planetName, planetId, planetType.type, planetSize),
            planetConditions: generateConditions(planetType.type),
            resourceList: generateResources(planetType.type),
            settlements: [],
            economy: [],
            industry: [],
            inhabitants: [],
        };

        // --- NEW: Generate Gravity, Rotational, and Orbital Periods ---
        let gravityMultiplier = 1.0;
        if (['Rocky', 'Metallic', 'Artificial'].includes(planet.planetType)) gravityMultiplier = 1.2;
        if (['Ice World', 'Exotic'].includes(planet.planetType)) gravityMultiplier = 0.8;
        planet.gravity = parseFloat(((planet.planetSize / 5.0) * gravityMultiplier * (Math.random() * 0.4 + 0.8)).toFixed(2));

        planet.rotationalPeriod = parseFloat((Math.random() * 92 + 8).toFixed(1)); // 8 to 100 hours
        planet.orbitalPeriod = Math.round(Math.pow(planet.orbitRadius, 1.5) * 0.2);
        // --- END NEW ---

        console.log(planet)

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
            }

            planet.economy = generateEconomy();
            planet.industry = generateIndustry();
            planet.inhabitants = generateInhabitants(planet);

        } else {
            planet.inhabitants = generateInhabitants(planet);
        }

        planets.push(planet);
    }

    return planets;
};

