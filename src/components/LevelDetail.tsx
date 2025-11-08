import { ArrowLeft, Clock, Trophy, Star } from 'lucide-react';
import { Level, Class } from '../types/course';

interface LevelDetailProps {
  level: Level;
  classes: Class[];
  onBack: () => void;
  onClassSelect: (classId: string) => void;
}

export default function LevelDetail({ level, classes, onBack, onClassSelect }: LevelDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Levels
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="h-3" style={{ backgroundColor: level.color }} />

          <div className="p-8 md:p-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{level.name}</h1>
                <p className="text-gray-600 text-lg">Ages {level.targetAge}</p>
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
                style={{ backgroundColor: level.color }}
              >
                {level.id.slice(1)}
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {level.overview}
            </p>

            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">{classes.length} Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  {classes.reduce((sum, c) => sum + c.duration, 0)} minutes total
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {classes.map((classData, index) => (
            <div
              key={classData.id}
              onClick={() => onClassSelect(classData.id)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                  style={{ backgroundColor: level.color }}
                >
                  {classData.number}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {classData.title}
                  </h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {classData.objective}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{classData.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>{classData.games.length} games</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>{classData.activities.length} activities</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:flex-col md:items-end">
                  <button
                    className="px-6 py-3 rounded-xl font-semibold text-white hover:shadow-lg transition-all whitespace-nowrap"
                    style={{ backgroundColor: level.color }}
                  >
                    Start Class
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
