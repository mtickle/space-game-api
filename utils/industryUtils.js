export const industryTypes = [
    {
        name: "Terraforming",
        description: "Turning dead rocks into breathable backyards. Side effects may include unexpected weather and uninvited megafauna."
    },
    {
        name: "Mining & Extraction",
        description: "Digging up everything valuable from a planet’s crust, core, and sometimes other people’s property."
    },
    {
        name: "Biotech & Genetics",
        description: "Splicing DNA for medicine, agriculture, or something with too many eyes that screams at night."
    },
    {
        name: "Starship Manufacturing",
        description: "Building faster-than-light death traps with cupholders. No refunds after ignition."
    },
    {
        name: "Agritech & Hydroponics",
        description: "Feeding billions with high-efficiency algae, protein paste, and 'tangy flavor modules.'"
    },
    {
        name: "Cybernetics",
        description: "Augmenting flesh with machines. Whether it improves life or just gives you Bluetooth ears is... debatable."
    },
    {
        name: "Entertainment & Media",
        description: "Broadcasting music, drama, and celebrity meltdowns across parsecs. Yes, even your embarrassing space karaoke moment."
    },
    {
        name: "Weapon Development",
        description: "Creating increasingly absurd ways to end conflict—usually by escalating it first."
    },
    {
        name: "AI Research & Development",
        description: "Teaching machines to think, feel, and occasionally overthrow their creators. All in the name of progress."
    },
    {
        name: "Quantum Computing",
        description: "Solving every problem and creating new ones at the speed of entanglement. Schrödinger’s IT department is standing by."
    },
    {
        name: "Luxury Goods & Trade",
        description: "Selling rare, exotic, or utterly useless status symbols. Because what’s wealth if you can’t wear it to brunch?"
    },
    {
        name: "Scrap & Salvage",
        description: "One empire’s trash is another moon’s economy. Great for parts, questionable for stability."
    },
    {
        name: "Psionics & Esoteric Research",
        description: "Studying the mind, the soul, and everything that makes scientists twitch. Results vary by belief system."
    },
    {
        name: "Smuggling & Piracy",
        description: "Technically an industry. Pays well, smells bad, and comes with a short retirement plan."
    },
    {
        name: "Diplomacy & Espionage",
        description: "Behind-the-scenes work that keeps empires from blowing up each other—most of the time."
    }
];


export function generateIndustry() {
    return industryTypes[Math.floor(Math.random() * industryTypes.length)];
}