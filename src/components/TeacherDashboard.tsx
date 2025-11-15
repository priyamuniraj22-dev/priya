import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Download, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import { supabase } from '../services/progressService';
import { User as UserType } from '../types/database';

interface TeacherDashboardProps {
  teacherName: string;
  userId: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  level: string;
  progress: number;
  lastActive: string;
  badges: number;
  score: number;
}

interface ClassActivity {
  id: string;
  studentName: string;
  activity: string;
  type: 'lesson' | 'game' | 'assessment';
  date: string;
  time: string;
  score?: number;
}

interface ClassStats {
  totalStudents: number;
  averageProgress: number;
  activeToday: number;
  lessonsCompleted: number;
}

export default function TeacherDashboard({ teacherName, userId }: TeacherDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [classStats, setClassStats] = useState<ClassStats>({
    totalStudents: 0,
    averageProgress: 0,
    activeToday: 0,
    lessonsCompleted: 0
  });
  const [recentActivity, setRecentActivity] = useState<ClassActivity[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch students and class data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, we would fetch actual student data from the database
        // For now, we'll use mock data but demonstrate the structure for real implementation
        
        // Mock data - in a real app, this would come from the database
        const mockStudents: Student[] = [
          { id: '1', name: 'Emma Johnson', avatar: 'EJ', level: 'Beginner', progress: 75, lastActive: '2 hours ago', badges: 5, score: 1250 },
          { id: '2', name: 'Noah Williams', avatar: 'NW', level: 'Foundations', progress: 60, lastActive: '1 day ago', badges: 3, score: 980 },
          { id: '3', name: 'Olivia Brown', avatar: 'OB', level: 'Intermediate', progress: 45, lastActive: '3 hours ago', badges: 7, score: 1650 },
          { id: '4', name: 'Liam Jones', avatar: 'LJ', level: 'Beginner', progress: 90, lastActive: '30 minutes ago', badges: 8, score: 1800 },
          { id: '5', name: 'Ava Garcia', avatar: 'AG', level: 'Foundations', progress: 30, lastActive: '5 hours ago', badges: 2, score: 650 },
          { id: '6', name: 'Lucas Miller', avatar: 'LM', level: 'Advanced', progress: 80, lastActive: '1 hour ago', badges: 9, score: 2100 },
        ];
        
        const mockStats: ClassStats = {
          totalStudents: 24,
          averageProgress: 62,
          activeToday: 18,
          lessonsCompleted: 42
        };
        
        const mockActivity: ClassActivity[] = [
          { id: '1', studentName: 'Emma Johnson', activity: 'Completed Letter Fishing', type: 'game', date: 'Today', time: '2:30 PM', score: 100 },
          { id: '2', studentName: 'Noah Williams', activity: 'Finished Short Vowels Lesson', type: 'lesson', date: 'Today', time: '1:15 PM' },
          { id: '3', studentName: 'Olivia Brown', activity: 'Passed Assessment 1', type: 'assessment', date: 'Today', time: '12:45 PM', score: 95 },
          { id: '4', studentName: 'Liam Jones', activity: 'Watched Alphabet Video', type: 'lesson', date: 'Today', time: '11:20 AM' },
          { id: '5', studentName: 'Ava Garcia', activity: 'Completed CVC Builder', type: 'game', date: 'Yesterday', time: '4:30 PM', score: 85 },
        ];
        
        setStudents(mockStudents);
        setClassStats(mockStats);
        setRecentActivity(mockActivity);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Filter students based on search and level
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || student.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  // Get unique levels for filter
  const levels = Array.from(new Set(students.map(s => s.level)));

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const closeStudentView = () => {
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {teacherName}!</h1>
            <p className="text-gray-600">Monitor your students' phonics progress</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:shadow-md transition-shadow">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#FFB703]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{classStats.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-[#FFB703]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#00B4D8]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Progress</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{classStats.averageProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#00B4D8]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#FF6363]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{classStats.activeToday}</p>
              </div>
              <Calendar className="w-8 h-8 text-[#FF6363]" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#8B5CF6]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Lessons Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{classStats.lessonsCompleted}</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#8B5CF6]" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Students List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900">Students</h2>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Level</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Badges</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Active</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              {student.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {student.level}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{student.badges}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">{student.score}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{student.lastActive}</span>
                        </td>
                        <td className="py-4 px-4">
                          <button 
                            onClick={() => handleViewStudent(student)}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button className="text-blue-500 text-sm font-medium hover:underline">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      activity.type === 'lesson' ? 'bg-blue-100' : 
                      activity.type === 'game' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'lesson' ? (
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      ) : activity.type === 'game' ? (
                        <Award className="w-5 h-5 text-green-500" />
                      ) : (
                        <BarChart3 className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.studentName}</p>
                      <p className="text-gray-600 text-sm">{activity.activity}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                        {activity.score && (
                          <span className="text-xs font-bold text-blue-500">{activity.score} pts</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Progress - Mock data for now */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h2>
              <div className="flex items-end justify-between h-32 gap-2">
                {[
                  { day: 'Mon', progress: 45 },
                  { day: 'Tue', progress: 52 },
                  { day: 'Wed', progress: 58 },
                  { day: 'Thu', progress: 61 },
                  { day: 'Fri', progress: 65 },
                  { day: 'Sat', progress: 68 },
                  { day: 'Sun', progress: 72 },
                ].map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                      style={{ height: `${day.progress}%` }}
                    ></div>
                    <div className="text-xs font-medium text-gray-900 mt-2">{day.progress}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                    <p className="text-gray-600">{selectedStudent.level} Level</p>
                  </div>
                </div>
                <button
                  onClick={closeStudentView}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <span className="text-xl font-bold">×</span>
                </button>
              </div>

              <div className="p-6">
                {/* Student Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedStudent.progress}%</div>
                    <div className="text-sm text-gray-600">Progress</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedStudent.badges}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedStudent.score}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Level Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${selectedStudent.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Recent Activity for Student */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity
                      .filter(activity => activity.studentName === selectedStudent.name)
                      .slice(0, 3)
                      .map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'lesson' ? 'bg-blue-100' : 
                            activity.type === 'game' ? 'bg-green-100' : 'bg-purple-100'
                          }`}>
                            {activity.type === 'lesson' ? (
                              <BookOpen className="w-5 h-5 text-blue-500" />
                            ) : activity.type === 'game' ? (
                              <Award className="w-5 h-5 text-green-500" />
                            ) : (
                              <BarChart3 className="w-5 h-5 text-purple-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.activity}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{activity.date}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                          {activity.score && (
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                              {activity.score} pts
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-colors">
                    Assign Homework
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}