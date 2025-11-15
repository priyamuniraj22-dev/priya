import { useState } from 'react';
import { Play, Video, Youtube, Film, Search, Filter } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  type: 'youtube' | 'local';
  url: string;
  level?: string;
  category: string;
}

interface VideoCategory {
  id: string;
  title: string;
  description: string;
  videos: VideoItem[];
}

// Define video categories with actual data
const videoCategories: VideoCategory[] = [
  {
    id: 'alphabet',
    title: 'Alphabet Songs',
    description: 'Fun songs to learn the alphabet',
    videos: [
      { 
        id: 'alphabet_song_1', 
        title: 'ABC Song with Animals', 
        description: 'Learn the alphabet with cute animals',
        duration: '3:45', 
        thumbnail: '/video/thumbnails/abc_animals.jpg',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=75p-N9YKqNo',
        category: 'alphabet'
      },
      { 
        id: 'alphabet_song_2', 
        title: 'Phonics Alphabet Song', 
        description: 'Phonics sounds for each letter',
        duration: '4:20', 
        thumbnail: '/video/thumbnails/phonics_alphabet.jpg',
        type: 'local',
        url: '/video/phonics_alphabet.mp4',
        category: 'alphabet'
      },
      { 
        id: 'alphabet_song_3', 
        title: 'Alphabet Action Song', 
        description: 'Move and learn with the alphabet',
        duration: '3:15', 
        thumbnail: '/video/thumbnails/alphabet_action.jpg',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=example123',
        category: 'alphabet'
      },
    ]
  },
  {
    id: 'phonics',
    title: 'Phonics Songs',
    description: 'Songs to learn phonics sounds',
    videos: [
      { 
        id: 'phonics_song_1', 
        title: 'Short Vowels Song', 
        description: 'Learn short vowel sounds',
        duration: '2:30', 
        thumbnail: '/video/thumbnails/short_vowels.jpg',
        type: 'local',
        url: '/video/short_vowels.mp4',
        level: 'Beginner',
        category: 'phonics'
      },
      { 
        id: 'phonics_song_2', 
        title: 'Blends and Digraphs', 
        description: 'Master consonant blends and digraphs',
        duration: '3:10', 
        thumbnail: '/video/thumbnails/blends_digraphs.jpg',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=example456',
        level: 'Intermediate',
        category: 'phonics'
      },
      { 
        id: 'phonics_song_3', 
        title: 'Magic E Song', 
        description: 'Learn the magic e rule',
        duration: '2:45', 
        thumbnail: '/video/thumbnails/magic_e.jpg',
        type: 'local',
        url: '/video/magic_e.mp4',
        level: 'Intermediate',
        category: 'phonics'
      },
    ]
  },
  {
    id: 'cvc',
    title: 'CVC Words Videos',
    description: 'Learn to read CVC words',
    videos: [
      { 
        id: 'cvc_video_1', 
        title: 'Cat, Bat, Hat Words', 
        description: 'CVC words with short a sound',
        duration: '5:20', 
        thumbnail: '/video/thumbnails/cat_bat_hat.jpg',
        type: 'local',
        url: '/video/cat_bat_hat.mp4',
        level: 'Beginner',
        category: 'cvc'
      },
      { 
        id: 'cvc_video_2', 
        title: 'Dog, Log, Frog Words', 
        description: 'CVC words with short o sound',
        duration: '4:50', 
        thumbnail: '/video/thumbnails/dog_log_frog.jpg',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=example789',
        level: 'Beginner',
        category: 'cvc'
      },
      { 
        id: 'cvc_video_3', 
        title: 'Sun, Bun, Fun Words', 
        description: 'CVC words with short u sound',
        duration: '3:40', 
        thumbnail: '/video/thumbnails/sun_bun_fun.jpg',
        type: 'local',
        url: '/video/sun_bun_fun.mp4',
        level: 'Beginner',
        category: 'cvc'
      },
    ]
  },
  {
    id: 'blends-digraphs',
    title: 'Blends and Digraphs Videos',
    description: 'Master consonant blends and digraphs',
    videos: [
      { 
        id: 'blends_video_1', 
        title: 'BL, CL, SL Blends', 
        description: 'Learn beginning blends',
        duration: '6:15', 
        thumbnail: '/video/thumbnails/blends_1.jpg',
        type: 'local',
        url: '/video/blends_1.mp4',
        level: 'Intermediate',
        category: 'blends-digraphs'
      },
      { 
        id: 'blends_video_2', 
        title: 'BR, GR, TR Blends', 
        description: 'More beginning blends',
        duration: '5:30', 
        thumbnail: '/video/thumbnails/blends_2.jpg',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=example012',
        level: 'Intermediate',
        category: 'blends-digraphs'
      },
      { 
        id: 'digraphs_video_1', 
        title: 'CH, SH, TH Digraphs', 
        description: 'Learn consonant digraphs',
        duration: '4:45', 
        thumbnail: '/video/thumbnails/digraphs.jpg',
        type: 'local',
        url: '/video/digraphs.mp4',
        level: 'Intermediate',
        category: 'blends-digraphs'
      },
    ]
  }
];

