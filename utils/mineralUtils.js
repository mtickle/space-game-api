const mineralNames = [
    {
        "common": [
            "Aetherite", "Crysalon", "Veltrax", "Ferranox", "Nubilite", "Tessarite", "Obscuran",
            "Lunacite", "Pyrosine", "Cyranite", "Dramithium", "Fluorax", "Volucite", "Skelacite",
            "Brontium", "Ignovite", "Omnion", "Taltherium", "Xenthrite", "Torvalite", "Mechronite",
            "Cravonite", "Trionyx", "Oscerite", "Myronite", "Zyntharite", "Quarvium", "Izanthium",
            "Zephyrite", "Zelothane"
        ],
        "uncommon": [
            "Zenthium", "Solantrium", "Tharnite", "Gallaxite", "Chromanite", "Javendrite",
            "Korvalen", "Ylliorite", "Feronox", "Lexorium", "Selenyx", "Netherite", "Threxium",
            "Zerulite", "Morbidium", "Barynthium", "Tharnox", "Voracite", "Elysite", "Veldros",
            "Mithrene", "Crystallux", "Ignethon", "Nephrix", "Ultherium"
        ],
        "rare": [
            "Oblivium", "Quantacite", "Vortanite", "Krython", "Astroxene", "Voltherium",
            "Cryzorium", "Irridite", "Nixium", "Zirathium", "Virellium", "Xenorite", "Xavorium",
            "Isothite", "Vermacite", "Zeraphite", "Fulgrax", "Vultorite", "Scindite", "Azuronite"
        ],
        "legendary": [
            "Thalorium", "Gravitine", "Radionite", "Molthar", "Hexenium", "Garnethite",
            "Syrithium", "Luxarite", "Auralite", "Dravacite", "Karnyx", "Oscerite", "Zoracite",
            "Xenophyte", "Kytherium"
        ],
        "mythic": [
            "Umbrosium", "Morgexite", "Nebulon", "Nexalite", "Phasarium", "Exovite",
            "Rynarite", "Tachyline", "Zeraphite", "Xenophyte"
        ]
    }
];

