import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Zap, 
  Heart, 
  Target, 
  Calendar, 
  Award, 
  Play, 
  BookCheck,
  TrendingUp,
  Clock,
  User
} from 'lucide-react';
import { getUserDashboardData } from '../services/progressService';
import { User as UserType, UserProgress, GameScore, Badge, LessonProgress, VideoProgress } from '../types/database';

interface StudentDashboardProps {
  studentName: string;
  userId: string;
  onNavigate: (section: string) => void;
}

export default function StudentDashboard({ studentName, userId, onNavigate }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'activity'>('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getUserDashboardData(userId);
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!dashboardData) return 0;
    
    const completedLessons = dashboardData.lessonProgress?.filter((lp: LessonProgress) => lp.completed_at).length || 0;
    const totalLessons = dashboardData.lessonProgress?.length || 1;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  // Calculate badges earned
  const calculateBadgesEarned = () => {
    if (!dashboardData) return { earned: 0, total: 0 };
    
    const earned = dashboardData.badges?.length || 0;
    const total = dashboardData.badges?.length || 0; // In a real app, this would come from available badges
    return { earned, total };
  };

  // Calculate total score
  const calculateTotalScore = () => {
    if (!dashboardData) return 0;
    
    const gameScores = dashboardData.gameScores?.reduce((sum: number, score: GameScore) => sum + (score.score || 0), 0) || 0;
    const lessonScores = dashboardData.lessonProgress?.reduce((sum: number, progress: LessonProgress) => sum + (progress.score || 0), 0) || 0;
    return gameScores + lessonScores;
  };

  // Mock data for UI elements that aren't yet in our database
  const mockLevelProgress = [
    { name: 'Beginner', progress: 100, color: '#FFB703' },
    { name: 'Foundations', progress: 75, color: '#00B4D8' },
    { name: 'Intermediate', progress: 40, color: '#FF6363' },
    { name: 'Advanced', progress: 10, color: '#8B5CF6' },
    { name: 'Excel', progress: 0, color: '#10B981' },
  ];

  const mockRecentActivity = [
    { date: 'Today', activity: 'Completed Letter Fishing game', score: 100, time: '2:30 PM' },
    { date: 'Yesterday', activity: 'Mastered letter sounds a-f', score: 60, time: '10:15 AM' },
    { date: '2 days ago', activity: 'Finished Beginner Level', score: 300, time: '4:20 PM' },
    { date: '3 days ago', activity: 'Watched Short Vowels video', score: 20, time: '9:45 AM' },
  ];

  const mockBadges = [
    { id: 1, name: 'Letter Master', icon: 'BookOpen', color: '#FFB703', earned: true, description: 'Completed all letter lessons' },
    { id: 2, name: 'Sound Star', icon: 'Star', color: '#00B4D8', earned: true, description: 'Mastered letter sounds' },
    { id: 3, name: 'Word Wizard', icon: 'Zap', color: '#FF6363', earned: true, description: 'Built 50 words' },
    { id: 4, name: 'Reading Rockstar', icon: 'Target', color: '#8B5CF6', earned: false, description: 'Read 100 sentences' },
    { id: 5, name: 'Writing Wonder', icon: 'Heart', color: '#10B981', earned: false, description: 'Completed all writing tasks' },
    { id: 6, name: 'Phonics Pro', icon: 'Trophy', color: '#F59E0B', earned: false, description: 'Completed all phonics levels' },
  ];

  const mockWeeklyGoals = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: false },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: false },
  ];

  const mockFavoriteActivities = [
    { id: 1, name: 'Letter Fishing', type: 'game', icon: 'Fish', progress: 85 },
    { id: 2, name: 'CVC Builder', type: 'game', icon: 'Box', progress: 70 },
    { id: 3, name: 'Short Vowels', type: 'lesson', icon: 'BookOpen', progress: 100 },
    { id: 4, name: 'Alphabet Songs', type: 'video', icon: 'Music', progress: 60 },
  ];

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      BookOpen, Star, Zap, Target, Heart, Trophy, Fish: Star, Box: BookOpen, Music: Star
    };
    return icons[iconName] || Trophy;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();
  const badgesEarned = calculateBadgesEarned();
  const totalScore = calculateTotalScore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {studentName}!</h1>
            <p className="text-gray-600">Let's continue your phonics learning journey</p>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{studentName}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#FFB703]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Overall Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{overallProgress}%</p>
              </div>
              <Target className="w-8 h-8 text-[#FFB703]" />
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#FFB703] h-2 rounded-full" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#00B4D8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{badgesEarned.earned}/{badgesEarned.total}</p>
              </div>
              <Trophy className="w-8 h-8 text-[#00B4D8]" />
            </div>
            <button 
              onClick={() => setActiveTab('badges')}
              className="mt-4 text-[#00B4D8] text-sm font-medium hover:underline"
            >
              View all badges
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#FF6363]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalScore}</p>
              </div>
              <Zap className="w-8 h-8 text-[#FF6363]" />
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span>+120 today</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#8B5CF6]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Weekly Goal</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {mockWeeklyGoals.filter(day => day.completed).length}/7
                </p>
              </div>
              <Calendar className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <div className="mt-4 flex gap-1">
              {mockWeeklyGoals.map((day, index) => (
                <div 
                  key={index}
                  className={`w-4 h-4 rounded-full ${day.completed ? 'bg-[#8B5CF6]' : 'bg-gray-200'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Level Progress</h2>
                <button 
                  onClick={() => onNavigate('levels')}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  View all levels
                </button>
              </div>
              <div className="space-y-5">
                {mockLevelProgress.map((level, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{level.name}</span>
                      <span className="text-sm text-gray-500">{level.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${level.progress}%`, 
                          backgroundColor: level.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Activities</h2>
                <button 
                  onClick={() => onNavigate('games')}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockFavoriteActivities.map((activity) => {
                  const IconComponent = getIconComponent(activity.icon);
                  return (
                    <div 
                      key={activity.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={() => onNavigate(activity.type === 'game' ? 'games' : activity.type === 'lesson' ? 'lessons' : 'videos')}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getIconComponent(activity.icon) === BookOpen ? '#00B4D8' : '#FFB703'}20` }}
                        >
                          <IconComponent 
                            className="w-6 h-6" 
                            style={{ color: getIconComponent(activity.icon) === BookOpen ? '#00B4D8' : '#FFB703' }} 
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{activity.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 flex-1">
                              <div 
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${activity.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{activity.progress}%</span>
                          </div>
                        </div>
                        <Play className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button 
                  onClick={() => setActiveTab('activity')}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.activity}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                        <span className="text-xs font-bold text-blue-500">+{activity.score} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Goal</h2>
              <div className="text-center py-4">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Complete 5 activities</p>
                <p className="text-sm text-gray-600 mt-1">
                  {mockWeeklyGoals.filter(day => day.completed).length} of 5 completed
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{ width: `${Math.min(mockWeeklyGoals.filter(day => day.completed).length * 20, 100)}%` }}
                  ></div>
                </div>
                <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section (shown when activeTab is 'badges') */}
        {activeTab === 'badges' && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Badges & Achievements</h2>
              <button 
                onClick={() => setActiveTab('overview')}
                className="text-blue-500 text-sm font-medium hover:underline"
              >
                Back to overview
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {mockBadges.map((badge) => {
                const IconComponent = getIconComponent(badge.icon);
                return (
                  <div
                    key={badge.id}
                    className={`text-center p-4 rounded-xl transition-all ${
                      badge.earned ? 'bg-gray-50 border border-gray-200' : 'opacity-60'
                    }`}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                      style={{
                        backgroundColor: badge.color,
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 mb-1">{badge.name}</h3>
                    <p className="text-xs text-gray-600 leading-tight">{badge.description}</p>
                    {!badge.earned && (
                      <p className="text-xs font-semibold text-gray-500 mt-2">Locked</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}