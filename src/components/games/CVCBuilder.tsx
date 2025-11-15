import { useState, useEffect } from 'react';
import { Volume2, Trophy, X, Shuffle } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface CVCBuilderProps {
  onClose: () => void;
  levelColor: string;
}

const cvcWords = [
  { word: 'CAT', image: '🐱', hint: 'A pet animal that says meow' },
  { word: 'DOG', image: '🐶', hint: 'A pet animal that barks' },
  { word: 'BAT', image: '🦇', hint: 'A flying animal' },
  { word: 'HAT', image: '🎩', hint: 'You wear this on your head' },
  { word: 'MAT', image: '🧵', hint: 'You stand on this' },
  { word: 'RAT', image: '🐭', hint: 'A small rodent' },
];

export default function CVCBuilder({ onClose, levelColor }: CVCBuilderProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const currentWord = cvcWords[currentWordIndex];

  useEffect(() => {
    shuffleLetters();
  }, [currentWordIndex]);

  const shuffleLetters = () => {
    const letters = currentWord.word.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setShuffledLetters(shuffled);
    setSelectedLetters([]);
  };

  const handleLetterSelect = (letter: string) => {
    if (selectedLetters.length < 3) {
      setSelectedLetters([...selectedLetters, letter]);
      // Use the correct file name format for letters
      playAudio(`letter_${letter.toLowerCase()}.mp3`);
    }
  };

  const handleLetterRemove = (index: number) => {
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    const builtWord = selectedLetters.join('');
    if (builtWord === currentWord.word) {
      setScore(score + 10);
      setCompletedWords([...completedWords, currentWord.word]);
      setFeedback({ text: `Perfect! ${currentWord.word} is correct!`, isCorrect: true });
      // Use the correct file name for word completion
      playAudio('word_complete.mp3');

      setTimeout(() => {
        setFeedback(null);
        if (currentWordIndex < cvcWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          setCurrentWordIndex(0);
        }
      }, 2000);
    } else {
      setFeedback({ text: `Not quite! Try again.`, isCorrect: false });
      // Use the correct file name for incorrect words
      playAudio('word_incorrect.mp3');
      setTimeout(() => {
        setFeedback(null);
        setSelectedLetters([]);
      }, 1500);
    }
  };

  const availableLetters = shuffledLetters.filter((letter) => {
    const letterCount = currentWord.word.split('').filter(l => l === letter).length;
    const selectedCount = selectedLetters.filter(l => l === letter).length;
    return selectedCount < letterCount;
  });

  const isComplete = completedWords.length === cvcWords.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">CVC Builder</h2>
            <p className="text-gray-600 mt-1">Build the correct word!</p>
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
              <div className="text-gray-600">Completed: {completedWords.length}/{cvcWords.length}</div>
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
              className={`mb-6 p-4 rounded-xl text-white text-center font-semibold ${
                feedback.isCorrect ? 'animate-pulse' : ''
              }`}
              style={{ backgroundColor: feedback.isCorrect ? levelColor : '#FF6363' }}
            >
              {feedback.text}
            </div>
          )}

          <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 mb-8 border-2 border-gray-200">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-6xl">{currentWord.image}</div>
              <div className="text-center">
                <p className="text-gray-600 font-medium mb-2">Build this word:</p>
                <p className="text-sm text-gray-500">{currentWord.hint}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6 border-2 border-dashed border-gray-300">
              <div className="flex justify-center gap-3">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterRemove(index)}
                    disabled={!selectedLetters[index]}
                    className={`w-20 h-20 rounded-lg font-bold text-2xl transition-all ${
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
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-3">Available Letters:</p>
              <div className="flex gap-3 justify-center flex-wrap">
                {shuffledLetters.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterSelect(letter)}
                    disabled={!availableLetters.includes(letter)}
                    className={`w-14 h-14 rounded-xl font-bold text-xl transition-all ${
                      availableLetters.includes(letter)
                        ? 'bg-white border-2 hover:scale-110 hover:shadow-md'
                        : 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed opacity-50'
                    }`}
                    style={{
                      borderColor: availableLetters.includes(letter) ? levelColor : '#ccc',
                      color: levelColor,
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={shuffleLetters}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border-2 transition-all"
                style={{ borderColor: levelColor, color: levelColor }}
              >
                <Shuffle className="w-5 h-5" />
                Shuffle
              </button>
              <button
                onClick={handleCheck}
                disabled={selectedLetters.length !== 3}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all ${
                  selectedLetters.length === 3 ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ backgroundColor: levelColor }}
              >
                Check
              </button>
            </div>
          </div>

          {isComplete && (
            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-white text-lg hover:shadow-lg transition-all"
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