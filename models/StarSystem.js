import mongoose from 'mongoose';

// Define schemas for all the nested parts of your data first

const BuildingSchema = new mongoose.Schema({ name: String, type: String }, { _id: false });
const LayoutSchema = new mongoose.Schema({ theme: String, condition: String, buildings: [BuildingSchema] }, { _id: false });

const SettlementSchema = new mongoose.Schema({
    name: String,
    population: Number,
    layout: LayoutSchema,
    isCapital: Boolean
}, { _id: false });

const FactionSchema = new mongoose.Schema({
    name: String,
    id: String,
    alignment: String,
    symbol: String,
    color: String,
    description: String,
    allianceId: String, // This will link to the alliance this faction belongs to
}, { _id: false });

const SpaceStationSchema = new mongoose.Schema({
    stationId: String,
    stationName: String,
    stationSize: Number,
    stationType: String,
    factionId: String,
    factionColor: String,
}, { _id: false });

const ConditionsSchema = new mongoose.Schema({
    weather: String,
    temperature: String,
    nightTemperature: String,
    wind: String,
    toxicity: String,
    radiation: String,
}, { _id: false });

const FloraFaunaSchema = new mongoose.Schema({
    name: String,
    type: String,
    appearance: String,
    rarity: String,
    edible: Boolean,
    poisonous: Boolean,
    sentient: Boolean,
    cultivatable: Boolean,
    utility: String,
    synthetic: Boolean,
    notes: String,
    // Fields specific to fauna
    behavior: String,
    biome: String,
    feet: Number,
    gendered: Boolean,
    laysEggs: Boolean,
    description: String,
}, { _id: false });

const MoonSchema = new mongoose.Schema({
    starId: String,
    planetId: String,
    moonName: String,
    moonId: String,
    moonType: String,
    moonSize: Number,
    moonConditions: ConditionsSchema,
    moonSettlements: [mongoose.Schema.Types.Mixed], // Or define a SettlementSchema
}, { _id: false });

const InhabitantSchema = new mongoose.Schema({
    speciesId: String,
    speciesName: String,
    disposition: String,
    type: String, // 'Native' or 'Settler'
    societalType: String, // 'Civilization' or 'Primitive'
    populationPercentage: Number
}, { _id: false });

const ResourceSchema = new mongoose.Schema({
    mineralName: String,
    elements: [String],
    unknownElements: [{ symbol: String, name: String }]
}, { _id: false });

const PlanetSchema = new mongoose.Schema({
    starId: String,
    starName: String,
    planetId: String,
    planetName: String,
    planetConditions: ConditionsSchema,
    planetType: String,
    planetColor: String,
    planetSize: Number,
    orbitRadius: Number,
    isUniqueName: Boolean,
    hasCivilization: Boolean,
    floraList: [FloraFaunaSchema],
    faunaList: [FloraFaunaSchema],
    resourceList: [ResourceSchema], // Define a proper schema if needed
    moons: [MoonSchema],
    settlements: [SettlementSchema], // Or define a SettlementSchema
    atmosphere: mongoose.Schema.Types.Mixed,
    economy: mongoose.Schema.Types.Mixed, // Can be an object or null
    industry: mongoose.Schema.Types.Mixed, // Can be an object or null
    //inhabitants: [mongoose.Schema.Types.Mixed] // An array of species objects
    inhabitants: [InhabitantSchema]
}, { _id: false });


// This is the main schema for the entire star system document
const StarSystemSchema = new mongoose.Schema({
    starId: { type: String, required: true, unique: true },
    starName: String,
    starX: Number,
    starY: Number,
    starSize: Number,
    starType: String,
    starTemp: String,
    starDescription: String,
    starFaction: FactionSchema,
    spaceStation: SpaceStationSchema,
    planets: [PlanetSchema],
    catalogedFauna: [FloraFaunaSchema],
    catalogedFlora: [FloraFaunaSchema],
    version: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const StarSystem = mongoose.model('StarSystem', StarSystemSchema);

export default StarSystem;