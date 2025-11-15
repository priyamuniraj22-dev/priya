import { useState, useEffect } from 'react';
import { Fish, Trophy, X } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface LetterFishingProps {
  onClose: () => void;
  levelColor: string;
}

const targetLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
const allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export default function LetterFishing({ onClose, levelColor }: LetterFishingProps) {
  const [score, setScore] = useState(0);
  const [caught, setCaught] = useState<string[]>([]);
  const [fishLetters, setFishLetters] = useState<Array<{ letter: string; x: number; y: number }>>([]);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    const letters = [...targetLetters, ...allLetters.slice(0, 4)].sort(() => Math.random() - 0.5);
    setFishLetters(
      letters.map((letter, i) => ({
        letter,
        x: (i % 5) * 20 + 10,
        y: Math.floor(i / 5) * 40 + 20
      }))
    );
  }, []);

  const handleCatch = (letter: string) => {
    if (targetLetters.includes(letter) && !caught.includes(letter)) {
      setCaught([...caught, letter]);
      setScore(score + 10);
      setFeedback(`Great job! You caught "${letter}"!`);
      // Use the correct file name format for letters
      playAudio(`letter_${letter}.mp3`);
      setTimeout(() => setFeedback(''), 2000);
    } else if (!targetLetters.includes(letter)) {
      setFeedback(`Oops! "${letter}" is not one of our target letters.`);
      // Use the correct file name for incorrect letters
      playAudio('incorrect_letter.mp3');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const isComplete = caught.length === targetLetters.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Letter Fishing</h2>
            <p className="text-gray-600 mt-1">Catch fish with letters a-f!</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-gray-900">Score: {score}</div>
              <div className="text-gray-600">
                Caught: {caught.length}/{targetLetters.length}
              </div>
            </div>
            {isComplete && (
              <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                <Trophy className="w-6 h-6" />
                Complete!
              </div>
            )}
          </div>

          {feedback && (
            <div
              className="mb-6 p-4 rounded-xl text-white text-center font-semibold animate-pulse"
              style={{ backgroundColor: levelColor }}
            >
              {feedback}
            </div>
          )}

          <div className="bg-gradient-to-b from-[#00B4D8]/20 to-[#00B4D8]/40 rounded-2xl p-8 relative min-h-[400px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {fishLetters.map((fish, index) => (
                <button
                  key={index}
                  onClick={() => handleCatch(fish.letter)}
                  disabled={caught.includes(fish.letter)}
                  className={`absolute transition-all duration-300 hover:scale-110 ${
                    caught.includes(fish.letter) ? 'opacity-30 cursor-not-allowed' : 'hover:rotate-6'
                  }`}
                  style={{ left: `${fish.x}%`, top: `${fish.y}%` }}
                >
                  <div className="relative">
                    <Fish
                      className={`w-16 h-16 ${
                        targetLetters.includes(fish.letter) ? 'text-[#FFB703]' : 'text-gray-400'
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white drop-shadow-lg">
                        {fish.letter}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">Target Letters:</h3>
            <div className="flex gap-3">
              {targetLetters.map((letter) => (
                <div
                  key={letter}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold transition-all ${
                    caught.includes(letter)
                      ? 'bg-green-500 text-white scale-110'
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {isComplete && (
            <button
              onClick={onClose}
              className="w-full mt-6 py-4 rounded-xl font-bold text-white text-lg hover:shadow-lg transition-all"
              style={{ backgroundColor: levelColor }}
            >
              Continue Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
}