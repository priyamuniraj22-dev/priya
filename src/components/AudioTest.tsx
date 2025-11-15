import { useState, useEffect } from 'react';
import { Volume2, Play, Square, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { playAudio, stopAudio } from '../utils/mediaPlayer';

export default function AudioTest() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, 'success' | 'error' | 'pending'>>({});

  // Common phonics audio files to test
  const testAudioFiles = [
    { id: 'letter_a.mp3', name: 'Letter A Sound', category: 'Letters' },
    { id: 'letter_b.mp3', name: 'Letter B Sound', category: 'Letters' },
    { id: 'letter_c.mp3', name: 'Letter C Sound', category: 'Letters' },
    { id: 'letter_d.mp3', name: 'Letter D Sound', category: 'Letters' },
    { id: 'vowel_a.mp3', name: 'Vowel A Sound', category: 'Vowels' },
    { id: 'vowel_e.mp3', name: 'Vowel E Sound', category: 'Vowels' },
    { id: 'vowel_i.mp3', name: 'Vowel I Sound', category: 'Vowels' },
    { id: 'vowel_o.mp3', name: 'Vowel O Sound', category: 'Vowels' },
    { id: 'vowel_u.mp3', name: 'Vowel U Sound', category: 'Vowels' },
    { id: 'word_cat.mp3', name: 'Word "Cat"', category: 'Words' },
    { id: 'word_dog.mp3', name: 'Word "Dog"', category: 'Words' },
    { id: 'word_bat.mp3', name: 'Word "Bat"', category: 'Words' },
    { id: 'correct_letter.mp3', name: 'Correct Answer', category: 'Feedback' },
    { id: 'incorrect_letter.mp3', name: 'Incorrect Answer', category: 'Feedback' },
    { id: 'word_complete.mp3', name: 'Word Complete', category: 'Feedback' },
    { id: 'word_incorrect.mp3', name: 'Word Incorrect', category: 'Feedback' },
  ];

  // Group files by category
  const groupedFiles = testAudioFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = [];
    }
    acc[file.category].push(file);
    return acc;
  }, {} as Record<string, typeof testAudioFiles>);

  const handlePlay = (fileName: string) => {
    // Update test result to pending
    setTestResults(prev => ({ ...prev, [fileName]: 'pending' }));
    
    // Play the audio
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

  // Test all files automatically
  const testAllFiles = () => {
    // Initialize all files as pending
    const initialResults: Record<string, 'pending'> = {};
    testAudioFiles.forEach(file => {
      initialResults[file.id] = 'pending';
    });
    setTestResults(initialResults);
    
    // Test each file with a delay
    testAudioFiles.forEach((file, index) => {
      setTimeout(() => {
        // In a real test, we would actually test the file
        // For now, we'll just mark them as errors since they're placeholders
        setTestResults(prev => ({ ...prev, [file.id]: 'error' }));
      }, index * 500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Phonics Audio Test</h1>
            <p className="text-gray-600">Test if phonics audio files are playing correctly</p>
          </div>
          <button
            onClick={testAllFiles}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test All Sounds
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-blue-600" />
            Phonics Sound Files
          </h2>
          
          <div className="space-y-8">
            {Object.entries(groupedFiles).map(([category, files]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {testResults[file.id] === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {testResults[file.id] === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                          {testResults[file.id] === 'pending' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                          {!testResults[file.id] && <Volume2 className="w-5 h-5 text-gray-400" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{file.name}</h4>
                          <p className="text-sm text-gray-500">{file.id}</p>
                        </div>
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
          <h3 className="text-xl font-bold text-gray-900 mb-3">Important Information</h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>Current Status:</strong> All audio files are placeholder files (0KB) and will play fallback sounds.</p>
            <p><strong>To Add Real Phonics Sounds:</strong></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Replace the placeholder files in <code className="bg-yellow-100 px-1 rounded">public/audio/</code> with actual MP3 audio files</li>
              <li>Ensure file names match exactly (e.g., <code className="bg-yellow-100 px-1 rounded">letter_a.mp3</code>)</li>
              <li>Use high-quality, clear recordings of phonics sounds</li>
              <li>Keep file sizes small for fast loading (under 100KB each)</li>
            </ol>
            <p><strong>Fallback Sounds:</strong> When audio files are missing or empty, you'll hear a distinctive fallback sound instead of the actual phonics sound.</p>
          </div>
        </div>
      </div>
    </div>
  );
}