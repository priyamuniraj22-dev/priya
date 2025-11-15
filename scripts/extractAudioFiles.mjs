import fs from 'fs';

// Read the courseData file
const data = fs.readFileSync('src/data/courseData.ts', 'utf8');

// Extract all MP3 files using regex
const mp3Regex = /['"]([^'"]+\.mp3)['"]/g;
const matches = data.match(mp3Regex);

// Get unique file names
const files = matches 
  ? [...new Set(matches.map(match => match.slice(1, -1)))]
  : [];

// Print the files
console.log('All MP3 files referenced in courseData:');
files.forEach(file => console.log(file));

// Also save to a file for reference
fs.writeFileSync('audio_files_list.txt', files.join('\n'));
console.log(`\nList saved to audio_files_list.txt (${files.length} files)`);