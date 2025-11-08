import { ArrowLeft, Heart, Zap, BookOpen, Users } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#FFB703] via-[#00B4D8] to-[#FF6363] h-32" />

          <div className="px-8 md:px-12 py-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">About PhonicsPlayhouse</h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Welcome to PhonicsPlayhouse — where learning to read becomes an exciting adventure!
            </p>

            <div className="prose prose-lg max-w-none mb-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our goal is to make every child a confident reader and writer through playful learning experiences. We believe that phonics education doesn't have to be boring—it can be magical, engaging, and deeply rewarding for children of all learning styles.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Help</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-[#FFB703]/20 to-transparent p-6 rounded-2xl border-2 border-[#FFB703]/30">
                      <BookOpen className="w-8 h-8 text-[#FFB703] mb-3" />
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Interactive Lessons</h3>
                      <p className="text-gray-700 text-sm">
                        Progressive phonics lessons designed for different age groups and learning levels.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#00B4D8]/20 to-transparent p-6 rounded-2xl border-2 border-[#00B4D8]/30">
                      <Zap className="w-8 h-8 text-[#00B4D8] mb-3" />
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Engaging Games</h3>
                      <p className="text-gray-700 text-sm">
                        Fun, interactive games that reinforce phonics concepts while keeping children entertained.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FF6363]/20 to-transparent p-6 rounded-2xl border-2 border-[#FF6363]/30">
                      <Heart className="w-8 h-8 text-[#FF6363] mb-3" />
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Writing Practice</h3>
                      <p className="text-gray-700 text-sm">
                        From letter tracing to word formation, build writing confidence step by step.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-transparent p-6 rounded-2xl border-2 border-[#8B5CF6]/30">
                      <Users className="w-8 h-8 text-[#8B5CF6] mb-3" />
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Progress Tracking</h3>
                      <p className="text-gray-700 text-sm">
                        Monitor your child's learning journey with detailed progress insights and badges.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Approach</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    PhonicsPlayhouse is built on research-backed phonics instruction combined with the power of play. We understand that every child learns differently, so we offer:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                    <li>Multi-sensory learning with audio, visual, and interactive elements</li>
                    <li>Immediate feedback and positive reinforcement</li>
                    <li>Progressive difficulty levels that grow with your child</li>
                    <li>Engaging characters and themes that spark imagination</li>
                    <li>Flexible pacing for different learning speeds</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Five Learning Levels</h2>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="w-3 h-3 rounded-full bg-[#FFB703] mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900">Beginner (Ages 3-5)</h3>
                        <p className="text-gray-600 text-sm">Letter recognition and single sounds</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-3 h-3 rounded-full bg-[#00B4D8] mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900">Foundations (Ages 5-6)</h3>
                        <p className="text-gray-600 text-sm">Short vowels and CVC word blending</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-3 h-3 rounded-full bg-[#FF6363] mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900">Intermediate (Ages 6-7)</h3>
                        <p className="text-gray-600 text-sm">Long vowels and digraphs</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900">Advanced (Ages 7-8)</h3>
                        <p className="text-gray-600 text-sm">Silent e and reading fluency</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-3 h-3 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-gray-900">Excel (Ages 8-10)</h3>
                        <p className="text-gray-600 text-sm">Advanced spelling and story writing</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FFB703]/10 to-[#00B4D8]/10 p-8 rounded-2xl border-2 border-[#FFB703]/20">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Choose PhonicsPlayhouse?</h2>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFB703] font-bold">✓</span>
                      <span>Evidence-based phonics instruction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFB703] font-bold">✓</span>
                      <span>Designed by education professionals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFB703] font-bold">✓</span>
                      <span>Safe, ad-free learning environment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFB703] font-bold">✓</span>
                      <span>Motivating with badges and achievements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FFB703] font-bold">✓</span>
                      <span>Perfect for homeschooling or supplemental learning</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center bg-gray-50 p-8 rounded-2xl">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Join thousands of children who are discovering the joy of reading with PhonicsPlayhouse. Every child deserves to become a confident, capable reader.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
