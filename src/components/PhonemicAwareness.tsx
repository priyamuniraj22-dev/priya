import { useState } from 'react';
import { Volume2, CheckCircle, XCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { playAudio } from '../utils/mediaPlayer';

interface Activity {
  id: string;
  type: 'rhyming' | 'alliteration' | 'onset-rime' | 'segmentation' | 'blending' | 'deletion' | 'substitution';
  title: string;
  description: string;
  instructions: string;
  examples: Example[];
  audioFile?: string;
}

interface Example {
  id: string;
  prompt: string;
  options: Option[];
  correctAnswer: string;
  audioFile?: string;
}

interface Option {
  id: string;
  label: string;
  value: string;
  audioFile?: string;
}

const phonemicActivities: Activity[] = [
  {
    id: 'rhyming-1',
    type: 'rhyming',
    title: 'Rhyming Words',
    description: 'Identify words that rhyme',
    instructions: 'Listen to the word and select the picture that rhymes',
    examples: [
      {
        id: 'rhyme-ex1',
        prompt: 'Which word rhymes with "cat"?',
        options: [
          { id: 'opt1', label: 'bat', value: 'bat', audioFile: 'word_bat.mp3' },
          { id: 'opt2', label: 'dog', value: 'dog', audioFile: 'word_dog.mp3' },
          { id: 'opt3', label: 'fish', value: 'fish', audioFile: 'word_fish.mp3' }
        ],
        correctAnswer: 'bat',
        audioFile: 'word_cat.mp3'
      }
    ]
  },
  {
    id: 'alliteration-1',
    type: 'alliteration',
    title: 'Alliteration',
    description: 'Identify words that begin with the same sound',
    instructions: 'Listen to the words and select the group that begins with the same sound',
    examples: [
      {
        id: 'allit-ex1',
        prompt: 'Which group of words all begin with the same sound?',
        options: [
          { id: 'opt1', label: 'Big bear, big boat', value: 'big', audioFile: 'phrase_big.mp3' },
          { id: 'opt2', label: 'Small snake, big snake', value: 'mixed', audioFile: 'phrase_mixed.mp3' },
          { id: 'opt3', label: 'Red rose, blue rose', value: 'color', audioFile: 'phrase_color.mp3' }
        ],
        correctAnswer: 'big',
        audioFile: 'instruction_alliteration.mp3'
      }
    ]
  },
  {
    id: 'onset-rime-1',
    type: 'onset-rime',
    title: 'Onset and Rime',
    description: 'Blend onset and rime to form words',
    instructions: 'Listen to the sounds and blend them to make a word',
    examples: [
      {
        id: 'onset-ex1',
        prompt: 'What word do these sounds make?',
        options: [
          { id: 'opt1', label: '/c/ /at/', value: 'cat', audioFile: 'blend_cat.mp3' },
          { id: 'opt2', label: '/b/ /at/', value: 'bat', audioFile: 'blend_bat.mp3' },
          { id: 'opt3', label: '/s/ /at/', value: 'sat', audioFile: 'blend_sat.mp3' }
        ],
        correctAnswer: 'cat',
        audioFile: 'sounds_c_at.mp3'
      }
    ]
  },
  {
    id: 'segmentation-1',
    type: 'segmentation',
    title: 'Phoneme Segmentation',
    description: 'Break words into individual sounds',
    instructions: 'Listen to the word and identify how many sounds it has',
    examples: [
      {
        id: 'seg-ex1',
        prompt: 'How many sounds are in the word "dog"?',
        options: [
          { id: 'opt1', label: '2 sounds', value: '2', audioFile: 'number_2.mp3' },
          { id: 'opt2', label: '3 sounds', value: '3', audioFile: 'number_3.mp3' },
          { id: 'opt3', label: '4 sounds', value: '4', audioFile: 'number_4.mp3' }
        ],
        correctAnswer: '3',
        audioFile: 'word_dog.mp3'
      }
    ]
  },
  {
    id: 'blending-1',
    type: 'blending',
    title: 'Phoneme Blending',
    description: 'Blend individual sounds to form words',
    instructions: 'Listen to the sounds and blend them to make a word',
    examples: [
      {
        id: 'blend-ex1',
        prompt: 'What word do these sounds make?',
        options: [
          { id: 'opt1', label: '/d/ /o/ /g/', value: 'dog', audioFile: 'word_dog.mp3' },
          { id: 'opt2', label: '/c/ /a/ /t/', value: 'cat', audioFile: 'word_cat.mp3' },
          { id: 'opt3', label: '/b/ /i/ /g/', value: 'big', audioFile: 'word_big.mp3' }
        ],
        correctAnswer: 'dog',
        audioFile: 'sounds_d_o_g.mp3'
      }
    ]
  },
  {
    id: 'deletion-1',
    type: 'deletion',
    title: 'Phoneme Deletion',
    description: 'Remove sounds from words',
    instructions: 'Listen to the word, then remove the specified sound',
    examples: [
      {
        id: 'del-ex1',
        prompt: 'Say "cat". Now say it without the /k/ sound.',
        options: [
          { id: 'opt1', label: 'at', value: 'at', audioFile: 'word_at.mp3' },
          { id: 'opt2', label: 'bat', value: 'bat', audioFile: 'word_bat.mp3' },
          { id: 'opt3', label: 'cot', value: 'cot', audioFile: 'word_cot.mp3' }
        ],
        correctAnswer: 'at',
        audioFile: 'word_cat.mp3'
      }
    ]
  },
  {
    id: 'substitution-1',
    type: 'substitution',
    title: 'Phoneme Substitution',
    description: 'Replace sounds in words',
    instructions: 'Listen to the word, then replace one sound with another',
    examples: [
      {
        id: 'sub-ex1',
        prompt: 'Say "cat". Now change the /k/ sound to /b/.',
        options: [
          { id: 'opt1', label: 'bat', value: 'bat', audioFile: 'word_bat.mp3' },
          { id: 'opt2', label: 'cot', value: 'cot', audioFile: 'word_cot.mp3' },
          { id: 'opt3', label: 'cut', value: 'cut', audioFile: 'word_cut.mp3' }
        ],
        correctAnswer: 'bat',
        audioFile: 'word_cat.mp3'
      }
    ]
  }
];

export default function PhonemicAwareness() {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentActivity = phonemicActivities[currentActivityIndex];
  const currentExample = currentActivity.examples[0]; // For simplicity, using first example

  const handlePlayAudio = (audioFile?: string) => {
    if (audioFile) {
      setIsPlaying(true);
      playAudio(audioFile);
      // Simulate audio ending after 2 seconds
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  const handleSelectOption = (optionValue: string) => {
    if (feedback) return; // Prevent changing answer after feedback is shown
    
    setSelectedOption(optionValue);
    
    const isCorrect = optionValue === currentExample.correctAnswer;
    setFeedback({
      isCorrect,
      message: isCorrect 
        ? 'Great job! That\'s correct!' 
        : `Almost! The correct answer is "${currentExample.correctAnswer}".`
    });
    
    if (isCorrect) {
      setScore(score + 10);
    }
    
    // Mark activity as completed
    if (!completedActivities.includes(currentActivityIndex)) {
      setCompletedActivities([...completedActivities, currentActivityIndex]);
    }
  };

  const handleNextActivity = () => {
    if (currentActivityIndex < phonemicActivities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  const handlePreviousActivity = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setCompletedActivities([]);
  };

  const isActivityCompleted = completedActivities.includes(currentActivityIndex);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Phonemic Awareness</h1>
              <p className="text-gray-600 mt-2">{currentActivity.title}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">
                Score: {score}
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="mb-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-start gap-4">
              <button
                onClick={() => handlePlayAudio(currentActivity.audioFile || currentExample.audioFile)}
                className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{currentActivity.title}</h2>
                <p className="text-gray-700">{currentActivity.instructions}</p>
              </div>
            </div>
          </div>

          {feedback && (
            <div className={`mb-6 p-4 rounded-xl text-white text-center font-semibold ${
              feedback.isCorrect ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <div className="flex items-center justify-center gap-2">
                {feedback.isCorrect ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span>{feedback.message}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {currentExample.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.value)}
                disabled={!!feedback}
                className={`p-6 rounded-2xl border-2 text-center font-bold text-lg transition-all ${
                  selectedOption === option.value
                    ? feedback?.isCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${
                  feedback && option.value === currentExample.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : ''
                }`}
              >
                {option.label}
                {option.audioFile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(option.audioFile);
                    }}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <Volume2 className="w-5 h-5 inline" />
                  </button>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={handlePreviousActivity}
              disabled={currentActivityIndex === 0}
              className={`px-6 py-3 rounded-full font-bold ${
                currentActivityIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {phonemicActivities.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentActivityIndex
                      ? 'bg-blue-500'
                      : completedActivities.includes(index)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {currentActivityIndex < phonemicActivities.length - 1 ? (
              <button
                onClick={handleNextActivity}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-colors"
              >
                Next Activity
              </button>
            ) : (
              <button
                onClick={() => alert('Congratulations! You completed all phonemic awareness activities!')}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-colors"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}