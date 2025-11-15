import { useState } from 'react';
import { Play, Volume2, BookOpen, Trophy, Star, CheckCircle } from 'lucide-react';
import { playAudio } from '../utils/mediaPlayer';
import { Class } from '../types/course';

interface LessonProps {
  lesson: Class;
  onComplete: () => void;
}

export default function Lesson({ lesson, onComplete }: LessonProps) {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [completedComponents, setCompletedComponents] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentComponent = lesson.activities[currentComponentIndex];

  const handlePlayAudio = (audioFile?: string) => {
    if (audioFile) {
      setIsPlaying(true);
      playAudio(audioFile);
      // Simulate audio ending
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  const handleCompleteComponent = () => {
    if (!completedComponents.includes(currentComponentIndex)) {
      setCompletedComponents([...completedComponents, currentComponentIndex]);
    }
    
    if (currentComponentIndex < lesson.activities.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    } else {
      // Lesson complete
      onComplete();
    }
  };

  const handlePreviousComponent = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    }
  };

  const isLessonComplete = completedComponents.length === lesson.activities.length;

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
                {completedComponents.length}/{lesson.activities.length} Complete
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((completedComponents.length / lesson.activities.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(completedComponents.length / lesson.activities.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Component */}
          <div className="mb-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {currentComponent.type.charAt(0).toUpperCase() + currentComponent.type.slice(1)} Activity
                </h2>
                <p className="text-gray-700">{currentComponent.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <p className="text-gray-800 mb-4">{currentComponent.description}</p>
              
              {currentComponent.audioFile && (
                <button
                  onClick={() => handlePlayAudio(currentComponent.audioFile)}
                  className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
                >
                  <Play className={`w-5 h-5 ${isPlaying ? 'hidden' : 'block'}`} />
                  <Volume2 className={`w-5 h-5 ${isPlaying ? 'block' : 'hidden'}`} />
                  {isPlaying ? 'Playing...' : 'Play Instructions'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {currentComponent.type === 'listen-repeat' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {['a', 'b', 'c', 'd', 'e', 'f'].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handlePlayAudio(`letter_${letter}.mp3`)}
                      className="p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center"
                    >
                      <span className="text-3xl font-bold text-gray-800 uppercase">{letter}</span>
                      <Volume2 className="w-5 h-5 mt-2 text-blue-500" />
                    </button>
                  ))}
                </div>
              )}
              
              {currentComponent.type === 'match' && (
                <div className="w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { letter: 'a', word: 'apple' },
                      { letter: 'b', word: 'ball' },
                      { letter: 'c', word: 'cat' },
                      { letter: 'd', word: 'dog' }
                    ].map((item) => (
                      <div 
                        key={item.letter}
                        className="bg-white p-4 rounded-xl border-2 border-gray-200 text-center"
                      >
                        <div className="text-2xl font-bold text-gray-800 mb-2">{item.letter}</div>
                        <div className="text-gray-600">{item.word}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={handlePreviousComponent}
              disabled={currentComponentIndex === 0}
              className={`px-6 py-3 rounded-full font-bold ${
                currentComponentIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {lesson.activities.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentComponentIndex
                      ? 'bg-blue-500'
                      : completedComponents.includes(index)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleCompleteComponent}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold transition-colors flex items-center gap-2"
            >
              {currentComponentIndex < lesson.activities.length - 1 ? (
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