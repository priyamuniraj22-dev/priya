/**
 * Utility functions for playing audio and video files in the phonics learning app
 * This improved version handles errors better and provides more reliable playback
 */

// Audio player utility with improved error handling
export class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isUserInteractionReceived = false;
  private audioContext: AudioContext | null = null;

  /**
   * Ensure user interaction before playing audio (required by modern browsers)
   */
  private ensureUserInteraction() {
    if (!this.isUserInteractionReceived) {
      // Create a temporary silent audio to "unlock" audio playback
      const tempAudio = new Audio();
      tempAudio.play().then(() => {
        tempAudio.pause();
        tempAudio.remove();
      }).catch(() => {
        // Ignore errors for the temporary audio
      });
      this.isUserInteractionReceived = true;
    }
  }

  /**
   * Play an audio file
   * @param fileName - Name of the audio file (e.g., 'letter_a.mp3')
   */
  playAudio(fileName: string): void {
    try {
      // Ensure we have user interaction for audio playback
      this.ensureUserInteraction();
      
      // Stop any currently playing audio
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }

      // Create new audio element with correct path
      // Vite serves static files from the public directory directly
      this.audio = new Audio(`/audio/${fileName}`);
      
      // Add event listeners for better error handling
      this.audio.addEventListener('error', (e) => {
        console.warn(`Failed to load audio ${fileName}:`, e);
        // Try to play a fallback sound with specific message
        this.playFallbackSound(`Error loading ${fileName}`);
      });
      
      // Check if the file actually has content
      this.audio.addEventListener('loadedmetadata', () => {
        // If duration is NaN or 0, the file is likely empty
        if (isNaN(this.audio!.duration) || this.audio!.duration <= 0) {
          console.warn(`Audio file ${fileName} appears to be empty or invalid`);
          // Try to play a fallback sound with specific message
          this.playFallbackSound(`Empty audio file ${fileName}`);
        }
      });
      
      // Add loadeddata event to check if file actually loaded
      this.audio.addEventListener('loadeddata', () => {
        // Check if the audio actually has data
        if (this.audio && this.audio.duration <= 0) {
          console.warn(`Audio file ${fileName} has no playable data`);
          this.playFallbackSound(`No data in ${fileName}`);
        }
      });
      
      // Add canplay event to ensure file can actually play
      this.audio.addEventListener('canplay', () => {
        console.log(`Audio file ${fileName} is ready to play`);
      });
      
      this.audio.play().catch(error => {
        console.warn(`Failed to play audio ${fileName}:`, error);
        // Try to play a fallback sound
        this.playFallbackSound(`Playback failed for ${fileName}`);
      });
    } catch (error) {
      console.warn(`Error creating audio player for ${fileName}:`, error);
      this.playFallbackSound(`Error with ${fileName}`);
    }
  }

  /**
   * Play a fallback sound when the requested audio fails
   * @param message - Optional message to identify which sound failed
   */
  private playFallbackSound(message?: string): void {
    try {
      // Log the message for debugging
      if (message) {
        console.info(`Playing fallback sound: ${message}`);
      }
      
      // Try to use Web Audio API for fallback sound
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Create a more distinctive sound
      oscillator.type = 'sine';
      oscillator.frequency.value = 800; // Higher pitch
      gainNode.gain.value = 0.3;
      
      // Add some variation to make it more noticeable
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 500);
    } catch (error) {
      console.warn('Failed to play fallback sound:', error);
      // Last resort: try to play a simple beep using the Audio element
      try {
        const beep = new Audio();
        beep.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFd2xqZ2VjYF1bWFdVVFJQTkxKSERCPz07OTc1MzEwLi0rKSclIyEgHh0cGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEA';
        beep.play();
      } catch (beepError) {
        console.warn('Failed to play beep sound:', beepError);
      }
    }
  }

  /**
   * Stop currently playing audio
   */
  stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}

// Video player utility with improved error handling
export class VideoPlayer {
  /**
   * Play a video file
   * @param fileName - Name of the video file (e.g., 'letter_a.mp4')
   * @param elementId - ID of the video element in the DOM
   */
  playVideo(fileName: string, elementId: string): void {
    try {
      const videoElement = document.getElementById(elementId) as HTMLVideoElement;
      if (videoElement) {
        // Set the correct path for the video file
        videoElement.src = `/video/${fileName}`;
        
        // Add event listeners for better error handling
        videoElement.addEventListener('error', (e) => {
          console.warn(`Failed to load video ${fileName}:`, e);
        });
        
        videoElement.play().catch(error => {
          console.warn(`Failed to play video ${fileName}:`, error);
        });
      } else {
        console.warn(`Video element with ID ${elementId} not found`);
      }
    } catch (error) {
      console.warn(`Error playing video ${fileName}:`, error);
    }
  }

  /**
   * Stop currently playing video
   * @param elementId - ID of the video element in the DOM
   */
  stopVideo(elementId: string): void {
    const videoElement = document.getElementById(elementId) as HTMLVideoElement;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }
}

// Create singleton instances
export const audioPlayer = new AudioPlayer();
export const videoPlayer = new VideoPlayer();

// Convenience functions
export const playAudio = (fileName: string): void => {
  audioPlayer.playAudio(fileName);
};

export const stopAudio = (): void => {
  audioPlayer.stopAudio();
};

export const playVideo = (fileName: string, elementId: string): void => {
  videoPlayer.playVideo(fileName, elementId);
};

export const stopVideo = (elementId: string): void => {
  videoPlayer.stopVideo(elementId);
};

// Simple test function to check if audio is working
export const testAudio = (): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    
    console.log('Audio test successful');
  } catch (error) {
    console.error('Audio test failed:', error);
  }
};