import { useState } from 'react';
import { Volume2, Play, Square, AlertTriangle } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/mediaPlayer';

export default function TestAudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [playbackStatus, setPlaybackStatus] = useState<'success' | 'error' | 'playing' | null>(null);

  const handlePlay = () => {
    // Reset status
    setPlaybackStatus('playing');
    
    // Play a test sound
    playAudio('letter_a.mp3');
    setCurrentFile('letter_a.mp3');
    setIsPlaying(true);
    
    // Auto-stop after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentFile(null);
      // Since we're using placeholder files, we expect an error
      setPlaybackStatus('error');
    }, 3000);
  };

  const handleStop = () => {
    stopAudio();
    setIsPlaying(false);
    setCurrentFile(null);
    setPlaybackStatus(null);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-blue-600" />
        Audio Test
      </h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center ${
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center ${
            !isPlaying 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          <Square className="w-4 h-4" />
          Stop
        </button>
      </div>
      
      {playbackStatus === 'playing' && (
        <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-blue-800 font-medium">
            Playing: {currentFile}
          </span>
        </div>
      )}
      
      {playbackStatus === 'error' && (
        <div className="p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-medium">Placeholder Audio Detected</p>
            <p className="text-yellow-700 text-sm">
              This is a placeholder file. Replace <code className="bg-yellow-100 px-1 rounded">public/audio/letter_a.mp3</code> with a real phonics sound.
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Note:</strong> All audio files are currently placeholders. You'll hear a fallback sound instead of actual phonics sounds.</p>
      </div>
      
      {/* Add a simple test to check if the page is rendering */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-green-800 font-medium">Page is rendering correctly!</p>
      </div>
    </div>
  );
}