// utils/randomUtils.js

/**
 * Returns true with a given probability (0 to 1).
 * Example: chance(0.3) returns true about 30% of the time.
 */
export function chance(probability) {
    return Math.random() < probability;
}

/**
 * Returns a random integer between min and max, inclusive.
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random item from an array.
 */
export function getRandomItem(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Returns a shuffled copy of an array.
 */
export function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

/**
 * Randomly selects N unique items from an array.
 */
export function getRandomItems(array, count) {
    return shuffle(array).slice(0, count);
}
