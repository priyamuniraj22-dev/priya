import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface AudioContextType {
  playAudio: (fileName: string) => void;
  stopAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (fileName: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(`/audio/${fileName}`);
      audioRef.current.play().catch(error => {
        console.warn(`Failed to play audio ${fileName}:`, error);
      });
    } catch (error) {
      console.warn(`Error creating audio player for ${fileName}:`, error);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio }}>
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};