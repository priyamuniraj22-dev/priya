import { ArrowLeft, Trophy, Star, Zap, Heart, Target, BookOpen } from 'lucide-react';

interface ProgressProps {
  onBack: () => void;
}

const badges = [
  { id: 1, name: 'Letter Master', icon: 'BookOpen', color: '#FFB703', earned: true, description: 'Completed all letter lessons' },
  { id: 2, name: 'Sound Star', icon: 'Star', color: '#00B4D8', earned: true, description: 'Mastered letter sounds' },
  { id: 3, name: 'Word Wizard', icon: 'Zap', color: '#FF6363', earned: false, description: 'Built 50 words' },
  { id: 4, name: 'Reading Rockstar', icon: 'Target', color: '#8B5CF6', earned: false, description: 'Read 100 sentences' },
  { id: 5, name: 'Writing Wonder', icon: 'Heart', color: '#10B981', earned: false, description: 'Completed all writing tasks' },
  { id: 6, name: 'Phonics Pro', icon: 'Trophy', color: '#F59E0B', earned: false, description: 'Completed all phonics levels' },
];

const levelProgress = [
  { name: 'Beginner', progress: 100, classes: 3, completed: 3 },
  { name: 'Foundations', progress: 66, classes: 3, completed: 2 },
  { name: 'Intermediate', progress: 33, classes: 3, completed: 1 },
  { name: 'Advanced', progress: 0, classes: 3, completed: 0 },
  { name: 'Excel', progress: 0, classes: 3, completed: 0 },
];

const recentAchievements = [
  { date: 'Today', activity: 'Completed Letter Fishing game', score: 100 },
  { date: 'Yesterday', activity: 'Mastered letter sounds a-f', score: 60 },
  { date: '2 days ago', activity: 'Finished Beginner Level', score: 300 },
];

function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    BookOpen, Star, Zap, Target, Heart, Trophy
  };
  return icons[iconName] || Trophy;
}

export default function Progress({ onBack }: ProgressProps) {
  const totalProgress = Math.round(levelProgress.reduce((sum, l) => sum + l.progress, 0) / levelProgress.length);
  const totalBadgesEarned = badges.filter(b => b.earned).length;
  const totalScore = recentAchievements.reduce((sum, a) => sum + a.score, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#FFB703]/20 to-[#FFB703]/10 rounded-2xl p-8 border-2 border-[#FFB703]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Overall Progress</h3>
              <Target className="w-6 h-6 text-[#FFB703]" />
            </div>
            <div className="text-4xl font-bold text-[#FFB703] mb-2">{totalProgress}%</div>
            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${totalProgress}%`, backgroundColor: '#FFB703' }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00B4D8]/20 to-[#00B4D8]/10 rounded-2xl p-8 border-2 border-[#00B4D8]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Badges Earned</h3>
              <Trophy className="w-6 h-6 text-[#00B4D8]" />
            </div>
            <div className="text-4xl font-bold text-[#00B4D8] mb-2">{totalBadgesEarned}/{badges.length}</div>
            <p className="text-sm text-gray-600">Keep going to earn more!</p>
          </div>

          <div className="bg-gradient-to-br from-[#FF6363]/20 to-[#FF6363]/10 rounded-2xl p-8 border-2 border-[#FF6363]/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Total Score</h3>
              <Zap className="w-6 h-6 text-[#FF6363]" />
            </div>
            <div className="text-4xl font-bold text-[#FF6363] mb-2">{totalScore}</div>
            <p className="text-sm text-gray-600">Points from games and lessons</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Level Progress</h2>
              <div className="space-y-6">
                {levelProgress.map((level, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{level.name}</h3>
                      <span className="text-sm font-medium text-gray-600">
                        {level.completed}/{level.classes} classes
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${level.progress}%`,
                          backgroundColor:
                            level.progress === 100
                              ? '#10B981'
                              : level.progress >= 50
                                ? '#FFB703'
                                : '#FF6363',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-[#FFB703] bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{achievement.date}</p>
                  <p className="text-sm font-medium text-gray-900 mb-2">{achievement.activity}</p>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-[#FFB703]" />
                    <span className="text-sm font-bold text-[#FFB703]">+{achievement.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Badges & Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {badges.map((badge) => {
              const IconComponent = getIconComponent(badge.icon);
              return (
                <div
                  key={badge.id}
                  className={`text-center transition-all ${
                    badge.earned ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                  }`}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg transition-transform hover:scale-110"
                    style={{
                      backgroundColor: badge.color,
                    }}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
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
      </div>
    </div>
  );
}
