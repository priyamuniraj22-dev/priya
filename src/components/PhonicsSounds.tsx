import { useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { playAudio } from '../utils/mediaPlayer';

// Define phonics categories and sounds
const phonicsCategories = [
  {
    id: 'alphabet',
    title: 'Alphabet Sounds',
    description: 'Learn the sounds of each letter from A to Z',
    sounds: [
      { id: 'letter_a', label: 'A', file: 'letter_a.mp3' },
      { id: 'letter_b', label: 'B', file: 'letter_b.mp3' },
      { id: 'letter_c', label: 'C', file: 'letter_c.mp3' },
      { id: 'letter_d', label: 'D', file: 'letter_d.mp3' },
      { id: 'letter_e', label: 'E', file: 'letter_e.mp3' },
      { id: 'letter_f', label: 'F', file: 'letter_f.mp3' },
      { id: 'letter_g', label: 'G', file: 'letter_g.mp3' },
      { id: 'letter_h', label: 'H', file: 'letter_h.mp3' },
      { id: 'letter_i', label: 'I', file: 'letter_i.mp3' },
      { id: 'letter_j', label: 'J', file: 'letter_j.mp3' },
      { id: 'letter_k', label: 'K', file: 'letter_k.mp3' },
      { id: 'letter_l', label: 'L', file: 'letter_l.mp3' },
      { id: 'letter_m', label: 'M', file: 'letter_m.mp3' },
      { id: 'letter_n', label: 'N', file: 'letter_n.mp3' },
      { id: 'letter_o', label: 'O', file: 'letter_o.mp3' },
      { id: 'letter_p', label: 'P', file: 'letter_p.mp3' },
      { id: 'letter_q', label: 'Q', file: 'letter_q.mp3' },
      { id: 'letter_r', label: 'R', file: 'letter_r.mp3' },
      { id: 'letter_s', label: 'S', file: 'letter_s.mp3' },
      { id: 'letter_t', label: 'T', file: 'letter_t.mp3' },
      { id: 'letter_u', label: 'U', file: 'letter_u.mp3' },
      { id: 'letter_v', label: 'V', file: 'letter_v.mp3' },
      { id: 'letter_w', label: 'W', file: 'letter_w.mp3' },
      { id: 'letter_x', label: 'X', file: 'letter_x.mp3' },
      { id: 'letter_y', label: 'Y', file: 'letter_y.mp3' },
      { id: 'letter_z', label: 'Z', file: 'letter_z.mp3' },
    ]
  },
  {
    id: 'short-vowels',
    title: 'Short Vowels',
    description: 'Learn the short vowel sounds',
    sounds: [
      { id: 'vowel_a', label: 'A', file: 'vowel_a.mp3' },
      { id: 'vowel_e', label: 'E', file: 'vowel_e.mp3' },
      { id: 'vowel_i', label: 'I', file: 'vowel_i.mp3' },
      { id: 'vowel_o', label: 'O', file: 'vowel_o.mp3' },
      { id: 'vowel_u', label: 'U', file: 'vowel_u.mp3' },
    ]
  },
  {
    id: 'blends',
    title: 'Blends',
    description: 'Learn consonant blends',
    sounds: [
      { id: 'blend_bl', label: 'BL', file: 'blend_bl.mp3' },
      { id: 'blend_cl', label: 'CL', file: 'blend_cl.mp3' },
      { id: 'blend_sl', label: 'SL', file: 'blend_sl.mp3' },
      { id: 'blend_br', label: 'BR', file: 'blend_br.mp3' },
      { id: 'blend_gr', label: 'GR', file: 'blend_gr.mp3' },
      { id: 'blend_tr', label: 'TR', file: 'blend_tr.mp3' },
      { id: 'blend_dr', label: 'DR', file: 'blend_dr.mp3' },
    ]
  },
  {
    id: 'digraphs',
    title: 'Digraphs',
    description: 'Learn consonant digraphs',
    sounds: [
      { id: 'digraph_ch', label: 'CH', file: 'digraph_ch.mp3' },
      { id: 'digraph_sh', label: 'SH', file: 'digraph_sh.mp3' },
      { id: 'digraph_th', label: 'TH', file: 'digraph_th.mp3' },
      { id: 'digraph_wh', label: 'WH', file: 'digraph_wh.mp3' },
      { id: 'digraph_ph', label: 'PH', file: 'digraph_ph.mp3' },
    ]
  }
];

export default function PhonicsSounds() {
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const handlePlaySound = async (soundFile: string, soundId: string) => {
    setPlayingSound(soundId);
    try {
      await playAudio(soundFile);
    } catch (error) {
      console.error('Error playing sound:', error);
    } finally {
      setPlayingSound(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-8 h-8 text-[#FFB703]" />
            <h1 className="text-3xl font-bold text-gray-900">Phonics Sounds</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Listen to all the phonics sounds. Click on any sound card to hear the pronunciation.
          </p>
        </div>

        {phonicsCategories.map((category) => (
          <div key={category.id} className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
              <p className="text-gray-600 mb-6">{category.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.sounds.map((sound) => (
                  <div 
                    key={sound.id}
                    className="bg-gradient-to-br from-[#FFB703]/10 to-[#00B4D8]/10 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-[#FFB703] relative"
                    onClick={() => handlePlaySound(sound.file, sound.id)}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FFB703] flex items-center justify-center mb-3">
                      {playingSound === sound.id ? (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                          <div className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                        </div>
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{sound.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{sound.file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}