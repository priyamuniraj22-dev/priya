import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { playAudio, stopAudio } from '../utils/mediaPlayer';

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

  const playAudioWrapper = (fileName: string) => {
    // Use the improved media player utility
    playAudio(fileName);
  };

  const stopAudioWrapper = () => {
    // Use the improved media player utility
    stopAudio();
  };

  return (
    <AudioContext.Provider value={{ playAudio: playAudioWrapper, stopAudio: stopAudioWrapper }}>
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