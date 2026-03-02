# 🌌 Space Game API

> An infinite, procedurally generated sci-fi universe in a box. 
> Generate everything from entire star systems and planetary atmospheres down to the screaming flora and local economies.

Welcome to the **Space Game API**, a robust procedural generation engine designed to populate massive, data-rich sci-fi universes on the fly. Built with Node.js and strict ES Modules, this API provides game developers, world-builders, and tabletop GMs with a limitless supply of unique celestial data.

---

## ✨ What It Generates

The engine handles macro-level astrophysics down to micro-level ecology and civilization data. Every endpoint returns deeply nested, interconnected JSON data.

### 🌟 Star Systems & Astrophysics
* **Syllabic Star Names:** A custom linguistic algorithm generates thousands of organic, alien-sounding star names (e.g., *Zorbaea*, *Kaelith*).
* **Spectral Classes:** Accurate stellar classifications (O, B, A, F, G, K, M, plus exotic dwarfs and Wolf-Rayet stars) complete with temperature profiles and flavor text.

### 🪐 Planets & Moons
* **50+ Planet Classifications:** Ranging from standard Terrestrial and Gas Giants to *Magma Oceans, Chthonian worlds, and Cyberformed spheres*.
* **Dynamic Atmospheres:** Granular chemical makeups (e.g., 78% Nitrogen / 21% Oxygen, or 99% Silicate Vapor) tied directly to the planet's base type.
* **Lunar Systems:** Generates multiple moons per planet from a vast pool of types (Tidally Locked, Irregular, Spore, Metallic).

### 🏙️ Civilizations & Settlements
* **Factions & Alliances:** Systems belong to distinct alliances (e.g., *The Terran Federation*, *The Obsidian Syndicate*) complete with D&D-style alignments.
* **Settlements:** Procedural cities and outposts with varying populations, government types, and localized economies.
* **Architecture:** Generates specific modular buildings and space stations native to the controlling faction.

### 🧬 Bizarre Flora & Fauna
* **Flora:** Generates alien plant life with varying rarities, toxicities, and utilities. Plants can be edible, poisonous, or even sentient. Includes quirky, procedurally attached notes (e.g., *"Known to scream when plucked. Local chefs recommend earplugs."*).
* **Fauna:** Wild ecosystems of creatures with unique traits, diets, and hostility levels tailored to their planet's biome.

### 💎 Deep Resource Systems
* **Minerals & Commodities:** Generate tradeable resources with distinct attributes, hazard levels (radioactive, corrosive), and economic values.

---

## 🛠️ Tech Stack & Architecture

* **Runtime:** Node.js
* **Paradigm:** Strict ES Modules (`import`/`export`)
* **Data Architecture:** Highly modular. All generation arrays (names, conditions, elements, jokes) are decoupled into a dedicated `/libraries` directory, making it incredibly easy to fork and customize the flavor of your own universe.

---

## 🚀 Quick Start

1. **Clone the repository:**
   git clone https://github.com/yourusername/space-game-api.git
   cd space-game-api

2. **Install dependencies:**
   npm install

3. **Start the API server:**
   npm start

4. **Test the endpoints:**
   Hit `http://localhost:3000/api/v1/systems/generate` to watch the universe expand!

---

## 📖 Example Output

A tiny glimpse into what a single generated planet might look like:
```json
{
  "name": "Kaelith Prime",
  "type": "Oceanic",
  "atmosphere": {
    "elements": [
      { "name": "Water Vapor", "percent": 0.90 },
      { "name": "Oxygen", "percent": 0.10 }
    ]
  },
  "flora": [
    {
      "name": "Abyssal Kelp",
      "type": "seaweed",
      "appearance": "Bioluminescent blue",
      "edible": true,
      "sentient": false,
      "notes": "Its pollen causes mild euphoria and uncontrollable dance moves."
    }
  ],
  "settlements": [
    {
      "name": "New Atlantis Outpost",
      "population": 14052,
      "economy": "Hydro-Extraction"
    }
  ]
}
```
---

## 🤝 Contributing

The universe is expanding, and we need more matter! Contributions are always welcome. Whether you're adding new `libraries` of alien names, tweaking the orbital mechanics, or adding new JSON endpoints, feel free to open a Pull Request.

## 📜 License

[MIT License](LICENSE) - The universe belongs to everyone.
