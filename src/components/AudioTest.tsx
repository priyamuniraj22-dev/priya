import { useState } from 'react';
import { Volume2, Play, Square } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/mediaPlayer';

export default function AudioTest() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const testAudioFiles = [
    { id: 'letter_a.mp3', name: 'Letter A' },
    { id: 'letter_b.mp3', name: 'Letter B' },
    { id: 'word_cat.mp3', name: 'Word Cat' },
    { id: 'word_dog.mp3', name: 'Word Dog' },
    { id: 'correct_letter.mp3', name: 'Correct' },
    { id: 'incorrect_letter.mp3', name: 'Incorrect' },
  ];

  const handlePlay = (fileName: string) => {
    playAudio(fileName);
    setCurrentFile(fileName);
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Audio Test</h1>
        <p className="text-gray-600 mb-8">Test if audio files are playing correctly</p>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-blue-600" />
            Test Audio Files
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testAudioFiles.map((file) => (
              <div 
                key={file.id}
                className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{file.name}</h3>
                  <p className="text-sm text-gray-500">{file.id}</p>
                </div>
                <button
                  onClick={() => handlePlay(file.id)}
                  disabled={isPlaying && currentFile === file.id}
                  className={`p-3 rounded-full ${
                    isPlaying && currentFile === file.id
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  } transition-colors`}
                >
                  {isPlaying && currentFile === file.id ? (
                    <Square className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {isPlaying && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="font-medium text-blue-900">
                  Playing: {currentFile}
                </span>
              </div>
              <button
                onClick={handleStop}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Troubleshooting</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Make sure your computer's volume is turned up</li>
            <li>Check that no other applications are blocking audio</li>
            <li>Try different browsers if audio doesn't work</li>
            <li>Ensure media files exist in the public/audio directory</li>
          </ul>
        </div>
      </div>
    </div>
  );
}