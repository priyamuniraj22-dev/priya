/*
  # PhonicsPlayhouse Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Synced with auth.users
      - `display_name` (text) - User's display name
      - `age` (integer) - Child's age
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - References users table
      - `level_id` (text) - Level identifier (L1, L2, etc.)
      - `class_id` (text) - Class identifier (L1-C1, L2-C1, etc.)
      - `completed` (boolean) - Whether class is completed
      - `score` (integer) - Total score for the class
      - `created_at` (timestamptz) - When progress was first recorded
      - `updated_at` (timestamptz) - Last progress update

    - `game_scores`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - References users table
      - `game_id` (text) - Game identifier (G1, G2, etc.)
      - `class_id` (text) - Associated class identifier
      - `score` (integer) - Score achieved in the game
      - `completed` (boolean) - Whether game was completed
      - `play_count` (integer) - Number of times played
      - `created_at` (timestamptz) - First play timestamp
      - `updated_at` (timestamptz) - Last play timestamp

    - `badges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - References users table
      - `badge_type` (text) - Type of badge earned
      - `badge_name` (text) - Name of the badge
      - `earned_at` (timestamptz) - When badge was earned

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Users can only access their own progress, scores, and badges
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  age integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level_id text NOT NULL,
  class_id text NOT NULL,
  completed boolean DEFAULT false,
  score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, class_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id text NOT NULL,
  class_id text NOT NULL,
  score integer DEFAULT 0,
  completed boolean DEFAULT false,
  play_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, game_id, class_id)
);

ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game scores"
  ON game_scores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game scores"
  ON game_scores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own game scores"
  ON game_scores FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_type text NOT NULL,
  badge_name text NOT NULL,
  earned_at timestamptz DEFAULT now()
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
  ON badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_level_id ON user_progress(level_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_class_id ON game_scores(class_id);
CREATE INDEX IF NOT EXISTS idx_badges_user_id ON badges(user_id);
