import { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Download, Play, Volume2 } from 'lucide-react';
import { generateLessonsForLevel, generateCompleteCurriculum } from '../services/lessonGenerator';
import { Class } from '../types/course';
import { Level } from '../types/course';
import { levels as courseLevels } from '../data/courseData';

export default function LessonGenerator() {
  const [selectedLevel, setSelectedLevel] = useState<string>('LEVEL_1');
  const [generatedLessons, setGeneratedLessons] = useState<Class[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCurriculum, setGeneratedCurriculum] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'lessons' | 'curriculum'>('lessons');

  // Get levels from phonicsScope
  const levels: Level[] = [
    { id: 'LEVEL_1', name: 'Basic Sounds', overview: 's, a, t, p, i, n, m, d, g, o, c, k, ck, e, u, r, h, b, f, ff, l, ll, ss', targetAge: '3-5', color: '#FFB703' },
    { id: 'LEVEL_2', name: 'Digraphs', overview: 'sh, ch, th, ph, wh, ng', targetAge: '5-6', color: '#00B4D8' },
    { id: 'LEVEL_3', name: 'Blends', overview: 'bl, cl, fl, gl, pl, sl, br, cr, dr, fr, gr, pr, tr, sc, sk, sm, sn, sp, st, sw', targetAge: '6-7', color: '#FF6363' },
    { id: 'LEVEL_4', name: 'Long Vowels', overview: 'Magic e words: a_e, i_e, o_e, u_e, e_e', targetAge: '6-7', color: '#8B5CF6' },
    { id: 'LEVEL_5', name: 'Vowel Teams', overview: 'ai, ay, ee, ea, oa, ow, igh, oi, oy', targetAge: '7-8', color: '#10B981' },
    { id: 'LEVEL_6', name: 'R-Controlled Vowels', overview: 'ar, er, ir, ur, or', targetAge: '7-8', color: '#F59E0B' },
    { id: 'LEVEL_7', name: 'Advanced Concepts', overview: 'soft c, soft g, 2-syllable words, consonant-le, prefixes & suffixes', targetAge: '8-10', color: '#EF4444' }
  ];

  useEffect(() => {
    handleGenerateLessons();
  }, [selectedLevel]);

  const handleGenerateLessons = () => {
    setIsGenerating(true);
    try {
      const lessons = generateLessonsForLevel(selectedLevel);
      setGeneratedLessons(lessons);
    } catch (error) {
      console.error('Error generating lessons:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateCompleteCurriculum = () => {
    setIsGenerating(true);
    try {
      const curriculum = generateCompleteCurriculum();
      setGeneratedCurriculum(curriculum);
      setActiveTab('curriculum');
    } catch (error) {
      console.error('Error generating curriculum:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCurriculum = () => {
    // In a real app, this would download a JSON file or PDF
    const dataStr = JSON.stringify(generatedCurriculum, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'phonics_curriculum.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lesson Generator</h1>
              <p className="text-gray-600 mt-2">Automatically generate phonics lessons and curriculum</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerateLessons}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                Regenerate Lessons
              </button>
              
              <button
                onClick={handleGenerateCompleteCurriculum}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold transition-colors disabled:opacity-50"
              >
                <BookOpen className="w-4 h-4" />
                Generate Full Curriculum
              </button>
            </div>
          </div>

          {/* Level Selector */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Level</h2>
            <div className="flex flex-wrap gap-3">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedLevel === level.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'lessons'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Generated Lessons
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'curriculum'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Full Curriculum
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'lessons' && (
            <div>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-600">Generating lessons for {levels.find(l => l.id === selectedLevel)?.name}...</p>
                </div>
              ) : generatedLessons.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedLessons.map((lesson, index) => (
                      <div 
                        key={lesson.id} 
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div 
                          className="h-2" 
                          style={{ backgroundColor: levels.find(l => l.id === selectedLevel)?.color || '#FFB703' }}
                        ></div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{lesson.title}</h3>
                              <p className="text-gray-600 text-sm mt-1">{lesson.objective}</p>
                            </div>
                            <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                              Lesson {index + 1}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span>{lesson.duration} min</span>
                            <span>{lesson.activities.length} activities</span>
                            <span>{lesson.games.length} games</span>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm mb-2">Activities</h4>
                              <div className="flex flex-wrap gap-2">
                                {lesson.activities.slice(0, 3).map((activity, idx) => (
                                  <span 
                                    key={idx} 
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                  >
                                    {activity.type}
                                  </span>
                                ))}
                                {lesson.activities.length > 3 && (
                                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                    +{lesson.activities.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm mb-2">Games</h4>
                              <div className="flex flex-wrap gap-2">
                                {lesson.games.map((game, idx) => (
                                  <span 
                                    key={idx} 
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                    {game.name.replace(` - ${lesson.id}`, '')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Lessons Generated</h3>
                  <p className="text-gray-600 mb-6">Select a level and click "Generate Lessons" to create content</p>
                  <button
                    onClick={handleGenerateLessons}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
                  >
                    Generate Lessons
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-600">Generating complete curriculum...</p>
                </div>
              ) : generatedCurriculum ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Complete Curriculum Overview</h2>
                    <button
                      onClick={handleDownloadCurriculum}
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full font-bold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Curriculum
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {generatedCurriculum.lessons.length}
                      </div>
                      <div className="text-gray-700 font-medium">Lessons</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {generatedCurriculum.assessments.length}
                      </div>
                      <div className="text-gray-700 font-medium">Assessments</div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">
                        {generatedCurriculum.worksheets.length}
                      </div>
                      <div className="text-gray-700 font-medium">Worksheets</div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {generatedCurriculum.videos.length}
                      </div>
                      <div className="text-gray-700 font-medium">Videos</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-4">Curriculum Structure</h3>
                    <div className="space-y-4">
                      {levels.map((level, levelIndex) => {
                        const levelLessons = generatedCurriculum.lessons.filter((l: Class) => l.levelId === level.id);
                        return (
                          <div key={level.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900">
                                {level.name}
                              </h4>
                              <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full">
                                {levelLessons.length} lessons
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{level.overview}</p>
                            <div className="flex flex-wrap gap-2">
                              {levelLessons.slice(0, 3).map((lesson: Class, idx: number) => (
                                <span 
                                  key={lesson.id} 
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                  {lesson.title}
                                </span>
                              ))}
                              {levelLessons.length > 3 && (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                  +{levelLessons.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Curriculum Generated</h3>
                  <p className="text-gray-600 mb-6">Click "Generate Full Curriculum" to create a complete phonics program</p>
                  <button
                    onClick={handleGenerateCompleteCurriculum}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
                  >
                    Generate Full Curriculum
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}