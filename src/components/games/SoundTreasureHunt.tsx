import { useState, useEffect } from 'react';
import { Volume2, Trophy, X, Sparkles } from 'lucide-react';

interface SoundTreasureHuntProps {
  onClose: () => void;
  levelColor: string;
}

const items = [
  { name: 'apple', sound: 'a', emoji: '🍎' },
  { name: 'banana', sound: 'b', emoji: '🍌' },
  { name: 'cat', sound: 'c', emoji: '🐱' },
  { name: 'dog', sound: 'd', emoji: '🐶' },
  { name: 'elephant', sound: 'e', emoji: '🐘' },
  { name: 'fish', sound: 'f', emoji: '🐟' },
  { name: 'grapes', sound: 'g', emoji: '🍇' },
  { name: 'hat', sound: 'h', emoji: '🎩' },
];

export default function SoundTreasureHunt({ onClose, levelColor }: SoundTreasureHuntProps) {
  const [currentSound, setCurrentSound] = useState('a');
  const [score, setScore] = useState(0);
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    playSound();
  }, [currentSound]);

  const playSound = () => {
    setFeedback({ text: `Find something that starts with "${currentSound}"`, isCorrect: true });
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleItemClick = (item: typeof items[0]) => {
    if (item.sound === currentSound) {
      setScore(score + 10);
      setFoundItems([...foundItems, item.name]);
      setFeedback({ text: `Amazing! ${item.name} starts with "${currentSound}"!`, isCorrect: true });

      setTimeout(() => {
        setFeedback(null);
        const nextSound = String.fromCharCode(currentSound.charCodeAt(0) + 1);
        if (nextSound <= 'f') {
          setCurrentSound(nextSound);
        }
      }, 2000);
    } else {
      setFeedback({ text: `Try again! ${item.name} starts with "${item.sound}"`, isCorrect: false });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const isComplete = currentSound > 'f';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sound Treasure Hunt</h2>
            <p className="text-gray-600 mt-1">Find objects that start with the sound!</p>
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
              <div className="text-gray-600">Found: {foundItems.length}/6</div>
            </div>
            {isComplete && (
              <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                <Trophy className="w-6 h-6" />
                Complete!
              </div>
            )}
          </div>

          {!isComplete && (
            <div className="bg-gradient-to-r from-[#FFB703]/20 to-[#00B4D8]/20 rounded-2xl p-8 mb-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={playSound}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  style={{ backgroundColor: levelColor }}
                >
                  <Volume2 className="w-8 h-8" />
                </button>
                <div>
                  <div className="text-6xl font-bold text-gray-900 mb-2">{currentSound}</div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    {showHint ? 'Hide hint' : 'Show hint'}
                  </button>
                </div>
              </div>
              {showHint && (
                <div className="text-gray-700 font-medium">
                  Look for: {items.find(i => i.sound === currentSound)?.name}
                </div>
              )}
            </div>
          )}

          {feedback && (
            <div
              className={`mb-6 p-4 rounded-xl text-white text-center font-semibold flex items-center justify-center gap-2 ${
                feedback.isCorrect ? 'animate-pulse' : 'animate-shake'
              }`}
              style={{ backgroundColor: feedback.isCorrect ? levelColor : '#FF6363' }}
            >
              {feedback.isCorrect && <Sparkles className="w-5 h-5" />}
              {feedback.text}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => handleItemClick(item)}
                disabled={foundItems.includes(item.name) || isComplete}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 transition-all text-center p-4 ${
                  foundItems.includes(item.name)
                    ? 'bg-green-100 border-2 border-green-500 cursor-not-allowed'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-400 hover:scale-105 hover:shadow-lg'
                }`}
              >
                <div className="text-5xl">{item.emoji}</div>
                <div className="font-bold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">"{item.sound}"</div>
              </button>
            ))}
          </div>

          {isComplete && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FFB703] to-[#00B4D8] text-white px-8 py-4 rounded-full text-xl font-bold mb-6">
                <Trophy className="w-8 h-8" />
                You found all the treasures!
              </div>
              <button
                onClick={onClose}
                className="block w-full py-4 rounded-xl font-bold text-white text-lg hover:shadow-lg transition-all"
                style={{ backgroundColor: levelColor }}
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
