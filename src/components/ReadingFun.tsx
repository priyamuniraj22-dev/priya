import { BookOpen, Play, Star } from 'lucide-react';
import { useState } from 'react';

// Sample reading passages
const readingPassages = [
  {
    id: 'passage-1',
    title: 'The Big Red Ball',
    level: 'Beginner',
    content: `Tom has a big red ball. The ball is round and bounces high. Tom likes to play with his ball in the park. He throws the ball up in the air. The ball falls down with a bounce. Tom catches the ball and throws it again. This is fun!`,
    words: ['big', 'red', 'ball', 'round', 'bounces', 'park', 'throws', 'catches'],
    questions: [
      'What color is Tom\'s ball?',
      'Where does Tom play with his ball?',
      'What does Tom do with the ball?'
    ]
  },
  {
    id: 'passage-2',
    title: 'The Cat and the Dog',
    level: 'Beginner',
    content: `There is a cat and a dog. The cat is small and black. The dog is big and brown. The cat sits on the mat. The dog runs in the yard. The cat likes milk. The dog likes bones. They are friends.`,
    words: ['cat', 'dog', 'small', 'black', 'big', 'brown', 'mat', 'yard', 'milk', 'bones'],
    questions: [
      'What color is the cat?',
      'Where does the dog run?',
      'What does the cat like to drink?'
    ]
  },
  {
    id: 'passage-3',
    title: 'The Happy Family',
    level: 'Intermediate',
    content: `The Smith family is happy. There are four people in the family. Dad is tall and strong. Mom is kind and smart. Sam is a boy. He is six years old. Amy is a girl. She is four years old. They play together every day. They love their family.`,
    words: ['family', 'happy', 'tall', 'strong', 'kind', 'smart', 'boy', 'girl', 'years', 'play'],
    questions: [
      'How many people are in the Smith family?',
      'How old is Sam?',
      'What do the children do every day?'
    ]
  }
];

export default function ReadingFun() {
  const [selectedPassage, setSelectedPassage] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentPassage = readingPassages[selectedPassage];

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-[#FFB703]" />
            <h1 className="text-3xl font-bold text-gray-900">Reading Fun</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Enjoy these fun reading passages and test your comprehension skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Passage List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reading Passages</h2>
              <div className="space-y-3">
                {readingPassages.map((passage, index) => (
                  <button
                    key={passage.id}
                    onClick={() => {
                      setSelectedPassage(index);
                      setShowQuestions(false);
                      setAnswers([]);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedPassage === index
                        ? 'bg-[#FFB703] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    <div className="font-medium">{passage.title}</div>
                    <div className="text-sm opacity-80">{passage.level}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Passage Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentPassage.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-[#00B4D8] text-white text-xs px-2 py-1 rounded-full">
                      {currentPassage.level}
                    </span>
                    <button 
                      onClick={() => console.log('Play audio')}
                      className="flex items-center gap-1 text-[#FFB703] hover:text-[#e6a600]"
                    >
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Listen</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="bg-[#8B5CF6] text-white px-4 py-2 rounded-lg hover:bg-[#7C3AED] transition-colors flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  {showQuestions ? 'Hide Questions' : 'Show Questions'}
                </button>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentPassage.content.split('. ').map((sentence, index) => (
                    <span key={index}>
                      {sentence}{index < currentPassage.content.split('. ').length - 1 ? '. ' : ''}
                    </span>
                  ))}
                </p>
              </div>

              {/* Word Bank */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Word Bank</h3>
                <div className="flex flex-wrap gap-2">
                  {currentPassage.words.map((word, index) => (
                    <span
                      key={index}
                      className="bg-[#00B4D8]/10 text-[#00B4D8] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Questions */}
              {showQuestions && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Comprehension Questions</h3>
                  <div className="space-y-4">
                    {currentPassage.questions.map((question, index) => (
                      <div key={index}>
                        <label className="block text-gray-700 mb-2">
                          {index + 1}. {question}
                        </label>
                        <input
                          type="text"
                          value={answers[index] || ''}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB703] focus:border-[#FFB703]"
                          placeholder="Type your answer here..."
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => alert('Answers submitted!')}
                    className="mt-6 bg-[#FFB703] text-white px-6 py-2 rounded-lg hover:bg-[#e6a600] transition-colors font-medium"
                  >
                    Submit Answers
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}