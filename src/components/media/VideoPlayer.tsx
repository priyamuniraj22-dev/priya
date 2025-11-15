import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  showControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  thumbnail?: string;
}

export default function VideoPlayer({ 
  src, 
  title, 
  onPlay, 
  onPause, 
  onEnd, 
  showControls = true, 
  autoPlay = false, 
  loop = false,
  className = '',
  thumbnail
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setVideoData = () => {
      setDuration(video.duration);
      setCurrentTime(video.currentTime);
      setIsLoading(false);
    };

    const setVideoTime = () => setCurrentTime(video.currentTime);

    const handleError = () => {
      setError('Failed to load video');
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnd) onEnd();
    };

    video.addEventListener('loadeddata', setVideoData);
    video.addEventListener('timeupdate', setVideoTime);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    if (autoPlay) {
      handlePlay();
    }

    return () => {
      video.removeEventListener('loadeddata', setVideoData);
      video.removeEventListener('timeupdate', setVideoTime);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, onEnd]);

  const handlePlay = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        if (onPlay) onPlay();
      }
    } catch (err) {
      setError('Failed to play video');
      console.error('Video play error:', err);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    if (isMuted && vol > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        handlePlay();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`bg-black rounded-2xl overflow-hidden ${className}`}>
      <div className="relative aspect-video">
        {thumbnail && !isPlaying && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${thumbnail})` }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <Play className="w-8 h-8 text-gray-900 ml-1" />
              </button>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          src={src}
          loop={loop}
          preload="metadata"
          className="w-full h-full object-contain"
        />
        
        {error && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <div className="text-red-400 mb-2">Error loading video</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        )}
        
        {isLoading && !error && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-white">Loading video...</div>
          </div>
        )}
      </div>
      
      {showControls && (
        <div className="bg-gray-900 p-3">
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Restart"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
              
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                aria-label="Volume control"
              />
              
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <Maximize className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {title && (
        <div className="bg-gray-800 p-3">
          <div className="font-medium text-white truncate">
            {title}
          </div>
        </div>
      )}
    </div>
  );
}