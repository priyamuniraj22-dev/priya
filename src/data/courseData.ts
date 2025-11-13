import { Level, Class, Game } from '../types/course';

export const levels: Level[] = [
  {
    id: 'L1',
    name: 'Beginner',
    overview: 'Introduce letters, single sounds (phonemes), and simple CVC words. Focus on listening, repetition, and basic letter formation.',
    targetAge: '3-5',
    color: '#FFB703',
    audioFiles: ['letter_a.mp3', 'letter_b.mp3', 'letter_c.mp3', 'letter_d.mp3', 'letter_e.mp3', 'letter_f.mp3'],
    videoFiles: ['letter_a.mp4', 'letter_b.mp4', 'letter_c.mp4', 'letter_d.mp4', 'letter_e.mp4', 'letter_f.mp4']
  },
  {
    id: 'L2',
    name: 'Foundations',
    overview: 'Short vowels, consonant blends (initial), CVC blending & segmenting, simple sight words.',
    targetAge: '5-6',
    color: '#00B4D8',
    audioFiles: ['vowel_a.mp3', 'vowel_e.mp3', 'vowel_i.mp3', 'vowel_o.mp3', 'vowel_u.mp3'],
    videoFiles: ['vowel_a.mp4', 'vowel_e.mp4', 'vowel_i.mp4', 'vowel_o.mp4', 'vowel_u.mp4']
  },
  {
    id: 'L3',
    name: 'Intermediate',
    overview: 'Long vowels, digraphs (sh, ch, th), vowel teams (ea, oa), multisyllabic word decoding.',
    targetAge: '6-7',
    color: '#FF6363',
    audioFiles: ['digraph_sh.mp3', 'digraph_ch.mp3', 'digraph_th.mp3'],
    videoFiles: ['digraph_sh.mp4', 'digraph_ch.mp4', 'digraph_th.mp4']
  },
  {
    id: 'L4',
    name: 'Advanced',
    overview: 'Silent e, r-controlled vowels, complex blends, prefix/suffix basics, reading fluency.',
    targetAge: '7-8',
    color: '#8B5CF6',
    audioFiles: ['silent_e.mp3', 'r_controlled.mp3'],
    videoFiles: ['silent_e.mp4', 'r_controlled.mp4']
  },
  {
    id: 'L5',
    name: 'Excel',
    overview: 'Advanced decoding, spelling patterns, expressive writing, story creation, guided comprehension.',
    targetAge: '8-10',
    color: '#10B981',
    audioFiles: ['story_reading.mp3', 'expressive_writing.mp3'],
    videoFiles: ['story_creation.mp4', 'writing_process.mp4']
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
      { type: 'listen-repeat', description: 'Audio + child repeats phoneme', audioFile: 'letter_a_to_f.mp3' },
      { type: 'trace', description: 'On-screen letter tracing with guide', videoFile: 'tracing_demo.mp4' }
    ],
    games: [
      {
        id: 'G1',
        name: 'Letter Fishing',
        goal: 'Catch fish labeled with the target letters',
        mechanic: 'Drag-and-drop, reward sound when correct',
        icon: 'Fish',
        audioFiles: ['correct_letter.mp3', 'incorrect_letter.mp3'],
        videoFiles: ['game_intro.mp4']
      },
      {
        id: 'G2',
        name: 'Sound Treasure Hunt',
        goal: 'Tap on objects that start with the played sound',
        mechanic: 'Audio prompt, 3-second hint, confetti on success',
        icon: 'Sparkles',
        audioFiles: ['treasure_found.mp3', 'treasure_miss.mp3'],
        videoFiles: ['treasure_animation.mp4']
      }
    ],
    audioFiles: ['lesson_intro.mp3', 'lesson_outro.mp3'],
    videoFiles: ['lesson_intro.mp4']
  },
  {
    id: 'L1-C2',
    levelId: 'L1',
    number: 2,
    title: 'Letter Friends: g to m',
    duration: 20,
    objective: 'Recognize letters g-m and begin blending two sounds',
    activities: [
      { type: 'match', description: 'Picture-to-letter matching', audioFile: 'matching_game.mp3' },
      { type: 'audio-blend', description: 'Two-phoneme blending demo', audioFile: 'blend_g_to_m.mp3', videoFile: 'blend_demo.mp4' }
    ],
    games: [
      {
        id: 'G3',
        name: 'Rhyme Race',
        goal: 'Choose the picture that rhymes with the cue',
        mechanic: 'Timed choice, progressive levels',
        icon: 'Zap',
        audioFiles: ['rhyme_correct.mp3', 'rhyme_incorrect.mp3'],
        videoFiles: ['rhyme_race_intro.mp4']
      },
      {
        id: 'G4',
        name: 'Letter Hat',
        goal: 'Drop correct letter into the hat for the spoken sound',
        mechanic: 'One-minute rounds, sticker reward',
        icon: 'Trophy',
        audioFiles: ['hat_success.mp3', 'hat_fail.mp3'],
        videoFiles: ['hat_drop_animation.mp4']
      }
    ],
    audioFiles: ['lesson2_intro.mp3'],
    videoFiles: ['lesson2_intro.mp4']
  },
  {
    id: 'L2-C1',
    levelId: 'L2',
    number: 1,
    title: 'Short Vowels: a e i o u',
    duration: 25,
    objective: 'Identify and produce short vowel sounds in isolation and in CVC words',
    activities: [
      { type: 'word-building', description: 'Drag consonant + vowel + consonant to build words', audioFile: 'cvc_building.mp3', videoFile: 'cvc_demo.mp4' },
      { type: 'sound-isolation', description: 'Listen and tap the vowel sound', audioFile: 'vowel_isolation.mp3' }
    ],
    games: [
      {
        id: 'G5',
        name: 'CVC Builder',
        goal: 'Build the word to match the picture',
        mechanic: 'Tile placement + audio confirmation',
        icon: 'Box',
        audioFiles: ['word_complete.mp3', 'word_incorrect.mp3'],
        videoFiles: ['tile_placement.mp4']
      },
      {
        id: 'G6',
        name: 'Phonics Bingo',
        goal: 'Cover words said by the host',
        mechanic: 'Dynamic bingo card, progress badges',
        icon: 'Grid3x3',
        audioFiles: ['bingo_call.mp3', 'bingo_win.mp3'],
        videoFiles: ['bingo_card.mp4']
      }
    ],
    audioFiles: ['vowels_intro.mp3'],
    videoFiles: ['vowels_intro.mp4']
  },
  {
    id: 'L3-C1',
    levelId: 'L3',
    number: 1,
    title: 'Digraphs & Teams',
    duration: 30,
    objective: 'Recognize and read common digraphs and vowel teams',
    activities: [
      { type: 'listen-find', description: 'Find the digraph in a list of words', audioFile: 'digraph_finder.mp3' },
      { type: 'create', description: 'Make words using tiles', videoFile: 'digraph_creation.mp4' }
    ],
    games: [
      {
        id: 'G7',
        name: 'Mystery Word Puzzle',
        goal: 'Solve puzzle by selecting correct digraph tiles',
        mechanic: 'Reveal letters gradually, hint system',
        icon: 'HelpCircle',
        audioFiles: ['puzzle_solve.mp3', 'puzzle_hint.mp3'],
        videoFiles: ['puzzle_reveal.mp4']
      },
      {
        id: 'G8',
        name: 'Sound Swap',
        goal: 'Swap beginning sounds to create new words',
        mechanic: 'Drag-swap, instant audio feedback',
        icon: 'Shuffle',
        audioFiles: ['swap_success.mp3', 'swap_error.mp3'],
        videoFiles: ['sound_swap.mp4']
      }
    ],
    audioFiles: ['digraphs_intro.mp3'],
    videoFiles: ['digraphs_intro.mp4']
  },
  {
    id: 'L4-C1',
    levelId: 'L4',
    number: 1,
    title: 'Silent E & Long Vowels',
    duration: 30,
    objective: 'Apply silent-e rules to change vowel sounds',
    activities: [
      { type: 'rule-explore', description: 'Interactive rule demonstration', videoFile: 'silent_e_rule.mp4' },
      { type: 'mini-reader', description: 'Short decodable reader with target patterns', audioFile: 'reader_passage.mp3' }
    ],
    games: [
      {
        id: 'G9',
        name: 'Silent E Switch',
        goal: 'Change words by toggling E; watch meaning or picture change',
        mechanic: 'Toggle control, animated transformation',
        icon: 'ToggleRight',
        audioFiles: ['toggle_effect.mp3'],
        videoFiles: ['magic_transformation.mp4']
      },
      {
        id: 'G10',
        name: 'Fluency Dash',
        goal: 'Read as many short phrases correctly within time',
        mechanic: 'Level progression, accuracy meter',
        icon: 'Clock',
        audioFiles: ['fluency_correct.mp3', 'fluency_incorrect.mp3'],
        videoFiles: ['timer_countdown.mp4']
      }
    ],
    audioFiles: ['silent_e_intro.mp3'],
    videoFiles: ['silent_e_intro.mp4']
  },
  {
    id: 'L5-C1',
    levelId: 'L5',
    number: 1,
    title: 'Spelling Patterns & Word Origins',
    duration: 35,
    objective: 'Identify complex spelling families and use them in writing',
    activities: [
      { type: 'word-notebook', description: 'Digital notebook for word families', videoFile: 'notebook_demo.mp4' },
      { type: 'micro-writing', description: 'Write 3-sentence story using 8 target words', audioFile: 'writing_prompt.mp3' }
    ],
    games: [
      {
        id: 'G11',
        name: 'Sentence Builders',
        goal: 'Assemble sentences from phrase-tiles and improve grammar',
        mechanic: 'Drag-tile sentences, peer-share mode',
        icon: 'Type',
        audioFiles: ['sentence_complete.mp3', 'sentence_error.mp3'],
        videoFiles: ['sentence_assembly.mp4']
      },
      {
        id: 'G12',
        name: 'StoryCraft',
        goal: 'Create stories from picture prompts, get audio narration',
        mechanic: 'Record & playback, teacher feedback tool',
        icon: 'BookOpen',
        audioFiles: ['story_record.mp3', 'story_playback.mp3'],
        videoFiles: ['story_creation.mp4']
      }
    ],
    audioFiles: ['spelling_patterns.mp3'],
    videoFiles: ['spelling_patterns.mp4']
  }
];
