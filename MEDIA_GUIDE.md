# Media Implementation Guide

This guide explains how audio and video files have been implemented in the PhonicsPlayhouse application.

## Directory Structure

```
/public
  /audio
    - letter_[letter].mp3       # Individual letter sounds
    - word_[word].mp3           # Complete word pronunciations
    - sound_[type].mp3          # UI sounds and effects
    - README.md                 # Audio file documentation
    - video_usage_guide.md      # Usage guide
  /video
    - letter_[letter].mp4       # Animated letter demonstrations
    - word_[word].mp4           # Word formation animations
    - lesson_[level]_[lesson].mp4 # Lesson introduction videos
    - README.md                 # Video file documentation
/src
  /utils
    - mediaPlayer.ts            # Utility functions for playing media
  /contexts
    - AudioContext.tsx         # React context for audio management
  /components
    - MediaDemo.tsx            # Demo component for testing media
```

## Implementation Details

### 1. Data Structure Updates

The course data has been updated to include references to audio and video files:
- Levels now include `audioFiles` and `videoFiles` arrays
- Classes include `audioFiles` and `videoFiles` arrays
- Activities can reference individual `audioFile` and `videoFile`
- Games include `audioFiles` and `videoFiles` arrays

### 2. Type Definitions

The [course.ts](file:///c:/Users/vinoth/priya/priya/src/types/course.ts) file has been updated with optional media file properties:
- `audioFiles?: string[]` and `videoFiles?: string[]` for Levels and Classes
- `audioFile?: string` and `videoFile?: string` for Activities
- `audioFiles?: string[]` and `videoFiles?: string[]` for Games

### 3. Media Player Utility

The [mediaPlayer.ts](file:///c:/Users/vinoth/priya/priya/src/utils/mediaPlayer.ts) utility provides functions for playing audio and video:
- `playAudio(fileName: string)` - Plays an audio file
- `stopAudio()` - Stops currently playing audio
- `playVideo(fileName: string, elementId: string)` - Plays a video file in a specified element
- `stopVideo(elementId: string)` - Stops video playback

### 4. Audio Context

The [AudioContext.tsx](file:///c:/Users/vinoth/priya/priya/src/contexts/AudioContext.tsx) provides a React context for managing audio playback across the application:
- `AudioProvider` component wraps the application
- `useAudio()` hook provides access to audio functions

### 5. Game Component Integration

Game components have been updated to use audio feedback:
- [LetterFishing.tsx](file:///c:/Users/vinoth/priya/priya/src/components/games/LetterFishing.tsx) - Plays letter sounds and feedback
- [SoundTreasureHunt.tsx](file:///c:/Users/vinoth/priya/priya/src/components/games/SoundTreasureHunt.tsx) - Plays treasure hunt sounds
- [CVCBuilder.tsx](file:///c:/Users/vinoth/priya/priya/src/components/games/CVCBuilder.tsx) - Plays word building sounds

## Usage Examples

### Playing Audio in Components

```typescript
import { playAudio } from '../utils/mediaPlayer';

// Play a letter sound
playAudio('letter_a.mp3');

// Play a success sound
playAudio('word_complete.mp3');
```

### Using the Audio Context

```typescript
import { useAudio } from '../contexts/AudioContext';

const MyComponent = () => {
  const { playAudio, stopAudio } = useAudio();
  
  const handlePlay = () => {
    playAudio('letter_a.mp3');
  };
  
  return (
    <button onClick={handlePlay}>Play Sound</button>
  );
};
```

## File Naming Conventions

### Audio Files
- `letter_[letter].mp3` - Individual letter sounds (e.g., letter_a.mp3)
- `word_[word].mp3` - Complete word pronunciations (e.g., word_cat.mp3)
- `sound_[type].mp3` - UI sounds and effects (e.g., sound_correct.mp3)

### Video Files
- `letter_[letter].mp4` - Animated letter demonstrations
- `word_[word].mp4` - Word formation animations
- `lesson_[level]_[lesson].mp4` - Lesson introduction videos

## Best Practices

1. **File Organization**: Keep media files organized in the appropriate directories
2. **File Naming**: Use consistent naming conventions for easy reference
3. **File Formats**: Use MP3 for audio and MP4 for video for broad compatibility
4. **File Sizes**: Optimize media files for web delivery to ensure fast loading
5. **Accessibility**: Provide visual alternatives for audio cues when possible
6. **Error Handling**: Implement proper error handling for missing or corrupted media files