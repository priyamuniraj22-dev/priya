import { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCcw } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface SoundChallenge {
  id: string;
  soundFile: string;
  correctImage: string;
  correctLabel: string;
  options: { image: string; label: string }[];
}

export default function ListenChooseSound() {
  const [challenges, setChallenges] = useState<SoundChallenge[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Sound challenges
  const initialChallenges: SoundChallenge[] = [
    {
      id: '1',
      soundFile: 'letter_a.mp3',
      correctImage: '🍎',
      correctLabel: 'Apple',
      options: [
        { image: '🍎', label: 'Apple' },
        { image: '🍌', label: 'Banana' },
        { image: '🍇', label: 'Grapes' },
        { image: '🍊', label: 'Orange' }
      ]
    },
    {
      id: '2',
      soundFile: 'letter_b.mp3',
      correctImage: '🐻',
      correctLabel: 'Bear',
      options: [
        { image: '🐻', label: 'Bear' },
        { image: '🐱', label: 'Cat' },
        { image: '🐶', label: 'Dog' },
        { image: '🐘', label: 'Elephant' }
      ]
    },
    {
      id: '3',
      soundFile: 'letter_c.mp3',
      correctImage: '🐱',
      correctLabel: 'Cat',
      options: [
        { image: '🐱', label: 'Cat' },
        { image: '🐭', label: 'Mouse' },
        { image: '🐰', label: 'Rabbit' },
        { image: '🦊', label: 'Fox' }
      ]
    },
    {
      id: '4',
      soundFile: 'vowel_a.mp3',
      correctImage: '🚀',
      correctLabel: 'Astronaut',
      options: [
        { image: '🚀', label: 'Astronaut' },
        { image: '🎈', label: 'Balloon' },
        { image: '🚗', label: 'Car' },
        { image: '⭐', label: 'Star' }
      ]
    },
    {
      id: '5',
      soundFile: 'blend_bl.mp3',
      correctImage: '🎈',
      correctLabel: 'Balloon',
      options: [
        { image: '🎈', label: 'Balloon' },
        { image: '📚', label: 'Book' },
        { image: '📷', label: 'Camera' },
        { image: '🎮', label: 'Game' }
      ]
    }
  ];

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Shuffle challenges
    const shuffledChallenges = [...initialChallenges].sort(() => Math.random() - 0.5);
    setChallenges(shuffledChallenges);
    setCurrentChallenge(0);
    setSelectedOption(null);
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    setGameComplete(false);
  };

  const currentChallengeData = challenges[currentChallenge];

  const playSound = async () => {
    if (!currentChallengeData || isPlaying) return;
    
    setIsPlaying(true);
    try {
      await playAudio(currentChallengeData.soundFile);
    } catch (error) {
      console.error('Error playing sound:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || gameComplete) return;
    
    setSelectedOption(optionIndex);
    setAttempts(attempts + 1);
    
    const isCorrect = currentChallengeData.options[optionIndex].label === currentChallengeData.correctLabel;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ message: 'Correct! Great job!', isCorrect: true });
    } else {
      setFeedback({ 
        message: `Incorrect! The sound was for ${currentChallengeData.correctLabel}.`, 
        isCorrect: false 
      });
    }
    
    // Move to next challenge after delay
    setTimeout(() => {
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(currentChallenge + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const progress = challenges.length > 0 
    ? Math.round(((currentChallenge + 1) / challenges.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Listen & Choose Sound</h1>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Listen to the sound and choose the correct picture. Test your phonics listening skills!
          </p>
          
          {/* Game stats */}
          <div className="flex justify-between items-center mb-6 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00B4D8]">{score}</div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B5CF6]">{attempts}</div>
              <div className="text-gray-600">Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFB703]">{progress}%</div>
              <div className="text-gray-600">Progress</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-[#00B4D8] h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Challenge {currentChallenge + 1} of {challenges.length}</span>
              <span>Listen carefully!</span>
            </div>
          </div>
          
          {/* Feedback */}
          {feedback && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              feedback.isCorrect 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {feedback.message}
            </div>
          )}
          
          {gameComplete ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Game Complete!</h2>
              <p className="text-gray-600 mb-2">
                You scored {score} out of {challenges.length}!
              </p>
              <p className="text-gray-600 mb-6">
                Accuracy: {challenges.length > 0 ? Math.round((score / challenges.length) * 100) : 0}%
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          ) : currentChallengeData ? (
            <div className="text-center">
              {/* Sound Player */}
              <div className="mb-8">
                <div className="inline-block bg-gradient-to-br from-[#FFB703] to-[#00B4D8] rounded-2xl p-8 shadow-lg">
                  <button
                    onClick={playSound}
                    disabled={isPlaying}
                    className="flex flex-col items-center gap-4 px-6 py-4 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-30 transition-all"
                  >
                    <Volume2 className={`w-12 h-12 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                    <span className="text-white font-medium text-lg">
                      {isPlaying ? 'Playing...' : 'Play Sound'}
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl text-gray-700 mb-4">
                  Which picture matches the sound you just heard?
                </h3>
              </div>
              
              {/* Options */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {currentChallengeData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                    className={`rounded-2xl flex flex-col items-center p-6 shadow-md transition-all ${
                      selectedOption === null
                        ? 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#00B4D8]'
                        : index === currentChallengeData.options.findIndex(o => o.label === currentChallengeData.correctLabel)
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedOption === index
                            ? 'bg-red-100 border-2 border-red-500'
                            : 'bg-white border-2 border-gray-200'
                    }`}
                  >
                    <div className="text-6xl mb-3">{option.image}</div>
                    <div className="text-lg font-medium text-gray-900">{option.label}</div>
                    {selectedOption !== null && (
                      <div className="mt-3">
                        {index === currentChallengeData.options.findIndex(o => o.label === currentChallengeData.correctLabel) ? (
                          <Check className="w-6 h-6 text-green-600" />
                        ) : selectedOption === index ? (
                          <X className="w-6 h-6 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-2xl text-gray-500">Loading game...</div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How to Play</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Click the "Play Sound" button to hear a phonics sound</li>
              <li>Choose the picture that matches the sound</li>
              <li>Get as many correct as possible!</li>
              <li>Click "Reset Game" to play again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}