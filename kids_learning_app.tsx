import React, { useState, useEffect } from 'react';
import { Star, Heart, Sparkles, Trophy, RotateCcw } from 'lucide-react';

const KidsLearningApp = () => {
  const [currentGame, setCurrentGame] = useState('menu');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Game data
  const letterGame = {
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    currentLetter: 0,
    options: []
  };

  const numberGame = {
    numbers: Array.from({length: 10}, (_, i) => i),
    currentNumber: 0,
    options: []
  };

  const colorGame = {
    colors: [
      { name: 'Red', hex: '#ef4444', emoji: '🔴' },
      { name: 'Blue', hex: '#3b82f6', emoji: '🔵' },
      { name: 'Green', hex: '#22c55e', emoji: '🟢' },
      { name: 'Yellow', hex: '#eab308', emoji: '🟡' },
      { name: 'Purple', hex: '#a855f7', emoji: '🟣' },
      { name: 'Orange', hex: '#f97316', emoji: '🟠' }
    ],
    currentColor: 0,
    options: []
  };

  const shapeGame = {
    shapes: [
      { name: 'Circle', emoji: '⭕', path: 'M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10' },
      { name: 'Square', emoji: '⬜', path: 'M20 20 L80 20 L80 80 L20 80 Z' },
      { name: 'Triangle', emoji: '🔺', path: 'M50 15 L85 75 L15 75 Z' },
      { name: 'Heart', emoji: '❤️', path: 'M50 80 C30 65, 15 45, 15 30 C15 20, 25 10, 35 15 C40 10, 50 15, 50 25 C50 15, 60 10, 65 15 C75 10, 85 20, 85 30 C85 45, 70 65, 50 80' }
    ],
    currentShape: 0,
    options: []
  };

  const wordGame = {
    words: [
      { word: 'CAT', emoji: '🐱', image: '🐱' },
      { word: 'DOG', emoji: '🐶', image: '🐶' },
      { word: 'SUN', emoji: '☀️', image: '☀️' },
      { word: 'CAR', emoji: '🚗', image: '🚗' },
      { word: 'TREE', emoji: '🌳', image: '🌳' },
      { word: 'FISH', emoji: '🐟', image: '🐟' },
      { word: 'BIRD', emoji: '🐦', image: '🐦' },
      { word: 'BOOK', emoji: '📚', image: '📚' },
      { word: 'BALL', emoji: '⚽', image: '⚽' },
      { word: 'APPLE', emoji: '🍎', image: '🍎' }
    ],
    currentWord: 0,
    options: []
  };

  const [letterState, setLetterState] = useState(letterGame);
  const [numberState, setNumberState] = useState(numberGame);
  const [colorState, setColorState] = useState(colorGame);
  const [shapeState, setShapeState] = useState(shapeGame);
  const [wordState, setWordState] = useState(wordGame);

  // Celebration effect
  const celebrate = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };

  // Generate random options for games
  const generateOptions = (correct, allOptions) => {
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
    const options = [correct];
    
    while (options.length < 3 && shuffled.length > 0) {
      const option = shuffled.pop();
      if (option !== correct) {
        options.push(option);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  // Handle correct answer
  const handleCorrectAnswer = () => {
    setScore(prev => prev + 10);
    setStreak(prev => prev + 1);
    if (streak >= 2) celebrate();
  };

  // Handle wrong answer
  const handleWrongAnswer = () => {
    setStreak(0);
  };

  // Letter Game Component
  const LetterGameComponent = () => {
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const current = letterState.letters[currentIndex];
      const allLetters = letterState.letters.filter(l => l !== current);
      setOptions(generateOptions(current, allLetters));
    }, [currentIndex]);

    const handleAnswer = (selectedLetter) => {
      const correct = letterState.letters[currentIndex];
      if (selectedLetter === correct) {
        handleCorrectAnswer();
        setCurrentIndex(prev => (prev + 1) % letterState.letters.length);
      } else {
        handleWrongAnswer();
      }
    };

    const currentLetter = letterState.letters[currentIndex];

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-6">Find the Letter!</h2>
        <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-12 mb-8 shadow-xl">
          <div className="text-8xl font-black text-white drop-shadow-lg">
            {currentLetter}
          </div>
        </div>
        <p className="text-xl text-gray-700 mb-6">Which letter is this?</p>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {options.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(letter)}
              className="bg-white hover:bg-blue-50 border-4 border-blue-200 hover:border-blue-400 rounded-2xl p-6 text-3xl font-bold text-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Word Game Component
  const WordGameComponent = () => {
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const current = wordState.words[currentIndex];
      const allWords = wordState.words.filter(w => w.word !== current.word);
      setOptions(generateOptions(current, allWords));
    }, [currentIndex]);

    const handleAnswer = (selectedWord) => {
      const correct = wordState.words[currentIndex];
      if (selectedWord.word === correct.word) {
        handleCorrectAnswer();
        setCurrentIndex(prev => (prev + 1) % wordState.words.length);
      } else {
        handleWrongAnswer();
      }
    };

    const currentWord = wordState.words[currentIndex];

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Read the Word!</h2>
        <div className="bg-gradient-to-br from-orange-300 to-red-400 rounded-3xl p-12 mb-8 shadow-xl">
          <div className="text-6xl mb-4">{currentWord.image}</div>
          <div className="text-4xl font-black text-white drop-shadow-lg tracking-wider">
            {currentWord.word}
          </div>
        </div>
        <p className="text-xl text-gray-700 mb-6">Which picture matches this word?</p>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {options.map((word, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(word)}
              className="bg-white hover:bg-orange-50 border-4 border-orange-200 hover:border-orange-400 rounded-2xl p-6 text-4xl transition-all duration-200 transform hover:scale-105 shadow-lg aspect-square flex items-center justify-center"
            >
              {word.emoji}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Number Game Component
  const NumberGameComponent = () => {
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const current = numberState.numbers[currentIndex];
      const allNumbers = numberState.numbers.filter(n => n !== current);
      setOptions(generateOptions(current, allNumbers));
    }, [currentIndex]);

    const handleAnswer = (selectedNumber) => {
      const correct = numberState.numbers[currentIndex];
      if (selectedNumber === correct) {
        handleCorrectAnswer();
        setCurrentIndex(prev => (prev + 1) % numberState.numbers.length);
      } else {
        handleWrongAnswer();
      }
    };

    const currentNumber = numberState.numbers[currentIndex];

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Count and Click!</h2>
        <div className="bg-gradient-to-br from-green-300 to-teal-400 rounded-3xl p-12 mb-8 shadow-xl">
          <div className="flex justify-center items-center flex-wrap gap-2">
            {Array.from({length: currentNumber}, (_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            ))}
            {currentNumber === 0 && <div className="text-4xl text-white">0</div>}
          </div>
        </div>
        <p className="text-xl text-gray-700 mb-6">How many stars do you see?</p>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {options.map((number, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(number)}
              className="bg-white hover:bg-green-50 border-4 border-green-200 hover:border-green-400 rounded-2xl p-6 text-3xl font-bold text-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Color Game Component
  const ColorGameComponent = () => {
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const current = colorState.colors[currentIndex];
      const allColors = colorState.colors.filter(c => c.name !== current.name);
      setOptions(generateOptions(current, allColors));
    }, [currentIndex]);

    const handleAnswer = (selectedColor) => {
      const correct = colorState.colors[currentIndex];
      if (selectedColor.name === correct.name) {
        handleCorrectAnswer();
        setCurrentIndex(prev => (prev + 1) % colorState.colors.length);
      } else {
        handleWrongAnswer();
      }
    };

    const currentColor = colorState.colors[currentIndex];

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">Name the Color!</h2>
        <div className="mx-auto w-32 h-32 rounded-full mb-8 shadow-xl border-8 border-white" style={{backgroundColor: currentColor.hex}}></div>
        <p className="text-xl text-gray-700 mb-6">What color is this?</p>
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {options.map((color, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(color)}
              className="bg-white hover:bg-pink-50 border-4 border-pink-200 hover:border-pink-400 rounded-2xl p-4 text-xl font-bold text-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <span className="text-2xl">{color.emoji}</span>
              {color.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Shape Game Component
  const ShapeGameComponent = () => {
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const current = shapeState.shapes[currentIndex];
      const allShapes = shapeState.shapes.filter(s => s.name !== current.name);
      setOptions(generateOptions(current, allShapes));
    }, [currentIndex]);

    const handleAnswer = (selectedShape) => {
      const correct = shapeState.shapes[currentIndex];
      if (selectedShape.name === correct.name) {
        handleCorrectAnswer();
        setCurrentIndex(prev => (prev + 1) % shapeState.shapes.length);
      } else {
        handleWrongAnswer();
      }
    };

    const currentShape = shapeState.shapes[currentIndex];

    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Spot the Shape!</h2>
        <div className="bg-gradient-to-br from-indigo-300 to-purple-400 rounded-3xl p-12 mb-8 shadow-xl">
          <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto">
            <path d={currentShape.path} fill="white" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        <p className="text-xl text-gray-700 mb-6">What shape is this?</p>
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {options.map((shape, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(shape)}
              className="bg-white hover:bg-indigo-50 border-4 border-indigo-200 hover:border-indigo-400 rounded-2xl p-4 text-xl font-bold text-indigo-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <span className="text-2xl">{shape.emoji}</span>
              {shape.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Main Menu Component
  const MainMenu = () => (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          🌟 School Starter 🌟
        </h1>
        <p className="text-xl text-gray-600">Choose a fun learning game!</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentGame('letters')}
          className="bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="text-4xl mb-2">🔤</div>
          <div className="text-2xl font-bold">Letters</div>
        </button>
        
        <button
          onClick={() => setCurrentGame('numbers')}
          className="bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="text-4xl mb-2">🔢</div>
          <div className="text-2xl font-bold">Numbers</div>
        </button>
        
        <button
          onClick={() => setCurrentGame('colors')}
          className="bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="text-4xl mb-2">🎨</div>
          <div className="text-2xl font-bold">Colors</div>
        </button>
        
        <button
          onClick={() => setCurrentGame('shapes')}
          className="bg-gradient-to-br from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="text-4xl mb-2">📐</div>
          <div className="text-2xl font-bold">Shapes</div>
        </button>
        
        <button
          onClick={() => setCurrentGame('words')}
          className="bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 shadow-xl col-span-2"
        >
          <div className="text-4xl mb-2">📖</div>
          <div className="text-2xl font-bold">Words</div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-8xl animate-bounce">
            🎉✨🌟✨🎉
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {currentGame !== 'menu' && (
              <button
                onClick={() => setCurrentGame('menu')}
                className="bg-gray-200 hover:bg-gray-300 rounded-xl p-3 transition-colors"
              >
                <RotateCcw className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-700">{score}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {Array.from({length: Math.min(streak, 5)}, (_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
            {streak > 0 && <span className="text-lg font-bold text-yellow-600">×{streak}</span>}
          </div>
        </div>
      </div>
      
      {/* Game Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {currentGame === 'menu' && <MainMenu />}
        {currentGame === 'letters' && <LetterGameComponent />}
        {currentGame === 'numbers' && <NumberGameComponent />}
        {currentGame === 'colors' && <ColorGameComponent />}
        {currentGame === 'shapes' && <ShapeGameComponent />}
        {currentGame === 'words' && <WordGameComponent />}
      </div>
    </div>
  );
};

export default KidsLearningApp;