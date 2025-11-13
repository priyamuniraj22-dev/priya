/**
 * Utility functions for playing audio and video files in the phonics learning app
 */

// Audio player utility
export class AudioPlayer {
  private audio: HTMLAudioElement | null = null;

  /**
   * Play an audio file
   * @param fileName - Name of the audio file (e.g., 'letter_a.mp3')
   */
  playAudio(fileName: string): void {
    try {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }

      this.audio = new Audio(`/audio/${fileName}`);
      this.audio.play().catch(error => {
        console.warn(`Failed to play audio ${fileName}:`, error);
      });
    } catch (error) {
      console.warn(`Error creating audio player for ${fileName}:`, error);
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

// Video player utility
export class VideoPlayer {
  private video: HTMLVideoElement | null = null;

  /**
   * Play a video file
   * @param fileName - Name of the video file (e.g., 'letter_a.mp4')
   * @param elementId - ID of the video element in the DOM
   */
  playVideo(fileName: string, elementId: string): void {
    try {
      const videoElement = document.getElementById(elementId) as HTMLVideoElement;
      if (videoElement) {
        videoElement.src = `/video/${fileName}`;
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