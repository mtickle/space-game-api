import { alliances } from './alliancesUtils.js';
import pool from './db.js';
import { factions } from './factionUtils.js';
import { speciesList } from './speciesUtils.js';


/**
 * Seeds the database with master data, but only adds new items.
 * It will not delete or overwrite existing data.
 */
export const seedDatabase = async () => {
    const client = await pool.connect();
    console.log('Synchronizing master data with database...');

    try {
        await client.query('BEGIN');

        // Seed Alliances: Only insert if the alliance_id doesn't already exist.
        for (const alliance of alliances) {
            const res = await client.query('SELECT 1 FROM space_game.alliances WHERE alliance_id = $1', [alliance.allianceId]);
            if (res.rowCount === 0) {
                console.log(`  -> Seeding new alliance: ${alliance.allianceName}`);
                await client.query(
                    `INSERT INTO space_game.alliances (alliance_id, name, alignment, description) VALUES ($1, $2, $3, $4)`,
                    [alliance.allianceId, alliance.allianceName, alliance.alignment, alliance.description]
                );
            }
        }

        // Seed Factions: Only insert if the faction_id doesn't already exist.
        for (const faction of factions) {
            const res = await client.query('SELECT 1 FROM space_game.factions WHERE faction_id = $1', [faction.id]);
            if (res.rowCount === 0) {
                console.log(`  -> Seeding new faction: ${faction.name}`);
                await client.query(
                    `INSERT INTO space_game.factions (faction_id, name, alignment, symbol, color, description) VALUES ($1, $2, $3, $4, $5, $6)`,
                    [faction.id, faction.name, faction.alignment, faction.symbol, faction.color, faction.description]
                );
            }
        }

        // Seed Species: Only insert if the species_id doesn't already exist.
        for (const species of speciesList) {
            const res = await client.query('SELECT 1 FROM space_game.species WHERE species_id = $1', [species.speciesId]);
            if (res.rowCount === 0) {
                console.log(`  -> Seeding new species: ${species.speciesName}`);
                await client.query(
                    `INSERT INTO space_game.species (species_id, name, description, disposition, tech_level) VALUES ($1, $2, $3, $4, $5)`,
                    [species.speciesId, species.speciesName, species.description, species.disposition, species.techLevel]
                );
            }
        }

        await client.query('COMMIT');
        console.log('Master data synchronization complete!');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during database seeding:', error);
    } finally {
        client.release();
    }
};

