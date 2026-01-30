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
    name: "The 5-Second Rule",
    duration: 5,
    steps: [
      "Count 5 - 4 - 3 - 2 - 1.",
      "On 1, leave the room completely.",
      "Go to a public area or a bathroom."
    ],
    scripture: "Submit yourselves therefore to God. Resist the devil, and he will flee from you. (James 4:7)"
  },
  {
    name: "HALT Check",
    duration: 30,
    steps: [
      "Are you HUNGRY? (Eat something healthy)",
      "Are you ANGRY? (Write down what's bothering you)",
      "Are you LONELY? (Call or text a real friend)",
      "Are you TIRED? (Close your eyes for 10 minutes - no phone)"
    ],
    scripture: "Create in me a clean heart, O God; and renew a right spirit within me. (Psalm 51:10)"
  }
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
