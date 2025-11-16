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
import AudioChecker from './components/AudioChecker';
import Progress from './components/Progress';
import WritingPractice from './components/WritingPractice';
import PhonicsSounds from './components/PhonicsSounds';
import VideosLibrary from './components/VideosLibrary';
import ReadingFun from './components/ReadingFun';
import MakeReadingFun from './components/MakeReadingFun';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import RealLessonProgress from './components/RealLessonProgress';
import RealGameScores from './components/RealGameScores';
import RealVideoProgress from './components/RealVideoProgress';
import RealBadgeProgress from './components/RealBadgeProgress';
import { Level } from './types/course';

// Import course data
import { levels } from './data/courseData';

// Mock user data - in a real app, this would come from authentication
const mockUser = {
  id: 'user-123',
  name: 'Emma Johnson',
  role: 'student' as 'student' | 'teacher',
  classId: 'class-456'
};

function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'levels' | 'games' | 'about' | 'media' | 'audio-test' | 'audio-checker' | 
    'progress' | 'writing' | 'videos' | 'phonics-sounds' | 'reading-fun' | 'make-reading-fun' |
    'student-dashboard' | 'teacher-dashboard' | 'real-lessons' | 'real-games' | 'real-videos' | 'real-badges'
  >('home');
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
        setCurrentPage('writing');
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
      case 'audio-checker':
        setCurrentPage('audio-checker');
        break;
      case 'videos':
        setCurrentPage('videos');
        break;
      case 'phonics-sounds':
        setCurrentPage('phonics-sounds');
        break;
      case 'reading-fun':
        setCurrentPage('reading-fun');
        break;
      case 'make-reading-fun':
        setCurrentPage('make-reading-fun');
        break;
      // New dashboard pages
      case 'student-dashboard':
        setCurrentPage('student-dashboard');
        break;
      case 'teacher-dashboard':
        setCurrentPage('teacher-dashboard');
        break;
      case 'real-lessons':
        setCurrentPage('real-lessons');
        break;
      case 'real-games':
        setCurrentPage('real-games');
        break;
      case 'real-videos':
        setCurrentPage('real-videos');
        break;
      case 'real-badges':
        setCurrentPage('real-badges');
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

  const handleBackToDashboard = () => {
    if (mockUser.role === 'student') {
      setCurrentPage('student-dashboard');
    } else {
      setCurrentPage('teacher-dashboard');
    }
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
      case 'audio-checker':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-4 py-12">
              <AudioChecker />
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
      case 'writing':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <WritingPractice />
            </div>
          </div>
        );
      case 'videos':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <VideosLibrary />
            </div>
          </div>
        );
      case 'phonics-sounds':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <PhonicsSounds />
            </div>
          </div>
        );
      case 'reading-fun':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <ReadingFun />
            </div>
          </div>
        );
      case 'make-reading-fun':
        return (
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <MakeReadingFun />
            </div>
          </div>
        );
      // New dashboard pages
      case 'student-dashboard':
        return (
          <StudentDashboard 
            studentName={mockUser.name} 
            userId={mockUser.id}
            onNavigate={handleNavigation} 
          />
        );
      case 'teacher-dashboard':
        return (
          <TeacherDashboard 
            teacherName={mockUser.name} 
            userId={mockUser.id}
          />
        );
      case 'real-lessons':
        return (
          <RealLessonProgress 
            userId={mockUser.id} 
            classId={mockUser.classId}
            onBack={handleBackToDashboard} 
          />
        );
      case 'real-games':
        return (
          <RealGameScores 
            userId={mockUser.id} 
            classId={mockUser.classId}
            onBack={handleBackToDashboard} 
          />
        );
      case 'real-videos':
        return (
          <RealVideoProgress 
            userId={mockUser.id} 
            onBack={handleBackToDashboard} 
          />
        );
      case 'real-badges':
        return (
          <RealBadgeProgress 
            userId={mockUser.id} 
            onBack={handleBackToDashboard} 
          />
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
  );
}

export default App;