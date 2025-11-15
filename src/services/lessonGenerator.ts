import { 
  Lesson, 
  Activity, 
  Assessment, 
  Worksheet, 
  DecodableBook,
  Video
} from '../types/database';
import { phonicsScope } from '../data/phonicsScope';
import { Class, Game } from '../types/course';

// Define templates for different lesson components
const lessonComponentTemplates = {
  review: {
    title: 'Review',
    description: 'Review previously learned material',
    activities: [
      { type: 'flashcards', description: 'Review letter flashcards' },
      { type: 'sounds-drill', description: 'Fast sound drill' },
      { type: 'words-review', description: 'Previous words review' }
    ]
  },
  phonemicAwareness: {
    title: 'Phonemic Awareness',
    description: 'Develop phonemic awareness skills',
    activities: [
      { type: 'oral-blending', description: 'Oral blending game' },
      { type: 'segmenting', description: 'Phoneme segmenting practice' },
      { type: 'rhyming', description: 'Rhyming words activity' }
    ]
  },
  newSound: {
    title: 'New Sound Introduction',
    description: 'Introduce new grapheme-phoneme correspondences',
    activities: [
      { type: 'sound-pronunciation', description: 'Sound pronunciation with button' },
      { type: 'mouth-shape', description: 'Animation of mouth shape' },
      { type: 'uppercase-lowercase', description: 'Uppercase + lowercase display' },
      { type: 'example-words', description: 'Example words with audio' }
    ]
  },
  wordBuilding: {
    title: 'Word Building',
    description: 'Practice building words with letter tiles',
    activities: [
      { type: 'drag-tiles', description: 'Drag-and-drop letter tiles' },
      { type: 'blending-practice', description: 'Blending practice' },
      { type: 'word-chains', description: 'Word chains (cat → bat → bag)' }
    ]
  },
  readingPractice: {
    title: 'Reading Practice',
    description: 'Practice reading words and sentences',
    activities: [
      { type: 'word-lists', description: 'Word lists' },
      { type: 'pseudo-words', description: 'Pseudo-words' },
      { type: 'sentences', description: 'Sentences' },
      { type: 'decodable-stories', description: 'Decodable stories aligned to the skill' }
    ]
  },
  spelling: {
    title: 'Spelling / Encoding',
    description: 'Practice spelling words',
    activities: [
      { type: 'tap-segment', description: 'Tap to segment (sound boxes)' },
      { type: 'write-letters', description: 'Write or select letters to spell words' }
    ]
  },
  highFrequencyWords: {
    title: 'High-Frequency Words',
    description: 'Learn irregular/tricky words',
    activities: [
      { type: 'irregular-words', description: 'Irregular/tricky words' },
      { type: 'orthographic-mapping', description: 'Teach using orthographic mapping' }
    ]
  },
  fluency: {
    title: 'Fluency Practice',
    description: 'Practice reading fluency',
    activities: [
      { type: 'timed-reading', description: 'Timed reading' },
      { type: 're-read-sentences', description: 'Re-read decodable sentences' },
      { type: 'fluency-score', description: 'Auto-generated fluency score' }
    ]
  }
};

// Define game templates for different skills
const gameTemplates: Game[] = [
  {
    id: 'sound-match-template',
    name: 'Sound Match Game',
    goal: 'Match sound to letter',
    mechanic: 'Audio matching with visual choices',
    icon: 'Volume2',
    audioFiles: ['correct.mp3', 'incorrect.mp3'],
    videoFiles: []
  },
  {
    id: 'word-builder-template',
    name: 'Word Builder Drag Game',
    goal: 'Build words with letter tiles',
    mechanic: 'Drag-and-drop letter tiles',
    icon: 'Box',
    audioFiles: ['word_complete.mp3', 'word_incorrect.mp3'],
    videoFiles: ['tile_placement.mp4']
  },
  {
    id: 'blend-race-template',
    name: 'Blend Race Game',
    goal: 'Blend sounds quickly',
    mechanic: 'Timed blending challenge',
    icon: 'Zap',
    audioFiles: ['blend_correct.mp3', 'blend_incorrect.mp3'],
    videoFiles: ['blend_race.mp4']
  },
  {
    id: 'missing-sound-template',
    name: 'Missing Sound Fill-in',
    goal: 'Identify missing sounds in words',
    mechanic: 'Fill in the blank with correct sound',
    icon: 'HelpCircle',
    audioFiles: ['missing_correct.mp3', 'missing_incorrect.mp3'],
    videoFiles: ['missing_sound_demo.mp4']
  },
  {
    id: 'decode-challenge-template',
    name: 'Decode the Word Challenge',
    goal: 'Decode complex words',
    mechanic: 'Multi-step decoding challenge',
    icon: 'Lock',
    audioFiles: ['decode_success.mp3', 'decode_fail.mp3'],
    videoFiles: ['decode_animation.mp4']
  },
  {
    id: 'phoneme-pop-template',
    name: 'Phoneme Pop Balloons',
    goal: 'Pop balloons with target sounds',
    mechanic: 'Pop balloons with correct phonemes',
    icon: 'Circle',
    audioFiles: ['pop_correct.mp3', 'pop_incorrect.mp3'],
    videoFiles: ['balloon_pop.mp4']
  },
  {
    id: 'silent-e-template',
    name: 'Silent e Magic Wand Game',
    goal: 'Apply silent e rule',
    mechanic: 'Magic wand transforms words',
    icon: 'Wand2',
    audioFiles: ['magic_transform.mp3', 'magic_fail.mp3'],
    videoFiles: ['magic_wand.mp4']
  },
  {
    id: 'r-controlled-template',
    name: 'R-controlled Rollercoaster Game',
    goal: 'Practice r-controlled vowels',
    mechanic: 'Rollercoaster tracks with r-controlled words',
    icon: 'Train',
    audioFiles: ['rollercoaster_correct.mp3', 'rollercoaster_incorrect.mp3'],
    videoFiles: ['rollercoaster_ride.mp4']
  }
];

