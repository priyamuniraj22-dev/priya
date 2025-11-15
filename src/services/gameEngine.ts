// Game engine core logic for phonics games

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  type: string;
  levelId: string;
  targetAge: string;
  duration: number; // in minutes
  maxScore: number;
  passingScore: number;
  attemptsAllowed: number;
}

export interface GameQuestion {
  id: string;
  type: 'multiple-choice' | 'drag-drop' | 'matching' | 'typing' | 'sorting' | 'audio-recording';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  audioFile?: string;
  imageFile?: string;
  points: number;
  timeLimit?: number; // in seconds
}

export interface GameProgress {
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
  timeSpent: number; // in seconds
  currentQuestionIndex: number;
  attempts: number;
  isCompleted: boolean;
  isPassed: boolean;
}

export interface GameSession {
  gameId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  progress: GameProgress;
  answers: Record<string, any>;
}

export class GameEngine {
  private config: GameConfig;
  private questions: GameQuestion[];
  private session: GameSession | null = null;

  constructor(config: GameConfig, questions: GameQuestion[]) {
    this.config = config;
    this.questions = questions;
  }

  // Initialize a new game session
  startSession(userId: string): GameSession {
    this.session = {
      gameId: this.config.id,
      userId,
      startTime: new Date(),
      progress: {
        score: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        streak: 0,
        bestStreak: 0,
        timeSpent: 0,
        currentQuestionIndex: 0,
        attempts: 0,
        isCompleted: false,
        isPassed: false
      },
      answers: {}
    };
    
    return this.session;
  }

  // Get current question
  getCurrentQuestion(): GameQuestion | null {
    if (!this.session || this.isGameCompleted()) {
      return null;
    }
    
    return this.questions[this.session.progress.currentQuestionIndex] || null;
  }

  // Submit an answer
  submitAnswer(questionId: string, answer: any): {
    isCorrect: boolean;
    feedback: string;
    pointsEarned: number;
    shouldContinue: boolean;
  } {
    if (!this.session) {
      throw new Error('No active game session');
    }

    const question = this.questions.find(q => q.id === questionId);
    if (!question) {
      throw new Error(`Question ${questionId} not found`);
    }

    // Check if answer is correct
    const isCorrect = this.checkAnswer(question, answer);
    const pointsEarned = isCorrect ? question.points + (this.session.progress.streak * 2) : 0;
    
    // Update progress
    this.session.progress.questionsAnswered++;
    if (isCorrect) {
      this.session.progress.correctAnswers++;
      this.session.progress.streak++;
      if (this.session.progress.streak > this.session.progress.bestStreak) {
        this.session.progress.bestStreak = this.session.progress.streak;
      }
    } else {
      this.session.progress.streak = 0;
    }
    
    this.session.progress.score += pointsEarned;
    this.session.answers[questionId] = answer;

    // Move to next question or complete game
    const shouldContinue = this.moveToNextQuestion();
    
    // Check if game is completed
    if (!shouldContinue) {
      this.completeGame();
    }

    return {
      isCorrect,
      feedback: this.getFeedback(isCorrect, question),
      pointsEarned,
      shouldContinue
    };
  }

  // Check if answer is correct
  private checkAnswer(question: GameQuestion, answer: any): boolean {
    switch (question.type) {
      case 'multiple-choice':
      case 'typing':
        return answer === question.correctAnswer;
      
      case 'drag-drop':
      case 'matching':
      case 'sorting':
        if (Array.isArray(question.correctAnswer) && Array.isArray(answer)) {
          return JSON.stringify(question.correctAnswer.sort()) === JSON.stringify(answer.sort());
        }
        return false;
      
      default:
        return false;
    }
  }

  // Get feedback message
  private getFeedback(isCorrect: boolean, question: GameQuestion): string {
    if (isCorrect) {
      const feedbacks = [
        "Great job!",
        "Excellent!",
        "Well done!",
        "Perfect!",
        "Awesome!",
        "You got it!"
      ];
      return feedbacks[Math.floor(Math.random() * feedbacks.length)];
    } else {
      return "Not quite right. Try again!";
    }
  }

  // Move to next question
  private moveToNextQuestion(): boolean {
    if (!this.session) return false;
    
    if (this.session.progress.currentQuestionIndex < this.questions.length - 1) {
      this.session.progress.currentQuestionIndex++;
      return true;
    }
    
    return false;
  }

  // Complete the game
  private completeGame(): void {
    if (!this.session) return;
    
    this.session.endTime = new Date();
    this.session.progress.timeSpent = 
      Math.floor((this.session.endTime.getTime() - this.session.startTime.getTime()) / 1000);
    this.session.progress.isCompleted = true;
    this.session.progress.isPassed = this.session.progress.score >= this.config.passingScore;
  }

  // Check if game is completed
  isGameCompleted(): boolean {
    if (!this.session) return false;
    return this.session.progress.isCompleted || 
           this.session.progress.currentQuestionIndex >= this.questions.length;
  }

  // Get game results
  getResults(): {
    score: number;
    percentage: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    streak: number;
    bestStreak: number;
    isPassed: boolean;
    achievements: string[];
  } | null {
    if (!this.session) return null;
    
    const totalQuestions = this.questions.length;
    const percentage = totalQuestions > 0 
      ? Math.round((this.session.progress.correctAnswers / totalQuestions) * 100) 
      : 0;
    
    const achievements = this.calculateAchievements();
    
    return {
      score: this.session.progress.score,
      percentage,
      correctAnswers: this.session.progress.correctAnswers,
      totalQuestions,
      timeSpent: this.session.progress.timeSpent,
      streak: this.session.progress.streak,
      bestStreak: this.session.progress.bestStreak,
      isPassed: this.session.progress.isPassed,
      achievements
    };
  }

