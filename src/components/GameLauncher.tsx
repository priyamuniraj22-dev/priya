import { useEffect } from 'react';
import { X } from 'lucide-react';
import LetterFishing from './games/LetterFishing';
import SoundTreasureHunt from './games/SoundTreasureHunt';
import CVCBuilder from './games/CVCBuilder';
import CVCWordMatch from './games/CVCWordMatch';
import LetterSoundDragDrop from './games/LetterSoundDragDrop';
import PhonicBingo from './games/PhonicsBingo';
import BlendBuilder from './games/BlendBuilder';
import ListenChooseSound from './games/ListenChooseSound';

interface GameLauncherProps {
  gameId: string;
  levelColor?: string;
  onClose: () => void;
}

export default function GameLauncher({ gameId, levelColor = '#FFB703', onClose }: GameLauncherProps) {
  useEffect(() => {
    // Prevent background scrolling when game is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const renderGame = () => {
    // Games that require props
    if (['letter-fishing', 'sound-treasure-hunt', 'cvc-builder'].includes(gameId)) {
      switch (gameId) {
        case 'letter-fishing':
          return <LetterFishing levelColor={levelColor} onClose={onClose} />;
        case 'sound-treasure-hunt':
          return <SoundTreasureHunt levelColor={levelColor} onClose={onClose} />;
        case 'cvc-builder':
          return <CVCBuilder levelColor={levelColor} onClose={onClose} />;
        default:
          return null;
      }
    }

    // Games that don't require props
    switch (gameId) {
      case 'cvc-word-match':
        return <CVCWordMatch />;
      case 'letter-sound-drag-drop':
        return <LetterSoundDragDrop />;
      case 'phonics-bingo':
        return <PhonicBingo />;
      case 'blend-builder':
        return <BlendBuilder />;
      case 'listen-choose-sound':
        return <ListenChooseSound />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you this game. Check back soon!
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#FFB703] hover:bg-[#e6a600] text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        {renderGame()}
      </div>
    </div>
  );
}