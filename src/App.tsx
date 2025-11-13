import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Levels from './components/Levels';
import LevelDetail from './components/LevelDetail';
import ClassDetail from './components/ClassDetail';
import GameLauncher from './components/GameLauncher';
import GamesHub from './components/GamesHub';
import WritingPractice from './components/WritingPractice';
import Progress from './components/Progress';
import About from './components/About';
import MediaDemo from './components/MediaDemo';
import { AudioProvider } from './contexts/AudioContext';
import { levels, classes } from './data/courseData';

type View =
  | { type: 'home' }
  | { type: 'level'; levelId: string }
  | { type: 'class'; classId: string }
  | { type: 'game'; gameId: string; levelColor: string }
  | { type: 'games-hub' }
  | { type: 'writing' }
  | { type: 'progress' }
  | { type: 'about' }
  | { type: 'media-demo' };

function App() {
  const [view, setView] = useState<View>({ type: 'home' });

  const handleLevelSelect = (levelId: string) => {
    setView({ type: 'level', levelId });
  };

  const handleClassSelect = (classId: string) => {
    setView({ type: 'class', classId });
  };

  const handleGameStart = (gameId: string, levelColor: string) => {
    setView({ type: 'game', gameId, levelColor });
  };

  const handleBack = () => {
    if (view.type === 'class') {
      const classData = classes.find(c => c.id === view.classId);
      if (classData) {
        setView({ type: 'level', levelId: classData.levelId });
      }
    } else {
      setView({ type: 'home' });
    }
  };

  const handleGameClose = () => {
    if (view.type === 'game') {
      const previousView = view;
      setView({ type: 'home' });
      setTimeout(() => {
        const allClasses = classes;
        const currentClass = allClasses.find(c =>
          c.games.some(g => g.id === previousView.gameId)
        );
        if (currentClass) {
          setView({ type: 'class', classId: currentClass.id });
        }
      }, 0);
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onNavigation={(section) => {
            switch (section) {
              case 'lessons':
                setView({ type: 'home' });
                break;
              case 'games':
                setView({ type: 'games-hub' });
                break;
              case 'writing':
                setView({ type: 'writing' });
                break;
              case 'progress':
                setView({ type: 'progress' });
                break;
              case 'about':
                setView({ type: 'about' });
                break;
              case 'media-demo':
                setView({ type: 'media-demo' });
                break;
              default:
                setView({ type: 'home' });
            }
          }}
        />

        {view.type === 'home' && (
          <>
            <Hero />
            <Levels onLevelSelect={handleLevelSelect} />
          </>
        )}

        {view.type === 'level' && (
          <LevelDetail
            level={levels.find(l => l.id === view.levelId)!}
            classes={classes.filter(c => c.levelId === view.levelId)}
            onBack={handleBack}
            onClassSelect={handleClassSelect}
          />
        )}

        {view.type === 'class' && (() => {
          const classData = classes.find(c => c.id === view.classId);
          const level = levels.find(l => l.id === classData?.levelId);
          if (!classData || !level) return null;

          return (
            <ClassDetail
              classData={classData}
              levelColor={level.color}
              onBack={handleBack}
              onStartGame={(gameId) => handleGameStart(gameId, level.color)}
            />
          );
        })()}

        {view.type === 'game' && (
          <GameLauncher
            gameId={view.gameId}
            levelColor={view.levelColor}
            onClose={handleGameClose}
          />
        )}

        {view.type === 'games-hub' && (
          <GamesHub
            onBack={() => setView({ type: 'home' })}
            onGameStart={(gameId, color) => setView({ type: 'game', gameId, levelColor: color })}
          />
        )}

        {view.type === 'writing' && (
          <WritingPractice
            onBack={() => setView({ type: 'home' })}
            levelColor="#FFB703"
          />
        )}

        {view.type === 'progress' && (
          <Progress onBack={() => setView({ type: 'home' })} />
        )}

        {view.type === 'about' && (
          <About onBack={() => setView({ type: 'home' })} />
        )}

        {view.type === 'media-demo' && (
          <MediaDemo onBack={() => setView({ type: 'home' })} />
        )}
      </div>
    </AudioProvider>
  );
}

export default App;