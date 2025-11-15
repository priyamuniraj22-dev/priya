import { useState, useEffect } from 'react';
import { Volume2, Play, Square, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AudioChecker() {
  const [audioStatus, setAudioStatus] = useState<Record<string, 'available' | 'missing' | 'checking'>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  // List of common phonics audio files to check
  const audioFiles = [
    'letter_a.mp3',
    'letter_b.mp3',
    'letter_c.mp3',
    'vowel_a.mp3',
    'vowel_e.mp3',
    'word_cat.mp3',
    'word_dog.mp3',
    'correct_letter.mp3',
    'incorrect_letter.mp3',
    'word_complete.mp3',
    'word_incorrect.mp3'
  ];

  // Check if audio files exist and have content
  const checkAudioFiles = async () => {
    const status: Record<string, 'available' | 'missing' | 'checking'> = {};
    
    for (const file of audioFiles) {
      status[file] = 'checking';
      setAudioStatus({ ...status });
      
      try {
        const response = await fetch(`/audio/${file}`);
        if (response.ok) {
          const contentLength = response.headers.get('content-length');
          if (contentLength && parseInt(contentLength) > 0) {
            status[file] = 'available';
          } else {
            status[file] = 'missing';
          }
        } else {
          status[file] = 'missing';
        }
      } catch (error) {
        console.warn(`Error checking ${file}:`, error);
        status[file] = 'missing';
      }
      
      setAudioStatus({ ...status });
    }
  };

  // Play a test sound
  const playTestSound = (fileName: string) => {
    const audio = new Audio(`/audio/${fileName}`);
    audio.play().then(() => {
      setIsPlaying(true);
      setCurrentFile(fileName);
      setTimeout(() => {
        setIsPlaying(false);
        setCurrentFile(null);
      }, 3000);
    }).catch(() => {
      // Fallback sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.2;
      
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        setIsPlaying(false);
        setCurrentFile(null);
      }, 300);
      
      setIsPlaying(true);
      setCurrentFile(`${fileName} (fallback)`);
    });
  };

  // Stop currently playing audio
  const stopAudio = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentFile(null);
    }
  };

  useEffect(() => {
    checkAudioFiles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Audio File Checker</h1>
            <p className="text-gray-600">Check if phonics audio files are properly installed</p>
          </div>
          <button
            onClick={checkAudioFiles}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Refresh Check
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            Audio Files Status
          </h2>
          
          <div className="space-y-4">
            {audioFiles.map((file) => (
              <div 
                key={file}
                className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {audioStatus[file] === 'available' && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {audioStatus[file] === 'missing' && <XCircle className="w-5 h-5 text-red-500" />}
                    {audioStatus[file] === 'checking' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                    {!audioStatus[file] && <Volume2 className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{file}</h4>
                    <p className="text-sm text-gray-500">
                      {audioStatus[file] === 'available' && 'Ready to play'}
                      {audioStatus[file] === 'missing' && 'File missing or empty'}
                      {audioStatus[file] === 'checking' && 'Checking...'}
                      {!audioStatus[file] && 'Not checked yet'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => playTestSound(file)}
                  disabled={isPlaying && currentFile === file}
                  className={`p-2 md:p-3 rounded-full ${
                    isPlaying && currentFile === file
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  } transition-colors`}
                >
                  {isPlaying && currentFile === file ? (
                    <Square className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {isPlaying && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="font-medium text-blue-900">
                  Playing: {currentFile}
                </span>
              </div>
              <button
                onClick={stopAudio}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Audio File Status Guide</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Available (Green Check)</p>
                <p className="text-sm">The audio file exists and has content. It should play correctly in the application.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Missing (Red X)</p>
                <p className="text-sm">The audio file is missing or empty (0KB). The application will play a fallback sound instead.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Checking (Yellow Triangle)</p>
                <p className="text-sm">The system is currently checking the status of this audio file.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-yellow-200">
            <h4 className="font-bold text-gray-900 mb-2">To Fix Missing Audio Files:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Navigate to the <code className="bg-yellow-100 px-1 rounded">public/audio/</code> directory</li>
              <li>Replace the 0KB placeholder files with actual MP3 audio files</li>
              <li>Ensure file names match exactly (e.g., <code className="bg-yellow-100 px-1 rounded">letter_a.mp3</code>)</li>
              <li>Use high-quality, clear recordings of phonics sounds</li>
              <li>Keep file sizes small for fast loading (under 100KB each)</li>
              <li>Click "Refresh Check" to verify your changes</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}