// Define assessment templates
const assessmentTemplates = [
  {
    id: 'multiple-choice-template',
    type: 'multiple-choice',
    description: 'Select the correct answer from options'
  },
  {
    id: 'drag-drop-template',
    type: 'drag-drop',
    description: 'Drag items to correct locations'
  },
  {
    id: 'typing-template',
    type: 'typing',
    description: 'Type the correct answer'
  },
  {
    id: 'audio-recording-template',
    type: 'audio-recording',
    description: 'Record your response'
  }
];

// Define worksheet templates
const worksheetTemplates = [
  {
    id: 'letter-tracing-template',
    title: 'Letter Tracing Worksheet',
    description: 'Trace letters to practice formation'
  },
  {
    id: 'word-building-template',
    title: 'Word Building Worksheet',
    description: 'Build words using letter tiles'
  },
  {
    id: 'sentence-writing-template',
    title: 'Sentence Writing Worksheet',
    description: 'Write sentences using target words'
  },
  {
    id: 'reading-comprehension-template',
    title: 'Reading Comprehension Worksheet',
    description: 'Read and answer questions about passages'
  }
];

// Define decodable book templates
const bookTemplates = [
  {
    id: 'cvc-book-template',
    title: 'CVC Words Adventure',
    description: 'Story using CVC words',
    pages: 10
  },
  {
    id: 'digraphs-book-template',
    title: 'Digraphs Detective',
    description: 'Mystery story with digraphs',
    pages: 12
  },
  {
    id: 'blends-book-template',
    title: 'Blends Explorer',
    description: 'Adventure story with blends',
    pages: 15
  },
  {
    id: 'magic-e-book-template',
    title: 'Magic E Kingdom',
    description: 'Fantasy story with silent e words',
    pages: 14
  }
];

// Define video templates
const videoTemplates: Omit<Video, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Alphabet Sounds',
    description: 'Learn the sounds of each letter',
    url: '/video/alphabet_sounds.mp4',
    type: 'local',
    duration: '5:30',
    level_id: null,
    category: 'alphabet'
  },
  {
    title: 'Mouth Formation',
    description: 'See how to form each sound with your mouth',
    url: '/video/mouth_formation.mp4',
    type: 'local',
    duration: '4:15',
    level_id: null,
    category: 'phonics'
  },
  {
    title: 'Digraphs Explained',
    description: 'Learn about consonant digraphs',
    url: 'https://www.youtube.com/watch?v=digraphs',
    type: 'youtube',
    duration: '6:20',
    level_id: null,
    category: 'digraphs'
  },
  {
    title: 'Vowel Teams',
    description: 'Understanding vowel teams',
    url: 'https://www.youtube.com/watch?v=vowel_teams',
    type: 'youtube',
    duration: '7:10',
    level_id: null,
    category: 'vowels'
  },
  {
    title: 'Magic E Rule',
    description: 'How silent e changes vowel sounds',
    url: '/video/magic_e.mp4',
    type: 'local',
    duration: '5:45',
    level_id: null,
    category: 'silent-e'
  },
  {
    title: 'R-Controlled Vowels',
    description: 'Learn about r-controlled vowels',
    url: 'https://www.youtube.com/watch?v=r_controlled',
    type: 'youtube',
    duration: '6:50',
    level_id: null,
    category: 'r-controlled'
  }
];

