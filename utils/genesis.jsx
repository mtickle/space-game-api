import { generateStarName, generateStarType, getStarDescription } from '@utils/starUtils';
import { synthesizeStarSystem } from '@utils/synthesisUtils';
import { v4 as uuidv4 } from 'uuid';

export function genesisGenerateGalaxy(numSystems, chunkSize = 100) {
    const systems = [];

    console.log("🌌 Kicking off genesis...");

    // Generate star systems
    for (let i = 0; i < numSystems; i++) {
        const name = generateStarName();
        const type = generateStarType();
        const star = {
            id: uuidv4(),
            name,
            type,
            x: Math.floor(Math.random() * 2000 - 1000),
            y: Math.floor(Math.random() * 2000 - 1000),
            size: Math.floor(Math.random() * 6 + 2),
            description: getStarDescription(type),
            faction: null,
        };

        const fullSystem = synthesizeStarSystem(star);
        if (fullSystem) {
            systems.push(fullSystem);
        }
    }

    console.log(`✅ Generated ${systems.length} star systems.`);

    // Split systems into chunks and create downloadable JSON files
    const date = new Date().toISOString().split('T')[0];
    for (let i = 0; i < systems.length; i += chunkSize) {
        const chunk = systems.slice(i, i + chunkSize);
        const jsonString = JSON.stringify(chunk, null, 2); // Pretty print with indentation
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `galaxy_${date}_part${Math.floor(i / chunkSize) + 1}.json`; // Unique filename per chunk
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up
    }

    console.log(`📦 Created ${Math.ceil(systems.length / chunkSize)} JSON files.`);

    return systems; // Optional: return for further use
}