import { useState } from 'react';
import { Check, X, RotateCcw, Volume2 } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface BlendChallenge {
  id: string;
  blend: string;
  word: string;
  soundFile: string;
  options: string[];
}

export default function BlendBuilder() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  // Blend challenges
  const challenges: BlendChallenge[] = [
    {
      id: '1',
      blend: 'BL',
      word: 'Blue',
      soundFile: 'blend_bl.mp3',
      options: ['BL', 'CL', 'FL', 'GL']
    },
    {
      id: '2',
      blend: 'GR',
      word: 'Green',
      soundFile: 'blend_gr.mp3',
      options: ['BR', 'CR', 'GR', 'DR']
    },
    {
      id: '3',
      blend: 'ST',
      word: 'Star',
      soundFile: 'blend_st.mp3',
      options: ['ST', 'SP', 'SK', 'SL']
    },
    {
      id: '4',
      blend: 'CH',
      word: 'Chair',
      soundFile: 'digraph_ch.mp3',
      options: ['CH', 'SH', 'TH', 'WH']
    },
    {
      id: '5',
      blend: 'TR',
      word: 'Tree',
      soundFile: 'blend_tr.mp3',
      options: ['TR', 'BR', 'CR', 'DR']
    }
  ];

  const currentChallengeData = challenges[currentChallenge];

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null || gameComplete) return;
    
    setSelectedOption(option);
    setAttempts(attempts + 1);
    
    const isCorrect = option === currentChallengeData.blend;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ message: 'Correct! Great job!', isCorrect: true });
    } else {
      setFeedback({ message: `Try again! The correct blend for ${currentChallengeData.word} is ${currentChallengeData.blend}.`, isCorrect: false });
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

  const playSound = async (soundFile: string) => {
    try {
      await playAudio(soundFile);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const resetGame = () => {
    setCurrentChallenge(0);
    setSelectedOption(null);
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    setGameComplete(false);
  };

  const progress = Math.round(((currentChallenge + 1) / challenges.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Blend Builder Game</h1>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Identify the correct blend or digraph for each word. Listen to the word and select the matching sound pattern!
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
              <span>{currentChallengeData.word}</span>
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
          ) : (
            <div className="text-center">
              {/* Word Display */}
              <div className="mb-8">
                <div className="inline-block bg-gradient-to-br from-[#FFB703] to-[#00B4D8] rounded-2xl p-8 shadow-lg">
                  <h2 className="text-5xl font-bold text-white mb-4">{currentChallengeData.word}</h2>
                  <button
                    onClick={() => playSound(currentChallengeData.soundFile)}
                    className="flex items-center gap-2 mx-auto px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
                  >
                    <Volume2 className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Hear Word</span>
                  </button>
                </div>
              </div>
              
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl text-gray-700 mb-4">
                  What blend or digraph does <span className="font-bold text-[#8B5CF6]">{currentChallengeData.word}</span> start with?
                </h3>
              </div>
              
              {/* Options */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {currentChallengeData.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={selectedOption !== null}
                    className={`aspect-square rounded-xl flex items-center justify-center text-3xl font-bold shadow-md transition-all ${
                      selectedOption === null
                        ? 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#00B4D8]'
                        : option === currentChallengeData.blend
                          ? 'bg-green-100 border-2 border-green-500 text-green-700'
                          : selectedOption === option
                            ? 'bg-red-100 border-2 border-red-500 text-red-700'
                            : 'bg-white border-2 border-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How to Play</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Listen to the word by clicking the "Hear Word" button</li>
              <li>Identify the blend or digraph the word starts with</li>
              <li>Select the correct option from the choices</li>
              <li>Complete all challenges to finish the game</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}