  // Calculate achievements
  private calculateAchievements(): string[] {
    if (!this.session) return [];
    
    const achievements: string[] = [];
    
    if (this.session.progress.isPassed) {
      achievements.push('Game Completed');
    }
    
    if (this.session.progress.bestStreak >= 5) {
      achievements.push('5-in-a-Row Streak');
    }
    
    if (this.session.progress.bestStreak >= 10) {
      achievements.push('10-in-a-Row Streak');
    }
    
    if (this.session.progress.score >= this.config.maxScore * 0.9) {
      achievements.push('High Score Master');
    }
    
    if (this.session.progress.timeSpent <= this.config.duration * 30) { // 50% faster than expected
      achievements.push('Speed Demon');
    }
    
    return achievements;
  }

  // Use a hint (costs points)
  useHint(): { hint: string; pointsDeducted: number } | null {
    if (!this.session) return null;
    
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) return null;
    
    const pointsDeducted = Math.floor(currentQuestion.points * 0.2);
    this.session.progress.score = Math.max(0, this.session.progress.score - pointsDeducted);
    
    let hint = '';
    switch (currentQuestion.type) {
      case 'multiple-choice':
        if (currentQuestion.options && currentQuestion.correctAnswer) {
          hint = `The correct answer is one of: ${currentQuestion.correctAnswer}`;
        }
        break;
      case 'typing':
        if (typeof currentQuestion.correctAnswer === 'string') {
          const answer = currentQuestion.correctAnswer as string;
          hint = `The word starts with: ${answer.charAt(0).toUpperCase()}`;
        }
        break;
      default:
        hint = 'Think carefully about the sounds and letters';
    }
    
    return { hint, pointsDeducted };
  }

  // Skip current question (costs points)
  skipQuestion(): { pointsDeducted: number, shouldContinue: boolean } {
    if (!this.session) {
      throw new Error('No active game session');
    }
    
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) {
      throw new Error('No current question');
    }
    
    const pointsDeducted = Math.floor(currentQuestion.points * 0.5);
    this.session.progress.score = Math.max(0, this.session.progress.score - pointsDeducted);
    
    // Move to next question
    const shouldContinue = this.moveToNextQuestion();
    
    // Check if game is completed
    if (!shouldContinue) {
      this.completeGame();
    }
    
    return { pointsDeducted, shouldContinue };
  }

  // Restart the game
  restart(userId: string): GameSession {
    return this.startSession(userId);
  }

  // Get game configuration
  getConfig(): GameConfig {
    return this.config;
  }

  // Get all questions
  getQuestions(): GameQuestion[] {
    return this.questions;
  }

  // Get current session
  getSession(): GameSession | null {
    return this.session;
  }
}

// Predefined game templates
export const gameTemplates = {
  soundMatch: {
    id: 'sound-match-template',
    name: 'Sound Match',
    description: 'Match sounds to letters',
    type: 'matching',
    levelId: '',
    targetAge: '3-5',
    duration: 10,
    maxScore: 100,
    passingScore: 70,
    attemptsAllowed: 3
  },
  
  wordBuilder: {
    id: 'word-builder-template',
    name: 'Word Builder',
    description: 'Build words with letter tiles',
    type: 'drag-drop',
    levelId: '',
    targetAge: '4-6',
    duration: 15,
    maxScore: 150,
    passingScore: 80,
    attemptsAllowed: 3
  },
  
  phonemePop: {
    id: 'phoneme-pop-template',
    name: 'Phoneme Pop',
    description: 'Pop balloons with correct sounds',
    type: 'multiple-choice',
    levelId: '',
    targetAge: '3-5',
    duration: 8,
    maxScore: 80,
    passingScore: 60,
    attemptsAllowed: 3
  },
  
  blendRace: {
    id: 'blend-race-template',
    name: 'Blend Race',
    description: 'Quickly blend sounds together',
    type: 'typing',
    levelId: '',
    targetAge: '5-7',
    duration: 12,
    maxScore: 120,
    passingScore: 75,
    attemptsAllowed: 3
  }
};

// Utility functions for creating game questions
export const createSoundMatchQuestion = (
  id: string,
  letter: string,
  word: string,
  options: string[],
  points: number = 10
): GameQuestion => ({
  id,
  type: 'multiple-choice',
  question: `Which letter makes the "${word}" sound?`,
  options,
  correctAnswer: letter,
  audioFile: `letter_${letter}.mp3`,
  points
});

export const createWordBuilderQuestion = (
  id: string,
  word: string,
  letters: string[],
  points: number = 15
): GameQuestion => ({
  id,
  type: 'drag-drop',
  question: `Build the word: ${word}`,
  correctAnswer: word.split(''),
  imageFile: `word_${word}.png`,
  points
});

export const createPhonemePopQuestion = (
  id: string,
  sound: string,
  word: string,
  options: string[],
  points: number = 10
): GameQuestion => ({
  id,
  type: 'multiple-choice',
  question: `Pop the balloon with the "${sound}" sound!`,
  options,
  correctAnswer: word,
  audioFile: `sound_${sound}.mp3`,
  points
});

export const createBlendRaceQuestion = (
  id: string,
  sounds: string[],
  word: string,
  points: number = 12
): GameQuestion => ({
  id,
  type: 'typing',
  question: `Blend these sounds: ${sounds.join(' - ')}`,
  correctAnswer: word,
  audioFile: `blend_${sounds.join('_')}.mp3`,
  points
});