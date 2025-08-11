import { createStarData } from './systemUtils.js'; // This can be reused from your 2D version

const SECTOR_SIZE = 500; // This MUST match your 3D client's SECTOR_SIZE

// A simple deterministic PRNG
const mulberry32 = (a) => {
    return () => {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

/**
 * Deterministically generates all stars for a given 3D sector.
 * @param {number} sectorX - The x-coordinate of the sector.
 * @param {number} sectorY - The y-coordinate of the sector.
 * @param {number} sectorZ - The z-coordinate of the sector.
 * @returns {Array} An array of basic star objects with x, y, and z coordinates.
 */
export const generateStarsForSector3D = (sectorX, sectorY, sectorZ) => {
    // Create a unique, deterministic seed from all three coordinates
    const seed = (parseInt(sectorX) * 1000000) + (parseInt(sectorY) * 1000) + parseInt(sectorZ);
    const rng = mulberry32(seed);

    const minStars = 5;
    const maxStars = 15;
    const starCount = Math.floor(rng() * (maxStars - minStars + 1)) + minStars;

    const stars = [];
    for (let i = 0; i < starCount; i++) {
        const star = createStarData();

        // Generate all three coordinates using the seeded RNG
        star.x = parseInt(sectorX) * SECTOR_SIZE + rng() * SECTOR_SIZE;
        star.y = parseInt(sectorY) * SECTOR_SIZE + rng() * SECTOR_SIZE;
        star.z = parseInt(sectorZ) * SECTOR_SIZE + rng() * SECTOR_SIZE;

        stars.push(star);
    }

    return stars;
};
