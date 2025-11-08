import { BookOpen, Lamp } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <BookOpen className="w-10 h-10 text-[#FFB703]" strokeWidth={2.5} />
              <Lamp className="w-5 h-5 text-[#00B4D8] absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PhonicsPlayhouse</h1>
              <p className="text-xs text-gray-600 -mt-1">Play. Read. Write.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#levels" className="text-gray-700 hover:text-[#FFB703] transition-colors font-medium">
              Levels
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#FFB703] transition-colors font-medium">
              About
            </a>
            <button className="bg-[#FFB703] text-white px-6 py-2 rounded-full hover:bg-[#e6a600] transition-colors font-medium shadow-md hover:shadow-lg">
              Start Learning
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
