import { industryTypes } from './libraries/industries.js';
import { getRandomItem } from './randomUtils.js';

export function generateIndustry() {
    return getRandomItem(industryTypes)
}
