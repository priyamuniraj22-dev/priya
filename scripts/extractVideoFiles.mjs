import fs from 'fs';

// Read the courseData file
const data = fs.readFileSync('src/data/courseData.ts', 'utf8');

// Extract all MP4 files using regex
const mp4Regex = /['"]([^'"]+\.mp4)['"]/g;
const matches = data.match(mp4Regex);

// Get unique file names
const files = matches 
  ? [...new Set(matches.map(match => match.slice(1, -1)))]
  : [];

// Print the files
console.log('All MP4 files referenced in courseData:');
files.forEach(file => console.log(file));

// Also save to a file for reference
fs.writeFileSync('video_files_list.txt', files.join('\n'));
console.log(`\nList saved to video_files_list.txt (${files.length} files)`);