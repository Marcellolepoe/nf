export const IDENTITY_PROMISE = {
  title: "The Man of the New Reality",
  manifesto: [
    "I am a man of radical discipline. I do not negotiate with my lower self.",
    "I am in control of my attention, my biology, and my future.",
    "I am fighting for the woman I will one day marry and the family I will lead.",
    "I do not trade my destiny for 30 seconds of digital illusion.",
    "I am manifesting a life of peak energy, absolute focus, and deep self-respect."
  ]
};

export const WARFARE_STEPS = [
  {
    id: 'w1',
    type: 'confrontation',
    title: "The Identity Choice",
    question: "Who is in control right now? Your biological urges or your future self?",
    options: [
      { text: "My biological urges (The Slave)", next: 'w2_slave' },
      { text: "My future self (The Master)", next: 'w2_master' }
    ]
  },
  {
    id: 'w2_slave',
    type: 'text',
    title: "Reality Check",
    question: "You've admitted to being a slave. What is the precise thing you are losing right now for 30 seconds of pixels?",
    theory: "Consequence Awareness",
    placeholder: "Name the cost (Self-respect, energy, future marriage...)"
  },
  {
    id: 'w2_master',
    type: 'action',
    title: "Action Signal",
    question: "If the Master is in control, prove it. Stand up and do 10 pushups or put cold water on your face. Did you do it?",
    options: [
      { text: "YES - I AM IN CONTROL", next: 'w3' },
      { text: "No, I'm hesitating", next: 'w2_slave' }
    ]
  },
  {
    id: 'w3',
    type: 'impact',
    title: "The Vision",
    question: "Imagine the woman you will marry. If she were standing behind you right now, would she be proud of this moment?",
    options: [
      { text: "She would be proud", next: 'final' },
      { text: "No... she wouldn't", next: 'w2_slave' }
    ]
  }
];

export const PANIC_TECHNIQUES = [
  {
    name: "Urge Surfing",
    duration: 120,
    steps: [
      "Find where the urge lives in your body (Stomach? Chest?)",
      "Do NOT fight it. Just watch it like a wave.",
      "Breathe into that spot. Don't act. Just observe.",
      "The wave will peak, then it WILL subside."
    ],
    scripture: "Be still, and know that I am God. (Psalm 46:10)"
  },
  {
    name: "Headstart Mode",
    duration: 300,
    steps: [
      "You are wasting time fighting shadows. Get a headstart on the day instead.",
      "Leave the room immediately.",
      "Spend the next 5 minutes on your most difficult work task or physical exercise.",
      "Win back the time you almost lost."
    ],
    scripture: "Redeeming the time, because the days are evil. (Ephesians 5:16)"
  },
  {
    name: "Loneliness Combat",
    duration: 60,
    steps: [
      "Loneliness is an emotion, not a command to relapse.",
      "Text or call someone you respect right now (don't mention the urge, just connect).",
      "Real connection kills the need for fake fantasy."
    ],
    scripture: "Two are better than one... for if they fall, the one will lift up his fellow. (Ecclesiastes 4:9-10)"
  }
];

export const DAILY_QUOTES = [
  "Discipline is choosing between what you want now and what you want most.",
  "He who conquers others is strong; he who conquers himself is mighty.",
  "The pain of discipline is far less than the pain of regret.",
  "You cannot find peace by avoiding life.",
  "Strength does not come from winning. Your struggles develop your strengths.",
  "Be the man you would want your future daughter to marry.",
  "Your future self is either thanking you or cursing you right now."
];

export const VERSES = [
  {
    text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
    source: "1 Corinthians 10:13"
  },
  {
    text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    source: "2 Timothy 1:7"
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    source: "Philippians 4:13"
  },
  {
    text: "Submit yourselves therefore to God. Resist the devil, and he will flee from you.",
    source: "James 4:7"
  }
];

export const RATIONALE = [
  "Future Monogamy & Respect",
  "High Energy & Focus",
  "Radical Self-Respect",
  "Living in Reality, not Fantasy"
];
