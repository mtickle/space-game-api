import { getHydratedStarSystem, isStarSystemHydrated, saveHydratedStarSystem, saveThingsToDatabase } from '@utils/storageUtils';
import { synthesizeStarSystem } from '@utils/synthesisUtils'; // adjust path

//--- Core function here. Do we create a NEW system or load a VISITED system.
export function hydrateOrSynthesizeSystem(clickedStar, orbitStateRef, allStars) {
    let fullSystem;

    if (isStarSystemHydrated(clickedStar.id)) {    //--- LOAD THE SYSTEM
        fullSystem = getHydratedStarSystem(clickedStar.id);
        //console.log(`[Hydration] Loaded cached system for ${clickedStar.name}`);
        //setSelectedStar(fullSystem); // fullSystem must contain planets

    } else { //--- SAVE THE SYSTEM
        fullSystem = synthesizeStarSystem(clickedStar);
        saveHydratedStarSystem(fullSystem);
        saveThingsToDatabase("postStarSystem", fullSystem)

        //console.log(`[Synthesis] Created new system for ${clickedStar.name}`);
        //setSelectedStar(fullSystem); // fullSystem must contain planets

    }

    // Always initialize orbit state
    initializeOrbitStateForStar(orbitStateRef, fullSystem);

    // Track visit
    const visited = JSON.parse(localStorage.getItem('visitedStars') || '[]');
    if (!visited.includes(fullSystem.starName)) {
        visited.push(fullSystem.starName);
        localStorage.setItem('visitedStars', JSON.stringify(visited));
    }

    return fullSystem;
}

//--- This should draw orbits for the selected system
export function initializeOrbitStateForStar(orbitRef, star) {
    if (!orbitRef || !star || !star.id || !star.planets) return;

    // Avoid overwriting existing orbit state
    if (orbitRef.current[star.id]) return;

    orbitRef.current[star.id] = star.planets.map((planet, i) => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.001,
        radius: planet.orbitRadius || (20 + i * 8),
    }));
}


