import { useState } from 'react';
import { Play, BookOpen, Zap, Trophy } from 'lucide-react';
import GameEngineComponent from './GameEngineComponent';
import { 
  GameConfig, 
  GameQuestion, 
  gameTemplates,
  createSoundMatchQuestion,
  createWordBuilderQuestion,
  createPhonemePopQuestion,
  createBlendRaceQuestion
} from '../../services/gameEngine';

export default function GameEngineDemo() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([]);

  // Demo game configurations
  const demoGames = [
    {
      id: 'sound-match-demo',
      name: 'Sound Match Demo',
      description: 'Match letter sounds to letters',
      config: gameTemplates.soundMatch,
      questions: [
        createSoundMatchQuestion(
          'q1',
          's',
          'sun',
          ['s', 'a', 't', 'p'],
          10
        ),
        createSoundMatchQuestion(
          'q2',
          'a',
          'apple',
          ['a', 'b', 'c', 'd'],
          10
        ),
        createSoundMatchQuestion(
          'q3',
          't',
          'top',
          ['t', 'u', 'v', 'w'],
          10
        )
      ]
    },
    {
      id: 'word-builder-demo',
      name: 'Word Builder Demo',
      description: 'Build words with letter tiles',
      config: gameTemplates.wordBuilder,
      questions: [
        createWordBuilderQuestion(
          'q1',
          'cat',
          ['c', 'a', 't', 'b', 'o', 'g'],
          15
        ),
        createWordBuilderQuestion(
          'q2',
          'dog',
          ['d', 'o', 'g', 'c', 'a', 't'],
          15
        ),
        createWordBuilderQuestion(
          'q3',
          'sun',
          ['s', 'u', 'n', 'm', 'o', 'p'],
          15
        )
      ]
    },
    {
      id: 'phoneme-pop-demo',
      name: 'Phoneme Pop Demo',
      description: 'Pop balloons with correct sounds',
      config: gameTemplates.phonemePop,
      questions: [
        createPhonemePopQuestion(
          'q1',
          '/s/',
          'sun',
          ['sun', 'apple', 'top', 'pig'],
          10
        ),
        createPhonemePopQuestion(
          'q2',
          '/a/',
          'apple',
          ['apple', 'sun', 'cat', 'dog'],
          10
        ),
        createPhonemePopQuestion(
          'q3',
          '/t/',
          'top',
          ['top', 'sun', 'cat', 'pig'],
          10
        )
      ]
    },
    {
      id: 'blend-race-demo',
      name: 'Blend Race Demo',
      description: 'Quickly blend sounds together',
      config: gameTemplates.blendRace,
      questions: [
        createBlendRaceQuestion(
          'q1',
          ['c', 'a', 't'],
          'cat',
          12
        ),
        createBlendRaceQuestion(
          'q2',
          ['d', 'o', 'g'],
          'dog',
          12
        ),
        createBlendRaceQuestion(
          'q3',
          ['s', 'u', 'n'],
          'sun',
          12
        )
      ]
    }
  ];

  const handleStartGame = (game: any) => {
    const config = { ...game.config, id: game.id, levelId: 'demo' };
    setGameConfig(config);
    setGameQuestions(game.questions);
    setSelectedGame(game.id);
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
    setGameConfig(null);
    setGameQuestions([]);
  };

  const handleGameComplete = (results: any) => {
    console.log('Game completed with results:', results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Game Engine Demo</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Try out our phonics game engine with different game types. Each game is designed to help children learn phonics in a fun, interactive way.
            </p>
          </div>

          {selectedGame && gameConfig && gameQuestions.length > 0 ? (
            <GameEngineComponent
              gameConfig={gameConfig}
              questions={gameQuestions}
              levelColor="#FFB703"
              onClose={handleCloseGame}
              onGameComplete={handleGameComplete}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoGames.map((game) => (
                <div 
                  key={game.id}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleStartGame(game)}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        {game.id.includes('sound') ? (
                          <Volume2 className="w-6 h-6 text-blue-600" />
                        ) : game.id.includes('word') ? (
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        ) : game.id.includes('phoneme') ? (
                          <Zap className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Trophy className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{game.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{game.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{game.questions.length} questions</span>
                      <span>{game.config.duration} min</span>
                      <span>Max {game.config.maxScore} pts</span>
                    </div>
                    
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Play Demo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3">Game Engine Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Multiple question types (multiple choice, drag-drop, typing)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Progress tracking and scoring system</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Streak bonuses and achievements</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Hint system with point deduction</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Time limits for challenging questions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Audio support for phonics learning</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Volume2 icon component since it's not in lucide-react
function Volume2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343L4.93 4.93a1 1 0 00-1.415 1.414L4.93 7.76 3.515 9.174a1 1 0 000 1.414l1.414 1.414-1.414 1.415a1 1 0 001.414 1.414l1.415-1.414 1.414 1.414a1 1 0 001.415-1.414L7.758 9.174a1 1 0 000-1.414L6.343 6.343z" />
    </svg>
  );
}