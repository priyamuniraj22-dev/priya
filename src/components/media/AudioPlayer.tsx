import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  showControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export default function AudioPlayer({ 
  src, 
  title, 
  onPlay, 
  onPause, 
  onEnd, 
  showControls = true, 
  autoPlay = false, 
  loop = false,
  className = ''
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      setIsLoading(false);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    const handleError = () => {
      setError('Failed to load audio');
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnd) onEnd();
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    if (autoPlay) {
      handlePlay();
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, onEnd]);

  const handlePlay = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
        if (onPlay) onPlay();
      }
    } catch (err) {
      setError('Failed to play audio');
      console.error('Audio play error:', err);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onPause) onPause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    if (isMuted && vol > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        handlePlay();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-4 ${className}`}>
      <audio 
        ref={audioRef} 
        src={src} 
        loop={loop}
        preload="metadata"
      />
      
      {title && (
        <div className="font-bold text-gray-900 mb-3 text-center truncate">
          {title}
        </div>
      )}
      
      {error ? (
        <div className="text-red-500 text-center py-4">
          Error: {error}
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          
          {/* Controls */}
          {showControls && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestart}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-5 h-5 text-gray-700" />
                </button>
                
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-gray-700" />
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  aria-label="Volume control"
                />
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="text-center py-2 text-gray-500">
              Loading audio...
            </div>
          )}
        </>
      )}
    </div>
  );
}