export default function VideosLibrary() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Get all unique levels for filter
  const allLevels = Array.from(new Set(videoCategories.flatMap(cat => 
    cat.videos.map(video => video.level).filter(level => level !== undefined)
  ))) as string[];

  // Filter videos based on search, category, and level
  const filteredCategories = videoCategories
    .filter(category => selectedCategory === 'all' || category.id === selectedCategory)
    .map(category => ({
      ...category,
      videos: category.videos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             video.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'all' || video.level === selectedLevel;
        return matchesSearch && matchesLevel;
      })
    }))
    .filter(category => category.videos.length > 0);

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-[#FFB703]" />
              <h1 className="text-3xl font-bold text-gray-900">Videos Library</h1>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              >
                <option value="all">All Categories</option>
                {videoCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              >
                <option value="all">All Levels</option>
                {allLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            Watch fun educational videos to learn phonics. Click on any video to start watching.
          </p>
          
          {searchQuery && (
            <div className="text-sm text-gray-500 mb-4">
              Showing {filteredCategories.reduce((acc, cat) => acc + cat.videos.length, 0)} results for "{searchQuery}"
            </div>
          )}
        </div>

        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
              <p className="text-gray-600 mb-6">{category.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className="bg-gradient-to-br from-[#00B4D8]/10 to-[#8B5CF6]/10 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-[#00B4D8]"
                  >
                    <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                          <Film className="w-12 h-12 text-gray-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          {video.type === 'youtube' ? (
                            <Youtube className="w-8 h-8 text-red-600" />
                          ) : (
                            <Play className="w-8 h-8 text-[#00B4D8]" />
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white font-medium">
                        {video.duration}
                      </div>
                      {video.level && (
                        <div className="absolute top-3 right-3 bg-[#FFB703] text-white text-xs font-bold px-2 py-1 rounded-full">
                          {video.level}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {video.type === 'youtube' ? (
                          <Youtube className="w-4 h-4 text-red-600" />
                        ) : (
                          <Film className="w-4 h-4 text-[#00B4D8]" />
                        )}
                        <span className="text-xs text-gray-500 capitalize">{video.type} video</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 md:p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                <p className="text-gray-600 mt-1">{selectedVideo.description}</p>
              </div>
              <button
                onClick={closeVideoPlayer}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>

            <div className="p-4 md:p-8">
              <div className="aspect-video bg-black rounded-xl mb-6 flex items-center justify-center">
                {selectedVideo.type === 'youtube' ? (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Youtube className="w-16 h-16 mx-auto mb-4 text-red-500" />
                      <p className="mb-4">YouTube video would be embedded here</p>
                      <a 
                        href={selectedVideo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                ) : (
                  <video 
                    src={selectedVideo.url} 
                    controls 
                    className="w-full h-full rounded-xl"
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Video Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium">Duration:</span> {selectedVideo.duration}</p>
                    <p><span className="font-medium">Category:</span> {selectedVideo.category}</p>
                    {selectedVideo.level && (
                      <p><span className="font-medium">Level:</span> {selectedVideo.level}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Related Videos</h3>
                  <div className="space-y-3">
                    {videoCategories
                      .find(cat => cat.id === selectedVideo.category)
                      ?.videos.slice(0, 3)
                      .filter(video => video.id !== selectedVideo.id)
                      .map(video => (
                        <div 
                          key={video.id}
                          onClick={() => handleVideoSelect(video)}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          <div className="bg-gray-200 w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center">
                            {video.thumbnail ? (
                              <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Film className="w-6 h-6 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{video.title}</h4>
                            <p className="text-xs text-gray-500">{video.duration}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}