// Generate lessons for a level
export const generateLessonsForLevel = (levelId: string): Class[] => {
  const level = phonicsScope.find(l => l.id === levelId);
  if (!level) {
    throw new Error(`Level ${levelId} not found in phonics scope`);
  }

  return level.lessons.map((lesson, index) => {
    // Generate activities based on lesson components
    const activities = lesson.components.map(component => ({
      type: component.type,
      description: component.description,
      audioFile: `${component.type}_${lesson.id}_${index + 1}.mp3`,
      videoFile: `${component.type}_${lesson.id}_${index + 1}.mp4`
    }));

    // Generate games based on lesson focus
    const games = generateGamesForLesson(lesson.id, levelId);

    return {
      id: `${levelId}-L${index + 1}`,
      levelId: levelId,
      number: index + 1,
      title: lesson.title,
      duration: lesson.duration,
      objective: lesson.objective,
      activities,
      games,
      audioFiles: [`lesson_${lesson.id}_intro.mp3`, `lesson_${lesson.id}_outro.mp3`],
      videoFiles: [`lesson_${lesson.id}_intro.mp4`]
    };
  });
};

// Generate games for a lesson
const generateGamesForLesson = (lessonId: string, levelId: string): Game[] => {
  // For simplicity, we'll randomly select 2 games for each lesson
  const shuffledGames = [...gameTemplates].sort(() => Math.random() - 0.5);
  return shuffledGames.slice(0, 2).map((game, index) => ({
    ...game,
    id: `${lessonId}-G${index + 1}`,
    name: `${game.name} - ${lessonId}`
  }));
};

// Generate assessments for a lesson
export const generateAssessmentsForLesson = (lessonId: string): Assessment[] => {
  // For simplicity, we'll create one assessment per lesson
  const template = assessmentTemplates[0]; // Use multiple choice as default
  
  return [{
    id: `${lessonId}-AS1`,
    lesson_id: lessonId,
    title: `Assessment for ${lessonId}`,
    description: 'Test your knowledge of this lesson',
    passing_score: 80,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }];
};

// Generate worksheets for a lesson
export const generateWorksheetsForLesson = (lessonId: string, levelId: string): Worksheet[] => {
  // For simplicity, we'll create one worksheet per lesson
  const template = worksheetTemplates[0]; // Use letter tracing as default
  
  return [{
    id: `${lessonId}-WS1`,
    title: `${template.title} - ${lessonId}`,
    description: template.description,
    file_url: `/worksheets/${lessonId}_worksheet.pdf`,
    level_id: levelId,
    lesson_id: lessonId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }];
};

// Generate decodable books for a lesson
export const generateBooksForLesson = (lessonId: string, levelId: string): DecodableBook[] => {
  // For simplicity, we'll create one book per lesson
  const template = bookTemplates[0]; // Use CVC book as default
  
  return [{
    id: `${lessonId}-BK1`,
    title: `${template.title} - ${lessonId}`,
    description: template.description,
    file_url: `/books/${lessonId}_book.pdf`,
    level_id: levelId,
    lesson_id: lessonId,
    pages: template.pages,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }];
};

// Generate videos for a lesson
export const generateVideosForLesson = (lessonId: string, levelId: string): Video[] => {
  // For simplicity, we'll create one video per lesson
  const template = videoTemplates[0]; // Use alphabet sounds as default
  
  return [{
    id: `${lessonId}-VD1`,
    title: `${template.title} - ${lessonId}`,
    description: template.description,
    url: template.url,
    type: template.type,
    duration: template.duration,
    level_id: levelId,
    category: template.category,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }];
};

// Generate all content for a level
export const generateAllContentForLevel = (levelId: string) => {
  const lessons = generateLessonsForLevel(levelId);
  const assessments: Assessment[] = [];
  const worksheets: Worksheet[] = [];
  const books: DecodableBook[] = [];
  const videos: Video[] = [];

  lessons.forEach(lesson => {
    assessments.push(...generateAssessmentsForLesson(lesson.id));
    worksheets.push(...generateWorksheetsForLesson(lesson.id, levelId));
    books.push(...generateBooksForLesson(lesson.id, levelId));
    videos.push(...generateVideosForLesson(lesson.id, levelId));
  });

  return {
    lessons,
    assessments,
    worksheets,
    books,
    videos
  };
};

// Generate a complete curriculum
export const generateCompleteCurriculum = () => {
  const curriculum: {
    lessons: Class[];
    assessments: Assessment[];
    worksheets: Worksheet[];
    books: DecodableBook[];
    videos: Video[];
  } = {
    lessons: [],
    assessments: [],
    worksheets: [],
    books: [],
    videos: []
  };

  phonicsScope.forEach(level => {
    const { lessons, assessments, worksheets, books, videos } = generateAllContentForLevel(level.id);
    curriculum.lessons.push(...lessons);
    curriculum.assessments.push(...assessments);
    curriculum.worksheets.push(...worksheets);
    curriculum.books.push(...books);
    curriculum.videos.push(...videos);
  });

  return curriculum;
};