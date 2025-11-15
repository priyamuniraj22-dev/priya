#!/usr/bin/env node

// Script to generate test audio files for phonics sounds
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const audioDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Generate test audio files with actual content
function generateTestAudioFile(fileName) {
  try {
    const filePath = path.join(audioDir, fileName);
    
    // Create a simple WAV file header with minimal content
    // This is a very basic WAV file structure
    const wavHeader = Buffer.from([
      0x52, 0x49, 0x46, 0x46, // "RIFF"
      0x24, 0x00, 0x00, 0x00, // File size (36 bytes for header + 8 bytes of data)
      0x57, 0x41, 0x56, 0x45, // "WAVE"
      0x66, 0x6d, 0x74, 0x20, // "fmt "
      0x10, 0x00, 0x00, 0x00, // Format chunk size (16 bytes)
      0x01, 0x00,             // Audio format (1 = PCM)
      0x01, 0x00,             // Number of channels (1 = mono)
      0x40, 0x1f, 0x00, 0x00, // Sample rate (8000 Hz)
      0x40, 0x1f, 0x00, 0x00, // Byte rate (8000 bytes/sec)
      0x01, 0x00,             // Block align (1 byte per sample)
      0x08, 0x00,             // Bits per sample (8 bits)
      0x64, 0x61, 0x74, 0x61, // "data"
      0x08, 0x00, 0x00, 0x00, // Data chunk size (8 bytes)
      0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80 // Audio data (8 samples)
    ]);
    
    // Write the WAV file
    fs.writeFileSync(filePath, wavHeader);
    console.log(`Created test audio file: ${fileName}`);
  } catch (error) {
    console.warn(`Failed to generate ${fileName}:`, error.message);
  }
}

// Read the list of audio files from audio_files_list.txt
const audioFilesListPath = path.join(__dirname, '..', 'audio_files_list.txt');
let audioFiles = [];

if (fs.existsSync(audioFilesListPath)) {
  const fileContent = fs.readFileSync(audioFilesListPath, 'utf8');
  audioFiles = fileContent.split('\n').filter(file => file.trim() !== '');
  console.log(`Found ${audioFiles.length} audio files to generate from audio_files_list.txt`);
} else {
  console.log('audio_files_list.txt not found, using default file list...');
  // Generate common phonics audio files
  audioFiles = [
    // Letter sounds
    ...'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `letter_${letter}.mp3`),
    
    // Vowel sounds
    'vowel_a.mp3', 'vowel_e.mp3', 'vowel_i.mp3', 'vowel_o.mp3', 'vowel_u.mp3',
    
    // Word sounds
    'word_cat.mp3', 'word_dog.mp3', 'word_bat.mp3', 'word_hat.mp3', 'word_mat.mp3', 'word_rat.mp3',
    
    // Feedback sounds
    'correct_letter.mp3', 'incorrect_letter.mp3', 'word_complete.mp3', 'word_incorrect.mp3'
  ];
}

console.log('Creating test audio files...');

// Generate all audio files
audioFiles.forEach((file) => {
  generateTestAudioFile(file);
});

console.log('Test audio files generation complete!');
console.log('Note: These are minimal WAV files. For production, replace with actual phonics recordings.');