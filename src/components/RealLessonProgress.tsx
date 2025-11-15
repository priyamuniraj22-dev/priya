import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import { getLessons, getLessonProgress } from '../services/progressService';
import { Lesson, LessonProgress } from '../types/database';

interface RealLessonProgressProps {
  userId: string;
  classId: string;
  onBack: () => void;
}

export default function RealLessonProgress({ userId, classId, onBack }: RealLessonProgressProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch lessons and progress in parallel
        const [lessonsData, progressData] = await Promise.all([
          getLessons(),
          getLessonProgress(userId)
        ]);
        
        setLessons(lessonsData);
        setLessonProgress(progressData);
        setError(null);
      } catch (err) {
        console.error('Error fetching lesson data:', err);
        setError('Failed to load lesson progress');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Group lessons by level
  const groupedLessons = lessons.reduce((acc: Record<string, Lesson[]>, lesson) => {
    if (!acc[lesson.level_id]) {
      acc[lesson.level_id] = [];
    }
    acc[lesson.level_id].push(lesson);
    return acc;
  }, {});

  // Get progress for a specific lesson
  const getLessonProgressById = (lessonId: string) => {
    return lessonProgress.find(progress => progress.lesson_id === lessonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your lessons...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Lessons</h1>
            <p className="text-gray-600">Track your progress through each lesson</p>
          </div>
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full font-medium shadow transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Lessons by Level */}
        {Object.entries(groupedLessons).map(([levelId, levelLessons]) => (
          <div key={levelId} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{levelId.replace('_', ' ')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levelLessons.map((lesson) => {
                const progress = getLessonProgressById(lesson.id);
                const isCompleted = progress?.completed_at !== null;
                const completionPercentage = progress?.completion_percentage || 0;
                
                return (
                  <div 
                    key={lesson.id} 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                  >
                    <div 
                      className="h-2 w-full"
                      style={{ backgroundColor: lesson.color }}
                    ></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{lesson.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{lesson.objective}</p>
                        </div>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Clock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          <span>{lesson.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Trophy className="w-4 h-4" />
                          <span>{progress?.score || 0} pts</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${completionPercentage}%`,
                              backgroundColor: lesson.color
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <button 
                        className={`w-full py-2 rounded-full font-medium transition-colors ${
                          isCompleted 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}