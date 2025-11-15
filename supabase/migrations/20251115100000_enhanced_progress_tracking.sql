/*
  # Enhanced PhonicsPlayhouse Database Schema for Progress Tracking

  1. New Tables
    - `lessons` - Store detailed lesson information
    - `lesson_progress` - Track progress through individual lessons
    - `activities` - Store activity information for lessons
    - `activity_progress` - Track progress through individual activities
    - `assessments` - Store assessment information
    - `assessment_results` - Store results for assessments
    - `videos` - Store video information
    - `video_progress` - Track video viewing progress
    - `worksheets` - Store worksheet information
    - `worksheet_progress` - Track worksheet completion
    - `decodable_books` - Store decodable book information
    - `book_progress` - Track book reading progress
    - `phonics_rules` - Store phonics rule information
    - `rule_mastery` - Track mastery of phonics rules
    - `rewards` - Store reward information
    - `user_rewards` - Track rewards earned by users

  2. Enhanced existing tables
    - Add more detailed tracking to `user_progress`
    - Add more fields to `game_scores`
    - Add more badge types to `badges`

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to manage their own data
*/

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id text PRIMARY KEY,
  level_id text NOT NULL,
  number integer NOT NULL,
  title text NOT NULL,
  objective text NOT NULL,
  duration integer NOT NULL, -- in minutes
  color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by everyone"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

-- Create lesson_progress table
CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  completion_percentage integer DEFAULT 0,
  score integer DEFAULT 0,
  time_spent integer DEFAULT 0, -- in seconds
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON lesson_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress"
  ON lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id text PRIMARY KEY,
  lesson_id text NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'rhyming', 'alliteration', 'onset-rime', 'segmentation', 'blending', 'deletion', 'substitution', 'other'
  title text NOT NULL,
  description text NOT NULL,
  instructions text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Activities are viewable by everyone"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

-- Create activity_progress table
CREATE TABLE IF NOT EXISTS activity_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_id text NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  attempts integer DEFAULT 1,
  score integer DEFAULT 0,
  is_correct boolean,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, activity_id)
);

ALTER TABLE activity_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity progress"
  ON activity_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity progress"
  ON activity_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity progress"
  ON activity_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id text PRIMARY KEY,
  lesson_id text NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  passing_score integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assessments are viewable by everyone"
  ON assessments FOR SELECT
  TO authenticated
  USING (true);

-- Create assessment_results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id text NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  score integer DEFAULT 0,
  passed boolean,
  time_spent integer DEFAULT 0, -- in seconds
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, assessment_id)
);

ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessment results"
  ON assessment_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment results"
  ON assessment_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessment results"
  ON assessment_results FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  type text NOT NULL, -- 'youtube' or 'local'
  duration text NOT NULL, -- in format "MM:SS"
  level_id text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos are viewable by everyone"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

-- Create video_progress table
CREATE TABLE IF NOT EXISTS video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  video_id text NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  watch_time integer DEFAULT 0, -- in seconds
  total_duration integer NOT NULL, -- in seconds
  completion_percentage integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own video progress"
  ON video_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own video progress"
  ON video_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video progress"
  ON video_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create worksheets table
CREATE TABLE IF NOT EXISTS worksheets (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  file_url text NOT NULL,
  level_id text NOT NULL,
  lesson_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Worksheets are viewable by everyone"
  ON worksheets FOR SELECT
  TO authenticated
  USING (true);

-- Create worksheet_progress table
CREATE TABLE IF NOT EXISTS worksheet_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  worksheet_id text NOT NULL REFERENCES worksheets(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  time_spent integer DEFAULT 0, -- in seconds
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, worksheet_id)
);

ALTER TABLE worksheet_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own worksheet progress"
  ON worksheet_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own worksheet progress"
  ON worksheet_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own worksheet progress"
  ON worksheet_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create decodable_books table
CREATE TABLE IF NOT EXISTS decodable_books (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  file_url text NOT NULL,
  level_id text NOT NULL,
  lesson_id text,
  pages integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE decodable_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Decodable books are viewable by everyone"
  ON decodable_books FOR SELECT
  TO authenticated
  USING (true);

-- Create book_progress table
CREATE TABLE IF NOT EXISTS book_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id text NOT NULL REFERENCES decodable_books(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  pages_read integer DEFAULT 0,
  total_pages integer NOT NULL,
  completion_percentage integer DEFAULT 0,
  time_spent integer DEFAULT 0, -- in seconds
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, book_id)
);

ALTER TABLE book_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own book progress"
  ON book_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own book progress"
  ON book_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own book progress"
  ON book_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create phonics_rules table
CREATE TABLE IF NOT EXISTS phonics_rules (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  example_words text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE phonics_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Phonics rules are viewable by everyone"
  ON phonics_rules FOR SELECT
  TO authenticated
  USING (true);

-- Create rule_mastery table
CREATE TABLE IF NOT EXISTS rule_mastery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rule_id text NOT NULL REFERENCES phonics_rules(id) ON DELETE CASCADE,
  mastered boolean DEFAULT false,
  mastery_date timestamptz,
  practice_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, rule_id)
);

ALTER TABLE rule_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rule mastery"
  ON rule_mastery FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rule mastery"
  ON rule_mastery FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rule mastery"
  ON rule_mastery FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  type text NOT NULL, -- 'badge', 'sticker', 'trophy', 'points'
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rewards are viewable by everyone"
  ON rewards FOR SELECT
  TO authenticated
  USING (true);

-- Create user_rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id text NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, reward_id)
);

ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards"
  ON user_rewards FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rewards"
  ON user_rewards FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Enhance existing user_progress table
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS time_spent integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_accessed timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS streak integer DEFAULT 0;

-- Enhance existing game_scores table
ALTER TABLE game_scores 
ADD COLUMN IF NOT EXISTS time_spent integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS accuracy_percentage integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS streak integer DEFAULT 0;

-- Enhance existing badges table
ALTER TABLE badges 
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS points integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS icon text;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lessons_level_id ON lessons(level_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_activities_lesson_id ON activities(lesson_id);
CREATE INDEX IF NOT EXISTS idx_activity_progress_user_id ON activity_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_progress_activity_id ON activity_progress(activity_id);
CREATE INDEX IF NOT EXISTS idx_assessments_lesson_id ON assessments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_assessment_id ON assessment_results(assessment_id);
CREATE INDEX IF NOT EXISTS idx_videos_level_id ON videos(level_id);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_video_progress_user_id ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_video_id ON video_progress(video_id);
CREATE INDEX IF NOT EXISTS idx_worksheets_level_id ON worksheets(level_id);
CREATE INDEX IF NOT EXISTS idx_worksheet_progress_user_id ON worksheet_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_worksheet_progress_worksheet_id ON worksheet_progress(worksheet_id);
CREATE INDEX IF NOT EXISTS idx_decodable_books_level_id ON decodable_books(level_id);
CREATE INDEX IF NOT EXISTS idx_book_progress_user_id ON book_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_book_progress_book_id ON book_progress(book_id);
CREATE INDEX IF NOT EXISTS idx_rule_mastery_user_id ON rule_mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_rule_mastery_rule_id ON rule_mastery(rule_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_rewards_reward_id ON user_rewards(reward_id);