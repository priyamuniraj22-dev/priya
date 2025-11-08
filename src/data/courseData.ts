import { Level, Class, Game } from '../types/course';

export const levels: Level[] = [
  {
    id: 'L1',
    name: 'Beginner',
    overview: 'Introduce letters, single sounds (phonemes), and simple CVC words. Focus on listening, repetition, and basic letter formation.',
    targetAge: '3-5',
    color: '#FFB703'
  },
  {
    id: 'L2',
    name: 'Foundations',
    overview: 'Short vowels, consonant blends (initial), CVC blending & segmenting, simple sight words.',
    targetAge: '5-6',
    color: '#00B4D8'
  },
  {
    id: 'L3',
    name: 'Intermediate',
    overview: 'Long vowels, digraphs (sh, ch, th), vowel teams (ea, oa), multisyllabic word decoding.',
    targetAge: '6-7',
    color: '#FF6363'
  },
  {
    id: 'L4',
    name: 'Advanced',
    overview: 'Silent e, r-controlled vowels, complex blends, prefix/suffix basics, reading fluency.',
    targetAge: '7-8',
    color: '#8B5CF6'
  },
  {
    id: 'L5',
    name: 'Excel',
    overview: 'Advanced decoding, spelling patterns, expressive writing, story creation, guided comprehension.',
    targetAge: '8-10',
    color: '#10B981'
  }
];

export const classes: Class[] = [
  {
    id: 'L1-C1',
    levelId: 'L1',
    number: 1,
    title: 'Letter Friends: a to f',
    duration: 20,
    objective: 'Recognize letters a-f and their short vowel sounds',
    activities: [
      { type: 'singalong', description: 'Alphabet song with motion' },
      { type: 'listen-repeat', description: 'Audio + child repeats phoneme' },
      { type: 'trace', description: 'On-screen letter tracing with guide' }
    ],
    games: [
      {
        id: 'G1',
        name: 'Letter Fishing',
        goal: 'Catch fish labeled with the target letters',
        mechanic: 'Drag-and-drop, reward sound when correct',
        icon: 'Fish'
      },
      {
        id: 'G2',
        name: 'Sound Treasure Hunt',
        goal: 'Tap on objects that start with the played sound',
        mechanic: 'Audio prompt, 3-second hint, confetti on success',
        icon: 'Sparkles'
      }
    ]
  },
  {
    id: 'L1-C2',
    levelId: 'L1',
    number: 2,
    title: 'Letter Friends: g to m',
    duration: 20,
    objective: 'Recognize letters g-m and begin blending two sounds',
    activities: [
      { type: 'match', description: 'Picture-to-letter matching' },
      { type: 'audio-blend', description: 'Two-phoneme blending demo' }
    ],
    games: [
      {
        id: 'G3',
        name: 'Rhyme Race',
        goal: 'Choose the picture that rhymes with the cue',
        mechanic: 'Timed choice, progressive levels',
        icon: 'Zap'
      },
      {
        id: 'G4',
        name: 'Letter Hat',
        goal: 'Drop correct letter into the hat for the spoken sound',
        mechanic: 'One-minute rounds, sticker reward',
        icon: 'Trophy'
      }
    ]
  },
  {
    id: 'L2-C1',
    levelId: 'L2',
    number: 1,
    title: 'Short Vowels: a e i o u',
    duration: 25,
    objective: 'Identify and produce short vowel sounds in isolation and in CVC words',
    activities: [
      { type: 'word-building', description: 'Drag consonant + vowel + consonant to build words' },
      { type: 'sound-isolation', description: 'Listen and tap the vowel sound' }
    ],
    games: [
      {
        id: 'G5',
        name: 'CVC Builder',
        goal: 'Build the word to match the picture',
        mechanic: 'Tile placement + audio confirmation',
        icon: 'Box'
      },
      {
        id: 'G6',
        name: 'Phonics Bingo',
        goal: 'Cover words said by the host',
        mechanic: 'Dynamic bingo card, progress badges',
        icon: 'Grid3x3'
      }
    ]
  },
  {
    id: 'L3-C1',
    levelId: 'L3',
    number: 1,
    title: 'Digraphs & Teams',
    duration: 30,
    objective: 'Recognize and read common digraphs and vowel teams',
    activities: [
      { type: 'listen-find', description: 'Find the digraph in a list of words' },
      { type: 'create', description: 'Make words using tiles' }
    ],
    games: [
      {
        id: 'G7',
        name: 'Mystery Word Puzzle',
        goal: 'Solve puzzle by selecting correct digraph tiles',
        mechanic: 'Reveal letters gradually, hint system',
        icon: 'HelpCircle'
      },
      {
        id: 'G8',
        name: 'Sound Swap',
        goal: 'Swap beginning sounds to create new words',
        mechanic: 'Drag-swap, instant audio feedback',
        icon: 'Shuffle'
      }
    ]
  },
  {
    id: 'L4-C1',
    levelId: 'L4',
    number: 1,
    title: 'Silent E & Long Vowels',
    duration: 30,
    objective: 'Apply silent-e rules to change vowel sounds',
    activities: [
      { type: 'rule-explore', description: 'Interactive rule demonstration' },
      { type: 'mini-reader', description: 'Short decodable reader with target patterns' }
    ],
    games: [
      {
        id: 'G9',
        name: 'Silent E Switch',
        goal: 'Change words by toggling E; watch meaning or picture change',
        mechanic: 'Toggle control, animated transformation',
        icon: 'ToggleRight'
      },
      {
        id: 'G10',
        name: 'Fluency Dash',
        goal: 'Read as many short phrases correctly within time',
        mechanic: 'Level progression, accuracy meter',
        icon: 'Clock'
      }
    ]
  },
  {
    id: 'L5-C1',
    levelId: 'L5',
    number: 1,
    title: 'Spelling Patterns & Word Origins',
    duration: 35,
    objective: 'Identify complex spelling families and use them in writing',
    activities: [
      { type: 'word-notebook', description: 'Digital notebook for word families' },
      { type: 'micro-writing', description: 'Write 3-sentence story using 8 target words' }
    ],
    games: [
      {
        id: 'G11',
        name: 'Sentence Builders',
        goal: 'Assemble sentences from phrase-tiles and improve grammar',
        mechanic: 'Drag-tile sentences, peer-share mode',
        icon: 'Type'
      },
      {
        id: 'G12',
        name: 'StoryCraft',
        goal: 'Create stories from picture prompts, get audio narration',
        mechanic: 'Record & playback, teacher feedback tool',
        icon: 'BookOpen'
      }
    ]
  }
];
