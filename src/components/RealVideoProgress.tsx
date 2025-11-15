import { useState, useEffect } from 'react';
import { Play, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { getVideos, getVideoProgress } from '../services/progressService';
import { Video, VideoProgress } from '../types/database';

interface RealVideoProgressProps {
  userId: string;
  onBack: () => void;
}

export default function RealVideoProgress({ userId, onBack }: RealVideoProgressProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoProgress, setVideoProgress] = useState<VideoProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        // Fetch videos and progress in parallel
        const [videosData, progressData] = await Promise.all([
          getVideos(),
          getVideoProgress(userId)
        ]);
        
        setVideos(videosData);
        setVideoProgress(progressData);
        setError(null);
      } catch (err) {
        console.error('Error fetching video data:', err);
        setError('Failed to load video progress');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchVideoData();
    }
  }, [userId]);

  // Group videos by category
  const groupedVideos = videos.reduce((acc: Record<string, Video[]>, video) => {
    if (!acc[video.category]) {
      acc[video.category] = [];
    }
    acc[video.category].push(video);
    return acc;
  }, {});

  // Get progress for a specific video
  const getVideoProgressById = (videoId: string) => {
    return videoProgress.find(progress => progress.video_id === videoId);
  };

  // Calculate statistics
  const watchedVideos = videoProgress.filter(progress => progress.completed_at).length;
  const totalVideos = videos.length;
  const watchPercentage = totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your videos...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">My Videos</h1>
            <p className="text-gray-600">Watch and track your progress through our video lessons</p>
          </div>
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full font-medium shadow transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Videos Watched</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{watchedVideos} of {totalVideos}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{watchPercentage}%</p>
            </div>
            <div className="w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#00B4D8"
                  strokeWidth="3"
                  strokeDasharray={`${watchPercentage}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fill="#00B4D8" fontSize="8" fontWeight="bold">
                  {watchPercentage}%
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Videos by Category */}
        {Object.entries(groupedVideos).map(([category, categoryVideos]) => {
          // Sort videos by title
          const sortedVideos = [...categoryVideos].sort((a, b) => a.title.localeCompare(b.title));
          
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVideos.map((video) => {
                  const progress = getVideoProgressById(video.id);
                  const isCompleted = progress?.completed_at !== null;
                  const completionPercentage = progress?.completion_percentage || 0;
                  
                  return (
                    <div 
                      key={video.id} 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                      <div className="relative">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-blue-500 bg-opacity-80 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{video.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{video.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{video.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <BookOpen className="w-4 h-4" />
                            <span className="capitalize">{video.level_id?.replace('_', ' ') || 'General'}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium text-gray-900">{completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <button 
                          className={`w-full py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2 ${
                            isCompleted 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          {isCompleted ? 'Replay' : 'Play Video'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}