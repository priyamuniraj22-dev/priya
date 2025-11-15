import { useState, useEffect } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

interface WordCard {
  id: number;
  word: string;
  image: string;
  matched: boolean;
}

export default function CVCWordMatch() {
  const [cards, setCards] = useState<WordCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Sample words and images for the game
  const wordImages = [
    { word: 'cat', image: '🐱' },
    { word: 'dog', image: '🐶' },
    { word: 'hat', image: '🎩' },
    { word: 'sun', image: '☀️' },
    { word: 'cup', image: '☕' },
    { word: 'bus', image: '🚌' },
  ];

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Create pairs of cards
    const initialCards: WordCard[] = [];
    wordImages.forEach((item, index) => {
      initialCards.push(
        { id: index * 2, word: item.word, image: '', matched: false },
        { id: index * 2 + 1, word: item.word, image: item.image, matched: false }
      );
    });

    // Shuffle the cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (id: number) => {
    // Don't process if card is already matched or already flipped
    const card = cards.find(c => c.id === id);
    if (!card || card.matched || flippedCards.includes(id) || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const firstCard = cards.find(c => c.id === newFlippedCards[0]);
      const secondCard = cards.find(c => c.id === newFlippedCards[1]);

      if (firstCard && secondCard && firstCard.word === secondCard.word) {
        // Match found
        setTimeout(() => {
          setCards(cards.map(card => 
            card.id === firstCard.id || card.id === secondCard.id 
              ? { ...card, matched: true } 
              : card
          ));
          setFlippedCards([]);
          setMatchedPairs(matchedPairs + 1);
          
          // Check if game is complete
          if (matchedPairs + 1 === wordImages.length) {
            setGameComplete(true);
          }
        }, 1000);
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  const isCardFlipped = (id: number) => {
    return flippedCards.includes(id) || cards.find(c => c.id === id)?.matched;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">CVC Word Match</h1>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Match the word cards with their picture cards. Flip two cards at a time to find matching pairs!
          </p>
          
          {/* Game stats */}
          <div className="flex justify-between items-center mb-6 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00B4D8]">{moves}</div>
              <div className="text-gray-600">Moves</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B5CF6]">{matchedPairs}/{wordImages.length}</div>
              <div className="text-gray-600">Pairs Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFB703]">
                {wordImages.length > 0 ? Math.round((matchedPairs / wordImages.length) * 100) : 0}%
              </div>
              <div className="text-gray-600">Complete</div>
            </div>
          </div>
          
          {/* Game board */}
          {gameComplete ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-6">
                You matched all pairs in {moves} moves!
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 ${
                    isCardFlipped(card.id)
                      ? 'bg-white border-2 border-[#00B4D8]'
                      : 'bg-gradient-to-br from-[#FFB703] to-[#00B4D8] hover:from-[#e6a600] hover:to-[#009bc8]'
                  } flex items-center justify-center text-4xl shadow-md hover:shadow-lg`}
                >
                  {isCardFlipped(card.id) ? (
                    <div className="text-center">
                      {card.image ? (
                        <div className="text-5xl">{card.image}</div>
                      ) : (
                        <div className="text-2xl font-bold text-gray-900 uppercase">{card.word}</div>
                      )}
                      {card.matched && (
                        <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                          <Check className="w-12 h-12 text-green-600" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-4xl">❓</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Instructions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">How to Play</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Click on cards to flip them over</li>
              <li>Find matching pairs of words and pictures</li>
              <li>Try to match all pairs in as few moves as possible</li>
              <li>Matched pairs will stay face up</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}