const elementNames = [
    {
        "alkaliMetals": [
            { "symbol": "Li", "name": "Lithium", "atomicNumber": 3 },
            { "symbol": "Na", "name": "Sodium", "atomicNumber": 11 },
            { "symbol": "K", "name": "Potassium", "atomicNumber": 19 },
            { "symbol": "Rb", "name": "Rubidium", "atomicNumber": 37 },
            { "symbol": "Cs", "name": "Caesium", "atomicNumber": 55 },
            { "symbol": "Fr", "name": "Francium", "atomicNumber": 87 }
        ],
        "alkalineEarthMetals": [
            { "symbol": "Be", "name": "Beryllium", "atomicNumber": 4 },
            { "symbol": "Mg", "name": "Magnesium", "atomicNumber": 12 },
            { "symbol": "Ca", "name": "Calcium", "atomicNumber": 20 },
            { "symbol": "Sr", "name": "Strontium", "atomicNumber": 38 },
            { "symbol": "Ba", "name": "Barium", "atomicNumber": 56 },
            { "symbol": "Ra", "name": "Radium", "atomicNumber": 88 }
        ],
        "transitionMetals": [
            { "symbol": "Sc", "name": "Scandium", "atomicNumber": 21 },
            { "symbol": "Ti", "name": "Titanium", "atomicNumber": 22 },
            { "symbol": "V", "name": "Vanadium", "atomicNumber": 23 },
            { "symbol": "Cr", "name": "Chromium", "atomicNumber": 24 },
            { "symbol": "Mn", "name": "Manganese", "atomicNumber": 25 },
            { "symbol": "Fe", "name": "Iron", "atomicNumber": 26 },
            { "symbol": "Co", "name": "Cobalt", "atomicNumber": 27 },
            { "symbol": "Ni", "name": "Nickel", "atomicNumber": 28 },
            { "symbol": "Cu", "name": "Copper", "atomicNumber": 29 },
            { "symbol": "Zn", "name": "Zinc", "atomicNumber": 30 },
            { "symbol": "Y", "name": "Yttrium", "atomicNumber": 39 },
            { "symbol": "Zr", "name": "Zirconium", "atomicNumber": 40 },
            { "symbol": "Nb", "name": "Niobium", "atomicNumber": 41 },
            { "symbol": "Mo", "name": "Molybdenum", "atomicNumber": 42 },
            { "symbol": "Tc", "name": "Technetium", "atomicNumber": 43 },
            { "symbol": "Ru", "name": "Ruthenium", "atomicNumber": 44 },
            { "symbol": "Rh", "name": "Rhodium", "atomicNumber": 45 },
            { "symbol": "Pd", "name": "Palladium", "atomicNumber": 46 },
            { "symbol": "Ag", "name": "Silver", "atomicNumber": 47 },
            { "symbol": "Cd", "name": "Cadmium", "atomicNumber": 48 },
            { "symbol": "Hf", "name": "Hafnium", "atomicNumber": 72 },
            { "symbol": "Ta", "name": "Tantalum", "atomicNumber": 73 },
            { "symbol": "W", "name": "Tungsten", "atomicNumber": 74 },
            { "symbol": "Re", "name": "Rhenium", "atomicNumber": 75 },
            { "symbol": "Os", "name": "Osmium", "atomicNumber": 76 },
            { "symbol": "Ir", "name": "Iridium", "atomicNumber": 77 },
            { "symbol": "Pt", "name": "Platinum", "atomicNumber": 78 },
            { "symbol": "Au", "name": "Gold", "atomicNumber": 79 },
            { "symbol": "Hg", "name": "Mercury", "atomicNumber": 80 },
            { "symbol": "Rf", "name": "Rutherfordium", "atomicNumber": 104 },
            { "symbol": "Db", "name": "Dubnium", "atomicNumber": 105 },
            { "symbol": "Sg", "name": "Seaborgium", "atomicNumber": 106 },
            { "symbol": "Bh", "name": "Bohrium", "atomicNumber": 107 },
            { "symbol": "Hs", "name": "Hassium", "atomicNumber": 108 },
            { "symbol": "Mt", "name": "Meitnerium", "atomicNumber": 109 }
        ],
        "postTransitionMetals": [
            { "symbol": "Al", "name": "Aluminum", "atomicNumber": 13 },
            { "symbol": "Ga", "name": "Gallium", "atomicNumber": 31 },
            { "symbol": "In", "name": "Indium", "atomicNumber": 49 },
            { "symbol": "Sn", "name": "Tin", "atomicNumber": 50 },
            { "symbol": "Tl", "name": "Thallium", "atomicNumber": 81 },
            { "symbol": "Pb", "name": "Lead", "atomicNumber": 82 },
            { "symbol": "Bi", "name": "Bismuth", "atomicNumber": 83 },
            { "symbol": "Nh", "name": "Nihonium", "atomicNumber": 113 },
            { "symbol": "Fl", "name": "Flerovium", "atomicNumber": 114 },
            { "symbol": "Mc", "name": "Moscovium", "atomicNumber": 115 },
            { "symbol": "Lv", "name": "Livermorium", "atomicNumber": 116 }
        ],
        "metalloids": [
            { "symbol": "B", "name": "Boron", "atomicNumber": 5 },
            { "symbol": "Si", "name": "Silicon", "atomicNumber": 14 },
            { "symbol": "Ge", "name": "Germanium", "atomicNumber": 32 },
            { "symbol": "As", "name": "Arsenic", "atomicNumber": 33 },
            { "symbol": "Sb", "name": "Antimony", "atomicNumber": 51 },
            { "symbol": "Te", "name": "Tellurium", "atomicNumber": 52 },
            { "symbol": "At", "name": "Astatine", "atomicNumber": 85 }
        ],
        "nonmetals": [
            { "symbol": "H", "name": "Hydrogen", "atomicNumber": 1 },
            { "symbol": "C", "name": "Carbon", "atomicNumber": 6 },
            { "symbol": "N", "name": "Nitrogen", "atomicNumber": 7 },
            { "symbol": "O", "name": "Oxygen", "atomicNumber": 8 },
            { "symbol": "P", "name": "Phosphorus", "atomicNumber": 15 },
            { "symbol": "S", "name": "Sulfur", "atomicNumber": 16 },
            { "symbol": "Se", "name": "Selenium", "atomicNumber": 34 }
        ],
        "halogens": [
            { "symbol": "F", "name": "Fluorine", "atomicNumber": 9 },
            { "symbol": "Cl", "name": "Chlorine", "atomicNumber": 17 },
            { "symbol": "Br", "name": "Bromine", "atomicNumber": 35 },
            { "symbol": "I", "name": "Iodine", "atomicNumber": 53 },
            { "symbol": "At", "name": "Astatine", "atomicNumber": 85 },
            { "symbol": "Ts", "name": "Tennessine", "atomicNumber": 117 }
        ],
        "nobleGases": [
            { "symbol": "He", "name": "Helium", "atomicNumber": 2 },
            { "symbol": "Ne", "name": "Neon", "atomicNumber": 10 },
            { "symbol": "Ar", "name": "Argon", "atomicNumber": 18 },
            { "symbol": "Kr", "name": "Krypton", "atomicNumber": 36 },
            { "symbol": "Xe", "name": "Xenon", "atomicNumber": 54 },
            { "symbol": "Rn", "name": "Radon", "atomicNumber": 86 },
            { "symbol": "Og", "name": "Oganesson", "atomicNumber": 118 }
        ],
        "lanthanides": [
            { "symbol": "La", "name": "Lanthanum", "atomicNumber": 57 },
            { "symbol": "Ce", "name": "Cerium", "atomicNumber": 58 },
            { "symbol": "Pr", "name": "Praseodymium", "atomicNumber": 59 },
            { "symbol": "Nd", "name": "Neodymium", "atomicNumber": 60 },
            { "symbol": "Pm", "name": "Promethium", "atomicNumber": 61 },
            { "symbol": "Sm", "name": "Samarium", "atomicNumber": 62 },
            { "symbol": "Eu", "name": "Europium", "atomicNumber": 63 },
            { "symbol": "Gd", "name": "Gadolinium", "atomicNumber": 64 },
            { "symbol": "Tb", "name": "Terbium", "atomicNumber": 65 },
            { "symbol": "Dy", "name": "Dysprosium", "atomicNumber": 66 },
            { "symbol": "Ho", "name": "Holmium", "atomicNumber": 67 },
            { "symbol": "Er", "name": "Erbium", "atomicNumber": 68 },
            { "symbol": "Tm", "name": "Thulium", "atomicNumber": 69 },
            { "symbol": "Yb", "name": "Ytterbium", "atomicNumber": 70 },
            { "symbol": "Lu", "name": "Lutetium", "atomicNumber": 71 }
        ],
        "actinides": [
            { "symbol": "Ac", "name": "Actinium", "atomicNumber": 89 },
            { "symbol": "Th", "name": "Thorium", "atomicNumber": 90 },
            { "symbol": "Pa", "name": "Protactinium", "atomicNumber": 91 },
            { "symbol": "U", "name": "Uranium", "atomicNumber": 92 },
            { "symbol": "Np", "name": "Neptunium", "atomicNumber": 93 },
            { "symbol": "Pu", "name": "Plutonium", "atomicNumber": 94 },
            { "symbol": "Am", "name": "Americium", "atomicNumber": 95 },
            { "symbol": "Cm", "name": "Curium", "atomicNumber": 96 },
            { "symbol": "Bk", "name": "Berkelium", "atomicNumber": 97 },
            { "symbol": "Cf", "name": "Californium", "atomicNumber": 98 },
            { "symbol": "Es", "name": "Einsteinium", "atomicNumber": 99 },
            { "symbol": "Fm", "name": "Fermium", "atomicNumber": 100 },
            { "symbol": "Md", "name": "Mendelevium", "atomicNumber": 101 },
            { "symbol": "No", "name": "Nobelium", "atomicNumber": 102 },
            { "symbol": "Lr", "name": "Lawrencium", "atomicNumber": 103 }
        ]
    }
];

