import { ArrowRight, Users } from 'lucide-react';
import { Level } from '../types/course';

interface LevelCardProps {
  level: Level;
  classCount: number;
  onSelect: () => void;
}

export default function LevelCard({ level, classCount, onSelect }: LevelCardProps) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-gray-100 h-full flex flex-col"
      onClick={onSelect}
    >
      <div
        className="h-3"
        style={{ backgroundColor: level.color }}
      />

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{level.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Ages {level.targetAge}</span>
            </div>
          </div>
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: level.color }}
          >
            {level.id.slice(1)}
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
          {level.overview}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm font-medium text-gray-600">
            {classCount} {classCount === 1 ? 'Class' : 'Classes'}
          </div>
          <button
            className="flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all group"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            Start Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: level.color }} />
          </button>
        </div>
      </div>
    </div>
  );
}