// Database schema types for Supabase

export interface User {
  id: string;
  display_name: string;
  age: number | null;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  level_id: string;
  class_id: string;
  completed: boolean;
  score: number;
  created_at: string;
  updated_at: string;
  time_spent: number;
  last_accessed: string;
  streak: number;
}

export interface GameScore {
  id: string;
  user_id: string;
  game_id: string;
  class_id: string;
  score: number;
  completed: boolean;
  play_count: number;
  created_at: string;
  updated_at: string;
  time_spent: number;
  accuracy_percentage: number;
  streak: number;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
  badge_name: string;
  earned_at: string;
  description: string | null;
  points: number;
  icon: string | null;
}

export interface Lesson {
  id: string;
  level_id: string;
  number: number;
  title: string;
  objective: string;
  duration: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  started_at: string;
  completed_at: string | null;
  completion_percentage: number;
  score: number;
  time_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  lesson_id: string;
  type: 'rhyming' | 'alliteration' | 'onset-rime' | 'segmentation' | 'blending' | 'deletion' | 'substitution' | 'other';
  title: string;
  description: string;
  instructions: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityProgress {
  id: string;
  user_id: string;
  activity_id: string;
  started_at: string;
  completed_at: string | null;
  attempts: number;
  score: number;
  is_correct: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  passing_score: number;
  created_at: string;
  updated_at: string;
}

export interface AssessmentResult {
  id: string;
  user_id: string;
  assessment_id: string;
  started_at: string;
  completed_at: string | null;
  score: number;
  passed: boolean | null;
  time_spent: number;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'youtube' | 'local';
  duration: string;
  level_id: string | null;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface VideoProgress {
  id: string;
  user_id: string;
  video_id: string;
  started_at: string;
  completed_at: string | null;
  watch_time: number;
  total_duration: number;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  file_url: string;
  level_id: string;
  lesson_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorksheetProgress {
  id: string;
  user_id: string;
  worksheet_id: string;
  started_at: string;
  completed_at: string | null;
  time_spent: number;
  created_at: string;
  updated_at: string;
}

export interface DecodableBook {
  id: string;
  title: string;
  description: string;
  file_url: string;
  level_id: string;
  lesson_id: string | null;
  pages: number;
  created_at: string;
  updated_at: string;
}

export interface BookProgress {
  id: string;
  user_id: string;
  book_id: string;
  started_at: string;
  completed_at: string | null;
  pages_read: number;
  total_pages: number;
  completion_percentage: number;
  time_spent: number;
  created_at: string;
  updated_at: string;
}

export interface PhonicsRule {
  id: string;
  name: string;
  description: string;
  example_words: string[];
  created_at: string;
  updated_at: string;
}

export interface RuleMastery {
  id: string;
  user_id: string;
  rule_id: string;
  mastered: boolean;
  mastery_date: string | null;
  practice_count: number;
  created_at: string;
  updated_at: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'sticker' | 'trophy' | 'points';
  points: number;
  created_at: string;
  updated_at: string;
}

export interface UserReward {
  id: string;
  user_id: string;
  reward_id: string;
  earned_at: string;
  created_at: string;
  updated_at: string;
}