const mineableElements = [
    {
        "commonMetals": {
            "planetTypes": ["Rocky", "Volcanic", "Barren"],
            "elements": [
                { "symbol": "Fe", "name": "Iron", "atomicNumber": 26 },
                { "symbol": "Ni", "name": "Nickel", "atomicNumber": 28 },
                { "symbol": "Co", "name": "Cobalt", "atomicNumber": 27 },
                { "symbol": "Cu", "name": "Copper", "atomicNumber": 29 },
                { "symbol": "Zn", "name": "Zinc", "atomicNumber": 30 },
                { "symbol": "Al", "name": "Aluminum", "atomicNumber": 13 },
                { "symbol": "Mg", "name": "Magnesium", "atomicNumber": 12 },
                { "symbol": "Ca", "name": "Calcium", "atomicNumber": 20 }
            ]
        },
        "rareEarthMetals": {
            "planetTypes": ["Rocky", "Exotic", "Radiated"],
            "elements": [
                { "symbol": "Nd", "name": "Neodymium", "atomicNumber": 60 },
                { "symbol": "Sm", "name": "Samarium", "atomicNumber": 62 },
                { "symbol": "Gd", "name": "Gadolinium", "atomicNumber": 64 },
                { "symbol": "Y", "name": "Yttrium", "atomicNumber": 39 },
                { "symbol": "La", "name": "Lanthanum", "atomicNumber": 57 }
            ]
        },
        "radioactives": {
            "planetTypes": ["Radiated", "Volcanic", "Exotic"],
            "elements": [
                { "symbol": "U", "name": "Uranium", "atomicNumber": 92 },
                { "symbol": "Th", "name": "Thorium", "atomicNumber": 90 },
                { "symbol": "Ra", "name": "Radium", "atomicNumber": 88 }
            ]
        },
        "nobleGases": {
            "planetTypes": ["Gas Giant", "Radiated", "Exotic"],
            "elements": [
                { "symbol": "He", "name": "Helium", "atomicNumber": 2 },
                { "symbol": "Ne", "name": "Neon", "atomicNumber": 10 },
                { "symbol": "Ar", "name": "Argon", "atomicNumber": 18 },
                { "symbol": "Kr", "name": "Krypton", "atomicNumber": 36 },
                { "symbol": "Xe", "name": "Xenon", "atomicNumber": 54 }
            ]
        },
        "reactiveGases": {
            "planetTypes": ["Gas Giant", "Ice World", "Oceanic"],
            "elements": [
                { "symbol": "H", "name": "Hydrogen", "atomicNumber": 1 },
                { "symbol": "O", "name": "Oxygen", "atomicNumber": 8 },
                { "symbol": "N", "name": "Nitrogen", "atomicNumber": 7 },
                { "symbol": "Cl", "name": "Chlorine", "atomicNumber": 17 },
                { "symbol": "F", "name": "Fluorine", "atomicNumber": 9 }
            ]
        },
        "iceCompounds": {
            "planetTypes": ["Ice World", "Oceanic"],
            "elements": [
                { "symbol": "H2O", "name": "Water Ice" },
                { "symbol": "CO2", "name": "Carbon Dioxide Ice" },
                { "symbol": "CH4", "name": "Methane Ice" },
                { "symbol": "NH3", "name": "Ammonia Ice" }
            ]
        },
        "crystalSilicates": {
            "planetTypes": ["Crystaline", "Rocky", "Exotic"],
            "elements": [
                { "symbol": "Si", "name": "Silicon", "atomicNumber": 14 },
                { "symbol": "B", "name": "Boron", "atomicNumber": 5 },
                { "symbol": "Ge", "name": "Germanium", "atomicNumber": 32 },
                { "symbol": "Ti", "name": "Titanium", "atomicNumber": 22 }
            ]
        },
        "artificialCompounds": {
            "planetTypes": ["Artificial"],
            "elements": [
                { "symbol": "SiC", "name": "Silicon Carbide" },
                { "symbol": "GaAs", "name": "Gallium Arsenide" },
                { "symbol": "Graphene", "name": "Graphene Lattice" },
                { "symbol": "NanoFe", "name": "Nanostructured Iron" }
            ]
        }
    }
];

