import { BookOpen, Play, Save, RotateCcw } from 'lucide-react';
import { useState, useRef } from 'react';

export default function MakeReadingFun() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePlayText = () => {
    if (text.trim() === '') return;
    
    setIsPlaying(true);
    // In a real app, this would use text-to-speech API
    console.log('Playing text:', text);
    
    // Simulate playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const handleSaveText = () => {
    if (text.trim() === '') return;
    
    // In a real app, this would save to localStorage or a database
    console.log('Saving text:', text);
    alert('Text saved successfully!');
  };

  const handleClearText = () => {
    setText('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const sampleTexts = [
    "The cat sat on the mat. The dog ran in the park.",
    "I like to read books. Reading is fun and exciting!",
    "The sun is bright. The sky is blue. Birds fly high."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-[#FFB703]" />
            <h1 className="text-3xl font-bold text-gray-900">Make Reading Fun</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Create your own stories and reading materials. Type your text and listen to it being read aloud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Text Editor</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearText}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </button>
                  <button
                    onClick={handleSaveText}
                    className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handlePlayText}
                    disabled={text.trim() === '' || isPlaying}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      text.trim() === '' || isPlaying
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#FFB703] hover:bg-[#e6a600] text-white'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    {isPlaying ? 'Playing...' : 'Play'}
                  </button>
                </div>
              </div>
              
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing your story here... You can write about anything you like!"
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB703] focus:border-[#FFB703] text-lg"
              />
              
              <div className="mt-4 text-sm text-gray-500">
                {text.length} characters | {text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words
              </div>
            </div>
          </div>

          {/* Sample Texts and Instructions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sample Texts</h2>
              <p className="text-gray-600 mb-4">
                Click on any sample text to load it into the editor:
              </p>
              <div className="space-y-3">
                {sampleTexts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setText(sample)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                  >
                    <div className="text-sm line-clamp-2">{sample}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="bg-[#FFB703] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
                  <span>Type your story in the text editor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#FFB703] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
                  <span>Click "Play" to hear your story read aloud</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#FFB703] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
                  <span>Use "Save" to save your story for later</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#FFB703] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
                  <span>Try the sample texts for inspiration</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}