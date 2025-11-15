import { createClient } from '@supabase/supabase-js';
import { 
  User, 
  UserProgress, 
  GameScore, 
  Badge,
  Lesson,
  LessonProgress,
  Activity,
  ActivityProgress,
  Assessment,
  AssessmentResult,
  Video,
  VideoProgress,
  Worksheet,
  WorksheetProgress,
  DecodableBook,
  BookProgress,
  PhonicsRule,
  RuleMastery,
  Reward,
  UserReward
} from '../types/database';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User functions
export const getUser = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return data;
};

export const createUser = async (user: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  
  return data;
};

// User Progress functions
export const getUserProgress = async (userId: string): Promise<UserProgress[]> => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user progress:', error);
    return [];
  }
  
  return data;
};

export const updateUserProgress = async (progress: Partial<UserProgress>): Promise<UserProgress | null> => {
  if (!progress.user_id || !progress.class_id) {
    console.error('Missing required fields for user progress update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(progress, { onConflict: 'user_id,class_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user progress:', error);
    return null;
  }
  
  return data;
};

// Game Score functions
export const getGameScores = async (userId: string): Promise<GameScore[]> => {
  const { data, error } = await supabase
    .from('game_scores')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching game scores:', error);
    return [];
  }
  
  return data;
};

export const updateGameScore = async (score: Partial<GameScore>): Promise<GameScore | null> => {
  if (!score.user_id || !score.game_id || !score.class_id) {
    console.error('Missing required fields for game score update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('game_scores')
    .upsert(score, { onConflict: 'user_id,game_id,class_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating game score:', error);
    return null;
  }
  
  return data;
};

// Badge functions
export const getUserBadges = async (userId: string): Promise<Badge[]> => {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }
  
  return data;
};

export const awardBadge = async (badge: Partial<Badge>): Promise<Badge | null> => {
  if (!badge.user_id || !badge.badge_type) {
    console.error('Missing required fields for badge award');
    return null;
  }
  
  const { data, error } = await supabase
    .from('badges')
    .insert(badge)
    .select()
    .single();
  
  if (error) {
    console.error('Error awarding badge:', error);
    return null;
  }
  
  return data;
};

// Lesson functions
export const getLessons = async (): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('level_id')
    .order('number');
  
  if (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
  
  return data;
};

export const getLessonProgress = async (userId: string): Promise<LessonProgress[]> => {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching lesson progress:', error);
    return [];
  }
  
  return data;
};

export const updateLessonProgress = async (progress: Partial<LessonProgress>): Promise<LessonProgress | null> => {
  if (!progress.user_id || !progress.lesson_id) {
    console.error('Missing required fields for lesson progress update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert(progress, { onConflict: 'user_id,lesson_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating lesson progress:', error);
    return null;
  }
  
  return data;
};

// Activity functions
export const getActivities = async (lessonId: string): Promise<Activity[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('id');
  
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  
  return data;
};

export const getActivityProgress = async (userId: string): Promise<ActivityProgress[]> => {
  const { data, error } = await supabase
    .from('activity_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching activity progress:', error);
    return [];
  }
  
  return data;
};

