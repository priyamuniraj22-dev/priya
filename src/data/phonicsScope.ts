// Comprehensive Phonics Scope & Sequence Data Structure
export interface PhonicsLevel {
  id: string;
  name: string;
  description: string;
  targetAge: string;
  color: string;
  skills: string[];
  graphemes: Grapheme[];
  lessons: Lesson[];
}

export interface Grapheme {
  id: string;
  letters: string;
  exampleWords: string[];
  audioFile: string;
  videoFile?: string;
  mouthShapeImage?: string;
  type: 'basic' | 'digraph' | 'blend' | 'long-vowel' | 'vowel-team' | 'r-controlled' | 'advanced';
}

export interface Lesson {
  id: string;
  levelId: string;
  number: number;
  title: string;
  objective: string;
  duration: number; // in minutes
  components: LessonComponent[];
  activities: Activity[];
  games: Game[];
  assessment: Assessment;
  resources: Resource[];
}

export interface LessonComponent {
  id: string;
  type: 'review' | 'phonemic-awareness' | 'new-sound' | 'word-building' | 'reading-practice' | 'spelling' | 'high-frequency-words' | 'fluency';
  title: string;
  description: string;
  content: any; // Will be typed more specifically based on component type
}

export interface Activity {
  id: string;
  type: 'rhyming' | 'alliteration' | 'onset-rime' | 'segmentation' | 'blending' | 'deletion' | 'substitution' | 'other';
  title: string;
  description: string;
  instructions: string;
  audioFile?: string;
  videoFile?: string;
  interactive: boolean;
  feedback: boolean;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  type: 'sound-match' | 'word-builder' | 'blend-race' | 'missing-sound' | 'decode-challenge' | 'phoneme-pop' | 'silent-e' | 'r-controlled' | 'other';
  objective: string;
  instructions: string;
  mechanics: string;
  scoring: boolean;
  progressTracking: boolean;
  rewards: boolean;
  audioFiles: string[];
  videoFiles: string[];
}

export interface Assessment {
  id: string;
  type: 'formative' | 'summative';
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  passingScore: number;
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'drag-drop' | 'typing' | 'audio-recording';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioFile?: string;
  imageFile?: string;
}

export interface Resource {
  id: string;
  type: 'flashcard' | 'worksheet' | 'decodable' | 'printable';
  title: string;
  description: string;
  file: string;
}

