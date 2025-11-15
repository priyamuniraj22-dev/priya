import { useState } from 'react';
import { AudioProvider } from './contexts/AudioContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Levels from './components/Levels';
import GamesHub from './components/GamesHub';
import GameLauncher from './components/GameLauncher';
import About from './components/About';
import MediaDemo from './components/MediaDemo';
import AudioTest from './components/AudioTest';
import Progress from './components/Progress';
import { Level } from './types/course';

// Import course data
import { levels } from './data/courseData';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'levels' | 'games' | 'about' | 'media' | 'audio-test' | 'progress'>('home');
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<{ id: string; color: string } | null>(null);

  // Find the selected level
  const selectedLevel = levels.find(level => level.id === selectedLevelId) || null;

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'lessons':
        setCurrentPage('home');
        break;
      case 'games':
        setCurrentPage('games');
        break;
      case 'writing':
        // Not implemented yet
        break;
      case 'progress':
        setCurrentPage('progress');
        break;
      case 'about':
        setCurrentPage('about');
        break;
      case 'media-demo':
        setCurrentPage('media');
        break;
      case 'audio-test':
        setCurrentPage('audio-test');
        break;
      default:
        setCurrentPage('home');
    }
  };

  const handleGameStart = (gameId: string, levelColor: string) => {
    setActiveGame({ id: gameId, color: levelColor });
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const renderCurrentPage = () => {
    // If a game is active, show the game launcher
    if (activeGame) {
      return <GameLauncher gameId={activeGame.id} levelColor={activeGame.color} onClose={closeGame} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen flex flex-col">
            <Hero />
            <div className="flex-grow container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Levels 
                    onLevelSelect={setSelectedLevelId} 
                  />
                </div>
                <div>
                  <Progress onBack={() => setCurrentPage('home')} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'levels':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <Levels onLevelSelect={setSelectedLevelId} />
            </div>
          </div>
        );
      case 'games':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <GamesHub 
                onBack={() => setCurrentPage('home')} 
                onGameStart={handleGameStart} 
              />
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <About onBack={() => setCurrentPage('home')} />
            </div>
          </div>
        );
      case 'media':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <MediaDemo onBack={() => setCurrentPage('home')} />
            </div>
          </div>
        );
      case 'audio-test':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <AudioTest />
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <Progress onBack={() => setCurrentPage('home')} />
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen flex flex-col">
            <Hero />
            <div className="flex-grow container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Levels 
                    onLevelSelect={setSelectedLevelId} 
                  />
                </div>
                <div>
                  <Progress onBack={() => setCurrentPage('home')} />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
        <Header 
          onNavigation={handleNavigation} 
        />
        <main className="flex-grow">
          {renderCurrentPage()}
        </main>
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} PhonicsPlayhouse. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AudioProvider>
  );
}

export default App;