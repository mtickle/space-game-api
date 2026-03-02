import { colors } from "./libraries/colors.js";

export function getPlanetColor(type) {
    return colors[type] || '#4FC3F7';
}

export function getMoonColor(type) {
    return colors[type] || '#FF3D00';
}
