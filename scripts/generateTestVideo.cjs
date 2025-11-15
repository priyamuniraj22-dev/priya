#!/usr/bin/env node

// Script to generate test video files
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const videoDir = path.join(__dirname, '..', 'public', 'video');

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Generate test video files with minimal content
function generateTestVideoFile(fileName) {
  try {
    const filePath = path.join(videoDir, fileName);
    
    // Create a simple MP4 file header with minimal content
    // This is a very basic MP4 file structure (just enough to be recognized as a valid MP4)
    const mp4Header = Buffer.from([
      0x00, 0x00, 0x00, 0x18, // Size of first box
      0x66, 0x74, 0x79, 0x70, // "ftyp"
      0x69, 0x73, 0x6f, 0x6d, // "isom"
      0x00, 0x00, 0x00, 0x01, // Minor version
      0x69, 0x73, 0x6f, 0x6d, // "isom"
      0x61, 0x76, 0x63, 0x31, // "avc1"
      0x00, 0x00, 0x00, 0x08, // Size of free box
      0x66, 0x72, 0x65, 0x65, // "free"
      0x00, 0x00, 0x00, 0x00, // Free box content
      // Add some additional data to make file non-zero
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00
    ]);
    
    // Write the MP4 file
    fs.writeFileSync(filePath, mp4Header);
    console.log(`Created test video file: ${fileName}`);
  } catch (error) {
    console.warn(`Failed to generate ${fileName}:`, error.message);
  }
}

// Read the list of video files from video_files_list.txt
const videoFilesListPath = path.join(__dirname, '..', 'video_files_list.txt');
let videoFiles = [];

if (fs.existsSync(videoFilesListPath)) {
  const fileContent = fs.readFileSync(videoFilesListPath, 'utf8');
  videoFiles = fileContent.split('\n').filter(file => file.trim() !== '');
  console.log(`Found ${videoFiles.length} video files to generate from video_files_list.txt`);
} else {
  console.log('video_files_list.txt not found, using default file list...');
  // Default video files
  videoFiles = [
    'letter_a.mp4', 'letter_b.mp4', 'letter_c.mp4', 'letter_d.mp4', 'letter_e.mp4', 'letter_f.mp4',
    'vowel_a.mp4', 'vowel_e.mp4', 'vowel_i.mp4', 'vowel_o.mp4', 'vowel_u.mp4'
  ];
}

console.log('Creating test video files...');

// Generate all video files
videoFiles.forEach((file) => {
  generateTestVideoFile(file);
});

console.log('Test video files generation complete!');
console.log('Note: These are minimal MP4 files. For production, replace with actual video recordings.');