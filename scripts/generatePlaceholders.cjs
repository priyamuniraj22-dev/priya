// Script to generate placeholder files for audio and video
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const audioDir = path.join(__dirname, '..', 'public', 'audio');
const videoDir = path.join(__dirname, '..', 'public', 'video');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

// Generate placeholder audio files
const audioFiles = [
  'letter_a.mp3', 'letter_b.mp3', 'letter_c.mp3', 'letter_d.mp3', 'letter_e.mp3', 'letter_f.mp3',
  'letter_g.mp3', 'letter_h.mp3', 'letter_i.mp3', 'letter_j.mp3', 'letter_k.mp3', 'letter_l.mp3',
  'letter_m.mp3', 'letter_n.mp3', 'letter_o.mp3', 'letter_p.mp3', 'letter_q.mp3', 'letter_r.mp3',
  'letter_s.mp3', 'letter_t.mp3', 'letter_u.mp3', 'letter_v.mp3', 'letter_w.mp3', 'letter_x.mp3',
  'letter_y.mp3', 'letter_z.mp3',
  'word_cat.mp3', 'word_dog.mp3', 'word_bat.mp3', 'word_hat.mp3', 'word_mat.mp3', 'word_rat.mp3',
  'vowel_a.mp3', 'vowel_e.mp3', 'vowel_i.mp3', 'vowel_o.mp3', 'vowel_u.mp3',
  'digraph_sh.mp3', 'digraph_ch.mp3', 'digraph_th.mp3',
  'silent_e.mp3', 'r_controlled.mp3',
  'story_reading.mp3', 'expressive_writing.mp3',
  'correct_letter.mp3', 'incorrect_letter.mp3',
  'treasure_found.mp3', 'treasure_miss.mp3',
  'word_complete.mp3', 'word_incorrect.mp3',
  'rhyme_correct.mp3', 'rhyme_incorrect.mp3',
  'hat_success.mp3', 'hat_fail.mp3',
  'cvc_building.mp3', 'vowel_isolation.mp3',
  'bingo_call.mp3', 'bingo_win.mp3',
  'puzzle_solve.mp3', 'puzzle_hint.mp3',
  'swap_success.mp3', 'swap_error.mp3',
  'toggle_effect.mp3',
  'fluency_correct.mp3', 'fluency_incorrect.mp3',
  'sentence_complete.mp3', 'sentence_error.mp3',
  'story_record.mp3', 'story_playback.mp3',
  'lesson_intro.mp3', 'lesson_outro.mp3',
  'lesson2_intro.mp3',
  'vowels_intro.mp3',
  'digraphs_intro.mp3',
  'silent_e_intro.mp3',
  'spelling_patterns.mp3',
  'matching_game.mp3',
  'blend_g_to_m.mp3'
];

// Generate placeholder video files
const videoFiles = [
  'letter_a.mp4', 'letter_b.mp4', 'letter_c.mp4', 'letter_d.mp4', 'letter_e.mp4', 'letter_f.mp4',
  'letter_g.mp4', 'letter_h.mp4', 'letter_i.mp4', 'letter_j.mp4', 'letter_k.mp4', 'letter_l.mp4',
  'letter_m.mp4', 'letter_n.mp4', 'letter_o.mp4', 'letter_p.mp4', 'letter_q.mp4', 'letter_r.mp4',
  'letter_s.mp4', 'letter_t.mp4', 'letter_u.mp4', 'letter_v.mp4', 'letter_w.mp4', 'letter_x.mp4',
  'letter_y.mp4', 'letter_z.mp4',
  'word_cat.mp4', 'word_dog.mp4', 'word_bat.mp4', 'word_hat.mp4', 'word_mat.mp4', 'word_rat.mp4',
  'vowel_a.mp4', 'vowel_e.mp4', 'vowel_i.mp4', 'vowel_o.mp4', 'vowel_u.mp4',
  'digraph_sh.mp4', 'digraph_ch.mp4', 'digraph_th.mp4',
  'silent_e.mp4', 'r_controlled.mp4',
  'story_creation.mp4', 'writing_process.mp4',
  'tracing_demo.mp4',
  'treasure_animation.mp4',
  'game_intro.mp4',
  'rhyme_race_intro.mp4',
  'hat_drop_animation.mp4',
  'cvc_demo.mp4',
  'tile_placement.mp4',
  'bingo_card.mp4',
  'puzzle_reveal.mp4',
  'sound_swap.mp4',
  'magic_transformation.mp4',
  'timer_countdown.mp4',
  'sentence_assembly.mp4',
  'story_creation.mp4',
  'blend_demo.mp4',
  'notebook_demo.mp4',
  'lesson_intro.mp4',
  'lesson2_intro.mp4',
  'vowels_intro.mp4',
  'digraphs_intro.mp4',
  'silent_e_intro.mp4',
  'spelling_patterns.mp4'
];

// Create placeholder files
console.log('Creating placeholder audio files...');
audioFiles.forEach(file => {
  const filePath = path.join(audioDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `Placeholder for ${file}`, 'utf8');
    console.log(`Created: ${file}`);
  }
});

console.log('Creating placeholder video files...');
videoFiles.forEach(file => {
  const filePath = path.join(videoDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `Placeholder for ${file}`, 'utf8');
    console.log(`Created: ${file}`);
  }
});

console.log('Placeholder files generation complete!');