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
        name: "Company A",
        description: "Placeholder description for Company A. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company B",
        description: "Placeholder description for Company B. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company C",
        description: "Placeholder description for Company C. This will be replaced with a real company pitch from history.",
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
        name: "Company D",
        description: "Placeholder description for Company D. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company E",
        description: "Placeholder description for Company E. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company F",
        description: "Placeholder description for Company F. This will be replaced with a real company pitch from history.",
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
        name: "Company G",
        description: "Placeholder description for Company G. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company H",
        description: "Placeholder description for Company H. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company I",
        description: "Placeholder description for Company I. This will be replaced with a real company pitch from history.",
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
        name: "Company J",
        description: "Placeholder description for Company J. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company K",
        description: "Placeholder description for Company K. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company L",
        description: "Placeholder description for Company L. This will be replaced with a real company pitch from history.",
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
        name: "Company M",
        description: "Placeholder description for Company M. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company N",
        description: "Placeholder description for Company N. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company O",
        description: "Placeholder description for Company O. This will be replaced with a real company pitch from history.",
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
        name: "Company P",
        description: "Placeholder description for Company P. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company Q",
        description: "Placeholder description for Company Q. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company R",
        description: "Placeholder description for Company R. This will be replaced with a real company pitch from history.",
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
        name: "Company S",
        description: "Placeholder description for Company S. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company T",
        description: "Placeholder description for Company T. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company U",
        description: "Placeholder description for Company U. This will be replaced with a real company pitch from history.",
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
        name: "Company V",
        description: "Placeholder description for Company V. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company W",
        description: "Placeholder description for Company W. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company X",
        description: "Placeholder description for Company X. This will be replaced with a real company pitch from history.",
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
        name: "Company Y",
        description: "Placeholder description for Company Y. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company Z",
        description: "Placeholder description for Company Z. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
      {
        name: "Company AA",
        description: "Placeholder description for Company AA. This will be replaced with a real company pitch from history.",
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
        name: "Company BB",
        description: "Placeholder description for Company BB. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company CC",
        description: "Placeholder description for Company CC. This will be replaced with a real company pitch from history.",
        isReal: false,
        revealText: "This was a fake company. The description will be revealed after you submit your answer.",
      },
      {
        name: "Company DD",
        description: "Placeholder description for Company DD. This will be replaced with a real company pitch from history.",
        isReal: true,
        revealText: "This was the real company! The full story will be revealed after you submit your answer.",
      },
    ],
  },
]
