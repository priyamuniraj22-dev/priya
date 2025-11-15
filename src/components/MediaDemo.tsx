import { useState } from 'react';
import { Volume2, Play, Pause, Square, BookOpen } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/mediaPlayer';

interface MediaDemoProps {
  onBack: () => void;
}

export default function MediaDemo({ onBack }: MediaDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const handlePlayAudio = (fileName: string) => {
    playAudio(fileName);
    setCurrentAudio(fileName);
    setIsPlaying(true);
    
    // Simulate audio ending
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentAudio(null);
    }, 3000);
  };

  const handleStopAudio = () => {
    stopAudio();
    setIsPlaying(false);
    setCurrentAudio(null);
  };

  const sampleAudioFiles = [
    { id: 'letter_a.mp3', name: 'Letter A Sound' },
    { id: 'letter_b.mp3', name: 'Letter B Sound' },
    { id: 'word_cat.mp3', name: 'Word "Cat"' },
    { id: 'word_dog.mp3', name: 'Word "Dog"' },
    { id: 'correct_letter.mp3', name: 'Correct Answer' },
    { id: 'incorrect_letter.mp3', name: 'Incorrect Answer' },
  ];

  const sampleVideoFiles = [
    { id: 'letter_a.mp4', name: 'Letter A Animation' },
    { id: 'letter_b.mp4', name: 'Letter B Animation' },
    { id: 'word_cat.mp4', name: 'Word "Cat" Formation' },
    { id: 'word_dog.mp4', name: 'Word "Dog" Formation' },
    { id: 'lesson_L1_C1.mp4', name: 'Lesson L1-C1 Intro' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Media Demo</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Audio Demo Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              Audio Demo
            </h2>
            
            <div className="space-y-4">
              {sampleAudioFiles.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">{file.id}</p>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(file.id)}
                    disabled={isPlaying && currentAudio === file.id}
                    className={`p-2 md:p-3 rounded-full ${
                      isPlaying && currentAudio === file.id
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    } transition-colors`}
                  >
                    {isPlaying && currentAudio === file.id ? (
                      <Pause className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Play className="w-4 h-4 md:w-5 md:h-5" />
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
                    Playing: {currentAudio}
                  </span>
                </div>
                <button
                  onClick={handleStopAudio}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <Square className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Video Demo Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              Video Demo
            </h2>
            
            <div className="space-y-4">
              {sampleVideoFiles.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">{file.id}</p>
                  </div>
                  <button
                    className="p-2 md:p-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Play className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Video Player</p>
                <p className="text-sm text-gray-400 mt-1">Click a video to play</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-600" />
            How to Use Media Files
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Place audio files in the <code className="bg-yellow-100 px-1 rounded">public/audio</code> directory</li>
            <li>Place video files in the <code className="bg-yellow-100 px-1 rounded">public/video</code> directory</li>
            <li>Use the <code className="bg-yellow-100 px-1 rounded">playAudio()</code> function to play audio files</li>
            <li>Use the <code className="bg-yellow-100 px-1 rounded">playVideo()</code> function to play video files</li>
            <li>Refer to the naming conventions in the documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}