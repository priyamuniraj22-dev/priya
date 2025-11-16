import { BookOpen, Sparkles } from 'lucide-react';
import TestAudioButton from './TestAudioButton';
import AudioContextTest from './AudioContextTest';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFB703] via-[#00B4D8] to-[#8B5CF6] py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Interactive Phonics Learning</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Make Reading <span className="text-[#FFB703]">Fun</span> & <span className="text-[#00B4D8]">Easy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Engaging games and activities that help children master phonics, build vocabulary, and develop reading confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap">
              Start Free Trial
            </button>
            <button className="bg-black/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black/30 transition-all border border-white/30 whitespace-nowrap">
              Watch Demo
            </button>
          </div>
          
          {/* Test Audio Button */}
          <div className="max-w-md mx-auto mb-8">
            <TestAudioButton />
          </div>
          
          {/* Audio Context Test */}
          <div className="max-w-md mx-auto">
            <AudioContextTest />
          </div>
          
          {/* Simple test to check if the page is rendering */}
          <div className="max-w-md mx-auto mt-8 p-4 bg-green-100 rounded-lg">
            <p className="text-green-800 font-bold">Hero component is rendering correctly!</p>
          </div>
        </div>
      </div>
    </section>
  );
}