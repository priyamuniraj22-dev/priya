import { useState, useEffect } from 'react';
import { Volume2, Trophy, X, RotateCcw, Move } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface WordBuilderDragGameProps {
  onClose: () => void;
  levelColor: string;
}

interface WordItem {
  id: string;
  word: string;
  letters: string[];
  image: string;
  audioFile: string;
}

const wordItems: WordItem[] = [
  { id: 'w1', word: 'CAT', letters: ['C', 'A', 'T'], image: '🐱', audioFile: 'word_cat.mp3' },
  { id: 'w2', word: 'DOG', letters: ['D', 'O', 'G'], image: '🐶', audioFile: 'word_dog.mp3' },
  { id: 'w3', word: 'BAT', letters: ['B', 'A', 'T'], image: '🦇', audioFile: 'word_bat.mp3' },
  { id: 'w4', word: 'HAT', letters: ['H', 'A', 'T'], image: '🎩', audioFile: 'word_hat.mp3' },
  { id: 'w5', word: 'MAT', letters: ['M', 'A', 'T'], image: '🧘', audioFile: 'word_mat.mp3' },
  { id: 'w6', word: 'RAT', letters: ['R', 'A', 'T'], image: '🐭', audioFile: 'word_rat.mp3' },
  { id: 'w7', word: 'SUN', letters: ['S', 'U', 'N'], image: '☀️', audioFile: 'word_sun.mp3' },
  { id: 'w8', word: 'BOX', letters: ['B', 'O', 'X'], image: '📦', audioFile: 'word_box.mp3' },
];

