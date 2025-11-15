/**
 * Utility functions for playing audio and video files in the phonics learning app
 * This improved version handles errors better and provides more reliable playback
 */

// Audio player utility with improved error handling
export class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isUserInteractionReceived = false;

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
      });
      
      this.audio.play().catch(error => {
        console.warn(`Failed to play audio ${fileName}:`, error);
        // Try to play a fallback sound
        this.playFallbackSound();
      });
    } catch (error) {
      console.warn(`Error creating audio player for ${fileName}:`, error);
      this.playFallbackSound();
    }
  }

  /**
   * Play a fallback sound when the requested audio fails
   */
  private playFallbackSound(): void {
    try {
      if (this.audio) {
        this.audio.pause();
      }
      // Play a simple beep as fallback using the Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.3;
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 200);
    } catch (error) {
      console.warn('Failed to play fallback sound:', error);
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