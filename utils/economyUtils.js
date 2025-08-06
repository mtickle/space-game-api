export const economyNames = [
    {
        "name": "Credit-Based Economy",
        "description": "A universal currency system backed by a central galactic bank. Everyone agrees it's valuable, mostly because everyone else agrees it's valuable."
    },
    {
        "name": "Resource-Driven Economy",
        "description": "Wealth is measured in raw materials like minerals, gas, or exotic matter. Basically, whoever owns the biggest pile of shiny rocks wins."
    },
    {
        "name": "Reputation Economy",
        "description": "Transactions are based on trust, honor, and social standing. Great if you're popular—less great if you're known as 'that guy who spaced the ambassador.'"
    },
    {
        "name": "Energy Economy",
        "description": "Energy units are the primary medium of exchange. Because nothing says 'buying groceries' like handing over a vial of antimatter."
    },
    {
        "name": "Barter Economy",
        "description": "Goods and services are exchanged directly. Ideal for those who enjoy haggling over the value of a goat versus a plasma rifle."
    },
    {
        "name": "AI-Managed Economy",
        "description": "An artificial intelligence handles all economic decisions. It's efficient, fair, and only occasionally decides that humans are obsolete."
    },
    {
        "name": "Corporate Economy",
        "description": "Mega-corporations run everything. Citizens are employees, customers, and occasionally unpaid interns in their own lives."
    },
    {
        "name": "Black Market Economy",
        "description": "Unregulated trade thrives in the shadows. If you have to ask what’s for sale, you probably can’t afford it—or survive it."
    },
    {
        "name": "Post-Scarcity Economy",
        "description": "Technology has eliminated material need. People now compete over who can create the most ironic art installation using quantum foam."
    },
    {
        "name": "Hive Economy",
        "description": "A collective mind distributes resources based on function. Individual ambition is frowned upon, mostly because it doesn’t exist."
    },
    {
        "name": "Religious Economy",
        "description": "Trade is governed by divine decree. Currency may include relics, blessings, or indulgences—no refunds, by holy order."
    },
    {
        "name": "Time-Based Economy",
        "description": "Labor time is the currency. You literally pay with your time, which is fine until someone figures out how to counterfeit hours."
    }
]


export function generateEconomy() {
    return economyNames[Math.floor(Math.random() * economyNames.length)];
}