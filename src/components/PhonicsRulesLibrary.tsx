import { useState } from 'react';
import { Play, Volume2, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { playAudio } from '../utils/mediaPlayer';
import { phonicsRules } from '../data/phonicsScope';
import AnimatedPhonicsRule from './AnimatedPhonicsRule';

export default function PhonicsRulesLibrary() {
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlayAudio = (audioFile: string, ruleId: string) => {
    setIsPlaying(ruleId);
    playAudio(audioFile);
    // Simulate audio ending
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const toggleRule = (ruleId: string) => {
    setExpandedRuleId(expandedRuleId === ruleId ? null : ruleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Phonics Rules Library</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn the essential phonics rules that will help you decode words and become a confident reader!
            </p>
          </div>

          <div className="space-y-4">
            {phonicsRules.map((rule) => (
              <div 
                key={rule.id} 
                className="border-2 border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-blue-300"
              >
                <button
                  onClick={() => toggleRule(rule.id)}
                  className="w-full p-5 bg-white hover:bg-blue-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">{rule.name}</h3>
                      <p className="text-gray-600 text-sm">{rule.description.substring(0, 60)}...</p>
                    </div>
                  </div>
                  {expandedRuleId === rule.id ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {expandedRuleId === rule.id && (
                  <div className="p-5 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                    <AnimatedPhonicsRule rule={rule} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3">How to Use This Library</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Start with the basics: Closed Syllable and Open Syllable rules</li>
              <li>Practice each rule with the interactive activities</li>
              <li>Review rules regularly to reinforce your learning</li>
              <li>Use the example words to practice reading and spelling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}