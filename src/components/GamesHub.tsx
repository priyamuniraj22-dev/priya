import { ArrowLeft, Play } from 'lucide-react';
import { levels } from '../data/courseData';

interface GamesHubProps {
  onBack: () => void;
  onGameStart: (gameId: string, levelColor: string) => void;
}

const allGames = [
  {
    id: 'G1',
    name: 'Letter Fishing',
    description: 'Catch fish labeled with target letters',
    icon: '🎣',
    color: '#FFB703',
    difficulty: 'Beginner',
  },
  {
    id: 'G2',
    name: 'Sound Treasure Hunt',
    description: 'Tap objects that start with the played sound',
    icon: '🎯',
    color: '#00B4D8',
    difficulty: 'Beginner',
  },
  {
    id: 'G3',
    name: 'CVC Builder',
    description: 'Drag letters to form three-letter words',
    icon: '🧩',
    color: '#FF6363',
    difficulty: 'Foundations',
  },
  {
    id: 'G4',
    name: 'Rhyme Race',
    description: 'Choose the picture that rhymes',
    icon: '🏃',
    color: '#8B5CF6',
    difficulty: 'Foundations',
  },
  {
    id: 'G5',
    name: 'Phonics Bingo',
    description: 'Cover words said by the host',
    icon: '🎲',
    color: '#10B981',
    difficulty: 'Foundations',
  },
  {
    id: 'G6',
    name: 'Mystery Word Puzzle',
    description: 'Solve puzzles with digraph tiles',
    icon: '🔍',
    color: '#F59E0B',
    difficulty: 'Intermediate',
  },
];

export default function GamesHub({ onBack, onGameStart }: GamesHubProps) {
  const getColorForGame = (gameId: string) => {
    const gameColorMap: Record<string, string> = {
      'G1': levels[0].color,
      'G2': levels[0].color,
      'G3': levels[1].color,
      'G4': levels[1].color,
      'G5': levels[1].color,
      'G6': levels[2].color,
    };
    return gameColorMap[gameId] || '#FFB703';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Phonics Games</h1>
          <p className="text-xl text-gray-700">
            Enjoy our collection of interactive games designed to make learning phonics fun and engaging!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allGames.map((game) => {
            const gameColor = getColorForGame(game.id);
            return (
              <div
                key={game.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className="h-24 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${gameColor}20` }}
                >
                  {game.icon}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{game.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{game.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${gameColor}20`, color: gameColor }}
                    >
                      {game.difficulty}
                    </span>
                    <div className="flex items-center gap-1" style={{ color: gameColor }}>
                      <span className="font-semibold">★★★★★</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onGameStart(game.id, gameColor)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: gameColor }}
                  >
                    <Play className="w-5 h-5" />
                    Play Now
                  </button>
                </div>
              </div>
            );
          })}

          <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center min-h-[320px]">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Coming Soon</h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              More exciting games are being developed. Stay tuned for new adventures!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
