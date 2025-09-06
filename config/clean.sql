-- DANGER: This script will permanently delete all game data from the specified tables.
-- It resets all sequences and cascades to dependent tables.
-- Use with caution.

TRUNCATE
    space_game.alliances,
    space_game.factions,
    space_game.moons,
    space_game.planet_inhabitants,
    space_game.planets,
    space_game.settlements,
    space_game.species,
    space_game.star_systems
RESTART IDENTITY CASCADE;

-- A confirmation message to show in your SQL client after running the script.
SELECT 'All space_game tables have been truncated and reset.' AS status;