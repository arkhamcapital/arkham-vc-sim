export interface Company {
  name: string
  description: string
  isReal: boolean
  revealText: string
}

export interface Round {
  id: number
  era: string
  companies: Company[]
}

export const rounds: Round[] = [
  {
    id: 1,
    era: "2000s Tech Boom",
    companies: [
      {
        name: "NexCard",
        description: "A proposed digital wallet and real-time settlement network connecting merchants and banks across borders.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Visa",
        description: "A global network enabling secure electronic payments between consumers, merchants, and financial institutions—without moving physical currency.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "PayBridge",
        description: "Connecting banks and retailers through instant authorization rails and tokenized credentials.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 2,
    era: "1990s Dot-Com",
    companies: [
      {
        name: "Meta",
        description: "Building tools that help people connect, share, and build community across apps and devices.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "CircleLink",
        description: "A platform for private groups to share updates, plan events, and stay in touch.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "FeedStream",
        description: "Curated social feeds and short-form video designed for the next generation of creators.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 3,
    era: "2010s Unicorns",
    companies: [
      {
        name: "RideLink",
        description: "On-demand rides and carpool matching in select metro areas, with plans to expand nationally.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "CommuteHub",
        description: "Subscription-based urban mobility and last-mile delivery for commuters and small businesses.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Uber",
        description: "Mobility and delivery at the tap of a button—connecting riders with drivers and customers with local businesses.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 4,
    era: "1980s Wall Street",
    companies: [
      {
        name: "StayShare",
        description: "Home-swap and short-term rental listings for travelers seeking authentic local stays.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Airbnb",
        description: "A marketplace where anyone can belong anywhere—offering unique stays and experiences hosted by locals.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Nestaway",
        description: "Furnished rentals and curated experiences for relocating professionals and extended stays.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 5,
    era: "2020s AI Wave",
    companies: [
      {
        name: "Doordash",
        description: "Empowering local commerce by connecting customers with their favorite restaurants and convenience stores through on-demand delivery.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "MealRun",
        description: "Restaurant delivery and catering for offices and events, with a focus on group orders.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "ChefDrop",
        description: "Meal kits and same-day delivery from local kitchens and meal-prep partners.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 6,
    era: "1970s Industrial",
    companies: [
      {
        name: "CloudVault",
        description: "Encrypted file storage and team sync for enterprises with strict compliance needs.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "SyncDrive",
        description: "Backup and sharing for creative professionals—keep projects in sync across devices.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Dropbox",
        description: "Keeping your files in sync and accessible from anywhere—one place for your work and life.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 7,
    era: "2000s Social Media",
    companies: [
      {
        name: "Coinbase",
        description: "A secure platform for buying, selling, and storing digital currency—making crypto accessible to everyone.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "BitTrade",
        description: "A regulated exchange for trading digital assets and stablecoins with institutional-grade custody.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "ChainVault",
        description: "Custody and staking services for institutional holders of digital assets.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 8,
    era: "1990s Biotech",
    companies: [
      {
        name: "CartDash",
        description: "Same-day grocery delivery from partner supermarkets and regional chains.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Instacart",
        description: "Groceries and more, delivered from stores you love—so you can get what you need without leaving home.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "GroceryGo",
        description: "Delivery and pickup from local grocers and specialty stores, with flexible time slots.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 9,
    era: "2010s FinTech",
    companies: [
      {
        name: "IdeaBoard",
        description: "Save and organize inspiration from across the web in visual boards and collections.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Pinterest",
        description: "A visual discovery engine where people find ideas and inspiration for their next project, trip, or purchase.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Pinflow",
        description: "Visual search and recommendations for home, style, and DIY—discover and save what you love.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
    ],
  },
  {
    id: 10,
    era: "2020s Climate Tech",
    companies: [
      {
        name: "Velocità Motors",
        description: "Boutique manufacturer of limited-edition performance vehicles and bespoke driving experiences.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Scuderia Apex",
        description: "Racing-inspired sports cars and exclusive member experiences on and off the track.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Ferrari",
        description: "Building some of the world's most coveted high-performance cars and competing at the pinnacle of motorsport.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
    ],
  },
]
