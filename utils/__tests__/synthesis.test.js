import { synthesizePlanetarySystem } from '../synthesisUtils.js';

// The describe block groups together related tests.
describe('Planetary System Synthesis Logic', () => {

    // The 'it' block describes a specific requirement or "test case".
    it('should always generate an economy and industry for named planets with settlements', () => {

        // We'll run the test 100 times to account for randomness.
        for (let i = 0; i < 100; i++) {
            const starName = 'Testopia';
            const starId = 'test-star-01';

            // Generate a set of planets.
            const planets = synthesizePlanetarySystem(starName, starId);

            // Filter for only the planets that should have settlements.
            const civilizedPlanets = planets.filter(p => p.isUniqueName && p.settlements.length > 0);

            // Now, check each of those planets.
            for (const planet of civilizedPlanets) {
                // The 'expect' function is the core of the test.
                // It checks if a value meets a certain condition.

                // Check that planet.economy is not null or undefined.
                expect(planet.economy).not.toBeNull();

                // Check that planet.industry is not null or undefined.
                expect(planet.industry).not.toBeNull();
            }
        }
    });
});
