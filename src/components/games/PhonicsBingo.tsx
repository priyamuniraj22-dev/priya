import { useState, useEffect } from 'react';
import { Volume2, Star, RotateCcw } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface BingoItem {
  id: string;
  letter: string;
  soundFile: string;
  isMarked: boolean;
}

export default function PhonicBingo() {
  const [bingoCard, setBingoCard] = useState<BingoItem[]>([]);
  const [calledItems, setCalledItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<BingoItem | null>(null);
  const [markedCount, setMarkedCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample letters for bingo
  const letters = [
    { letter: 'A', soundFile: 'letter_a.mp3' },
    { letter: 'B', soundFile: 'letter_b.mp3' },
    { letter: 'C', soundFile: 'letter_c.mp3' },
    { letter: 'D', soundFile: 'letter_d.mp3' },
    { letter: 'E', soundFile: 'letter_e.mp3' },
    { letter: 'F', soundFile: 'letter_f.mp3' },
    { letter: 'G', soundFile: 'letter_g.mp3' },
    { letter: 'H', soundFile: 'letter_h.mp3' },
    { letter: 'I', soundFile: 'letter_i.mp3' },
    { letter: 'J', soundFile: 'letter_j.mp3' },
    { letter: 'K', soundFile: 'letter_k.mp3' },
    { letter: 'L', soundFile: 'letter_l.mp3' },
    { letter: 'M', soundFile: 'letter_m.mp3' },
    { letter: 'N', soundFile: 'letter_n.mp3' },
    { letter: 'O', soundFile: 'letter_o.mp3' },
    { letter: 'P', soundFile: 'letter_p.mp3' },
  ];

  // Initialize the bingo card
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Select 9 random letters for the 3x3 bingo card
    const shuffled = [...letters].sort(() => 0.5 - Math.random());
    const selectedLetters = shuffled.slice(0, 9);
    
    const newBingoCard: BingoItem[] = selectedLetters.map((item, index) => ({
      id: `item-${index}`,
      letter: item.letter,
      soundFile: item.soundFile,
      isMarked: false
    }));
    
    setBingoCard(newBingoCard);
    setCalledItems([]);
    setCurrentItem(null);
    setMarkedCount(0);
    setGameWon(false);
    setIsPlaying(false);
  };

  const callNextItem = async () => {
    if (gameWon) return;
    
    // Get available items that haven't been called yet
    const availableItems = letters.filter(
      item => !calledItems.includes(item.letter)
    );
    
    if (availableItems.length === 0) return;
    
    // Select a random item
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const nextItem = availableItems[randomIndex];
    
    const bingoItem: BingoItem = {
      id: `called-${Date.now()}`,
      letter: nextItem.letter,
      soundFile: nextItem.soundFile,
      isMarked: false
    };
    
    setCurrentItem(bingoItem);
    setCalledItems([...calledItems, nextItem.letter]);
    setIsPlaying(true);
    
    // Play the sound
    try {
      await playAudio(nextItem.soundFile);
    } catch (error) {
      console.error('Error playing sound:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const markItem = (id: string) => {
    if (gameWon || !currentItem) return;
    
    // Check if the clicked item matches the current called item
    const item = bingoCard.find(i => i.id === id);
    if (!item || item.isMarked) return;
    
    if (item.letter === currentItem.letter) {
      // Correct match
      const updatedCard = bingoCard.map(i => 
        i.id === id ? { ...i, isMarked: true } : i
      );
      
      setBingoCard(updatedCard);
      const newMarkedCount = markedCount + 1;
      setMarkedCount(newMarkedCount);
      
      // Check for bingo (all items marked)
      if (newMarkedCount === bingoCard.length) {
        setGameWon(true);
      }
    }
  };

  const playCurrentSound = async () => {
    if (!currentItem || isPlaying) return;
    
    setIsPlaying(true);
    try {
      await playAudio(currentItem.soundFile);
    } catch (error) {
      console.error('Error playing sound:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Phonics Bingo</h1>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Card
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Listen to the letter sounds and mark them on your bingo card. Get all items marked to win!
          </p>
          
          {/* Game stats */}
          <div className="flex justify-between items-center mb-6 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00B4D8]">{markedCount}</div>
              <div className="text-gray-600">Marked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B5CF6]">{calledItems.length}</div>
              <div className="text-gray-600">Letters Called</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFB703]">
                {bingoCard.length > 0 ? Math.round((markedCount / bingoCard.length) * 100) : 0}%
              </div>
              <div className="text-gray-600">Complete</div>
            </div>
          </div>
          
          {gameWon ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">BINGO!</h2>
              <p className="text-gray-600 mb-6">
                Congratulations! You completed your bingo card!
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bingo Card */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Bingo Card</h2>
                <div className="grid grid-cols-3 gap-4">
                  {bingoCard.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markItem(item.id)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-4xl font-bold shadow-md transition-all cursor-pointer ${
                        item.isMarked
                          ? 'bg-green-100 border-2 border-green-500 text-green-700'
                          : 'bg-gradient-to-br from-[#FFB703] to-[#00B4D8] text-white hover:from-[#e6a600] hover:to-[#009bc8]'
                      }`}
                    >
                      {item.isMarked ? (
                        <div className="text-center">
                          <Star className="w-8 h-8 mx-auto" />
                          <div className="text-2xl mt-1">{item.letter}</div>
                        </div>
                      ) : (
                        item.letter
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Game Controls */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Game Controls</h2>
                
                {/* Current Item */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                  <h3 className="font-medium text-gray-700 mb-3">Current Letter</h3>
                  {currentItem ? (
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-[#FFB703] flex items-center justify-center text-4xl font-bold text-white mb-4">
                        {currentItem.letter}
                      </div>
                      <button
                        onClick={playCurrentSound}
                        disabled={isPlaying}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          isPlaying
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#00B4D8] hover:bg-[#009bc8] text-white'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        {isPlaying ? 'Playing...' : 'Hear Sound'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500 py-8">
                      Click "Call Next Letter" to start
                    </div>
                  )}
                </div>
                
                {/* Call Button */}
                <button
                  onClick={callNextItem}
                  disabled={isPlaying || gameWon}
                  className={`w-full py-3 rounded-lg font-medium mb-4 ${
                    isPlaying || gameWon
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white'
                  }`}
                >
                  {isPlaying ? 'Calling...' : 'Call Next Letter'}
                </button>
                
                {/* Called Letters */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Called Letters</h3>
                  <div className="flex flex-wrap gap-2">
                    {calledItems.map((letter, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#00B4D8] text-white rounded-full text-sm"
                      >
                        {letter}
                      </span>
                    ))}
                    {calledItems.length === 0 && (
                      <span className="text-gray-500 text-sm">No letters called yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How to Play</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Click "Call Next Letter" to hear a letter sound</li>
              <li>Find that letter on your bingo card and click it to mark it</li>
              <li>Mark all letters on your card to win</li>
              <li>Click "Hear Sound" to replay the current letter sound</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}