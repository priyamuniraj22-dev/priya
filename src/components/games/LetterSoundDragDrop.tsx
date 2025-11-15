import { useState } from 'react';
import { Volume2, CheckCircle, RotateCcw } from 'lucide-react';
import { playAudio } from '../../utils/mediaPlayer';

interface DraggableItem {
  id: string;
  letter: string;
  soundFile: string;
  isPlaced: boolean;
}

interface DropZone {
  id: string;
  letter: string;
  soundFile: string;
  placedItem: string | null;
}

export default function LetterSoundDragDrop() {
  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([
    { id: 'item-1', letter: 'A', soundFile: 'letter_a.mp3', isPlaced: false },
    { id: 'item-2', letter: 'B', soundFile: 'letter_b.mp3', isPlaced: false },
    { id: 'item-3', letter: 'C', soundFile: 'letter_c.mp3', isPlaced: false },
    { id: 'item-4', letter: 'D', soundFile: 'letter_d.mp3', isPlaced: false },
    { id: 'item-5', letter: 'E', soundFile: 'letter_e.mp3', isPlaced: false },
    { id: 'item-6', letter: 'F', soundFile: 'letter_f.mp3', isPlaced: false },
  ]);

  const [dropZones, setDropZones] = useState<DropZone[]>([
    { id: 'zone-1', letter: 'A', soundFile: 'letter_a.mp3', placedItem: null },
    { id: 'zone-2', letter: 'B', soundFile: 'letter_b.mp3', placedItem: null },
    { id: 'zone-3', letter: 'C', soundFile: 'letter_c.mp3', placedItem: null },
    { id: 'zone-4', letter: 'D', soundFile: 'letter_d.mp3', placedItem: null },
    { id: 'zone-5', letter: 'E', soundFile: 'letter_e.mp3', placedItem: null },
    { id: 'zone-6', letter: 'F', soundFile: 'letter_f.mp3', placedItem: null },
  ]);

  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    
    const item = draggableItems.find(i => i.id === itemId);
    const zone = dropZones.find(z => z.id === zoneId);
    
    if (!item || !zone) return;
    
    setAttempts(attempts + 1);
    
    // Check if the item matches the zone
    if (item.letter === zone.letter) {
      // Correct match
      setScore(score + 1);
      setFeedback({ message: 'Correct! Great job!', isCorrect: true });
      
      // Update draggable items
      setDraggableItems(draggableItems.map(i => 
        i.id === itemId ? { ...i, isPlaced: true } : i
      ));
      
      // Update drop zones
      setDropZones(dropZones.map(z => 
        z.id === zoneId ? { ...z, placedItem: itemId } : z
      ));
    } else {
      // Incorrect match
      setFeedback({ message: `Try again! ${item.letter} doesn't match ${zone.letter}.`, isCorrect: false });
    }
    
    // Clear feedback after delay
    setTimeout(() => setFeedback(null), 2000);
  };

  const playSound = async (soundFile: string) => {
    try {
      await playAudio(soundFile);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const resetGame = () => {
    setDraggableItems(draggableItems.map(item => ({ ...item, isPlaced: false })));
    setDropZones(dropZones.map(zone => ({ ...zone, placedItem: null })));
    setScore(0);
    setAttempts(0);
    setFeedback(null);
  };

  const isGameComplete = score === draggableItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Letter Sound Drag & Drop</h1>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Drag the letter cards to match them with their correct sound zones. Click the speaker icon to hear the sound.
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
              <div className="text-2xl font-bold text-[#FFB703]">
                {draggableItems.length > 0 ? Math.round((score / draggableItems.length) * 100) : 0}%
              </div>
              <div className="text-gray-600">Accuracy</div>
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
          
          {isGameComplete ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-6">
                You matched all letters correctly in {attempts} attempts!
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Draggable Items */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Letter Cards</h2>
                <div className="grid grid-cols-3 gap-4">
                  {draggableItems
                    .filter(item => !item.isPlaced)
                    .map(item => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className="aspect-square bg-gradient-to-br from-[#FFB703] to-[#00B4D8] rounded-xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-md hover:shadow-lg cursor-move transition-all"
                      >
                        {item.letter}
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Drop Zones */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sound Zones</h2>
                <div className="grid grid-cols-3 gap-4">
                  {dropZones.map(zone => (
                    <div
                      key={zone.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, zone.id)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center text-4xl font-bold shadow-md transition-all ${
                        zone.placedItem 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : 'bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {zone.placedItem ? (
                        <div className="text-center">
                          <div className="text-3xl text-green-700">
                            {draggableItems.find(i => i.id === zone.placedItem)?.letter}
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-600 mt-2" />
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-3xl text-gray-500">{zone.letter}</div>
                          <button
                            onClick={() => playSound(zone.soundFile)}
                            className="mt-2 p-2 bg-white rounded-full shadow hover:bg-gray-50"
                          >
                            <Volume2 className="w-4 h-4 text-[#00B4D8]" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How to Play</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Drag letter cards from the left to the matching sound zones on the right</li>
              <li>Click the speaker icon to hear the letter sound</li>
              <li>Match all letters correctly to win the game</li>
              <li>Try to get 100% accuracy!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}