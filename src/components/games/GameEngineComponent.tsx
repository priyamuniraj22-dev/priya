import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Lightbulb, Trophy, X } from 'lucide-react';
import { GameEngine, GameQuestion, GameConfig, createSoundMatchQuestion } from '../../services/gameEngine';
import { playAudio } from '../../utils/mediaPlayer';

interface GameEngineComponentProps {
  gameConfig: GameConfig;
  questions: GameQuestion[];
  levelColor: string;
  onClose: () => void;
  onGameComplete?: (results: any) => void;
}

export default function GameEngineComponent({ 
  gameConfig, 
  questions, 
  levelColor, 
  onClose, 
  onGameComplete 
}: GameEngineComponentProps) {
  const [gameEngine] = useState(() => new GameEngine(gameConfig, questions));
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [feedback, setFeedback] = useState<{ 
    message: string; 
    isCorrect: boolean; 
    points: number 
  } | null>(null);
  const [showHint, setShowHint] = useState<{ hint: string; pointsDeducted: number } | null>(null);
  const [gameResults, setGameResults] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Initialize game session
  useEffect(() => {
    const session = gameEngine.startSession('user123'); // In a real app, this would be the actual user ID
    setCurrentSession(session);
    setCurrentQuestion(gameEngine.getCurrentQuestion());
  }, [gameEngine]);

  // Handle timer for questions with time limits
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (currentQuestion?.timeLimit && timeLeft === null) {
      setTimeLeft(currentQuestion.timeLimit);
    }
    
    if (timeLeft !== null && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Time's up - auto-submit empty answer
      handleAnswerSubmit('');
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, currentQuestion]);

  const handleAnswerSubmit = (answer: any) => {
    if (!currentQuestion) return;
    
    try {
      const result = gameEngine.submitAnswer(currentQuestion.id, answer);
      
      setFeedback({
        message: result.feedback,
        isCorrect: result.isCorrect,
        points: result.pointsEarned
      });
      
      setSelectedAnswer(answer);
      
      // Move to next question or show results
      if (result.shouldContinue) {
        setTimeout(() => {
          setCurrentQuestion(gameEngine.getCurrentQuestion());
          setFeedback(null);
          setSelectedAnswer(null);
          setShowHint(null);
          setTimeLeft(null);
        }, 2000);
      } else {
        // Game completed
        const results = gameEngine.getResults();
        setGameResults(results);
        if (onGameComplete) {
          onGameComplete(results);
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleUseHint = () => {
    const hint = gameEngine.useHint();
    if (hint) {
      setShowHint(hint);
    }
  };

  const handleSkipQuestion = () => {
    try {
      const result = gameEngine.skipQuestion();
      
      if (result.shouldContinue) {
        setCurrentQuestion(gameEngine.getCurrentQuestion());
        setFeedback(null);
        setSelectedAnswer(null);
        setShowHint(null);
        setTimeLeft(null);
      } else {
        // Game completed
        const results = gameEngine.getResults();
        setGameResults(results);
        if (onGameComplete) {
          onGameComplete(results);
        }
      }
    } catch (error) {
      console.error('Error skipping question:', error);
    }
  };

  const handlePlayAudio = (audioFile?: string) => {
    if (audioFile) {
      playAudio(audioFile);
    }
  };

  const handleRestart = () => {
    const session = gameEngine.restart('user123');
    setCurrentSession(session);
    setCurrentQuestion(gameEngine.getCurrentQuestion());
    setFeedback(null);
    setSelectedAnswer(null);
    setShowHint(null);
    setGameResults(null);
    setTimeLeft(null);
  };

  // Render different question types
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{currentQuestion.question}</h3>
            
            {currentQuestion.audioFile && (
              <button
                onClick={() => handlePlayAudio(currentQuestion.audioFile)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-bold transition-colors mx-auto"
              >
                <Play className="w-4 h-4" />
                Play Sound
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSubmit(option)}
                  disabled={!!feedback}
                  className={`p-4 rounded-xl font-bold text-lg transition-all ${
                    selectedAnswer === option
                      ? feedback?.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'drag-drop':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">{currentQuestion.question}</h3>
            
            <div className="bg-white rounded-xl p-6 min-h-[200px] border-2 border-dashed border-gray-300">
              <div className="flex justify-center gap-2 flex-wrap">
                {(currentQuestion.correctAnswer as string[]).map((_, index) => (
                  <div 
                    key={index} 
                    className="w-16 h-16 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center text-2xl font-bold"
                  >
                    {selectedAnswer?.[index] || '?'}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newAnswer = selectedAnswer ? [...selectedAnswer] : Array(currentQuestion.correctAnswer.length).fill('');
                    const emptyIndex = newAnswer.findIndex((item: string) => !item);
                    if (emptyIndex !== -1) {
                      newAnswer[emptyIndex] = option;
                      setSelectedAnswer(newAnswer);
                    }
                  }}
                  disabled={selectedAnswer?.includes(option) || !!feedback}
                  className={`w-12 h-12 rounded-lg font-bold text-lg transition-all ${
                    selectedAnswer?.includes(option)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedAnswer(null)}
                disabled={!selectedAnswer || !!feedback}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => handleAnswerSubmit(selectedAnswer)}
                disabled={!selectedAnswer || selectedAnswer.includes('') || !!feedback}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-colors"
              >
                Check Answer
              </button>
            </div>
          </div>
        );
      
      case 'typing':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">{currentQuestion.question}</h3>
            
            {currentQuestion.audioFile && (
              <button
                onClick={() => handlePlayAudio(currentQuestion.audioFile)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-bold transition-colors mx-auto"
              >
                <Play className="w-4 h-4" />
                Play Sound
              </button>
            )}
            
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={selectedAnswer || ''}
                onChange={(e) => setSelectedAnswer(e.target.value.toLowerCase())}
                disabled={!!feedback}
                className="w-full px-4 py-3 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                placeholder="Type your answer"
              />
            </div>
            
            <button
              onClick={() => handleAnswerSubmit(selectedAnswer)}
              disabled={!selectedAnswer || !!feedback}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors mx-auto block"
            >
              Submit Answer
            </button>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Unsupported question type</p>
          </div>
        );
    }
  };

  if (gameResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Game Complete!</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-xl font-bold mb-6">
                <Trophy className="w-6 h-6" />
                {gameResults.isPassed ? 'Congratulations!' : 'Good Effort!'}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{gameResults.score}</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">{gameResults.percentage}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600">{gameResults.correctAnswers}/{gameResults.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-600">{gameResults.bestStreak}</div>
                  <div className="text-sm text-gray-600">Best Streak</div>
                </div>
              </div>
              
              {gameResults.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-3">Achievements</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {gameResults.achievements.map((achievement: string, index: number) => (
                      <span 
                        key={index} 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-colors"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{gameConfig.name}</h2>
            <p className="text-gray-600">{gameConfig.description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentSession?.progress.score || 0}
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {currentSession?.progress.streak || 0}
              </div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {currentSession?.progress.correctAnswers || 0}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {currentQuestion 
                  ? `${currentSession?.progress.currentQuestionIndex + 1}/${questions.length}` 
                  : '0/0'}
              </div>
              <div className="text-sm text-gray-600">Question</div>
            </div>
          </div>
          
          {/* Timer */}
          {timeLeft !== null && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Time Left</span>
                <span>{timeLeft}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / (currentQuestion?.timeLimit || 10)) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-xl text-white text-center font-semibold animate-pulse ${
                feedback.isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{feedback.message}</span>
                <span>{feedback.isCorrect ? '+' : '-'}{feedback.points} points</span>
              </div>
            </div>
          )}
          
          {/* Hint */}
          {showHint && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-800">
                <Lightbulb className="w-5 h-5" />
                <span className="font-medium">Hint: {showHint.hint}</span>
                <span className="text-sm">(-{showHint.pointsDeducted} points)</span>
              </div>
            </div>
          )}
          
          {/* Question Area */}
          <div 
            className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 md:p-8 mb-6 border-2 border-gray-200"
            style={{ borderColor: levelColor }}
          >
            {renderQuestion()}
          </div>
          
          {/* Game Controls */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleUseHint}
              disabled={!!showHint || !!feedback || !currentQuestion}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
            >
              <Lightbulb className="w-4 h-4" />
              Hint (-20% points)
            </button>
            
            <button
              onClick={handleSkipQuestion}
              disabled={!!feedback || !currentQuestion}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Skip (-50% points)
            </button>
            
            <button
              onClick={onClose}
              className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-bold transition-colors"
            >
              Exit Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}