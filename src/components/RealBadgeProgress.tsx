import { useState, useEffect } from 'react';
import { Trophy, Star, Zap, BookOpen, Target, Heart } from 'lucide-react';
import { getUserBadges, getRewards } from '../services/progressService';
import { Badge, Reward } from '../types/database';

interface RealBadgeProgressProps {
  userId: string;
  onBack: () => void;
}

export default function RealBadgeProgress({ userId, onBack }: RealBadgeProgressProps) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadgeData = async () => {
      try {
        setLoading(true);
        // Fetch badges and rewards in parallel
        const [badgesData, rewardsData] = await Promise.all([
          getUserBadges(userId),
          getRewards()
        ]);
        
        setBadges(badgesData);
        setRewards(rewardsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching badge data:', err);
        setError('Failed to load badge progress');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBadgeData();
    }
  }, [userId]);

  // Group rewards by type
  const groupedRewards = rewards.reduce((acc: Record<string, Reward[]>, reward) => {
    if (!acc[reward.type]) {
      acc[reward.type] = [];
    }
    acc[reward.type].push(reward);
    return acc;
  }, {});

  // Get icon component for badge type
  const getIconComponent = (badgeType: string) => {
    const icons: Record<string, any> = {
      'letter': BookOpen,
      'sound': Star,
      'word': Zap,
      'reading': BookOpen,
      'achievement': Trophy,
      'completion': Target,
      'participation': Heart,
      'default': Trophy
    };
    
    const iconKey = badgeType.toLowerCase().split(' ')[0];
    return icons[iconKey] || icons.default;
  };

  // Calculate statistics
  const earnedBadges = badges.length;
  const totalBadges = rewards.filter(r => r.type === 'badge').length;
  const badgePercentage = totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your badges...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">My Badges & Rewards</h1>
            <p className="text-gray-600">Earn badges by completing activities and achieving milestones</p>
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
              <p className="text-gray-600">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{earnedBadges} of {totalBadges}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{badgePercentage}%</p>
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
                  stroke="#FFB703"
                  strokeWidth="3"
                  strokeDasharray={`${badgePercentage}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fill="#FFB703" fontSize="8" fontWeight="bold">
                  {badgePercentage}%
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Badges by Type */}
        {Object.entries(groupedRewards).map(([rewardType, typeRewards]) => {
          // Sort rewards by name
          const sortedRewards = [...typeRewards].sort((a, b) => a.name.localeCompare(b.name));
          
          return (
            <div key={rewardType} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{rewardType}s</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {sortedRewards.map((reward) => {
                  // Check if user has earned this reward
                  const earnedBadge = badges.find(b => b.badge_type === reward.id);
                  const IconComponent = getIconComponent(rewardType);
                  
                  return (
                    <div
                      key={reward.id}
                      className={`text-center p-4 rounded-xl transition-all ${
                        earnedBadge 
                          ? 'bg-gray-50 border border-gray-200' 
                          : 'opacity-60 bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                        style={{
                          backgroundColor: earnedBadge ? '#FFB703' : '#D1D5DB',
                        }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 mb-1">{reward.name}</h3>
                      <p className="text-xs text-gray-600 leading-tight line-clamp-2">{reward.description}</p>
                      {earnedBadge ? (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-green-600">Earned</p>
                          <p className="text-xs text-gray-500">
                            {new Date(earnedBadge.earned_at).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs font-semibold text-gray-500 mt-2">Locked</p>
                      )}
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