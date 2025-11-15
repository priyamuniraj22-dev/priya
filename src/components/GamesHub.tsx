import { Game } from '../types/course';
import { Volume2, Zap, Fish, Sparkles, Box, Grid3x3, Shuffle, Ear } from 'lucide-react';

interface GamesHubProps {
  onBack: () => void;
  onGameStart: (gameId: string, levelColor: string) => void;
}

export default function GamesHub({ onBack, onGameStart }: GamesHubProps) {
  // Define all games
  const games: Game[] = [
    {
      id: 'letter-fishing',
      name: 'Letter Fishing',
      goal: 'Catch fish labeled with the target letters',
      mechanic: 'Drag-and-drop, reward sound when correct',
      icon: 'Fish',
      audioFiles: ['correct_letter.mp3', 'incorrect_letter.mp3'],
      videoFiles: ['game_intro.mp4']
    },
    {
      id: 'sound-treasure-hunt',
      name: 'Sound Treasure Hunt',
      goal: 'Tap on objects that start with the played sound',
      mechanic: 'Audio prompt, 3-second hint, confetti on success',
      icon: 'Sparkles',
      audioFiles: ['treasure_found.mp3', 'treasure_miss.mp3'],
      videoFiles: ['treasure_animation.mp4']
    },
    {
      id: 'cvc-builder',
      name: 'CVC Builder',
      goal: 'Build the word to match the picture',
      mechanic: 'Tile placement + audio confirmation',
      icon: 'Box',
      audioFiles: ['word_complete.mp3', 'word_incorrect.mp3'],
      videoFiles: ['tile_placement.mp4']
    },
    {
      id: 'phonics-bingo',
      name: 'Phonics Bingo',
      goal: 'Cover words said by the host',
      mechanic: 'Dynamic bingo card, progress badges',
      icon: 'Grid3x3',
      audioFiles: ['bingo_call.mp3', 'bingo_win.mp3'],
      videoFiles: ['bingo_card.mp4']
    },
    {
      id: 'cvc-word-match',
      name: 'CVC Word Match',
      goal: 'Match word cards with picture cards',
      mechanic: 'Memory matching game',
      icon: 'Zap',
      audioFiles: ['correct_letter.mp3', 'incorrect_letter.mp3'],
      videoFiles: ['matching_game.mp4']
    },
    {
      id: 'letter-sound-drag-drop',
      name: 'Letter Sound Drag & Drop',
      goal: 'Drag letters to match their sounds',
      mechanic: 'Drag and drop with audio feedback',
      icon: 'Shuffle',
      audioFiles: ['letter_a.mp3', 'letter_b.mp3', 'letter_c.mp3'],
      videoFiles: ['drag_drop_demo.mp4']
    },
    {
      id: 'blend-builder',
      name: 'Blend Builder',
      goal: 'Identify the correct blend for words',
      mechanic: 'Multiple choice with audio',
      icon: 'Volume2',
      audioFiles: ['blend_bl.mp3', 'blend_gr.mp3'],
      videoFiles: ['blend_builder.mp4']
    },
    {
      id: 'listen-choose-sound',
      name: 'Listen & Choose Sound',
      goal: 'Listen to sounds and choose matching pictures',
      mechanic: 'Audio recognition with visual choices',
      icon: 'Ear',
      audioFiles: ['letter_a.mp3', 'letter_b.mp3'],
      videoFiles: ['listen_choose.mp4']
    }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Fish': return Fish;
      case 'Sparkles': return Sparkles;
      case 'Box': return Box;
      case 'Grid3x3': return Grid3x3;
      case 'Zap': return Zap;
      case 'Shuffle': return Shuffle;
      case 'Volume2': return Volume2;
      case 'Ear': return Ear;
      default: return Zap;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Phonics Games</h1>
              <p className="text-gray-600 mt-2">
                Fun and educational games to practice your phonics skills!
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => {
            const IconComponent = getIconComponent(game.icon);
            return (
              <div
                key={game.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => onGameStart(game.id, '#FFB703')}
              >
                <div className="bg-gradient-to-r from-[#FFB703] to-[#00B4D8] p-6">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{game.name}</h3>
                  <p className="text-gray-600 mb-4">{game.goal}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {game.mechanic}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">How to Play</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Click on any game card to start playing</li>
            <li>Listen carefully to the audio instructions</li>
            <li>Complete each game to earn points and badges</li>
            <li>Track your progress in the Progress section</li>
          </ul>
        </div>
      </div>
    </div>
  );
}