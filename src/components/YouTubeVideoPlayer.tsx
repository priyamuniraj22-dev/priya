import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface YouTubeVideoPlayerProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

export default function YouTubeVideoPlayer({ videoId, title, onClose }: YouTubeVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Simulate video progress for demo purposes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          setCurrentTime(newProgress);
          if (newProgress >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  // Set a default duration for demo
  useEffect(() => {
    setDuration(180); // 3 minutes
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setProgress(newTime);
    setCurrentTime(newTime);
  };

  const handleRestart = () => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg truncate mr-4">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4">
          {/* YouTube Embed */}
          <div className="aspect-video bg-black rounded-xl mb-4 overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Video Controls */}
          <div className="bg-gray-800 rounded-xl p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={handleMute}
                  className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={handleRestart}
                  className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <button className="w-10 h-10 rounded-full hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-4 text-white">
            <h3 className="font-bold text-lg mb-2">About this video</h3>
            <p className="text-gray-300 text-sm">
              This educational video helps children learn phonics through engaging visuals and audio. 
              Perfect for young learners aged 3-8.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}