import { useState } from 'react';
import { Play, Volume2, Video, Filter, Search } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

interface MediaItem {
  id: string;
  title: string;
  type: 'audio' | 'video';
  url: string;
  thumbnail?: string;
  duration?: string;
  level?: string;
  category: string;
  description: string;
}

interface MediaGalleryProps {
  mediaItems: MediaItem[];
  className?: string;
}

export default function MediaGallery({ mediaItems, className = '' }: MediaGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories and levels for filters
  const categories = Array.from(new Set(mediaItems.map(item => item.category)));
  const levels = Array.from(new Set(mediaItems.map(item => item.level).filter(Boolean))) as string[];

  // Filter media items based on search and filters
  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handlePlayItem = (item: MediaItem) => {
    setSelectedItem(item);
  };

  const closePlayer = () => {
    setSelectedItem(null);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {levels.length > 0 && (
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
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filteredItems.length} of {mediaItems.length} media items
      </div>

      {/* Media Grid/List */}
      {filteredItems.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className={viewMode === 'grid' 
                ? 'bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer border border-gray-200' 
                : 'flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-200'
              }
              onClick={() => handlePlayItem(item)}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative aspect-video bg-gray-200">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {item.type === 'audio' ? (
                          <Volume2 className="w-8 h-8 text-gray-400" />
                        ) : (
                          <Video className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-900" />
                      </div>
                    </div>
                    {item.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {item.type}
                      </span>
                      {item.level && (
                        <span className="text-xs text-gray-500">{item.level}</span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    {item.type === 'audio' ? (
                      <Volume2 className="w-6 h-6 text-gray-600" />
                    ) : (
                      <Video className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.duration && (
                      <span className="text-sm text-gray-500">{item.duration}</span>
                    )}
                    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                      <Play className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Media Player Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 md:p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                <p className="text-gray-600 mt-1">{selectedItem.description}</p>
              </div>
              <button
                onClick={closePlayer}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>

            <div className="p-4 md:p-8">
              {selectedItem.type === 'audio' ? (
                <AudioPlayer 
                  src={selectedItem.url}
                  title={selectedItem.title}
                  showControls={true}
                  autoPlay={true}
                  className="max-w-2xl mx-auto"
                />
              ) : (
                <VideoPlayer 
                  src={selectedItem.url}
                  title={selectedItem.title}
                  thumbnail={selectedItem.thumbnail}
                  showControls={true}
                  autoPlay={true}
                />
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Media Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium">Type:</span> {selectedItem.type}</p>
                    {selectedItem.duration && (
                      <p><span className="font-medium">Duration:</span> {selectedItem.duration}</p>
                    )}
                    <p><span className="font-medium">Category:</span> {selectedItem.category}</p>
                    {selectedItem.level && (
                      <p><span className="font-medium">Level:</span> {selectedItem.level}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Related Media</h3>
                  <div className="space-y-3">
                    {mediaItems
                      .filter(item => item.category === selectedItem.category && item.id !== selectedItem.id)
                      .slice(0, 3)
                      .map(item => (
                        <div 
                          key={item.id}
                          onClick={() => handlePlayItem(item)}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            {item.type === 'audio' ? (
                              <Volume2 className="w-5 h-5 text-gray-600" />
                            ) : (
                              <Video className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
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