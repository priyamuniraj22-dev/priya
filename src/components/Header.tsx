import { BookOpen, Lamp, Menu, X, Volume2, Video, Music, Pencil, BookOpenCheck } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNavigation: (section: string) => void;
}

export default function Header({ onNavigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Lessons', action: 'lessons', icon: BookOpen },
    { label: 'Phonics Sounds', action: 'phonics-sounds', icon: Music },
    { label: 'Videos', action: 'videos', icon: Video },
    { label: 'Games', action: 'games', icon: Volume2 },
    { label: 'Writing', action: 'writing', icon: Pencil },
    { label: 'Reading Fun', action: 'reading-fun', icon: BookOpenCheck },
    { label: 'Progress', action: 'progress', icon: BookOpen },
    { label: 'About', action: 'about', icon: BookOpen },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigation('lessons')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <BookOpen className="w-10 h-10 text-[#FFB703]" strokeWidth={2.5} />
              <Lamp className="w-5 h-5 text-[#00B4D8] absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PhonicsPlayhouse</h1>
              <p className="text-xs text-gray-600 -mt-1">Play. Read. Write.</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.action}
                  onClick={() => onNavigation(item.action)}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#FFB703] transition-colors font-medium whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => onNavigation('lessons')}
              className="bg-[#FFB703] text-white px-6 py-2 rounded-full hover:bg-[#e6a600] transition-colors font-medium shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Start Learning
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.action}
                  onClick={() => {
                    onNavigation(item.action);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                onNavigation('lessons');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full text-left px-4 py-2 bg-[#FFB703] text-white rounded-lg font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Learning</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}