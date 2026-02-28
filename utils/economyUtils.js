import { economyNames } from './libraries/economies.js';
import { getRandomItem } from './randomUtils.js';

export function generateEconomy() {
    return getRandomItem(economyNames)
}