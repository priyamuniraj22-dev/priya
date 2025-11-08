import { Sparkles, Volume2, Pencil } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#FFB703]/10 via-[#00B4D8]/10 to-[#FF6363]/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#FFB703]" />
            <span className="text-sm font-medium text-gray-700">Fun, Playful Phonics for Confident Readers</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Reading Time into
            <span className="text-[#FFB703]"> Play Time</span>
          </h2>

          <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
            Interactive phonics lessons with games, audio activities, and writing prompts that make children love reading and writing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="bg-[#FFB703] text-white px-8 py-4 rounded-full hover:bg-[#e6a600] transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105">
              Start Your Journey
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full hover:bg-gray-50 transition-all font-semibold text-lg shadow-md border-2 border-gray-200">
              View All Levels
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#FFB703]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-7 h-7 text-[#FFB703]" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Interactive Games</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Engaging drag-and-drop games that make learning phonics fun and memorable
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#00B4D8]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Volume2 className="w-7 h-7 text-[#00B4D8]" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Audio-First Learning</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Listen, repeat, and record with instant feedback for perfect pronunciation
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#FF6363]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Pencil className="w-7 h-7 text-[#FF6363]" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Writing Practice</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From letter tracing to story creation, build writing confidence step by step
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
