import { useState } from 'react';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';

interface WritingPracticeProps {
  onBack: () => void;
  levelColor: string;
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
const words = [
  { letters: ['C', 'A', 'T'], correct: true, image: '🐱' },
  { letters: ['D', 'O', 'G'], correct: true, image: '🐶' },
  { letters: ['B', 'A', 'T'], correct: true, image: '🦇' },
  { letters: ['C', 'A', 'P'], correct: true, image: '🧢' },
];

export default function WritingPractice({ onBack, levelColor }: WritingPracticeProps) {
  const [mode, setMode] = useState<'menu' | 'letters' | 'words'>('menu');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterTraceProgress, setLetterTraceProgress] = useState(0);
  const [wordProgress, setWordProgress] = useState<number[]>([0, 0, 0]);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [completedWords, setCompletedWords] = useState<number[]>([]);

  const handleLetterComplete = () => {
    const newCompleted = [...completedLetters, letters[currentLetterIndex]];
    setCompletedLetters(newCompleted);
    setLetterTraceProgress(0);

    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    } else {
      setMode('menu');
    }
  };

  const handleWordComplete = () => {
    const newCompleted = [...completedWords, currentWordIndex];
    setCompletedWords(newCompleted);
    setWordProgress([0, 0, 0]);

    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMode('menu');
    }
  };

  const handleLetterTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setLetterTraceProgress(Math.min(letterTraceProgress + 15, 100));
  };

  const handleWordTouchStart = (index: number) => {
    const newProgress = [...wordProgress];
    newProgress[index] = Math.min(newProgress[index] + 20, 100);
    setWordProgress(newProgress);

    if (newProgress[index] === 100) {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {mode === 'menu' && (
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Writing Practice</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setMode('letters');
                  setCurrentLetterIndex(0);
                }}
                className="bg-gradient-to-br from-[#FFB703]/20 to-[#FFB703]/10 rounded-2xl p-12 hover:shadow-lg transition-all hover:scale-105 border-2 border-[#FFB703]/30"
              >
                <div className="text-6xl mb-4">✏️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Trace Letters</h2>
                <p className="text-gray-700 mb-4">Learn proper letter formation by tracing.</p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: levelColor }}>
                  6 letters to master
                </div>
              </button>

              <button
                onClick={() => {
                  setMode('words');
                  setCurrentWordIndex(0);
                }}
                className="bg-gradient-to-br from-[#00B4D8]/20 to-[#00B4D8]/10 rounded-2xl p-12 hover:shadow-lg transition-all hover:scale-105 border-2 border-[#00B4D8]/30"
              >
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Form Words</h2>
                <p className="text-gray-700 mb-4">Trace letter sequences to spell words.</p>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: levelColor }}>
                  4 words to build
                </div>
              </button>
            </div>
          </div>
        )}

        {mode === 'letters' && (
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Trace Letter: {letters[currentLetterIndex]}</h2>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${letterTraceProgress}%`, backgroundColor: levelColor }}
                />
              </div>
              <p className="text-gray-600 mt-2">Trace to {100}%</p>
            </div>

            <div
              onMouseMove={handleLetterTouchStart}
              onTouchMove={handleLetterTouchStart}
              className="bg-gray-50 rounded-2xl p-12 mb-8 cursor-pointer border-4 border-dashed border-gray-300 hover:border-gray-400 transition-colors text-center min-h-[300px] flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-9xl font-bold mb-4" style={{ color: levelColor, opacity: 0.3 }}>
                  {letters[currentLetterIndex]}
                </div>
                <p className="text-xl text-gray-600 font-medium">Drag your mouse or finger to trace</p>
              </div>
            </div>

            <button
              onClick={handleLetterComplete}
              disabled={letterTraceProgress < 80}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${
                letterTraceProgress < 80
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'hover:shadow-lg hover:scale-105'
              }`}
              style={{
                backgroundColor: letterTraceProgress < 80 ? '#ccc' : levelColor,
              }}
            >
              {letterTraceProgress < 80 ? `Keep tracing (${letterTraceProgress}%)` : 'Letter Complete!'}
            </button>
          </div>
        )}

        {mode === 'words' && (
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Build the Word: {words[currentWordIndex].image}
              </h2>
              <p className="text-xl text-gray-700 mb-6">Trace each letter to spell the word</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {words[currentWordIndex].letters.map((letter, index) => (
                <div
                  key={index}
                  onMouseMove={() => handleWordTouchStart(index)}
                  onTouchMove={() => handleWordTouchStart(index)}
                  className="bg-gray-50 rounded-2xl p-8 cursor-pointer border-4 border-dashed border-gray-300 hover:border-gray-400 transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: levelColor, opacity: wordProgress[index] / 100 / 2 }} />
                  <div className="relative flex flex-col items-center justify-center min-h-[150px]">
                    <div className="text-7xl font-bold mb-2" style={{ color: levelColor, opacity: 0.3 }}>
                      {letter}
                    </div>
                    <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{ width: `${wordProgress[index]}%`, backgroundColor: levelColor }}
                      />
                    </div>
                    {wordProgress[index] === 100 && (
                      <CheckCircle2 className="w-8 h-8 mt-2" style={{ color: levelColor }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleWordComplete}
              disabled={wordProgress.some(p => p < 100)}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${
                wordProgress.some(p => p < 100)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'hover:shadow-lg hover:scale-105'
              }`}
              style={{
                backgroundColor: wordProgress.some(p => p < 100) ? '#ccc' : levelColor,
              }}
            >
              Word Complete!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
