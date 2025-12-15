

// saveStarToLocalStorage.js

import { v4 as uuidv4 } from 'uuid';
import pool from './db.js';


export function isStarSystemHydrated(starId) {
    const systems = JSON.parse(localStorage.getItem('savedStarSystems') || '[]');
    return systems.some(system => system.starId === starId);
}

// export function getHydratedStarSystem(starId) {
//     const systems = JSON.parse(localStorage.getItem('savedStarSystems') || '[]');
//     return systems.find(system => system.id === starId) || null;
// }

export const isHydrated = (id) =>
    !!localStorage.getItem(`hydrated_star_${id}`);

export const getHydratedStarSystem = (id) => {
    const raw = localStorage.getItem(`star_${id}`);
    return raw ? JSON.parse(raw) : null;
};

export const getAllHydratedSystems = () => {
    return JSON.parse(localStorage.getItem('savedStarSystems') || '[]');
};

//--- This is saving a star system as "star_StarName"
//--- We should be saving a star_starId
export const saveStarToLocalStorage = (star, stars) => {
    if (!star || !star.name) return;

    // Save the updated star itself
    localStorage.setItem(`zzz_star_${star.id}`, JSON.stringify(star));

    // Also update the global visited list if not already in it
    const visited = JSON.parse(localStorage.getItem('visitedStars') || '[]');
    if (!visited.includes(star.name)) {
        visited.push(star.name);
        localStorage.setItem('visitedStars', JSON.stringify(visited));
    }

    // Optionally update a star summary list (e.g., name and coords only) here if needed
};

export const saveStarSystemToStorage = (starSystem) => {
    if (!starSystem || typeof starSystem !== 'object') {
        console.warn('[Storage] Invalid star system:', starSystem);
        return;
    }

    const { id } = starSystem;
    if (!id) {
        console.warn('[Storage] Star system missing ID:', starSystem);
        return;
    }

    const existingRaw = JSON.parse(localStorage.getItem('savedStarSystems') || '[]');
    const existing = existingRaw.filter(s => s && s.id); // <-- safety filter

    const updated = existing.filter(s => s.id !== id);
    updated.push(starSystem);

    localStorage.setItem('savedStarSystems', JSON.stringify(updated));
};

//--- THis is an actual and good save function!!!
export const saveHydratedStarSystem = (starSystem) => {
    // console.log(starSystem)
    if (!starSystem || typeof starSystem !== 'object' || !starSystem.starId || !starSystem.starName) {
        console.warn('[Storage] Invalid star system passed to saveHydratedStarSystem:', starSystem);
        return;
    }

    // Save full object by ID
    localStorage.setItem(`star_${starSystem.starId}`, JSON.stringify(starSystem));

    // Optionally also store it in a full array
    const existingRaw = JSON.parse(localStorage.getItem('savedStarSystems') || '[]');
    const filtered = existingRaw.filter(s => s?.id !== starSystem.starId);
    filtered.push(starSystem);
    localStorage.setItem('savedStarSystems', JSON.stringify(filtered));

    // Track it in visited stars
    const visited = JSON.parse(localStorage.getItem('visitedStars') || '[]');
    if (!visited.includes(starSystem.starName)) {
        visited.push(starSystem.starName);
        localStorage.setItem('visitedStars', JSON.stringify(visited));
    }

    //console.log(`[Storage] Hydrated star system saved: ${starSystem.name}`);
};

export async function saveThingsToDatabase(endpoint, data) {
    //const apiUrl = `${API_BASE_URL}/${endpoint}`;

    //let apiUrl = 'http://localhost:3001/api/' + endpoint;
    let apiUrl = 'https://game-api-zjod.onrender.com/api/' + endpoint;

    console.log('Saving to database:', apiUrl, data);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to save game');
        return await response.json();
    } catch (err) {
        console.error('Error saving game:', err.body || err.message || err``);
    }
}

