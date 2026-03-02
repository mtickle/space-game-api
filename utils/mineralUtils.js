import { elementalOptions, mineableElements, mineralNames, rarities } from "./libraries/minerals";

// Function to generate a random mineral with planet type filtering
function generateMineral(planetType = null) {
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

export function generateElementalMineral() {
    const mineral = elementalOptions[Math.floor(Math.random() * elementalOptions.length)];
    return { ...mineral };
}

//export { elementNames, generateMineral, mineableElements, mineralNames };

