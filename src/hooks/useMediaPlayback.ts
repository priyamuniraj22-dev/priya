import { useState, useEffect, useRef } from 'react';

interface MediaPlaybackState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  playbackRate: number;
}

interface UseMediaPlaybackProps {
  src: string;
  type: 'audio' | 'video';
  autoPlay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export const useMediaPlayback = ({
  src,
  type,
  autoPlay = false,
  loop = false,
  onPlay,
  onPause,
  onEnd,
  onError
}: UseMediaPlaybackProps) => {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const [state, setState] = useState<MediaPlaybackState>({
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    isMuted: false,
    isLoading: true,
    error: null,
    playbackRate: 1
  });

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const setMediaData = () => {
      setState(prev => ({
        ...prev,
        duration: media.duration,
        currentTime: media.currentTime,
        isLoading: false
      }));
    };

    const setMediaTime = () => {
      setState(prev => ({
        ...prev,
        currentTime: media.currentTime
      }));
    };

    const handleError = () => {
      const errorMessage = `Failed to load ${type}`;
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
      if (onError) onError(errorMessage);
    };

    const handleEnded = () => {
      setState(prev => ({
        ...prev,
        isPlaying: false
      }));
      if (onEnd) onEnd();
    };

    media.addEventListener('loadeddata', setMediaData);
    media.addEventListener('timeupdate', setMediaTime);
    media.addEventListener('error', handleError);
    media.addEventListener('ended', handleEnded);

    if (autoPlay) {
      play();
    }

    return () => {
      media.removeEventListener('loadeddata', setMediaData);
      media.removeEventListener('timeupdate', setMediaTime);
      media.removeEventListener('error', handleError);
      media.removeEventListener('ended', handleEnded);
    };
  }, [autoPlay, onEnd, onError, type]);

  const play = async () => {
    try {
      if (mediaRef.current) {
        await mediaRef.current.play();
        setState(prev => ({
          ...prev,
          isPlaying: true
        }));
        if (onPlay) onPlay();
      }
    } catch (err) {
      const errorMessage = `Failed to play ${type}`;
      setState(prev => ({
        ...prev,
        error: errorMessage
      }));
      if (onError) onError(errorMessage);
      console.error(`${type} play error:`, err);
    }
  };

  const pause = () => {
    if (mediaRef.current) {
      mediaRef.current.pause();
      setState(prev => ({
        ...prev,
        isPlaying: false
      }));
      if (onPause) onPause();
    }
  };

  const seek = (time: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
      setState(prev => ({
        ...prev,
        currentTime: time
      }));
    }
  };

  const setVolume = (volume: number) => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
      setState(prev => ({
        ...prev,
        volume,
        isMuted: volume === 0
      }));
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      const newMuted = !state.isMuted;
      mediaRef.current.muted = newMuted;
      setState(prev => ({
        ...prev,
        isMuted: newMuted,
        volume: newMuted ? 0 : prev.volume || 1
      }));
    }
  };

  const setPlaybackRate = (rate: number) => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
      setState(prev => ({
        ...prev,
        playbackRate: rate
      }));
    }
  };

  const restart = () => {
    seek(0);
    if (!state.isPlaying) {
      play();
    }
  };

  return {
    mediaRef,
    ...state,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    restart
  };
};