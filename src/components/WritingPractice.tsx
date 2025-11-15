import { useState, useRef, useEffect } from 'react';
import { Pencil, RotateCcw, Download, Star } from 'lucide-react';

// Define the shape types
interface RectangleShape {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ArcShape {
  x: number;
  y: number;
  width: number;
  height: number;
  startAngle: number;
  endAngle: number;
}

type Shape = RectangleShape | ArcShape;

export default function WritingPractice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [showTracing, setShowTracing] = useState(true);
  const [currentTracing, setCurrentTracing] = useState('A');

  // Tracing patterns for different letters
  const tracingPatterns: Record<string, Shape[]> = {
    'A': [
      { x: 100, y: 200, width: 200, height: 200 },
      { x: 150, y: 150, width: 100, height: 100 },
      { x: 125, y: 175, width: 150, height: 50 }
    ],
    'B': [
      { x: 100, y: 100, width: 50, height: 300 },
      { x: 100, y: 100, width: 100, height: 100 },
      { x: 100, y: 250, width: 100, height: 100 }
    ],
    'C': [
      { x: 150, y: 100, width: 150, height: 200, startAngle: Math.PI, endAngle: 2 * Math.PI }
    ]
  };

  const isArcShape = (shape: Shape): shape is ArcShape => {
    return 'startAngle' in shape && 'endAngle' in shape;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw tracing pattern if enabled
    if (showTracing) {
      ctx.strokeStyle = '#FFB703';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      const pattern = tracingPatterns[currentTracing] || tracingPatterns['A'];
      
      pattern.forEach(shape => {
        ctx.beginPath();
        if (isArcShape(shape)) {
          // Draw arc for curved letters
          ctx.ellipse(shape.x, shape.y, shape.width/2, shape.height/2, 0, shape.startAngle, shape.endAngle);
        } else {
          // Draw rectangle for straight letters
          ctx.rect(shape.x, shape.y, shape.width, shape.height);
        }
        ctx.stroke();
      });
      
      ctx.setLineDash([]);
    }
  }, [showTracing, currentTracing]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'writing-practice.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const tracingLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Pencil className="w-8 h-8 text-[#FFB703]" />
            <h1 className="text-3xl font-bold text-gray-900">Writing Practice</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Practice your handwriting with our interactive writing tools. Trace letters or write freely!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tools</h2>
              
              <div className="space-y-6">
                {/* Color Picker */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Pen Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setStrokeColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          strokeColor === color ? 'border-gray-800' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stroke Width */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Pen Size</h3>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-500">{strokeWidth}px</div>
                </div>

                {/* Tracing Toggle */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Tracing</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Show Tracing Lines</span>
                    <button
                      onClick={() => setShowTracing(!showTracing)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        showTracing ? 'bg-[#FFB703]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          showTracing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={clearCanvas}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear Canvas
                  </button>
                  <button
                    onClick={saveCanvas}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Save Drawing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Writing Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Writing Area</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Tracing:</span>
                  <select
                    value={currentTracing}
                    onChange={(e) => setCurrentTracing(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#FFB703] focus:border-[#FFB703]"
                  >
                    {tracingLetters.map(letter => (
                      <option key={letter} value={letter}>{letter}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-96 cursor-crosshair bg-white"
                />
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                Click and drag to draw. Practice writing the letter {currentTracing} above.
              </div>
            </div>
          </div>

          {/* Practice Letters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Practice Letters</h2>
              <p className="text-gray-600 mb-4">
                Select a letter to practice:
              </p>
              <div className="grid grid-cols-5 gap-2">
                {tracingLetters.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setCurrentTracing(letter)}
                    className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg transition-all ${
                      currentTracing === letter
                        ? 'bg-[#FFB703] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#FFB703]" />
                  Tips for Writing
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Hold the pen or pencil comfortably</li>
                  <li>• Follow the dotted lines for guidance</li>
                  <li>• Practice each letter multiple times</li>
                  <li>• Keep your writing consistent in size</li>
                  <li>• Take breaks to avoid hand fatigue</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}