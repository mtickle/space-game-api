// Procedural star name generator
export const generateStarName = () => {
    const prefixes = ['Zorath', 'Klyra', 'Vexis', 'Nyxara', 'Solara', 'Dracon', 'Aether', 'Lumys', 'Velthar', 'Omnix', 'Xelora', 'Quenari', 'Thalor', 'Yllith', 'Cynera', 'Draxon',
        'Vireon', 'Zenthis', 'Myrrak', 'Korinex', 'Ozyra', 'Pharex', 'Lunor', 'Zarneth',
        'Elyra', 'Kharix', 'Nexara', 'Voltan', 'Arqis', 'Xyrenth', 'Ulnari', 'Soryth',
        'Jaxira', 'Torven', 'Iyssar', 'Zyrion', 'Halmar', 'Teryx', 'Mavros', 'Lioren',
        'Kaelis', 'Vanyr', 'Orvyn', 'Nalore', 'Tyrix', 'Kyralis', 'Zavren', 'Solvyn',
        'Orryx', 'Eryndor', 'Iskari', 'Boreth', 'Rhelan', 'Azyth', 'Caldra', 'Xyneth',
        'Vorana', 'Dureth', 'Zyphor', 'Galvex', 'Tarnyx', 'Ulrix', 'Norym', 'Seltra',
        'Yvera', 'Kaelith', 'Draymar', 'Onyxis', 'Felyra', 'Vokar', 'Xolryn', 'Lazeth',
        'Morith', 'Kyvra', 'Zereth', 'Orilax', 'Ymarra', 'Thryss', 'Velkor', 'Zenyra',
        'Sykaris', 'Lorvex', 'Pythera', 'Vornak', 'Qirell', 'Zhyrra', 'Talvek', 'Umbrak',
        'Arthen', 'Jureth', 'Velsor', 'Xanith', 'Cirella', 'Kheros', 'Nirvax', 'Soryn',
        'Obryth', 'Thalrix', 'Veraxa', 'Lymari', 'Azryn', 'Dornak', 'Phalor', 'Quiris',
        'Xevara', 'Yllor', 'Zovra', 'Mekalor', 'Aetheron', 'Barenth', 'Cyralon', 'Draxil', 'Elaros', 'Faelix', 'Gorvan', 'Helion', 'Iskavor', 'Jarnyx',
        'Krython', 'Lyvora', 'Morvax', 'Nirion', 'Orlinth', 'Pryxis', 'Quelar', 'Raveth', 'Sarnyx', 'Tyrran',
        'Ulthera', 'Vorlax', 'Wyxen', 'Xarnis', 'Yvenor', 'Zarion', 'Alvaran', 'Bravik', 'Cindros', 'Deryth',
        'Eronex', 'Falrix', 'Gavros', 'Hyrven', 'Illyra', 'Jarvok', 'Kelrix', 'Lorvan', 'Myrren', 'Nethros',
        'Olthar', 'Pyrosyn', 'Quenthis', 'Rykor', 'Selyth', 'Tarnis', 'Uveron', 'Valmora', 'Wexil', 'Xyril',
        'Yllira', 'Zornak', 'Aurex', 'Brathis', 'Calven', 'Drexar', 'Elython', 'Fioran', 'Galther', 'Harnix',
        'Ivarra', 'Joreth', 'Kurnex', 'Lazura', 'Mirvox', 'Navori', 'Orren', 'Praxil', 'Quiris', 'Rilvax',
        'Sylora', 'Telrix', 'Ulmira', 'Vexron', 'Wyreth', 'Xaleth', 'Yvaren', 'Zyrionis', 'Ashkar', 'Baltrax',
        'Corven', 'Dymos', 'Elvyn', 'Faryn', 'Graven', 'Helmar', 'Inthar', 'Jelrik', 'Kyrion', 'Lurvek',
        'Malvek', 'Norlyn', 'Omberis', 'Parvyn', 'Quelros', 'Revon', 'Syneth', 'Trenor', 'Uraven', 'Varnis',
        'Worven', 'Xerith', 'Yothen', 'Zurvan', 'Athros', 'Belmora', 'Caelith', 'Dravik', 'Elvon', 'Ferros',
        'Grynn', 'Halvek', 'Ilmor', 'Jazren', 'Kaltor', 'Lysira', 'Marvus', 'Nyven', 'Orvak', 'Phiryn',
        'Qarnis', 'Rhonex', 'Sorvak', 'Talven', 'Umbros', 'Vireth', 'Worrik', 'Xelvar', 'Yornak', 'Zethros',
        'Ankaris', 'Braxxis', 'Cireth', 'Dulvos', 'Enthor', 'Feyrax', 'Garnyx', 'Hylora', 'Ithros', 'Jarnor'];
    const suffixes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Alpha', 'Bravo', 'Prime'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

const starTypes = ['O', 'B', 'A', 'F', 'G', 'K', 'M']; // Standard spectral types

export function getStarTemperature(type) {
    const tempMap = {
        O: 'Extremely Hot',
        B: 'Very Hot',
        A: 'Hot',
        F: 'Warm',
        G: 'Moderate',
        K: 'Cool',
        M: 'Cold',
    };
    return tempMap[type] || 'Unknown';
}



// Star descriptions based on MK class
export const getStarDescription = (type) => {
    const descriptions = {
        O: 'A massive, blazing blue star with intense radiation, rare and volatile.',
        B: 'A bright blue-white star, hot and luminous, often surrounded by nebulae.',
        A: 'A white star with strong stellar winds, a beacon in the cosmos.',
        F: 'A yellow-white star, stable and warm, with potential for vibrant systems.',
        G: 'A yellow star like Sol, often hosting habitable planets.',
        K: 'An orange star, cooler and steady, with long-lived systems.',
        M: 'A dim red dwarf, common and cool, with faint habitable zones.',
    };
    return descriptions[type] || 'An enigmatic star of unknown properties.';
};


export function loadOrGenerateStars(generateFn) {
    try {
        const saved = localStorage.getItem('starweaveStars');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (err) {
        console.warn('Failed to parse stored stars:', err);
    }
    generateFn();
    return null;
}

// export function generateStarType() {
//     return starTypes[Math.floor(Math.random() * starTypes.length)];
// }

export function generateStarType() {
    return starTypes[Math.floor(Math.random() * starTypes.length)];
}

export function generateFullStarProfile() {
    const type = generateStarType();         // e.g., 'G'
    const temp = getStarTemperature(type);   // e.g., 'Moderate'
    const description = getStarDescription(type); // existing function
    return { type, temp, description };
}
