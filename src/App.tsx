import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Levels from './components/Levels';
import LevelDetail from './components/LevelDetail';
import ClassDetail from './components/ClassDetail';
import GameLauncher from './components/GameLauncher';
import { levels, classes } from './data/courseData';

type View =
  | { type: 'home' }
  | { type: 'level'; levelId: string }
  | { type: 'class'; classId: string }
  | { type: 'game'; gameId: string; levelColor: string };

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
    <div className="min-h-screen bg-gray-50">
      <Header />

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
    </div>
  );
}

export default App;