// Complete Phonics Scope & Sequence
export const phonicsScope: PhonicsLevel[] = [
  {
    id: 'LEVEL_1',
    name: 'Basic Sounds',
    description: 'Introduce individual letters and their corresponding sounds',
    targetAge: '3-5',
    color: '#FFB703',
    skills: [
      'Letter recognition',
      'Phoneme identification',
      'Initial sound matching',
      'Simple CVC blending'
    ],
    graphemes: [
      { id: 'g_s', letters: 's', exampleWords: ['sun', 'six', 'sit'], audioFile: 'letter_s.mp3', type: 'basic' },
      { id: 'g_a', letters: 'a', exampleWords: ['apple', 'ant', 'alligator'], audioFile: 'letter_a.mp3', type: 'basic' },
      { id: 'g_t', letters: 't', exampleWords: ['top', 'ten', 'tap'], audioFile: 'letter_t.mp3', type: 'basic' },
      { id: 'g_p', letters: 'p', exampleWords: ['pig', 'pen', 'pot'], audioFile: 'letter_p.mp3', type: 'basic' },
      { id: 'g_i', letters: 'i', exampleWords: ['igloo', 'inch', 'insect'], audioFile: 'letter_i.mp3', type: 'basic' },
      { id: 'g_n', letters: 'n', exampleWords: ['net', 'nut', 'nest'], audioFile: 'letter_n.mp3', type: 'basic' },
      { id: 'g_m', letters: 'm', exampleWords: ['man', 'map', 'moon'], audioFile: 'letter_m.mp3', type: 'basic' },
      { id: 'g_d', letters: 'd', exampleWords: ['dog', 'duck', 'door'], audioFile: 'letter_d.mp3', type: 'basic' },
      { id: 'g_g', letters: 'g', exampleWords: ['go', 'get', 'girl'], audioFile: 'letter_g.mp3', type: 'basic' },
      { id: 'g_o', letters: 'o', exampleWords: ['ox', 'on', 'octopus'], audioFile: 'letter_o.mp3', type: 'basic' },
      { id: 'g_c', letters: 'c', exampleWords: ['cat', 'cup', 'cake'], audioFile: 'letter_c.mp3', type: 'basic' },
      { id: 'g_k', letters: 'k', exampleWords: ['kite', 'key', 'king'], audioFile: 'letter_k.mp3', type: 'basic' },
      { id: 'g_ck', letters: 'ck', exampleWords: ['duck', 'sock', 'lock'], audioFile: 'digraph_ck.mp3', type: 'digraph' },
      { id: 'g_e', letters: 'e', exampleWords: ['egg', 'elephant', 'eight'], audioFile: 'letter_e.mp3', type: 'basic' },
      { id: 'g_u', letters: 'u', exampleWords: ['umbrella', 'up', 'under'], audioFile: 'letter_u.mp3', type: 'basic' },
      { id: 'g_r', letters: 'r', exampleWords: ['rat', 'run', 'red'], audioFile: 'letter_r.mp3', type: 'basic' },
      { id: 'g_h', letters: 'h', exampleWords: ['hat', 'hen', 'hip'], audioFile: 'letter_h.mp3', type: 'basic' },
      { id: 'g_b', letters: 'b', exampleWords: ['bat', 'bug', 'box'], audioFile: 'letter_b.mp3', type: 'basic' },
      { id: 'g_f', letters: 'f', exampleWords: ['fan', 'fish', 'fun'], audioFile: 'letter_f.mp3', type: 'basic' },
      { id: 'g_ff', letters: 'ff', exampleWords: ['off', 'cliff', 'staff'], audioFile: 'digraph_ff.mp3', type: 'digraph' },
      { id: 'g_l', letters: 'l', exampleWords: ['leg', 'lip', 'lamp'], audioFile: 'letter_l.mp3', type: 'basic' },
      { id: 'g_ll', letters: 'll', exampleWords: ['ball', 'bell', 'fill'], audioFile: 'digraph_ll.mp3', type: 'digraph' },
      { id: 'g_ss', letters: 'ss', exampleWords: ['miss', 'class', 'grass'], audioFile: 'digraph_ss.mp3', type: 'digraph' }
    ],
    lessons: [
      {
        id: 'L1-1',
        levelId: 'LEVEL_1',
        number: 1,
        title: 'Letters s, a, t, p',
        objective: 'Recognize and produce the sounds for letters s, a, t, p',
        duration: 20,
        components: [
          {
            id: 'c1-review',
            type: 'review',
            title: 'Letter Flashcards',
            description: 'Review previously learned letters',
            content: {
              flashcards: ['a', 's', 't', 'p']
            }
          },
          {
            id: 'c1-phonemic',
            type: 'phonemic-awareness',
            title: 'Initial Sound Identification',
            description: 'Identify the initial sound in words',
            content: {
              activity: 'sound-identification',
              words: ['sun', 'apple', 'top', 'pig']
            }
          },
          {
            id: 'c1-new-sound',
            type: 'new-sound',
            title: 'Letter Sounds: s, a, t, p',
            description: 'Introduce the sounds for s, a, t, p',
            content: {
              graphemes: ['s', 'a', 't', 'p'],
              exampleWords: ['sun', 'apple', 'top', 'pig']
            }
          }
        ],
        activities: [
          {
            id: 'a1-rhyming',
            type: 'rhyming',
            title: 'Rhyming Words',
            description: 'Identify words that rhyme',
            instructions: 'Listen to the word and tap the picture that rhymes',
            interactive: true,
            feedback: true
          }
        ],
        games: [
          {
            id: 'g1-sound-match',
            name: 'Sound Match',
            description: 'Match sounds to letters',
            type: 'sound-match',
            objective: 'Match the correct letter to the played sound',
            instructions: 'Listen to the sound and tap the matching letter',
            mechanics: 'Audio prompt with visual choices',
            scoring: true,
            progressTracking: true,
            rewards: true,
            audioFiles: ['correct.mp3', 'incorrect.mp3'],
            videoFiles: []
          }
        ],
        assessment: {
          id: 'assess1',
          type: 'formative',
          title: 'Letter Sound Assessment',
          description: 'Assess recognition of s, a, t, p sounds',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'Which letter makes the /s/ sound?',
              options: ['s', 'a', 't', 'p'],
              correctAnswer: 's'
            }
          ],
          passingScore: 80
        },
        resources: [
          {
            id: 'res1',
            type: 'flashcard',
            title: 'Letter Flashcards',
            description: 'Flashcards for s, a, t, p',
            file: 'flashcards_satp.pdf'
          }
        ]
      }
    ]
  },
  {
    id: 'LEVEL_2',
    name: 'Digraphs',
    description: 'Introduce consonant digraphs that represent single sounds',
    targetAge: '5-6',
    color: '#00B4D8',
    skills: [
      'Digraph recognition',
      'Blending with digraphs',
      'Segmenting with digraphs'
    ],
    graphemes: [
      { id: 'g_sh', letters: 'sh', exampleWords: ['ship', 'shop', 'shoe'], audioFile: 'digraph_sh.mp3', type: 'digraph' },
      { id: 'g_ch', letters: 'ch', exampleWords: ['chip', 'chat', 'chin'], audioFile: 'digraph_ch.mp3', type: 'digraph' },
      { id: 'g_th', letters: 'th', exampleWords: ['thin', 'this', 'that'], audioFile: 'digraph_th.mp3', type: 'digraph' },
      { id: 'g_ph', letters: 'ph', exampleWords: ['phone', 'photo', 'elephant'], audioFile: 'digraph_ph.mp3', type: 'digraph' },
      { id: 'g_wh', letters: 'wh', exampleWords: ['what', 'when', 'why'], audioFile: 'digraph_wh.mp3', type: 'digraph' },
      { id: 'g_ng', letters: 'ng', exampleWords: ['sing', 'ring', 'wing'], audioFile: 'digraph_ng.mp3', type: 'digraph' }
    ],
    lessons: []
  },
  {
    id: 'LEVEL_3',
    name: 'Blends',
    description: 'Introduce consonant blends where each letter retains its sound',
    targetAge: '6-7',
    color: '#FF6363',
    skills: [
      'Blend recognition',
      'Blending initial blends',
      'Segmenting with blends'
    ],
    graphemes: [
      { id: 'g_bl', letters: 'bl', exampleWords: ['black', 'blue', 'block'], audioFile: 'blend_bl.mp3', type: 'blend' },
      { id: 'g_cl', letters: 'cl', exampleWords: ['clap', 'clip', 'clock'], audioFile: 'blend_cl.mp3', type: 'blend' },
      { id: 'g_fl', letters: 'fl', exampleWords: ['flag', 'flip', 'flood'], audioFile: 'blend_fl.mp3', type: 'blend' },
      { id: 'g_gl', letters: 'gl', exampleWords: ['glad', 'glove', 'glow'], audioFile: 'blend_gl.mp3', type: 'blend' },
      { id: 'g_pl', letters: 'pl', exampleWords: ['plan', 'play', 'please'], audioFile: 'blend_pl.mp3', type: 'blend' },
      { id: 'g_sl', letters: 'sl', exampleWords: ['slip', 'slow', 'sleep'], audioFile: 'blend_sl.mp3', type: 'blend' },
      { id: 'g_br', letters: 'br', exampleWords: ['brag', 'bread', 'bring'], audioFile: 'blend_br.mp3', type: 'blend' },
      { id: 'g_cr', letters: 'cr', exampleWords: ['crab', 'crib', 'crop'], audioFile: 'blend_cr.mp3', type: 'blend' },
      { id: 'g_dr', letters: 'dr', exampleWords: ['drag', 'drip', 'drop'], audioFile: 'blend_dr.mp3', type: 'blend' },
      { id: 'g_fr', letters: 'fr', exampleWords: ['frog', 'free', 'from'], audioFile: 'blend_fr.mp3', type: 'blend' },
      { id: 'g_gr', letters: 'gr', exampleWords: ['grab', 'grin', 'grow'], audioFile: 'blend_gr.mp3', type: 'blend' },
      { id: 'g_pr', letters: 'pr', exampleWords: ['pram', 'prize', 'pray'], audioFile: 'blend_pr.mp3', type: 'blend' },
      { id: 'g_tr', letters: 'tr', exampleWords: ['trap', 'trip', 'tree'], audioFile: 'blend_tr.mp3', type: 'blend' },
      { id: 'g_sc', letters: 'sc', exampleWords: ['scan', 'scar', 'scum'], audioFile: 'blend_sc.mp3', type: 'blend' },
      { id: 'g_sk', letters: 'sk', exampleWords: ['skate', 'skip', 'skin'], audioFile: 'blend_sk.mp3', type: 'blend' },
      { id: 'g_sm', letters: 'sm', exampleWords: ['smile', 'smell', 'smoke'], audioFile: 'blend_sm.mp3', type: 'blend' },
      { id: 'g_sn', letters: 'sn', exampleWords: ['snail', 'snake', 'snow'], audioFile: 'blend_sn.mp3', type: 'blend' },
      { id: 'g_sp', letters: 'sp', exampleWords: ['spin', 'spoon', 'spell'], audioFile: 'blend_sp.mp3', type: 'blend' },
      { id: 'g_st', letters: 'st', exampleWords: ['star', 'stop', 'stick'], audioFile: 'blend_st.mp3', type: 'blend' },
      { id: 'g_sw', letters: 'sw', exampleWords: ['swim', 'swan', 'swing'], audioFile: 'blend_sw.mp3', type: 'blend' }
    ],
    lessons: []
  },
  {
    id: 'LEVEL_4',
    name: 'Long Vowels - Magic E',
    description: 'Introduce the silent e pattern for long vowel sounds',
    targetAge: '6-7',
    color: '#8B5CF6',
    skills: [
      'Silent e recognition',
      'Magic e rule application',
      'Contrasting short and long vowel sounds'
    ],
    graphemes: [
      { id: 'g_a_e', letters: 'a_e', exampleWords: ['cake', 'make', 'name'], audioFile: 'magic_e_a.mp3', type: 'long-vowel' },
      { id: 'g_i_e', letters: 'i_e', exampleWords: ['bike', 'kite', 'five'], audioFile: 'magic_e_i.mp3', type: 'long-vowel' },
      { id: 'g_o_e', letters: 'o_e', exampleWords: ['home', 'rope', 'bone'], audioFile: 'magic_e_o.mp3', type: 'long-vowel' },
      { id: 'g_u_e', letters: 'u_e', exampleWords: ['cube', 'tube', 'cute'], audioFile: 'magic_e_u.mp3', type: 'long-vowel' },
      { id: 'g_e_e', letters: 'e_e', exampleWords: ['these', 'Pete', 'theme'], audioFile: 'magic_e_e.mp3', type: 'long-vowel' }
    ],
    lessons: []
  },
  {
    id: 'LEVEL_5',
    name: 'Vowel Teams',
    description: 'Introduce vowel teams that create single vowel sounds',
    targetAge: '7-8',
    color: '#10B981',
    skills: [
      'Vowel team recognition',
      'Blending with vowel teams',
      'Reading words with vowel teams'
    ],
    graphemes: [
      { id: 'g_ai', letters: 'ai', exampleWords: ['rain', 'tail', 'mail'], audioFile: 'vowel_team_ai.mp3', type: 'vowel-team' },
      { id: 'g_ay', letters: 'ay', exampleWords: ['day', 'play', 'say'], audioFile: 'vowel_team_ay.mp3', type: 'vowel-team' },
      { id: 'g_ee', letters: 'ee', exampleWords: ['see', 'bee', 'tree'], audioFile: 'vowel_team_ee.mp3', type: 'vowel-team' },
      { id: 'g_ea', letters: 'ea', exampleWords: ['sea', 'tea', 'meat'], audioFile: 'vowel_team_ea.mp3', type: 'vowel-team' },
      { id: 'g_oa', letters: 'oa', exampleWords: ['boat', 'coat', 'goat'], audioFile: 'vowel_team_oa.mp3', type: 'vowel-team' },
      { id: 'g_ow', letters: 'ow', exampleWords: ['cow', 'now', 'how'], audioFile: 'vowel_team_ow.mp3', type: 'vowel-team' },
      { id: 'g_igh', letters: 'igh', exampleWords: ['light', 'night', 'sight'], audioFile: 'vowel_team_igh.mp3', type: 'vowel-team' },
      { id: 'g_oi', letters: 'oi', exampleWords: ['coin', 'boil', 'soil'], audioFile: 'vowel_team_oi.mp3', type: 'vowel-team' },
      { id: 'g_oy', letters: 'oy', exampleWords: ['boy', 'toy', 'joy'], audioFile: 'vowel_team_oy.mp3', type: 'vowel-team' }
    ],
    lessons: []
  },
  {
    id: 'LEVEL_6',
    name: 'R-Controlled Vowels',
    description: 'Introduce r-controlled vowels where r affects the vowel sound',
    targetAge: '7-8',
    color: '#F59E0B',
    skills: [
      'R-controlled vowel recognition',
      'Blending with r-controlled vowels',
      'Reading words with r-controlled vowels'
    ],
    graphemes: [
      { id: 'g_ar', letters: 'ar', exampleWords: ['car', 'star', 'farm'], audioFile: 'r_controlled_ar.mp3', type: 'r-controlled' },
      { id: 'g_er', letters: 'er', exampleWords: ['her', 'term', 'fern'], audioFile: 'r_controlled_er.mp3', type: 'r-controlled' },
      { id: 'g_ir', letters: 'ir', exampleWords: ['bird', 'girl', 'first'], audioFile: 'r_controlled_ir.mp3', type: 'r-controlled' },
      { id: 'g_ur', letters: 'ur', exampleWords: ['fur', 'turn', 'burn'], audioFile: 'r_controlled_ur.mp3', type: 'r-controlled' },
      { id: 'g_or', letters: 'or', exampleWords: ['for', 'corn', 'fork'], audioFile: 'r_controlled_or.mp3', type: 'r-controlled' }
    ],
    lessons: []
  },
  {
    id: 'LEVEL_7',
    name: 'Advanced Concepts',
    description: 'Introduce advanced phonics concepts including soft c/g, syllable division, and affixes',
    targetAge: '8-10',
    color: '#EF4444',
    skills: [
      'Soft c and g recognition',
      'Syllable division',
      'Prefix and suffix identification',
      'Multisyllabic word decoding'
    ],
    graphemes: [
      { id: 'g_soft_c', letters: 'c', exampleWords: ['cent', 'city', 'circle'], audioFile: 'soft_c.mp3', type: 'advanced' },
      { id: 'g_soft_g', letters: 'g', exampleWords: ['gem', 'gym', 'giant'], audioFile: 'soft_g.mp3', type: 'advanced' },
      { id: 'g_consonant_le', letters: '-le', exampleWords: ['table', 'little', 'bubble'], audioFile: 'consonant_le.mp3', type: 'advanced' },
      { id: 'g_prefixes', letters: 'un-, re-, pre-', exampleWords: ['undo', 'redo', 'preview'], audioFile: 'prefixes.mp3', type: 'advanced' },
      { id: 'g_suffixes', letters: '-ed, -ing, -er, -est', exampleWords: ['walked', 'walking', 'walker', 'tallest'], audioFile: 'suffixes.mp3', type: 'advanced' }
    ],
    lessons: []
  }
];

