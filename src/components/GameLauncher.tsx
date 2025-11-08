import LetterFishing from './games/LetterFishing';
import SoundTreasureHunt from './games/SoundTreasureHunt';
import CVCBuilder from './games/CVCBuilder';

interface GameLauncherProps {
  gameId: string;
  levelColor: string;
  onClose: () => void;
}

export default function GameLauncher({ gameId, levelColor, onClose }: GameLauncherProps) {
  switch (gameId) {
    case 'G1':
      return <LetterFishing onClose={onClose} levelColor={levelColor} />;
    case 'G2':
      return <SoundTreasureHunt onClose={onClose} levelColor={levelColor} />;
    case 'G3':
      return <CVCBuilder onClose={onClose} levelColor={levelColor} />;
    default:
      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 mb-6">This game is being developed and will be available soon.</p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-semibold text-white"
              style={{ backgroundColor: levelColor }}
            >
              Close
            </button>
          </div>
        </div>
      );
  }
}
