

// saveStarToLocalStorage.js

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

export const saveStarSystemToPg = async (systemData) => {
    const client = await pool.connect();

    console.log('Saving star system to PostgreSQL:', systemData.starName);

    try {
        await client.query('BEGIN'); // Start a transaction

        // 1. Insert the Star System
        const {
            starId, starName, starX, starY, starZ, starType, starTemp, starSize,
            starDescription, starFaction, spaceStation, planets
        } = systemData;

        await client.query(
            `INSERT INTO star_systems (star_id, name, x_coord, y_coord, z_coord, star_type, temperature, size, description, faction_id, station_details)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [starId, starName, starX, starY, starZ, starType, starTemp, starSize, starDescription, starFaction?.id, JSON.stringify(spaceStation)]
        );

        // 2. Loop through and insert each planet and its related data
        for (const planet of planets) {
            const {
                planetId, planetName, planetType, color, size, gravity, rotationalPeriod,
                orbitalPeriod, orbitRadius, isUniqueName, hasCivilization, conditions,
                atmosphere, economy, industry, floraList, faunaList, resourceList,
                moons, settlements, inhabitants
            } = planet;

            // Insert the planet
            await client.query(
                `INSERT INTO planets (planet_id, star_system_id, name, planet_type, color, size, gravity, rotational_period, orbital_period, orbit_radius, is_unique_name, has_civilization, conditions, atmosphere, economy, industry, flora_list, fauna_list, resource_list)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
                [planetId, starId, planetName, planetType, color, size, gravity, rotationalPeriod, orbitalPeriod, orbitRadius, isUniqueName, hasCivilization, JSON.stringify(conditions), JSON.stringify(atmosphere), JSON.stringify(economy), JSON.stringify(industry), JSON.stringify(floraList), JSON.stringify(faunaList), JSON.stringify(resourceList)]
            );

            // Insert inhabitants for this planet
            if (inhabitants && inhabitants.length > 0) {
                for (const inhabitant of inhabitants) {
                    await client.query(
                        `INSERT INTO planet_inhabitants (planet_id, species_id, population_percentage, inhabitant_type, societal_type)
             VALUES ($1, $2, $3, $4, $5)`,
                        [planetId, inhabitant.speciesId, inhabitant.populationPercentage, inhabitant.type, inhabitant.societalType]
                    );
                }
            }

            // Insert settlements for this planet
            if (settlements && settlements.length > 0) {
                for (const settlement of settlements) {
                    await client.query(
                        `INSERT INTO settlements (settlement_id, planet_id, name, population, is_capital, layout)
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)`, // Assuming settlement_id is generated by DB
                        [planetId, settlement.name, settlement.population, !!settlement.isCapital, JSON.stringify(settlement.layout)]
                    );
                }
            }

            // Insert moons for this planet
            if (moons && moons.length > 0) {
                for (const moon of moons) {
                    await client.query(
                        `INSERT INTO moons (moon_id, planet_id, name, moon_type, size, gravity, rotational_period, orbital_period, is_tidally_locked, conditions, settlements_list)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                        [moon.moonId, planetId, moon.moonName, moon.moonType, moon.size, moon.gravity, moon.rotationalPeriod, moon.orbitalPeriod, !!moon.isTidallyLocked, JSON.stringify(moon.moonConditions), JSON.stringify(moon.moonSettlements)]
                    );
                }
            }
        }

        await client.query('COMMIT'); // Commit the transaction
        console.log(`Successfully saved star system ${starName} to the database.`);
        return true;

    } catch (error) {
        await client.query('ROLLBACK'); // Roll back the transaction on error
        console.error(`Error saving star system ${systemData.starName}:`, error);
        return false;
    } finally {
        client.release(); // Release the client back to the pool
    }
};