// Phonics Rules Library
export const phonicsRules = [
  {
    id: 'rule1',
    name: 'Closed Syllable Rule',
    description: 'A syllable that has a vowel followed by one or more consonants is called a closed syllable. The vowel in a closed syllable is usually short.',
    exampleWords: ['cat', 'hot', 'six', 'up'],
    diagram: 'closed_syllable.png',
    audioExplanation: 'closed_syllable_rule.mp3',
    interactiveActivity: 'closed_syllable_activity'
  },
  {
    id: 'rule2',
    name: 'Open Syllable Rule',
    description: 'An open syllable ends with a vowel sound and the vowel is usually long.',
    exampleWords: ['go', 'me', 'hi', 'we'],
    diagram: 'open_syllable.png',
    audioExplanation: 'open_syllable_rule.mp3',
    interactiveActivity: 'open_syllable_activity'
  },
  {
    id: 'rule3',
    name: 'Magic E Rule',
    description: 'When a syllable ends in a silent e, the first vowel is usually long and the e is silent.',
    exampleWords: ['cake', 'home', 'kite', 'cube'],
    diagram: 'magic_e_rule.png',
    audioExplanation: 'magic_e_rule.mp3',
    interactiveActivity: 'magic_e_activity'
  },
  {
    id: 'rule4',
    name: 'Consonant Digraphs',
    description: 'Two consonants that come together and make one sound.',
    exampleWords: ['ship', 'chat', 'thin', 'phone'],
    diagram: 'consonant_digraphs.png',
    audioExplanation: 'consonant_digraphs_rule.mp3',
    interactiveActivity: 'consonant_digraphs_activity'
  },
  {
    id: 'rule5',
    name: 'Blends',
    description: 'Two or three consonants that come together but each retains its own sound.',
    exampleWords: ['black', 'grab', 'split'],
    diagram: 'blends_rule.png',
    audioExplanation: 'blends_rule.mp3',
    interactiveActivity: 'blends_activity'
  },
  {
    id: 'rule6',
    name: 'Vowel Teams',
    description: 'Two or more vowels that come together to make a single sound.',
    exampleWords: ['rain', 'see', 'boat', 'light'],
    diagram: 'vowel_teams.png',
    audioExplanation: 'vowel_teams_rule.mp3',
    interactiveActivity: 'vowel_teams_activity'
  },
  {
    id: 'rule7',
    name: 'R-Controlled Vowels',
    description: 'When r follows a vowel, it controls the vowel sound.',
    exampleWords: ['car', 'her', 'bird', 'for'],
    diagram: 'r_controlled_vowels.png',
    audioExplanation: 'r_controlled_vowels_rule.mp3',
    interactiveActivity: 'r_controlled_vowels_activity'
  },
  {
    id: 'rule8',
    name: 'Consonant-le Rule',
    description: 'In a word that ends in -tle, -ple, -cle, -gle, or -ble, the e is usually silent and the vowel before the consonant is long.',
    exampleWords: ['table', 'simple', 'circle', 'jungle', 'noble'],
    diagram: 'consonant_le_rule.png',
    audioExplanation: 'consonant_le_rule.mp3',
    interactiveActivity: 'consonant_le_activity'
  },
  {
    id: 'rule9',
    name: 'Soft C & Soft G Rules',
    description: 'C and G can make a "soft" sound when followed by e, i, or y.',
    exampleWords: ['cent', 'city', 'gem', 'gym'],
    diagram: 'soft_c_g_rule.png',
    audioExplanation: 'soft_c_g_rule.mp3',
    interactiveActivity: 'soft_c_g_activity'
  },
  {
    id: 'rule10',
    name: 'Syllable Division Rules',
    description: 'Rules for dividing words into syllables to make them easier to read.',
    exampleWords: ['wa-ter', 'hap-py', 'com-pute-r'],
    diagram: 'syllable_division.png',
    audioExplanation: 'syllable_division_rule.mp3',
    interactiveActivity: 'syllable_division_activity'
  }
];