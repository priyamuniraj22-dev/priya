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
          <div>
            <Hero />
            <div className="max-w-6xl mx-auto px-4 py-12">
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
        return <Levels onLevelSelect={setSelectedLevelId} />;
      case 'games':
        return (
          <GamesHub 
            onBack={() => setCurrentPage('home')} 
            onGameStart={handleGameStart} 
          />
        );
      case 'about':
        return <About onBack={() => setCurrentPage('home')} />;
      case 'media':
        return <MediaDemo onBack={() => setCurrentPage('home')} />;
      case 'audio-test':
        return <AudioTest />;
      case 'progress':
        return <Progress onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <div>
            <Hero />
            <div className="max-w-6xl mx-auto px-4 py-12">
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Header 
          onNavigation={handleNavigation} 
        />
        <main>
          {renderCurrentPage()}
        </main>
      </div>
    </AudioProvider>
  );
}

export default App;