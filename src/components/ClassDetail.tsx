import { Clock, Target, ArrowLeft, Play } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Class } from '../types/course';

interface ClassDetailProps {
  classData: Class;
  levelColor: string;
  onBack: () => void;
  onStartGame: (gameId: string) => void;
}

export default function ClassDetail({ classData, levelColor, onBack, onStartGame }: ClassDetailProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent || Icons.Sparkles;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Classes
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-2" style={{ backgroundColor: levelColor }} />

          <div className="p-8 md:p-12">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: levelColor }}>
                  Class {classData.number}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{classData.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{classData.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span className="font-medium">{classData.games.length} games</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">Learning Objective</h2>
              <p className="text-lg text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {classData.objective}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {classData.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-100"
                  >
                    <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: levelColor }}>
                      {activity.type.replace('-', ' ')}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classData.games.map((game) => {
                  const IconComponent = getIcon(game.icon);
                  return (
                    <div
                      key={game.id}
                      className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all hover:shadow-lg group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${levelColor}20` }}
                        >
                          <IconComponent className="w-7 h-7" style={{ color: levelColor }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{game.name}</h3>
                          <p className="text-sm text-gray-600">{game.mechanic}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6 leading-relaxed">{game.goal}</p>
                      <button
                        onClick={() => onStartGame(game.id)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-md group-hover:scale-105"
                        style={{ backgroundColor: levelColor }}
                      >
                        <Play className="w-5 h-5" />
                        Play Game
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
