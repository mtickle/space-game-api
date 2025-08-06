// colorUtils.js
export function getPlanetColor(type) {
    const colors = {
        Ice: '#A0DFF0',
        Volcanic: '#F06257',
        Rocky: '#BCAAA4',
        Oceanic: '#4FC3F7',
        Gas: '#CE93D8',
        Exotic: '#FFEB3B',
        Crystaline: '#81D4FA'
    };
    return colors[type] || '#4FC3F7';
}

export function getMoonColor(type) {
    const colors = {
        Ice: '#A0DFFF',
        Frozen: '#6EC6FF',
        Volcanic: '#FF7043',
        Rocky: '#BCAAA4',
        Oceanic: '#4DD0E1',
        Exotic: '#FFD54F',
        Crystaline: '#CE93D8',
        Metallic: '#CFD8DC',
        Cratered: '#9E9E9E',
        Carbonaceous: '#546E7A'
    };
    return colors[type] || '#FF3D00';
}
