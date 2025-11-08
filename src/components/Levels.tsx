import { levels, classes } from '../data/courseData';
import LevelCard from './LevelCard';

interface LevelsProps {
  onLevelSelect: (levelId: string) => void;
}

export default function Levels({ onLevelSelect }: LevelsProps) {
  const getClassCount = (levelId: string) => {
    return classes.filter(c => c.levelId === levelId).length;
  };

  return (
    <section id="levels" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            From first letters to confident reading and writing, our progressive curriculum grows with your child
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              classCount={getClassCount(level.id)}
              onSelect={() => onLevelSelect(level.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
