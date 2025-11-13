# Audio and Video Usage Guide

This guide explains how to use the audio and video functionality in the phonics learning application.

## Directory Structure

```
/public
  /audio
    - letter_[letter].mp3       # Individual letter sounds
    - word_[word].mp3           # Complete word pronunciations
    - sound_[type].mp3          # UI sounds and effects
  /video
    - letter_[letter].mp4       # Animated letter demonstrations
    - word_[word].mp4           # Word formation animations
    - lesson_[level]_[lesson].mp4 # Lesson introduction videos
```

## Audio Files

### Letter Sounds
- letter_a.mp3, letter_b.mp3, etc.
- Used in games like Letter Fishing and Sound Treasure Hunt

### Word Pronunciations
- word_cat.mp3, word_dog.mp3, etc.
- Used in CVC Builder and other word games

### UI Sounds
- correct_letter.mp3, incorrect_letter.mp3
- treasure_found.mp3, treasure_miss.mp3
- word_complete.mp3, word_incorrect.mp3

## Video Files

### Letter Animations
- letter_a.mp4, letter_b.mp4, etc.
- Visual demonstrations of how to write each letter

### Word Animations
- word_cat.mp4, word_dog.mp4, etc.
- Animated breakdowns of word construction

### Lesson Videos
- lesson_L1_C1.mp4 (Level 1, Class 1 introduction)
- lesson_L2_C1.mp4 (Level 2, Class 1 introduction)

## Implementation in Components

### Playing Audio
```typescript
import { playAudio } from '../utils/mediaPlayer';

// Play a letter sound
playAudio('letter_a.mp3');

// Play a success sound
playAudio('word_complete.mp3');
```

### Playing Video
```typescript
import { playVideo } from '../utils/mediaPlayer';

// Play a video in a video element with ID 'lesson-video'
playVideo('letter_a.mp4', 'lesson-video');
```

## Best Practices

1. **File Naming**: Use consistent naming conventions
2. **File Formats**: Use MP3 for audio, MP4 for video
3. **File Sizes**: Keep files small for faster loading
4. **Accessibility**: Always provide visual alternatives for audio cues
5. **Error Handling**: Handle cases where media files might not load