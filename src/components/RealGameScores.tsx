import { useState, useEffect } from 'react';
import { Zap, Trophy, Target, Clock } from 'lucide-react';
import { getGameScores } from '../services/progressService';
import { GameScore } from '../types/database';

interface RealGameScoresProps {
  userId: string;
  classId: string;
  onBack: () => void;
}

export default function RealGameScores({ userId, classId, onBack }: RealGameScoresProps) {
  const [gameScores, setGameScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameScores = async () => {
      try {
        setLoading(true);
        const scores = await getGameScores(userId);
        setGameScores(scores);
        setError(null);
      } catch (err) {
        console.error('Error fetching game scores:', err);
        setError('Failed to load game scores');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchGameScores();
    }
  }, [userId]);

  // Group games by type/category
  const groupedGames = gameScores.reduce((acc: Record<string, GameScore[]>, score) => {
    // In a real implementation, we would have game metadata to determine categories
    // For now, we'll group by first letter of game_id as a placeholder
    const category = score.game_id.charAt(0).toUpperCase();
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(score);
    return acc;
  }, {});

  // Calculate statistics
  const totalScore = gameScores.reduce((sum, score) => sum + (score.score || 0), 0);
  const gamesPlayed = gameScores.length;
  const completedGames = gameScores.filter(score => score.completed).length;
  const bestScore = gameScores.length > 0 ? Math.max(...gameScores.map(score => score.score || 0)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your game scores...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">My Game Scores</h1>
            <p className="text-gray-600">See how you've performed in all the games</p>
          </div>
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full font-medium shadow transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#FFB703]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalScore}</p>
              </div>
              <Trophy className="w-8 h-8 text-[#FFB703]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#00B4D8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Games Played</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{gamesPlayed}</p>
              </div>
              <Zap className="w-8 h-8 text-[#00B4D8]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#FF6363]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{completedGames}</p>
              </div>
              <Target className="w-8 h-8 text-[#FF6363]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#8B5CF6]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Best Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{bestScore}</p>
              </div>
              <Clock className="w-8 h-8 text-[#8B5CF6]" />
            </div>
          </div>
        </div>

        {/* Games by Category */}
        {Object.entries(groupedGames).map(([category, scores]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Category {category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scores.map((score) => (
                <div 
                  key={score.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 capitalize">
                          {score.game_id.replace(/-/g, ' ')}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            score.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {score.completed ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{score.score}</div>
                        <div className="text-sm text-gray-600">points</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="w-4 h-4" />
                        <span>{score.play_count} plays</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="w-4 h-4" />
                        <span>{score.accuracy_percentage || 0}% accuracy</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Last played: {new Date(score.updated_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor((score.score || 0) / 20) 
                                ? 'bg-yellow-400' 
                                : 'bg-gray-200'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}