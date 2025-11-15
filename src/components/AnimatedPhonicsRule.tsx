import { useState, useEffect } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { playAudio } from '../utils/mediaPlayer';

interface AnimatedPhonicsRuleProps {
  rule: {
    id: string;
    name: string;
    description: string;
    exampleWords: string[];
    diagram: string;
    audioExplanation: string;
    interactiveActivity: string;
  };
}

export default function AnimatedPhonicsRule({ rule }: AnimatedPhonicsRuleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    playAudio(rule.audioExplanation);
    // Simulate audio ending
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    // Simple animation sequence
    const steps = [0, 1, 2, 3, 4];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setAnimationStep(steps[stepIndex]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    }, 800);
  };

  // Example animation for Magic E rule
  const renderMagicEAnimation = () => {
    if (rule.id !== 'rule3') return null;
    
    return (
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 text-center">Magic E Animation</h4>
        
        <div className="flex flex-col items-center">
          {/* Animation visualization */}
          <div className="relative w-full h-32 mb-6">
            {/* Base word without E */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 1 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  C
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  A
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  T
                </div>
              </div>
              <div className="text-center mt-2 text-sm font-medium">/k/ /a/ /t/ → "cat"</div>
            </div>
            
            {/* Adding E with animation */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  C
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  A
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  T
                </div>
                <div className={`w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  animationStep >= 3 ? 'scale-125' : 'scale-100'
                }`}>
                  E
                </div>
              </div>
            </div>
            
            {/* Sound change visualization */}
            <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 3 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-sm font-medium">/k/ /a/ /t/ changes to</div>
                <div className="text-lg font-bold mt-1">/k/ /ā/ /t/ → "cate" (but E is silent!)</div>
              </div>
            </div>
            
            {/* Final word */}
            <div className={`absolute top-28 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 4 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-lg font-bold">C A T E → "cate" pronounced as /k/ /ā/ /t/</div>
                <div className="text-sm text-gray-600 mt-1">The E makes the A say its name!</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors ${
              isAnimating 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isAnimating ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Animating...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Play Animation
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Example animation for Closed Syllable rule
  const renderClosedSyllableAnimation = () => {
    if (rule.id !== 'rule1') return null;
    
    return (
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 text-center">Closed Syllable Animation</h4>
        
        <div className="flex flex-col items-center">
          {/* Animation visualization */}
          <div className="relative w-full h-32 mb-6">
            {/* Syllable structure */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 1 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  C
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  A
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  T
                </div>
              </div>
              <div className="text-center mt-2 text-sm font-medium">Closed Syllable</div>
            </div>
            
            {/* Highlight vowel */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 2 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  C
                </div>
                <div className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center font-bold text-lg animate-pulse">
                  A
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center font-bold text-lg">
                  T
                </div>
              </div>
            </div>
            
            {/* Short vowel sound */}
            <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 3 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-sm font-medium">Vowel is "closed in" by consonant</div>
                <div className="text-lg font-bold mt-1">Makes short vowel sound: /ă/</div>
              </div>
            </div>
            
            {/* Final pronunciation */}
            <div className={`absolute top-28 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              animationStep >= 4 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-lg font-bold">C-A-T → /k/ /ă/ /t/ → "cat"</div>
                <div className="text-sm text-gray-600 mt-1">The vowel says its short sound!</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors ${
              isAnimating 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isAnimating ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Animating...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Play Animation
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-gray-900 mb-3">Explanation</h4>
          <p className="text-gray-700 mb-4">{rule.description}</p>
          
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 mb-3">Example Words</h4>
            <div className="flex flex-wrap gap-2">
              {rule.exampleWords.map((word, index) => (
                <span 
                  key={index} 
                  className="bg-white px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={handlePlayAudio}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-bold transition-colors"
          >
            <Play className={`w-4 h-4 ${isPlaying ? 'hidden' : 'block'}`} />
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'block' : 'hidden'}`} />
            {isPlaying ? 'Playing...' : 'Listen to Explanation'}
          </button>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 mb-3">Animated Visualization</h4>
          {renderMagicEAnimation()}
          {renderClosedSyllableAnimation()}
          
          {!renderMagicEAnimation() && !renderClosedSyllableAnimation() && (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl w-full h-48 flex items-center justify-center">
              <span className="text-gray-500">Rule diagram visualization</span>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-bold text-gray-900 mb-3">Interactive Activity</h4>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-colors">
              Try Interactive Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}