// Function to generate a random mineral with planet type filtering
function generateMineral(planetType = null) {
    const rarities = [
        { name: 'common', weight: 50 },
        { name: 'uncommon', weight: 30 },
        { name: 'rare', weight: 15 },
        { name: 'legendary', weight: 4 },
        { name: 'mythic', weight: 1 }
    ];
    const totalWeight = rarities.reduce((sum, r) => sum + r.weight, 0);
    let random = Math.random() * totalWeight;
    let rarity = rarities.find(r => (random -= r.weight) <= 0).name;
    const mineralName = mineralNames[0][rarity][Math.floor(Math.random() * mineralNames[0][rarity].length)];

    // Get elements based on planet type if provided
    let validElements = [];
    if (planetType) {
        validElements = Object.values(mineableElements[0])
            .filter(category => category.planetTypes.includes(planetType))
            .flatMap(category => category.elements);
    }
    if (!validElements.length) {
        validElements = Object.values(mineableElements[0]).flatMap(category => category.elements); // Fallback to all elements
    }

    const elementCount = Math.floor(Math.random() * 4) + 2; // 2 to 5 elements
    const elements = [];
    for (let i = 0; i < elementCount; i++) {
        const randomElement = validElements[Math.floor(Math.random() * validElements.length)];
        if (randomElement && !elements.some(e => e === randomElement.symbol)) {
            elements.push(randomElement.symbol);
        }
    }
    if (elements.length === 0) {
        elements.push(validElements[Math.floor(Math.random() * validElements.length)].symbol); // Ensure at least one element
    }

    const unknownElements = [];
    if (Math.random() < 0.05) {
        const unknownCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < unknownCount; i++) {
            unknownElements.push({
                symbol: `X${Math.floor(Math.random() * 100)}`,
                name: `Unknown-${Math.floor(Math.random() * 1000)}`
            });
        }
    }

    return {
        mineralName,
        elements,
        unknownElements: unknownElements.length ? unknownElements : undefined
    };
}

// mineralUtils.js

const elementalOptions = [
    { mineralName: 'Argon', elements: ['Ar'] },
    { mineralName: 'Helium', elements: ['He'] },
    { mineralName: 'Neon', elements: ['Ne'] },
    { mineralName: 'Krypton', elements: ['Kr'] },
    { mineralName: 'Xenon', elements: ['Xe'] },
    { mineralName: 'Radon', elements: ['Rn'] },
    { mineralName: 'Hydrogen', elements: ['H'] },
    { mineralName: 'Oxygen', elements: ['O'] },
    { mineralName: 'Nitrogen', elements: ['N'] },
    { mineralName: 'Carbon', elements: ['C'] },
    { mineralName: 'Sulfur', elements: ['S'] },
    { mineralName: 'Chlorine', elements: ['Cl'] },
    { mineralName: 'Fluorine', elements: ['F'] },
    { mineralName: 'Phosphorus', elements: ['P'] }
];

export function generateElementalMineral() {
    const mineral = elementalOptions[Math.floor(Math.random() * elementalOptions.length)];
    return { ...mineral };
}


export { elementNames, generateMineral, mineableElements, mineralNames };