export default function WordBuilderDragGame({ onClose, levelColor }: WordBuilderDragGameProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const currentWord = wordItems[currentWordIndex];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Time's up - move to next word
      handleNextWord();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  // Initialize letters when word changes
  useEffect(() => {
    shuffleLetters();
    setTimeLeft(30);
    setTimerActive(true);
  }, [currentWordIndex]);

  const shuffleLetters = () => {
    const letters = [...currentWord.letters];
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
    setSelectedLetters([]);
  };

  const handleLetterSelect = (letter: string) => {
    if (selectedLetters.length < currentWord.letters.length) {
      setSelectedLetters([...selectedLetters, letter]);
      playAudio(`letter_${letter.toLowerCase()}.mp3`);
    }
  };

  const handleLetterRemove = (index: number) => {
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    setTimerActive(false);
    setAttempts(attempts + 1);
    
    const builtWord = selectedLetters.join('');
    if (builtWord === currentWord.word) {
      // Correct word built
      const points = 10 + streak * 2 + Math.floor(timeLeft / 2);
      setScore(score + points);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
      setCompletedWords([...completedWords, currentWord.word]);
      setFeedback({ text: `Perfect! ${currentWord.word} is correct! +${points} points`, isCorrect: true });
      playAudio('word_complete.mp3');

      // Move to next word after delay
      setTimeout(() => {
        handleNextWord();
      }, 2500);
    } else {
      // Incorrect word
      setStreak(0);
      setFeedback({ text: `Not quite! The word is ${currentWord.word}`, isCorrect: false });
      playAudio('word_incorrect.mp3');
      
      // Reset after delay
      setTimeout(() => {
        setFeedback(null);
        setSelectedLetters([]);
        setTimeLeft(30);
        setTimerActive(true);
      }, 2000);
    }
  };

  const handleNextWord = () => {
    setFeedback(null);
    if (currentWordIndex < wordItems.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game completed
      playAudio('game_complete.mp3');
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setSelectedLetters([]);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFeedback(null);
    setShuffledLetters([]);
    setCompletedWords([]);
    setAttempts(0);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const availableLetters = shuffledLetters.filter((letter) => {
    const letterCount = currentWord.letters.filter(l => l === letter).length;
    const selectedCount = selectedLetters.filter(l => l === letter).length;
    return selectedCount < letterCount;
  });

  const isGameComplete = currentWordIndex >= wordItems.length - 1 && completedWords.includes(currentWord.word);
  const progress = Math.round((completedWords.length / wordItems.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 md:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Word Builder Drag Game</h2>
            <p className="text-gray-600 mt-1">Drag letters to build words!</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-4 md:p-8">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{streak}</div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{completedWords.length}/{wordItems.length}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{bestStreak}</div>
              <div className="text-sm text-gray-600">Best Streak</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-xl text-white text-center font-semibold animate-pulse`}
              style={{ backgroundColor: feedback.isCorrect ? '#10B981' : '#EF4444' }}
            >
              {feedback.text}
            </div>
          )}

          {/* Game Area */}
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 md:p-8 mb-6 border-2 border-gray-200">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Word to Build */}
              <div className="md:w-1/2">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{currentWord.image}</div>
                  <h3 className="text-xl font-bold text-gray-900">Build this word:</h3>
                  <p className="text-gray-600 mt-2">{currentWord.word.length} letters</p>
                </div>

                {/* Word Building Area */}
                <div className="bg-white rounded-xl p-6 mb-6 border-2 border-dashed border-gray-300">
                  <div className="flex justify-center gap-3">
                    {currentWord.letters.map((_, index) => (
                      <div key={index} className="relative">
                        <button
                          onClick={() => handleLetterRemove(index)}
                          disabled={!selectedLetters[index]}
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-lg font-bold text-xl md:text-2xl transition-all flex items-center justify-center ${
                            selectedLetters[index]
                              ? 'bg-gradient-to-br hover:scale-110 cursor-pointer'
                              : 'bg-gray-100 cursor-default border-2 border-dashed border-gray-300'
                          }`}
                          style={{
                            backgroundColor: selectedLetters[index] ? levelColor : undefined,
                            backgroundImage: selectedLetters[index]
                              ? `linear-gradient(135deg, ${levelColor}, ${levelColor}dd)`
                              : undefined,
                            color: selectedLetters[index] ? 'white' : '#999',
                          }}
                        >
                          {selectedLetters[index] || '?'}
                        </button>
                        {selectedLetters[index] && (
                          <button
                            onClick={() => handleLetterRemove(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Check Button */}
                <button
                  onClick={handleCheck}
                  disabled={selectedLetters.length !== currentWord.letters.length}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                    selectedLetters.length === currentWord.letters.length
                      ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Check Word
                </button>
              </div>

              {/* Letter Selection */}
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Drag these letters:</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {shuffledLetters.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => handleLetterSelect(letter)}
                      disabled={!availableLetters.includes(letter)}
                      className={`p-4 rounded-xl font-bold text-2xl transition-all flex flex-col items-center ${
                        availableLetters.includes(letter)
                          ? 'bg-white border-2 hover:scale-110 hover:shadow-md cursor-move'
                          : 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed opacity-50'
                      }`}
                      style={{
                        borderColor: availableLetters.includes(letter) ? levelColor : '#ccc',
                        color: levelColor,
                      }}
                    >
                      <Move className="w-4 h-4 mb-2" />
                      {letter}
                    </button>
                  ))}
                </div>

                {/* Shuffle Button */}
                <button
                  onClick={shuffleLetters}
                  className="w-full mt-6 py-3 rounded-xl font-semibold border-2 transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: levelColor, color: levelColor }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Shuffle Letters
                </button>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
            >
              Exit Game
            </button>
          </div>

          {/* Completion Screen */}
          {isGameComplete && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl text-white text-center animate-bounce">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
              <p className="mb-4">You built all the words! Final Score: {score}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-2">
                  <div className="text-2xl font-bold">{score}</div>
                  <div className="text-sm">Score</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2">
                  <div className="text-2xl font-bold">{attempts}</div>
                  <div className="text-sm">Attempts</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2">
                  <div className="text-2xl font-bold">{bestStreak}</div>
                  <div className="text-sm">Best Streak</div>
                </div>
              </div>
              <button
                onClick={onClose}
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