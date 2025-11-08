export interface Level {
  id: string;
  name: string;
  overview: string;
  targetAge: string;
  color: string;
}

export interface Class {
  id: string;
  levelId: string;
  number: number;
  title: string;
  duration: number;
  objective: string;
  activities: Activity[];
  games: Game[];
}

export interface Activity {
  type: string;
  description: string;
}

export interface Game {
  id: string;
  name: string;
  goal: string;
  mechanic: string;
  icon: string;
}

export interface UserProgress {
  userId: string;
  levelId: string;
  classId: string;
  completed: boolean;
  score: number;
  badges: string[];
}
