import { createStarData } from './systemUtils.js';

const SECTOR_SIZE = 500;

// Your deterministic, seed-based PRNG
const mulberry32 = (a) => {
    return () => {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

/**
 * Deterministically generates all stars for a given sector.
 * @param {number} sectorX - The x-coordinate of the sector.
 * @param {number} sectorY - The y-coordinate of the sector.
 * @returns {Array} An array of basic star objects.
 */
export const generateStarsForSector = (sectorX, sectorY) => {
    // 1. Create a unique, deterministic seed for this specific sector
    const seed = (parseInt(sectorX) * 10000) + parseInt(sectorY);
    const rng = mulberry32(seed);

    // 2. Use the seeded RNG to determine how many stars are in this sector
    const minStars = 2;
    const maxStars = 8;
    const starCount = Math.floor(rng() * (maxStars - minStars + 1)) + minStars;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
        // 3. Create the basic star data
        const star = createStarData();

        // 4. Use the same seeded RNG to place the star within the sector boundaries
        star.x = sectorX * SECTOR_SIZE + rng() * SECTOR_SIZE;
        star.y = sectorY * SECTOR_SIZE + rng() * SECTOR_SIZE;
        star.z = sectorZ * SECTOR_SIZE + rng() * SECTOR_SIZE;

        stars.push(star);
    }

    return stars;
};