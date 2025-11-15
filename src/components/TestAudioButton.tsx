import { useState } from 'react';
import { Volume2, Play, Square } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/mediaPlayer';

export default function TestAudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const handlePlay = () => {
    // Play a test sound
    playAudio('letter_a.mp3');
    setCurrentFile('letter_a.mp3');
    setIsPlaying(true);
    
    // Auto-stop after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentFile(null);
    }, 3000);
  };

  const handleStop = () => {
    stopAudio();
    setIsPlaying(false);
    setCurrentFile(null);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-blue-600" />
        Audio Test
      </h3>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isPlaying 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <Play className="w-4 h-4" />
          Play Test Sound
        </button>
        
        <button
          onClick={handleStop}
          disabled={!isPlaying}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            !isPlaying 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          <Square className="w-4 h-4" />
          Stop
        </button>
      </div>
      
      {isPlaying && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-blue-800 font-medium">
            Playing: {currentFile}
          </span>
        </div>
      )}
    </div>
  );
}