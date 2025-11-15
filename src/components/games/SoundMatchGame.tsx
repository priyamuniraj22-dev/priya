import { useState, useEffect } from 'react';
import { Volume2, Trophy, X, Star, RotateCcw } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface SoundMatchGameProps {
  onClose: () => void;
  levelColor: string;
}

interface SoundItem {
  id: string;
  letter: string;
  word: string;
  image: string;
  audioFile: string;
}

interface MatchPair {
  sound: SoundItem;
  letter: SoundItem;
}

const soundItems: SoundItem[] = [
  { id: 's1', letter: 's', word: 'sun', image: '☀️', audioFile: 'letter_s.mp3' },
  { id: 'a1', letter: 'a', word: 'apple', image: '🍎', audioFile: 'letter_a.mp3' },
  { id: 't1', letter: 't', word: 'top', image: '🔺', audioFile: 'letter_t.mp3' },
  { id: 'p1', letter: 'p', word: 'pig', image: '🐷', audioFile: 'letter_p.mp3' },
  { id: 'i1', letter: 'i', word: 'igloo', image: '❄️', audioFile: 'letter_i.mp3' },
  { id: 'n1', letter: 'n', word: 'net', image: '🎾', audioFile: 'letter_n.mp3' },
  { id: 'm1', letter: 'm', word: 'man', image: '👨', audioFile: 'letter_m.mp3' },
  { id: 'd1', letter: 'd', word: 'dog', image: '🐶', audioFile: 'letter_d.mp3' },
];

export default function SoundMatchGame({ onClose, levelColor }: SoundMatchGameProps) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [selectedSound, setSelectedSound] = useState<SoundItem | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Create pairs for matching
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  
  useEffect(() => {
    // Create pairs by matching sounds with letters
    const newPairs: MatchPair[] = soundItems.map(item => ({
      sound: item,
      letter: item
    }));
    setPairs(newPairs);
  }, []);

  const handlePlaySound = (audioFile: string) => {
    playAudio(audioFile);
  };

  const handleSoundSelect = (sound: SoundItem) => {
    if (matchedPairs.includes(sound.id)) return;
    
    setSelectedSound(sound);
  };

  const handleLetterSelect = (letter: SoundItem) => {
    if (matchedPairs.includes(letter.id) || !selectedSound) return;
    
    setAttempts(attempts + 1);
    
    // Check if it's a correct match
    if (selectedSound.id === letter.id) {
      // Correct match
      setScore(score + 10 + streak * 2); // Bonus points for streak
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
      setMatchedPairs([...matchedPairs, selectedSound.id]);
      setFeedback({ text: `Great job! ${selectedSound.letter} makes the "${selectedSound.word}" sound!`, isCorrect: true });
      
      // Play success sound
      playAudio('correct_letter.mp3');
      
      // Check if game is completed
      if (matchedPairs.length + 1 === soundItems.length) {
        setGameCompleted(true);
        playAudio('game_complete.mp3');
      }
    } else {
      // Incorrect match
      setStreak(0);
      setFeedback({ text: `Try again! Listen carefully to the sounds.`, isCorrect: false });
      
      // Play incorrect sound
      playAudio('incorrect_letter.mp3');
    }
    
    // Clear selection after delay
    setTimeout(() => {
      setSelectedSound(null);
      setFeedback(null);
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFeedback(null);
    setSelectedSound(null);
    setMatchedPairs([]);
    setAttempts(0);
    setGameCompleted(false);
  };

  const progress = Math.round((matchedPairs.length / soundItems.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 md:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sound Match Game</h2>
            <p className="text-gray-600 mt-1">Match sounds to letters!</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{streak}</div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{matchedPairs.length}/{soundItems.length}</div>
              <div className="text-sm text-gray-600">Matched</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{bestStreak}</div>
              <div className="text-sm text-gray-600">Best Streak</div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sounds Panel */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Listen to Sounds</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                  {soundItems.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => handleSoundSelect(sound)}
                      disabled={matchedPairs.includes(sound.id)}
                      className={`p-4 rounded-xl flex flex-col items-center transition-all ${
                        matchedPairs.includes(sound.id)
                          ? 'bg-gray-200 opacity-50 cursor-not-allowed'
                          : selectedSound?.id === sound.id
                          ? 'ring-4 ring-blue-400 bg-blue-100'
                          : 'bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{sound.image}</div>
                      <div className="font-bold text-gray-800">{sound.word}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySound(sound.audioFile);
                        }}
                        className="mt-2 text-blue-500 hover:text-blue-700"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>

              {/* Letters Panel */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Match the Letters</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                  {soundItems.map((letter) => (
                    <button
                      key={letter.id}
                      onClick={() => handleLetterSelect(letter)}
                      disabled={matchedPairs.includes(letter.id)}
                      className={`p-4 rounded-xl flex flex-col items-center transition-all ${
                        matchedPairs.includes(letter.id)
                          ? 'bg-gray-200 opacity-50 cursor-not-allowed'
                          : 'bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="text-4xl font-bold text-gray-800 mb-2 uppercase">{letter.letter}</div>
                      {selectedSound && selectedSound.id === letter.id && (
                        <div className="text-green-500">
                          <Star className="w-5 h-5 fill-current" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-center text-gray-700">
                {selectedSound 
                  ? `Now find the letter that makes the "${selectedSound.word}" sound!` 
                  : 'Click on a picture to hear the sound, then find the matching letter!'}
              </p>
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
          {gameCompleted && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl text-white text-center animate-bounce">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
              <p className="mb-4">You matched all the sounds! Final Score: {score}</p>
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