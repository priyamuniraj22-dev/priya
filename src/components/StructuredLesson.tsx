import { useState } from 'react';
import { Play, Volume2, BookOpen, Trophy, Star, CheckCircle, VolumeX, Eye, PenTool, BookCheck, Zap, Users } from 'lucide-react';
import { playAudio } from '../utils/mediaPlayer';
import { Class } from '../types/course';

interface StructuredLessonProps {
  lesson: Class;
  onComplete: () => void;
}

export default function StructuredLesson({ lesson, onComplete }: StructuredLessonProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lesson structure steps
  const lessonSteps = [
    {
      id: 'review',
      title: 'Review',
      icon: BookOpen,
      description: 'Review previous learning',
      color: 'bg-blue-500'
    },
    {
      id: 'phonemic-awareness',
      title: 'Phonemic Awareness',
      icon: Ear,
      description: 'Oral blending/segmenting game',
      color: 'bg-purple-500'
    },
    {
      id: 'new-sound',
      title: 'New Sound',
      icon: Volume2,
      description: 'Introduce new grapheme',
      color: 'bg-green-500'
    },
    {
      id: 'word-building',
      title: 'Word Building',
      icon: PenTool,
      description: 'Drag-and-drop letter tiles',
      color: 'bg-yellow-500'
    },
    {
      id: 'reading-practice',
      title: 'Reading Practice',
      icon: BookCheck,
      description: 'Word lists and sentences',
      color: 'bg-red-500'
    },
    {
      id: 'spelling',
      title: 'Spelling',
      icon: PenTool,
      description: 'Tap to segment and spell',
      color: 'bg-indigo-500'
    },
    {
      id: 'high-frequency-words',
      title: 'High-Frequency Words',
      icon: Zap,
      description: 'Irregular/tricky words',
      color: 'bg-pink-500'
    },
    {
      id: 'fluency',
      title: 'Fluency Practice',
      icon: Users,
      description: 'Timed reading practice',
      color: 'bg-teal-500'
    }
  ];

  const currentStepData = lessonSteps[currentStep];

  const handlePlayAudio = (audioFile?: string) => {
    if (audioFile) {
      setIsPlaying(true);
      playAudio(audioFile);
      // Simulate audio ending
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  const handleCompleteStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lesson complete
      onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLessonComplete = completedSteps.length === lessonSteps.length;

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Letter Flashcards</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {['a', 'b', 'c', 'd', 'e', 'f'].map((letter) => (
                  <div 
                    key={letter} 
                    className="bg-blue-100 rounded-xl p-4 text-center border-2 border-blue-200"
                  >
                    <div className="text-3xl font-bold text-blue-800 uppercase">{letter}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Previous Words Review</h3>
              <div className="flex flex-wrap gap-3">
                {['cat', 'dog', 'sun', 'hat'].map((word) => (
                  <button
                    key={word}
                    onClick={() => handlePlayAudio(`word_${word}.mp3`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors"
                  >
                    <span>{word}</span>
                    <Volume2 className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'phonemic-awareness':
        return (
          <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Blending Game</h3>
            <div className="flex flex-col items-center">
              <div className="mb-6 p-6 bg-purple-100 rounded-full">
                <Ear className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-gray-700 text-center mb-6">
                Listen to the sounds and blend them to make a word
              </p>
              <button
                onClick={() => handlePlayAudio('sounds_d_o_g.mp3')}
                className="bg-purple-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-purple-600 transition-colors"
              >
                <Play className="w-5 h-5" />
                Play Sounds
              </button>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {['dog', 'log', 'fog'].map((word) => (
                  <button
                    key={word}
                    className="bg-purple-100 text-purple-800 px-4 py-3 rounded-xl font-bold hover:bg-purple-200 transition-colors"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'new-sound':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">New Sound: /s/</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="bg-green-100 rounded-xl p-6 text-center mb-4">
                    <div className="text-6xl font-bold text-green-800 mb-2">Ss</div>
                    <button
                      onClick={() => handlePlayAudio('letter_s.mp3')}
                      className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 mx-auto hover:bg-green-600 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      Pronounce
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-3">Example Words</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['sun', 'six', 'sit'].map((word) => (
                      <button
                        key={word}
                        onClick={() => handlePlayAudio(`word_${word}.mp3`)}
                        className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>{word}</span>
                        <Volume2 className="w-4 h-4 text-green-600" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mouth Shape</h3>
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center mb-4">
                  <span className="text-gray-500">Mouth shape image</span>
                </div>
                <button
                  onClick={() => handlePlayAudio('mouth_shape_s.mp3')}
                  className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  See Animation
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'word-building':
        return (
          <div className="bg-white rounded-xl p-6 border-2 border-yellow-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Word Builder</h3>
            <div className="flex flex-col items-center">
              <div className="mb-8">
                <div className="text-2xl font-bold text-gray-900 mb-2">Build the word: CAT</div>
                <div className="flex gap-2 mb-8">
                  <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-300 rounded-xl flex items-center justify-center text-2xl font-bold">
                    C
                  </div>
                  <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-300 rounded-xl flex items-center justify-center text-2xl font-bold">
                    A
                  </div>
                  <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-300 rounded-xl flex items-center justify-center text-2xl font-bold">
                    T
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-8">
                {['C', 'A', 'T', 'B', 'O', 'G', 'D', 'E'].map((letter) => (
                  <div 
                    key={letter}
                    className="w-12 h-12 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-xl font-bold cursor-pointer hover:bg-yellow-600 transition-colors"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handlePlayAudio('word_cat.mp3')}
                className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-600 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                Check Word
              </button>
            </div>
          </div>
        );
      
      case 'reading-practice':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-red-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Word List</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['cat', 'bat', 'hat', 'mat', 'sat', 'rat'].map((word) => (
                  <button
                    key={word}
                    onClick={() => handlePlayAudio(`word_${word}.mp3`)}
                    className="bg-red-100 text-red-800 px-4 py-3 rounded-lg text-center hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="font-bold">{word}</span>
                    <Volume2 className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-2 border-red-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sentence Reading</h3>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-800 text-lg mb-4">
                  The <span className="font-bold">cat</span> sat on the <span className="font-bold">mat</span>.
                </p>
                <button
                  onClick={() => handlePlayAudio('sentence_cat_sat.mp3')}
                  className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Read Aloud
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'spelling':
        return (
          <div className="bg-white rounded-xl p-6 border-2 border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Spelling Practice</h3>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-900 mb-6">Spell the word: DOG</div>
              
              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((box) => (
                  <div 
                    key={box}
                    className="w-16 h-16 bg-indigo-100 border-2 border-indigo-300 rounded-xl flex items-center justify-center text-2xl font-bold"
                  >
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-5 gap-3 mb-6">
                {['D', 'O', 'G', 'A', 'T'].map((letter) => (
                  <div 
                    key={letter}
                    className="w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center text-xl font-bold cursor-pointer hover:bg-indigo-600 transition-colors"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handlePlayAudio('word_dog.mp3')}
                className="bg-indigo-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                Check Spelling
              </button>
            </div>
          </div>
        );
      
      case 'high-frequency-words':
        return (
          <div className="bg-white rounded-xl p-6 border-2 border-pink-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">High-Frequency Words</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['the', 'and', 'is', 'it', 'you', 'said'].map((word) => (
                <div 
                  key={word}
                  className="bg-pink-100 border-2 border-pink-200 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-pink-800 mb-2">{word}</div>
                  <button
                    onClick={() => handlePlayAudio(`word_${word}.mp3`)}
                    className="text-pink-600 hover:text-pink-800 flex items-center justify-center gap-1 mx-auto"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">Pronounce</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'fluency':
        return (
          <div className="bg-white rounded-xl p-6 border-2 border-teal-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fluency Practice</h3>
            <div className="bg-teal-50 p-6 rounded-xl mb-6">
              <p className="text-gray-800 text-lg mb-4 text-center">
                The big cat sat on the soft mat.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handlePlayAudio('sentence_big_cat.mp3')}
                  className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-teal-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Model Reading
                </button>
                <button className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-teal-600 transition-colors">
                  <Users className="w-4 h-4" />
                  Record Yourself
                </button>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Accuracy: 95%</span>
                <span>Speed: 45 WPM</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: '95%' }}
                ></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
            <p className="text-gray-700">Lesson component content</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          {/* Lesson Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600 mt-2">{lesson.objective}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Star className="w-4 h-4" />
                {completedSteps.length}/{lessonSteps.length} Complete
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedSteps.length / lessonSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.length / lessonSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Lesson Steps Navigation */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
            {lessonSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(index);
              const isCurrent = index === currentStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[80px] transition-all ${
                    isCurrent 
                      ? 'bg-blue-100 border-2 border-blue-300' 
                      : isCompleted 
                        ? 'bg-green-100 border-2 border-green-300' 
                        : 'bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted ? 'bg-green-500' : step.color
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-center text-gray-700">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Step Content */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStepData.color}`}>
                {currentStepData.icon && <currentStepData.icon className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
                <p className="text-gray-600">{currentStepData.description}</p>
              </div>
            </div>
            
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <VolumeX className="w-4 h-4" />
              Previous
            </button>
            
            <button
              onClick={handleCompleteStep}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-colors flex items-center gap-2"
            >
              {currentStep < lessonSteps.length - 1 ? (
                <>
                  Complete & Continue
                  <CheckCircle className="w-5 h-5" />
                </>
              ) : (
                <>
                  Finish Lesson
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Completion Message */}
          {isLessonComplete && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl text-white text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
              <p className="mb-4">Great job completing this lesson. You're making excellent progress!</p>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-white text-green-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Continue Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple Ear icon component since it's not in lucide-react
function Ear({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}