export const updateActivityProgress = async (progress: Partial<ActivityProgress>): Promise<ActivityProgress | null> => {
  if (!progress.user_id || !progress.activity_id) {
    console.error('Missing required fields for activity progress update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('activity_progress')
    .upsert(progress, { onConflict: 'user_id,activity_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating activity progress:', error);
    return null;
  }
  
  return data;
};

// Assessment functions
export const getAssessments = async (lessonId: string): Promise<Assessment[]> => {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('lesson_id', lessonId);
  
  if (error) {
    console.error('Error fetching assessments:', error);
    return [];
  }
  
  return data;
};

export const getAssessmentResults = async (userId: string): Promise<AssessmentResult[]> => {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching assessment results:', error);
    return [];
  }
  
  return data;
};

export const updateAssessmentResult = async (result: Partial<AssessmentResult>): Promise<AssessmentResult | null> => {
  if (!result.user_id || !result.assessment_id) {
    console.error('Missing required fields for assessment result update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('assessment_results')
    .upsert(result, { onConflict: 'user_id,assessment_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating assessment result:', error);
    return null;
  }
  
  return data;
};

// Video functions
export const getVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('category')
    .order('title');
  
  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
  
  return data;
};

export const getVideoProgress = async (userId: string): Promise<VideoProgress[]> => {
  const { data, error } = await supabase
    .from('video_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching video progress:', error);
    return [];
  }
  
  return data;
};

export const updateVideoProgress = async (progress: Partial<VideoProgress>): Promise<VideoProgress | null> => {
  if (!progress.user_id || !progress.video_id) {
    console.error('Missing required fields for video progress update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('video_progress')
    .upsert(progress, { onConflict: 'user_id,video_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating video progress:', error);
    return null;
  }
  
  return data;
};

// Worksheet functions
export const getWorksheets = async (): Promise<Worksheet[]> => {
  const { data, error } = await supabase
    .from('worksheets')
    .select('*')
    .order('level_id')
    .order('title');
  
  if (error) {
    console.error('Error fetching worksheets:', error);
    return [];
  }
  
  return data;
};

export const getWorksheetProgress = async (userId: string): Promise<WorksheetProgress[]> => {
  const { data, error } = await supabase
    .from('worksheet_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching worksheet progress:', error);
    return [];
  }
  
  return data;
};

export const updateWorksheetProgress = async (progress: Partial<WorksheetProgress>): Promise<WorksheetProgress | null> => {
  if (!progress.user_id || !progress.worksheet_id) {
    console.error('Missing required fields for worksheet progress update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('worksheet_progress')
    .upsert(progress, { onConflict: 'user_id,worksheet_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating worksheet progress:', error);
    return null;
  }
  
  return data;
};

// Book functions
export const getBooks = async (): Promise<DecodableBook[]> => {
  const { data, error } = await supabase
    .from('decodable_books')
    .select('*')
    .order('level_id')
    .order('title');
  
  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }
  
  return data;
};

export const getBookProgress = async (userId: string): Promise<BookProgress[]> => {
  const { data, error } = await supabase
    .from('book_progress')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching book progress:', error);
    return [];
  }
  
  return data;
};

export const updateBookProgress = async (progress: Partial<BookProgress>): Promise<BookProgress | null> => {
  if (!progress.user_id || !progress.book_id) {
    console.error('Missing required fields for book progress update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('book_progress')
    .upsert(progress, { onConflict: 'user_id,book_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating book progress:', error);
    return null;
  }
  
  return data;
};

// Rule functions
export const getPhonicsRules = async (): Promise<PhonicsRule[]> => {
  const { data, error } = await supabase
    .from('phonics_rules')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching phonics rules:', error);
    return [];
  }
  
  return data;
};

export const getRuleMastery = async (userId: string): Promise<RuleMastery[]> => {
  const { data, error } = await supabase
    .from('rule_mastery')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching rule mastery:', error);
    return [];
  }
  
  return data;
};

export const updateRuleMastery = async (mastery: Partial<RuleMastery>): Promise<RuleMastery | null> => {
  if (!mastery.user_id || !mastery.rule_id) {
    console.error('Missing required fields for rule mastery update');
    return null;
  }
  
  const { data, error } = await supabase
    .from('rule_mastery')
    .upsert(mastery, { onConflict: 'user_id,rule_id' })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating rule mastery:', error);
    return null;
  }
  
  return data;
};

// Reward functions
export const getRewards = async (): Promise<Reward[]> => {
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('type')
    .order('name');
  
  if (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }
  
  return data;
};

export const getUserRewards = async (userId: string): Promise<UserReward[]> => {
  const { data, error } = await supabase
    .from('user_rewards')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user rewards:', error);
    return [];
  }
  
  return data;
};

export const awardReward = async (reward: Partial<UserReward>): Promise<UserReward | null> => {
  if (!reward.user_id || !reward.reward_id) {
    console.error('Missing required fields for reward award');
    return null;
  }
  
  const { data, error } = await supabase
    .from('user_rewards')
    .insert(reward)
    .select()
    .single();
  
  if (error) {
    console.error('Error awarding reward:', error);
    return null;
  }
  
  return data;
};

// Summary functions
export const getUserDashboardData = async (userId: string) => {
  const [
    user,
    progress,
    gameScores,
    badges,
    lessonProgress,
    activityProgress,
    assessmentResults,
    videoProgress,
    worksheetProgress,
    bookProgress,
    ruleMastery,
    userRewards
  ] = await Promise.all([
    getUser(userId),
    getUserProgress(userId),
    getGameScores(userId),
    getUserBadges(userId),
    getLessonProgress(userId),
    getActivityProgress(userId),
    getAssessmentResults(userId),
    getVideoProgress(userId),
    getWorksheetProgress(userId),
    getBookProgress(userId),
    getRuleMastery(userId),
    getUserRewards(userId)
  ]);

  return {
    user,
    progress,
    gameScores,
    badges,
    lessonProgress,
    activityProgress,
    assessmentResults,
    videoProgress,
    worksheetProgress,
    bookProgress,
    ruleMastery,
    userRewards
  };
};