export async function loadThingsFromDatabase(endpoint, ...params) {
    try {
        //const apiUrl = `http://localhost:3001/api/${endpoint}/${params.join('/')}`;
        const apiUrl = `https://game-api-zjod.onrender.com/api/${endpoint}/${params.join('/')}`;

        const response = await fetch(apiUrl, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error loading data from database:', error);
        return null;
    }
}

export const logUserDiscovery = async (userId, starId) => {
    if (!userId || !starId) return false;

    const client = await pool.connect();
    try {
        // "ON CONFLICT DO NOTHING" is a safe way to handle cases where a user
        // might re-discover a star. It simply ignores the duplicate insert.
        await client.query(
            `INSERT INTO space_game.user_discoveries (user_id, star_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [userId, starId]
        );
        return true;
    } catch (error) {
        console.error(`Error logging discovery for user ${userId}:`, error);
        return false;
    } finally {
        client.release();
    }
};

export const getStarSystemFromPg = async (starId) => {
    const client = await pool.connect();
    console.log(`Querying PostgreSQL for star system: ${starId}`);

    try {
        // 1. Get the core star system data
        const systemResult = await client.query('SELECT * FROM space_game.star_systems WHERE star_id = $1', [starId]);
        if (systemResult.rowCount === 0) {
            return null; // System not found
        }
        const systemData = systemResult.rows[0];

        // 2. Get all planets for this system
        const planetsResult = await client.query('SELECT * FROM space_game.planets WHERE star_system_id = $1', [starId]);
        const planetsData = [];

        // 3. For each planet, fetch its related data (moons, settlements, inhabitants)
        for (const planetRow of planetsResult.rows) {
            const planetId = planetRow.planet_id;

            const moonsResult = await client.query('SELECT * FROM space_game.moons WHERE planet_id = $1', [planetId]);
            const settlementsResult = await client.query('SELECT * FROM space_game.settlements WHERE planet_id = $1', [planetId]);
            const inhabitantsResult = await client.query('SELECT * FROM space_game.planet_inhabitants WHERE planet_id = $1', [planetId]);

            planetsData.push({
                starId: planetRow.star_system_id,
                starName: systemData.name, // Get star name from parent query
                planetId: planetRow.planet_id,
                planetName: planetRow.name,
                planetConditions: planetRow.conditions,
                planetType: planetRow.planet_type,
                planetColor: planetRow.color,
                planetSize: planetRow.size,
                orbitRadius: planetRow.orbit_radius,
                isUniqueName: planetRow.is_unique_name,
                hasCivilization: planetRow.has_civilization,
                gravity: planetRow.gravity,
                rotationalPeriod: planetRow.rotational_period,
                orbitalPeriod: planetRow.orbital_period,
                atmosphere: planetRow.atmosphere,
                economy: planetRow.economy,
                industry: planetRow.industry,
                floraList: planetRow.flora_list,
                faunaList: planetRow.fauna_list,
                resourceList: planetRow.resource_list,
                inhabitants: inhabitantsResult.rows.map(i => ({
                    speciesId: i.species_id,
                    populationPercentage: i.population_percentage,
                    type: i.inhabitant_type,
                    societalType: i.societal_type,
                })),
                settlements: settlementsResult.rows.map(s => ({
                    name: s.name,
                    population: s.population,
                    isCapital: s.is_capital,
                    layout: s.layout,
                })),
                moons: moonsResult.rows.map(m => ({
                    moonId: m.moon_id,
                    moonName: m.name,
                    moonType: m.moon_type,
                    moonSize: m.size,
                    gravity: m.gravity,
                    rotationalPeriod: m.rotational_period,
                    orbitalPeriod: m.orbital_period,
                    isTidallyLocked: m.is_tidally_locked,
                    moonConditions: m.conditions,
                    moonSettlements: m.settlements_list,
                })),
            });
        }

        // 4. Assemble the final, complete star system object
        const fullSystem = {
            starId: systemData.star_id,
            starName: systemData.name,
            starX: systemData.x_coord,
            starY: systemData.y_coord,
            starZ: systemData.z_coord,
            starType: systemData.star_type,
            starTemp: systemData.temperature,
            starSize: systemData.size,
            starDescription: systemData.description,
            starFaction: systemData.faction_details, // Assuming you store this as JSON
            spaceStation: systemData.station_details,
            planets: planetsData
        };

        return fullSystem;

    } catch (error) {
        console.error(`Error fetching star system ${starId} from PostgreSQL:`, error);
        return null; // Return null on error
    } finally {
        client.release();
    }
};

export const saveStarSystemToPg = async (systemData) => {
    const client = await pool.connect();
    console.log('Saving star system to PostgreSQL:', systemData.starName);

    try {
        await client.query('BEGIN');

        const {
            starId, starName, starX, starY, starZ, starType, starTemp, starSize,
            starDescription, starFaction, spaceStation, planets
        } = systemData;

        await client.query(
            `INSERT INTO space_game.star_systems (star_id, name, x_coord, y_coord, z_coord, star_type, temperature, size, description, faction_id, station_details)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [starId, starName, starX, starY, starZ, starType, starTemp, starSize, starDescription, starFaction?.id, JSON.stringify(spaceStation)]
        );

        for (const planet of planets) {
            const {
                planetId, planetName, planetType, planetColor, planetSize, gravity, rotationalPeriod,
                orbitalPeriod, orbitRadius, isUniqueName, hasCivilization, planetConditions,
                atmosphere, economy, industry, floraList, faunaList, resourceList,
                moons, settlements, inhabitants
            } = planet;

            await client.query(
                `INSERT INTO space_game.planets (planet_id, star_system_id, name, planet_type, color, size, gravity, rotational_period, orbital_period, orbit_radius, is_unique_name, has_civilization, conditions, atmosphere, economy, industry, flora_list, fauna_list, resource_list)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
                [planetId, starId, planetName, planetType, planetColor, planetSize, gravity, rotationalPeriod, orbitalPeriod, orbitRadius, isUniqueName, hasCivilization, JSON.stringify(planetConditions), JSON.stringify(atmosphere), JSON.stringify(economy), JSON.stringify(industry), JSON.stringify(floraList), JSON.stringify(faunaList), JSON.stringify(resourceList)]
            );

            if (inhabitants && inhabitants.length > 0) {
                for (const inhabitant of inhabitants) {
                    await client.query(
                        `INSERT INTO space_game.planet_inhabitants (planet_id, species_id, population_percentage, inhabitant_type, societal_type)
             VALUES ($1, $2, $3, $4, $5)`,
                        [planetId, inhabitant.speciesId, inhabitant.populationPercentage, inhabitant.type, inhabitant.societalType]
                    );
                }
            }

            if (settlements && settlements.length > 0) {
                for (const settlement of settlements) {
                    await client.query(
                        `INSERT INTO space_game.settlements (settlement_id, planet_id, name, population, is_capital, layout)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)`,
                        [planetId, settlement.name, settlement.population, !!settlement.isCapital, JSON.stringify(settlement.layout)]
                    );
                }
            }

            if (moons && moons.length > 0) {
                for (const moon of moons) {
                    await client.query(
                        `INSERT INTO space_game.moons (moon_id, planet_id, name, moon_type, size, gravity, rotational_period, orbital_period, is_tidally_locked, conditions, settlements_list)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                        [moon.moonId, planetId, moon.moonName, moon.moonType, moon.size, moon.gravity, moon.rotationalPeriod, moon.orbitalPeriod, !!moon.isTidallyLocked, JSON.stringify(moon.moonConditions), JSON.stringify(moon.moonSettlements)]
                    );
                }
            }
        }

        await client.query('COMMIT');
        console.log(`Successfully saved star system ${starName} to the database.`);
        return true;

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Error saving star system ${systemData.starName}:`, error);
        return false;
    } finally {
        client.release();
    }
};

export const saveBulkStarSystemsToPg = async (systemsBatch) => {
    if (!systemsBatch || systemsBatch.length === 0) return true;

    console.log(`Starting bulk save of ${systemsBatch.length} systems to PostgreSQL...`);
    const client = await pool.connect();

    // Define a sub-batch size (number of *rows* per insert)
    // Keep this reasonably low to avoid parameter limits (e.g., 100-500)
    const SUB_BATCH_ROW_LIMIT = 100;

    try {
        await client.query('BEGIN');

        // Prepare data arrays
        const allStarValues = [];
        const allPlanetValues = [];
        const allMoonValues = [];
        const allSettlementValues = [];
        const allInhabitantValues = [];

        // --- Populate data arrays (Ensure robust validation) ---
        for (const system of systemsBatch) {
            if (!system || typeof system !== 'object' || !system.starId) {
                console.warn("Skipping invalid system data in bulk save.");
                continue;
            }
            const starZ = system.starZ ?? 0; // Default Z to 0

            // Star System Data
            allStarValues.push(
                system.starId, system.starName, system.starX, system.starY, starZ,
                system.starType, system.starTemp, system.starSize, system.starDescription,
                system.starFaction?.id, JSON.stringify(system.spaceStation)
            );

            const planets = Array.isArray(system.planets) ? system.planets : [];
            for (const planet of planets) {
                if (!planet || typeof planet !== 'object' || !planet.planetId) {
                    console.warn(`Skipping invalid planet data in system ${system.starName}`);
                    continue;
                }
                // Planet Data
                allPlanetValues.push(
                    planet.planetId, system.starId, planet.planetName, planet.planetType,
                    planet.planetColor, planet.planetSize, planet.gravity, planet.rotationalPeriod,
                    planet.orbitalPeriod, planet.orbitRadius, planet.isUniqueName, planet.hasCivilization,
                    JSON.stringify(planet.planetConditions), JSON.stringify(planet.atmosphere),
                    JSON.stringify(planet.economy), JSON.stringify(planet.industry),
                    JSON.stringify(planet.floraList), JSON.stringify(planet.faunaList),
                    JSON.stringify(planet.resourceList)
                );

                const inhabitants = Array.isArray(planet.inhabitants) ? planet.inhabitants : [];
                if (inhabitants.length > 0) {
                    for (const inhabitant of inhabitants) {
                        if (inhabitant?.speciesId) { // Basic validation
                            allInhabitantValues.push(
                                planet.planetId, inhabitant.speciesId, inhabitant.populationPercentage,
                                inhabitant.type, inhabitant.societalType
                            );
                        }
                    }
                }

                const settlements = Array.isArray(planet.settlements) ? planet.settlements : [];
                if (settlements.length > 0) {
                    for (const settlement of settlements) {
                        if (settlement?.name) { // Basic validation
                            const settlementId = uuidv4();
                            allSettlementValues.push(
                                settlementId, planet.planetId, settlement.name,
                                settlement.population, !!settlement.isCapital,
                                JSON.stringify(settlement.layout)
                            );
                        }
                    }
                }

                const moons = Array.isArray(planet.moons) ? planet.moons : [];
                if (moons.length > 0) {
                    for (const moon of moons) {
                        if (moon?.moonId) { // Basic validation
                            allMoonValues.push(
                                moon.moonId, planet.planetId, moon.moonName, moon.moonType,
                                moon.moonSize, moon.gravity, moon.rotationalPeriod, moon.orbitalPeriod,
                                !!moon.isTidallyLocked, JSON.stringify(moon.moonConditions),
                                JSON.stringify(moon.moonSettlements)
                            );
                        }
                    }
                }
            }
        }

        // --- Execute bulk INSERT queries in sub-batches ---

        // Helper function to execute inserts in sub-batches
        const executeInSubBatches = async (tableName, columns, allValues) => {
            const numColumns = columns.length;
            if (numColumns === 0 || allValues.length === 0) {
                console.log(`  No data or columns for ${tableName}. Skipping.`);
                return; // Avoid division by zero or unnecessary work
            }
            // Ensure values count is a multiple of columns, otherwise something went wrong during population
            if (allValues.length % numColumns !== 0) {
                console.error(`  CRITICAL ERROR: Value count (${allValues.length}) is not a multiple of column count (${numColumns}) for ${tableName}. Aborting batch.`);
                throw new Error(`Data integrity error for table ${tableName}`);
            }

            const totalRows = allValues.length / numColumns;
            console.log(`  Preparing to insert ${totalRows} rows into ${tableName} in sub-batches of ${SUB_BATCH_ROW_LIMIT}...`);

            for (let i = 0; i < totalRows; i += SUB_BATCH_ROW_LIMIT) {
                const startRow = i;
                const endRow = Math.min(i + SUB_BATCH_ROW_LIMIT, totalRows);
                const subBatchValues = allValues.slice(startRow * numColumns, endRow * numColumns);

                if (subBatchValues.length === 0) continue; // Should not happen, but safety check

                // Regenerate placeholders for each sub-batch, starting parameter index from $1
                const placeholderString = generateValuePlaceholders(subBatchValues, numColumns);
                if (!placeholderString) {
                    console.error(`  ERROR: Failed to generate placeholders for sub-batch in ${tableName}. Skipping sub-batch.`);
                    continue; // Skip this sub-batch if placeholders are invalid
                }

                const queryText = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ${placeholderString}`;

                // console.log(`    Executing sub-batch insert for ${tableName} (${subBatchValues.length / numColumns} rows)`); // Verbose logging
                await client.query(queryText, subBatchValues);
            }
            console.log(`  Finished inserting into ${tableName}.`);
        };

        // --- Call the helper for each table in the correct order ---
        await executeInSubBatches('space_game.star_systems', ['star_id', 'name', 'x_coord', 'y_coord', 'z_coord', 'star_type', 'temperature', 'size', 'description', 'faction_id', 'station_details'], allStarValues);
        await executeInSubBatches('space_game.planets', ['planet_id', 'star_system_id', 'name', 'planet_type', 'color', 'size', 'gravity', 'rotational_period', 'orbital_period', 'orbit_radius', 'is_unique_name', 'has_civilization', 'conditions', 'atmosphere', 'economy', 'industry', 'flora_list', 'fauna_list', 'resource_list'], allPlanetValues);
        await executeInSubBatches('space_game.planet_inhabitants', ['planet_id', 'species_id', 'population_percentage', 'inhabitant_type', 'societal_type'], allInhabitantValues);
        await executeInSubBatches('space_game.settlements', ['settlement_id', 'planet_id', 'name', 'population', 'is_capital', 'layout'], allSettlementValues);
        await executeInSubBatches('space_game.moons', ['moon_id', 'planet_id', 'name', 'moon_type', 'size', 'gravity', 'rotational_period', 'orbital_period', 'is_tidally_locked', 'conditions', 'settlements_list'], allMoonValues);

        await client.query('COMMIT');
        console.log(`Bulk save successful for ${systemsBatch.length} systems.`);
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Error during bulk save:`, error);
        return false;
    } finally {
        client.release();
    }
};

export const getDatabaseStats = async () => {
    const client = await pool.connect();
    try {
        // Run counts in parallel for speed
        const [systemsRes, planetsRes] = await Promise.all([
            client.query('SELECT COUNT(*) FROM space_game.star_systems'),
            client.query('SELECT COUNT(*) FROM space_game.planets')
        ]);

        return {
            totalSystems: parseInt(systemsRes.rows[0].count, 10).toLocaleString(),
            totalPlanets: parseInt(planetsRes.rows[0].count, 10).toLocaleString()
        };
    } catch (error) {
        console.error('Error fetching database stats:', error);
        return { totalSystems: "Error", totalPlanets: "Error" };
    } finally {
        client.release();
    }
};

function generateValuePlaceholders(subBatchValues, columns) {
    const rows = [];
    if (columns <= 0 || !Array.isArray(subBatchValues) || subBatchValues.length === 0) return '';

    // Validate that the batch size is a multiple of columns
    if (subBatchValues.length % columns !== 0) {
        console.error(`Sub-batch value length (${subBatchValues.length}) is not a multiple of column count (${columns}).`);
        return ''; // Return empty or throw, indicating a problem
    }

    const numRows = subBatchValues.length / columns;

    for (let i = 0; i < numRows; i++) {
        const placeholders = [];
        for (let j = 0; j < columns; j++) {
            // Parameter index restarts from 1 for each sub-batch
            placeholders.push(`$${i * columns + j + 1}`);
        }
        rows.push(`(${placeholders.join(', ')})`);
    }
    return rows.join(', ');
}