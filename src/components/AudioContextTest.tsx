import { useState, useEffect } from 'react';

export default function AudioContextTest() {
  const [audioContextStatus, setAudioContextStatus] = useState<string>('unknown');
  const [audioContextState, setAudioContextState] = useState<string>('unknown');

  useEffect(() => {
    // Check if AudioContext is available
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      setAudioContextStatus('available');
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContextState(audioContext.state);
        
        // Try to resume if suspended
        if (audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            setAudioContextState(audioContext.state);
          }).catch((error) => {
            console.error('Error resuming audio context:', error);
            setAudioContextState('error: ' + error.message);
          });
        }
      } catch (error) {
        setAudioContextState('error: ' + (error as Error).message);
      }
    } else {
      setAudioContextStatus('not available');
      setAudioContextState('AudioContext not supported in this browser');
    }
  }, []);

  const playTestSound = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 440;
      gainNode.gain.value = 0.1;
      
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 500);
      
      console.log('Test sound played successfully');
    } catch (error) {
      console.error('Error playing test sound:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Audio Context Test</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium">AudioContext Status: {audioContextStatus}</p>
        </div>
        
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-purple-800 font-medium">AudioContext State: {audioContextState}</p>
        </div>
        
        <button
          onClick={playTestSound}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Play Test Sound
        </button>
      </div>
    </div>
  );
}