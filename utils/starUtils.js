// Procedural star name generator
export const generateStarName = () => {
    const prefixes = [
        // Original Prefixes (completely unchanged)
        'Zorath', 'Klyra', 'Vexis', 'Nyxara', 'Solara', 'Dracon', 'Aether', 'Lumys', 'Velthar', 'Omnix', 'Xelora', 'Quenari', 'Thalor', 'Yllith', 'Cynera', 'Draxon',
        'Vireon', 'Zenthis', 'Myrrak', 'Korinex', 'Ozyra', 'Pharex', 'Lunor', 'Zarneth', 'Elyra', 'Kharix', 'Nexara', 'Voltan', 'Arqis', 'Xyrenth', 'Ulnari', 'Soryth',
        'Jaxira', 'Torven', 'Iyssar', 'Zyrion', 'Halmar', 'Teryx', 'Mavros', 'Lioren', 'Kaelis', 'Vanyr', 'Orvyn', 'Nalore', 'Tyrix', 'Kyralis', 'Zavren', 'Solvyn',
        'Orryx', 'Eryndor', 'Iskari', 'Boreth', 'Rhelan', 'Azyth', 'Caldra', 'Xyneth', 'Vorana', 'Dureth', 'Zyphor', 'Galvex', 'Tarnyx', 'Ulrix', 'Norym', 'Seltra',
        'Yvera', 'Kaelith', 'Draymar', 'Onyxis', 'Felyra', 'Vokar', 'Xolryn', 'Lazeth', 'Morith', 'Kyvra', 'Zereth', 'Orilax', 'Ymarra', 'Thryss', 'Velkor', 'Zenyra',
        'Sykaris', 'Lorvex', 'Pythera', 'Vornak', 'Qirell', 'Zhyrra', 'Talvek', 'Umbrak', 'Arthen', 'Jureth', 'Velsor', 'Xanith', 'Cirella', 'Kheros', 'Nirvax', 'Soryn',
        'Obryth', 'Thalrix', 'Veraxa', 'Lymari', 'Azryn', 'Dornak', 'Phalor', 'Quiris', 'Xevara', 'Yllor', 'Zovra', 'Mekalor', 'Aetheron', 'Barenth', 'Cyralon', 'Draxil',
        'Elaros', 'Faelix', 'Gorvan', 'Helion', 'Iskavor', 'Jarnyx', 'Krython', 'Lyvora', 'Morvax', 'Nirion', 'Orlinth', 'Pryxis', 'Quelar', 'Raveth', 'Sarnyx', 'Tyrran',
        'Ulthera', 'Vorlax', 'Wyxen', 'Xarnis', 'Yvenor', 'Zarion', 'Alvaran', 'Bravik', 'Cindros', 'Deryth', 'Eronex', 'Falrix', 'Gavros', 'Hyrven', 'Illyra', 'Jarvok',
        'Kelrix', 'Lorvan', 'Myrren', 'Nethros', 'Olthar', 'Pyrosyn', 'Quenthis', 'Rykor', 'Selyth', 'Tarnis', 'Uveron', 'Valmora', 'Wexil', 'Xyril', 'Yllira', 'Zornak',
        'Aurex', 'Brathis', 'Calven', 'Drexar', 'Elython', 'Fioran', 'Galther', 'Harnix', 'Ivarra', 'Joreth', 'Kurnex', 'Lazura', 'Mirvox', 'Navori', 'Orren', 'Praxil',
        'Rilvax', 'Sylora', 'Telrix', 'Ulmira', 'Vexron', 'Wyreth', 'Xaleth', 'Yvaren', 'Zyrionis', 'Ashkar', 'Baltrax', 'Corven', 'Dymos', 'Elvyn', 'Faryn', 'Graven',
        'Helmar', 'Inthar', 'Jelrik', 'Kyrion', 'Lurvek', 'Malvek', 'Norlyn', 'Omberis', 'Parvyn', 'Quelros', 'Revon', 'Syneth', 'Trenor', 'Uraven', 'Varnis', 'Worven',
        'Xerith', 'Yothen', 'Zurvan', 'Athros', 'Belmora', 'Caelith', 'Dravik', 'Elvon', 'Ferros', 'Grynn', 'Halvek', 'Ilmor', 'Jazren', 'Kaltor', 'Lysira', 'Marvus',
        'Nyven', 'Orvak', 'Phiryn', 'Qarnis', 'Rhonex', 'Sorvak', 'Talven', 'Umbros', 'Vireth', 'Worrik', 'Xelvar', 'Yornak', 'Zethros', 'Ankaris', 'Braxxis', 'Cireth',
        'Dulvos', 'Enthor', 'Feyrax', 'Garnyx', 'Hylora', 'Ithros', 'Jarnor', 'Aerion', 'Baelor', 'Calypso', 'Daeron', 'Elysia', 'Faenor', 'Gaelan', 'Hesper', 'Ilion', 'Jorvik', 'Kaelen', 'Laeron', 'Maelys', 'Naerys', 'Ophion', 'Paelos',
        'Qorwyn', 'Rhaenys', 'Saera', 'Taelon', 'Uthor', 'Valerion', 'Willem', 'Xylon', 'Ysmir', 'Zaeron', 'Aelyx', 'Brynden', 'Corlys', 'Daenys', 'Elara', 'Florian',
        'Garlan', 'Harlon', 'Ilyn', 'Jaehaerys', 'Kevan', 'Loras', 'Maelor', 'Nymeria', 'Orion', 'Petyr', 'Quellon', 'Rhaegar', 'Sarella', 'Tywin', 'Urrigon', 'Viserys',
        'Walder', 'Xanxus', 'Ygritte', 'Zane', 'Aegon', 'Barristan', 'Cregan', 'Daemon', 'Ellaria', 'Gendry', 'Hoster', 'Izembaro', 'Jorah', 'Korra', 'Lyanna', 'Margaery',
        'Nymor', 'Oberyn', 'Podrick', 'Quentyn', 'Rickard', 'Sandor', 'Tytos', 'Visenya', 'Wyman', 'Yoren', 'Zekko', 'Aemon', 'Beric', 'Criston', 'Davos', 'Elia', 'Gerold',
        'Hotah', 'Jaime', 'Karyl', 'Lomas', 'Matarys', 'Olenna', 'Pycelle', 'Qyburn', 'Rhaella', 'Selwyn', 'Tyrion', 'Vaemond', 'Walys', 'Xhobar', 'Yohn', 'Zhoe', 'Aerys',
        'Brandon', 'Cressen', 'Doran', 'Ellyn', 'Gyles', 'Harras', 'Jeyne', 'Kael', 'Lyman', 'Meryn', 'Orbert', 'Paxter', 'Renly', 'Shiera', 'Tybolt', 'Vayon', 'Wendel',
        'Yandry', 'Zymos', 'Arlan', 'Brienne', 'Cole', 'Domeric', 'Emmon', 'Flement', 'Harlan', 'Jonquil', 'Leo', 'Mace', 'Nestor', 'Orys', 'Preston', 'Ryam', 'Steffon',
        'Uthor', 'Vyman', 'Wylis', 'Yorbert', 'Zarathos', 'Arya', 'Bronn', 'Catelyn', 'Eddard', 'Gilly', 'Hodor', 'Ilyn', 'Joffrey', 'Kevan', 'Lancel', 'Myrcella', 'Osha',
        'Qhorin', 'Robb', 'Stannis', 'Tommen', 'Vardis', 'Waymar', 'Yara', 'Zollo', 'Asha', 'Cersei', 'Drogo', 'Euron', 'Gregor', 'Hallyne', 'Illyrio', 'Janos', 'Khal',
        'Lysa', 'Melisandre', 'Pyat', 'Rattleshirt', 'Shae', 'Tormund', 'Victarion', 'Walda', 'Xaro', 'Yezzan',
        'Zerithar', 'Kyrvox', 'Valthor', 'Nyxeth', 'Sylvaris', 'Dravex', 'Aelthys', 'Lumira', 'Velkarn', 'Omnara', 'Xelthar', 'Quorath', 'Thalvex', 'Yllara', 'Cynor', 'Draxis',
        'Vyrion', 'Zenthar', 'Myrvox', 'Korathar', 'Ozyth', 'Pharion', 'Luneth', 'Zarnix', 'Elythar', 'Kharyth', 'Nexith', 'Voltara', 'Arqeth', 'Xyrion', 'Ulneth', 'Soryx',
        'Jaxeth', 'Torvyn', 'Iyssen', 'Zyrath', 'Halmor', 'Teryon', 'Maveth', 'Liorax', 'Kaelor', 'Vanyth', 'Orveth', 'Nalor', 'Tyren', 'Kyral', 'Zaveth', 'Solvex',
        'Oryth', 'Erythar', 'Isketh', 'Borex', 'Rhelion', 'Azyra', 'Caldris', 'Xynor', 'Vorath', 'Durex', 'Zyphara', 'Galvyn', 'Tarvox', 'Ulryth', 'Noryx', 'Selvyn',
        'Yverith', 'Kaelor', 'Drayeth', 'Onyxar', 'Felyth', 'Voketh', 'Xolthar', 'Lazara', 'Morvyn', 'Kyveth', 'Zerith', 'Oril', 'Ymar', 'Thryx', 'Velkyn', 'Zenyth',
        'Sykar', 'Lorvox', 'Pyther', 'Vorneth', 'Qireth', 'Zhyra', 'Talvox', 'Umbrath', 'Arthys', 'Jurex', 'Velseth', 'Xanar', 'Cireth', 'Kherith', 'Nirvyn', 'Soryth',
        'Obryn', 'Thalor', 'Verax', 'Lymeth', 'Azryth', 'Dorneth', 'Phaleth', 'Quirith', 'Xevor', 'Yllith', 'Zoveth', 'Meketh', 'Aetherix', 'Baren', 'Cyral', 'Draxor',
        'Elaryn', 'Faelor', 'Gorvyn', 'Helith', 'Iskara', 'Jarnex', 'Krythar', 'Lyvor', 'Morvox', 'Nirath', 'Orlith', 'Pryxar', 'Quelith', 'Raveth', 'Sarnex', 'Tyrrath',
        'Ulther', 'Vorlex', 'Wyxar', 'Xarneth', 'Yven', 'Zarix', 'Alvar', 'Bravix', 'Cindor', 'Deryth', 'Eron', 'Falrith', 'Gaveth', 'Hyrvox', 'Illyth', 'Jarvyn',
        'Kelrith', 'Lorveth', 'Myrith', 'Nethar', 'Olthys', 'Pyros', 'Quenth', 'Ryketh', 'Selyr', 'Tarneth', 'Uver', 'Valm', 'Wexar', 'Xyrith', 'Yllor', 'Zorneth',
        'Aureth', 'Brathar', 'Calvex', 'Drexith', 'Elyth', 'Fior', 'Galthar', 'Harneth', 'Ivar', 'Jorex', 'Kurn', 'Lazeth', 'Mirvyn', 'Navar', 'Orrex', 'Praxeth',
        'Rilvox', 'Sylor', 'Telrith', 'Ulmor', 'Vexar', 'Wyreth', 'Xaleth', 'Yvar', 'Zyrith', 'Ashkyn', 'Baltr', 'Corvyn', 'Dymeth', 'Elvyn', 'Faryth', 'Gravex',
        'Helmar', 'Inthys', 'Jelrith', 'Kyrith', 'Lurvox', 'Malvyn', 'Norlyth', 'Omber', 'Parvox', 'Quelrith', 'Reveth', 'Synar', 'Treneth', 'Urav', 'Varneth', 'Worvox',
        'Xerith', 'Yothar', 'Zurvox', 'Athryth', 'Belmor', 'Caelor', 'Dravith', 'Elvox', 'Ferrith', 'Grynar', 'Halvyn', 'Ilmex', 'Jazrith', 'Kalteth', 'Lysar', 'Marvox',
        'Nyvar', 'Orvyn', 'Phirith', 'Qarnex', 'Rhonar', 'Sorveth', 'Talvyn', 'Umbrith', 'Virex', 'Worrith', 'Xelvox', 'Yorneth', 'Zethar', 'Ankar', 'Braxxar', 'Cirex',
        'Dulvox', 'Enthys', 'Feyrith', 'Garnex', 'Hylor', 'Ithryth', 'Jarnith', 'Aerith', 'Baelith', 'Calyph', 'Daerith', 'Elyss', 'Faen', 'Gaelith', 'Hesp', 'Ilion',
        'Jorvox', 'Kaelar', 'Laerith', 'Maelor', 'Naerith', 'Ophir', 'Paelith', 'Qorwyn', 'Rhaen', 'Saerith', 'Taelar', 'Uthoryn', 'Valer', 'Wyllar', 'Xylor', 'Ysmar',
        'Zaerith', 'Aelyth', 'Bryndar', 'Corlyth', 'Daenyth', 'Elarith', 'Florith', 'Garlyth', 'Harlyth', 'Ilyth', 'Jaehar', 'Kevyth', 'Lorath', 'Maelith', 'Nymer',
        'Orionis', 'Petyrith', 'Quell', 'Rhaeg', 'Sarell', 'Tywyn', 'Urrig', 'Viser', 'Waldar', 'Xanxar', 'Ygrith', 'Zaneth', 'Aegor', 'Barrith', 'Cregor', 'Daem',
        'Ellar', 'Gendryth', 'Hostar', 'Izemb', 'Jorath', 'Korrith', 'Lyanar', 'Margar', 'Nymor', 'Oberith', 'Podrith', 'Quent', 'Rickar', 'Sandor', 'Tytor', 'Visen',
        'Wyman', 'Yoren', 'Zekkar', 'Aemon', 'Berith', 'Cristar', 'Davoth', 'Elith', 'Gerold', 'Hotar', 'Jaimeth', 'Karyth', 'Lomas', 'Matary', 'Olen', 'Pycel',
        'Qybur', 'Rhael', 'Selwyn', 'Tyrith', 'Vaem', 'Walys', 'Xhobar', 'Yohn', 'Zhoe', 'Aerys', 'Brandar', 'Cress', 'Dorath', 'Ellyn', 'Gyles', 'Harrar',
        'Jeyne', 'Kaelith', 'Lyman', 'Meryn', 'Orber', 'Paxar', 'Renlyth', 'Shiera', 'Tybol', 'Vayon', 'Wendel', 'Yandr', 'Zymor', 'Arlan', 'Brienn', 'Colen',
        'Domar', 'Emmon', 'Flem', 'Harlan', 'Jonqu', 'Leoth', 'Mace', 'Nestor', 'Orys', 'Prest', 'Ryam', 'Steff', 'Uthor', 'Vyman', 'Wylis', 'Yorber', 'Zarath',
        'Aryth', 'Bronn', 'Catlyn', 'Eddar', 'Gilly', 'Hodor', 'Ilyn', 'Joffr', 'Kevan', 'Lancel', 'Myrcel', 'Osha', 'Qhorin', 'Robb', 'Stann', 'Tommen',
        'Vardis', 'Waymar', 'Yara', 'Zollo', 'Ashar', 'Cerse', 'Drogo', 'Euron', 'Gregor', 'Hally', 'Illyr', 'Janos', 'Khal', 'Lysar', 'Melis', 'Pyat',
        'Rattl', 'Shae', 'Tormund', 'Victar', 'Walda', 'Xaro', 'Yezzan', 'Zorvex', 'Klythar', 'Vexara', 'Nyxor', 'Solaryn', 'Draketh', 'Aethar', 'Lumeth', 'Velthys',
        'Omneth', 'Xelor', 'Queneth', 'Thalor', 'Yllith', 'Cyneth', 'Draxeth', 'Vireth', 'Zenthar', 'Myrith', 'Korvox', 'Ozyr', 'Pharex', 'Luneth', 'Zarneth', 'Elyth'
    ];
    const suffixes = [

        'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'Alpha', 'Bravo', 'Prime',
        'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
        'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega',
        'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu',
        'Major', 'Minor', 'Secundus', 'Tertius', 'Quartus', 'Quintus', 'Sextus', 'Septimus', 'Octavius', 'Nonus', 'Decimus',
        'Centralis', 'Exterior', 'Interior', 'Superior', 'Inferior', 'Nova', 'Australis', 'Borealis', 'Orientalis', 'Occidentalis',
        'Station', 'Outpost', 'Colony', 'Base', 'Hub', 'Ring', 'Arc', 'Sphere', 'Moon', 'Luna', 'Satellite', 'Orbital', 'Anchor',
        'Nexus', 'Core', 'Forge', 'Void', 'Abyss', 'Echelon', 'Apex', 'Zenith', 'Nadir', 'Singularity', 'Anomaly', 'Relic', 'Echo', 'Phantom', 'Specter',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Zero', 'One', 'Two', 'Three', 'Four', 'Five',
        'Exemplar', 'Prototype', 'Archetype', 'Genesis', 'Omega', 'Elysium', 'Purgatory', 'Valhalla', 'Stygia', 'Hyperion'
    ];
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

        L: 'Very Cold (1,300–2,400 K) – brown dwarf transition',
        T: 'Extremely Cold (<1,300 K) – cool brown dwarf',
        Y: 'Ultra-cold (<500 K) – rogue / failed star',
        W: 'Wolf-Rayet (extremely hot, >50,000 K, stripped envelope)',
        C: 'Carbon star (cool, sooty red giant)',
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
        L: 'A dark reddish-brown dwarf, transitioning from star to failed fusion. Dim infrared glow dominates; metal hydrides and dust clouds shroud its faint presence.',
        T: 'An extremely cool methane-rich brown dwarf, appearing deep magenta or near-invisible. Methane absorption bands make it ghostly quiet in visible light, thriving in infrared.',
        Y: 'An ultra-cold rogue or failed star, barely warmer than a planet. Ammonia and water clouds form; it drifts in darkness, detectable only by faint heat or gravitational lensing.',
        W: 'A ferocious Wolf-Rayet star, stripped bare of its outer layers. Extreme temperatures drive massive winds laden with heavy elements; its spectrum screams ionized helium, carbon, and oxygen.',
        C: 'A sooty carbon star, a late-stage red giant rich in carbon molecules. Deep crimson with strong Swan bands of C₂ and CN; it shrouds itself in carbon dust, veiling its light in soot.'
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
