import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Enhanced Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

// Question API Service
class QuestionService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
  }

  async getQuestions(category, subject, difficulty = 'medium', amount = 10) {
    const cacheKey = `${category}-${subject}-${difficulty}-${amount}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.questions;
      }
    }

    try {
      let questions = [];
      
      // Try different question APIs
      questions = await this.fetchOpenTriviaDB(category, difficulty, amount) ||
                 await this.fetchQuizAPI(category, difficulty, amount) ||
                 this.getFallbackQuestions(category, subject);

      // Cache the results
      this.cache.set(cacheKey, {
        questions: questions,
        timestamp: Date.now()
      });

      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return this.getFallbackQuestions(category, subject);
    }
  }

  async fetchOpenTriviaDB(category, difficulty, amount) {
    try {
      // Map our categories to OpenTrivia categories
      const categoryMap = {
        'primary': 9, // General Knowledge for primary
        'highschool': 19, // Science for high school
        'tertiary': 18  // Computers for tertiary
      };

      const categoryId = categoryMap[category] || 9;
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code === 0 && data.results) {
        return data.results.map(q => ({
          question: this.decodeHTML(q.question),
          options: this.shuffleArray([
            ...q.incorrect_answers.map(a => this.decodeHTML(a)),
            this.decodeHTML(q.correct_answer)
          ]),
          correct: q.incorrect_answers.length, // Correct answer is always last after shuffle
          explanation: `Category: ${q.category} | Difficulty: ${q.difficulty}`,
          source: 'OpenTriviaDB'
        }));
      }
    } catch (error) {
      console.log('OpenTriviaDB fetch failed:', error.message);
    }
    return null;
  }

  async fetchQuizAPI(category, difficulty, amount) {
    try {
      // QuizAPI requires an API key - using demo mode
      const url = `https://quizapi.io/api/v1/questions?apiKey=${process.env.QUIZAPI_KEY || 'demo'}&limit=${amount}&difficulty=${difficulty}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        return data.map(q => ({
          question: q.question,
          options: Object.values(q.answers).filter(Boolean),
          correct: Object.values(q.correct_answers).findIndex((val, idx) => val === 'true'),
          explanation: q.explanation || `Category: ${q.category} | Difficulty: ${q.difficulty}`,
          source: 'QuizAPI'
        }));
      }
    } catch (error) {
      console.log('QuizAPI fetch failed:', error.message);
    }
    return null;
  }

  getFallbackQuestions(category, subject) {
    // Comprehensive fallback questions
    const fallbackQuestions = {
      primary: {
        mathematics: [
          {
            question: "What is 5 + 7?",
            options: ["11", "12", "13", "14"],
            correct: 1,
            explanation: "5 + 7 equals 12",
            source: "fallback"
          },
          {
            question: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            correct: 1,
            explanation: "A triangle has 3 sides",
            source: "fallback"
          },
          {
            question: "What is 8 × 3?",
            options: ["16", "24", "32", "40"],
            correct: 1,
            explanation: "8 × 3 equals 24",
            source: "fallback"
          }
        ],
        science: [
          {
            question: "Which animal lays eggs?",
            options: ["Dog", "Cat", "Bird", "Cow"],
            correct: 2,
            explanation: "Birds lay eggs",
            source: "fallback"
          },
          {
            question: "What planet do we live on?",
            options: ["Mars", "Venus", "Earth", "Jupiter"],
            correct: 2,
            explanation: "We live on planet Earth",
            source: "fallback"
          }
        ],
        english: [
          {
            question: "What is the past tense of 'run'?",
            options: ["Running", "Runned", "Ran", "Runs"],
            correct: 2,
            explanation: "The past tense of run is ran",
            source: "fallback"
          },
          {
            question: "Which word is a noun?",
            options: ["Run", "Beautiful", "School", "Quickly"],
            correct: 2,
            explanation: "School is a noun - it's a place",
            source: "fallback"
          }
        ],
        social_studies: [
          {
            question: "What is the capital of the United States?",
            options: ["New York", "Los Angeles", "Washington D.C.", "Chicago"],
            correct: 2,
            explanation: "Washington D.C. is the capital of the United States",
            source: "fallback"
          }
        ]
      },
      highschool: {
        mathematics: [
          {
            question: "What is the value of π (pi) approximately?",
            options: ["3.14", "2.71", "1.61", "4.13"],
            correct: 0,
            explanation: "π is approximately 3.14159",
            source: "fallback"
          },
          {
            question: "Solve for x: 2x + 5 = 15",
            options: ["5", "10", "7.5", "20"],
            correct: 0,
            explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
            source: "fallback"
          }
        ],
        physics: [
          {
            question: "What is the unit of force?",
            options: ["Joule", "Watt", "Newton", "Volt"],
            correct: 2,
            explanation: "Force is measured in Newtons",
            source: "fallback"
          },
          {
            question: "What is the speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
            correct: 0,
            explanation: "The speed of light is approximately 300,000 km/s",
            source: "fallback"
          }
        ],
        chemistry: [
          {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "NaCl"],
            correct: 0,
            explanation: "Water is H2O - two hydrogen atoms and one oxygen atom",
            source: "fallback"
          },
          {
            question: "What is the atomic number of oxygen?",
            options: ["6", "7", "8", "9"],
            correct: 2,
            explanation: "Oxygen has an atomic number of 8",
            source: "fallback"
          }
        ],
        biology: [
          {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Cell membrane"],
            correct: 1,
            explanation: "Mitochondria produce energy for the cell",
            source: "fallback"
          }
        ],
        history: [
          {
            question: "In which year did World War II end?",
            options: ["1944", "1945", "1946", "1947"],
            correct: 1,
            explanation: "World War II ended in 1945",
            source: "fallback"
          }
        ],
        geography: [
          {
            question: "What is the longest river in the world?",
            options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correct: 1,
            explanation: "The Nile River is the longest river in the world",
            source: "fallback"
          }
        ]
      },
      tertiary: {
        programming: [
          {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
            correct: 0,
            explanation: "HTML stands for Hyper Text Markup Language",
            source: "fallback"
          },
          {
            question: "Which language is known as the language of the web?",
            options: ["Python", "Java", "JavaScript", "C++"],
            correct: 2,
            explanation: "JavaScript is the primary language for web development",
            source: "fallback"
          }
        ],
        business: [
          {
            question: "What does ROI stand for in business?",
            options: ["Return on Investment", "Rate of Interest", "Return of Income", "Risk of Investment"],
            correct: 0,
            explanation: "ROI stands for Return on Investment",
            source: "fallback"
          }
        ],
        engineering: [
          {
            question: "What is the SI unit of electrical resistance?",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            correct: 2,
            explanation: "Electrical resistance is measured in Ohms",
            source: "fallback"
          }
        ],
        medicine: [
          {
            question: "What does DNA stand for?",
            options: ["Deoxyribonucleic Acid", "Digital Network Analysis", "Dynamic Neural Activity", "Diagnostic Nuclear Assessment"],
            correct: 0,
            explanation: "DNA stands for Deoxyribonucleic Acid",
            source: "fallback"
          }
        ],
        law: [
          {
            question: "What is the highest court in the United States?",
            options: ["District Court", "Appeals Court", "Supreme Court", "Circuit Court"],
            correct: 2,
            explanation: "The Supreme Court is the highest court in the US",
            source: "fallback"
          }
        ],
        economics: [
          {
            question: "What does GDP stand for?",
            options: ["Gross Domestic Product", "General Domestic Production", "Government Development Program", "Global Development Protocol"],
            correct: 0,
            explanation: "GDP stands for Gross Domestic Product",
            source: "fallback"
          }
        ]
      }
    };

    return fallbackQuestions[category]?.[subject] || fallbackQuestions.primary.mathematics;
  }

  decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

const questionService = new QuestionService();

// Enhanced Game Manager with API support
class GameManager {
  constructor() {
    this.activeGames = new Map();
    this.playerSessions = new Map();
    this.connectionStats = {
      totalConnections: 0,
      activeConnections: 0,
      totalGamesCreated: 0
    };
  }

  async createGame(socket, data) {
    try {
      const gameId = this.generateGameId();
      
      // Fetch questions from API
      const questions = await questionService.getQuestions(
        data.category || 'primary',
        data.subject || 'mathematics',
        data.difficulty || 'medium',
        data.amount || 10
      );

      const game = {
        id: gameId,
        host: socket.id,
        category: data.category || 'primary',
        subject: data.subject || 'mathematics',
        difficulty: data.difficulty || 'medium',
        players: [{
          id: socket.id,
          name: data.playerName || 'Player',
          score: 0,
          progress: 0,
          avatar: data.avatar || '👨‍💻',
          connected: true,
          joinTime: Date.now()
        }],
        status: 'waiting',
        currentQuestion: 0,
        answers: new Map(),
        questions: questions,
        createdAt: Date.now(),
        lastActivity: Date.now()
      };
      
      this.activeGames.set(gameId, game);
      this.playerSessions.set(socket.id, gameId);
      this.connectionStats.totalGamesCreated++;
      
      socket.join(gameId);
      
      console.log(`🎮 Game created: ${gameId} (${game.category} - ${game.subject})`);
      
      return { gameId, game: this.sanitizeGame(game) };
    } catch (error) {
      console.error('Error creating game:', error);
      throw new Error('Failed to create game: ' + error.message);
    }
  }

  joinGame(socket, data) {
    try {
      const gameId = data.gameId?.toUpperCase();
      const game = this.activeGames.get(gameId);
      
      if (!game) {
        throw new Error('Game not found. Check your game code.');
      }

      if (game.status !== 'waiting') {
        throw new Error('Game already in progress');
      }

      if (game.players.length >= 8) {
        throw new Error('Game is full (max 8 players)');
      }

      const player = {
        id: socket.id,
        name: data.playerName || 'Player',
        score: 0,
        progress: 0,
        avatar: data.avatar || '👨‍💻',
        connected: true,
        joinTime: Date.now()
      };

      game.players.push(player);
      game.lastActivity = Date.now();
      this.playerSessions.set(socket.id, gameId);
      socket.join(gameId);

      console.log(`👤 ${player.name} joined game ${gameId}`);

      return {
        player,
        players: game.players
      };
    } catch (error) {
      console.error('Error joining game:', error);
      throw error;
    }
  }

  startGame(socket, data) {
    const gameId = this.playerSessions.get(socket.id);
    const game = this.activeGames.get(gameId);
    
    if (game && game.host === socket.id && game.status === 'waiting') {
      if (game.players.length < 1) {
        throw new Error('Need at least 1 player to start');
      }

      game.status = 'playing';
      game.startTime = Date.now();
      game.lastActivity = Date.now();
      
      console.log(`🚀 Game ${gameId} started with ${game.players.length} players`);
      
      return {
        questions: game.questions,
        totalQuestions: game.questions.length,
        players: game.players
      };
    }
    throw new Error('Only the host can start the game');
  }

  submitAnswer(socket, data) {
    const gameId = this.playerSessions.get(socket.id);
    const game = this.activeGames.get(gameId);
    
    if (game && game.status === 'playing') {
      game.lastActivity = Date.now();
      
      if (!game.answers.has(data.questionIndex)) {
        game.answers.set(data.questionIndex, new Map());
      }
      
      game.answers.get(data.questionIndex).set(socket.id, {
        answer: data.answer,
        timestamp: Date.now()
      });

      // Update player progress
      const player = game.players.find(p => p.id === socket.id);
      if (player) {
        player.progress = ((data.questionIndex + 1) / game.questions.length) * 100;
        
        // Calculate temporary score for display
        const currentAnswer = game.answers.get(data.questionIndex).get(socket.id);
        const question = game.questions[data.questionIndex];
        if (currentAnswer.answer === question.correct) {
          player.score += 10;
        }
      }

      return {
        players: game.players.map(p => ({
          id: p.id,
          name: p.name,
          score: p.score,
          progress: p.progress,
          avatar: p.avatar
        }))
      };
    }
    throw new Error('Game not in progress');
  }

  handleDisconnect(socket) {
    const gameId = this.playerSessions.get(socket.id);
    if (gameId) {
      const game = this.activeGames.get(gameId);
      if (game) {
        const player = game.players.find(p => p.id === socket.id);
        if (player) {
          player.connected = false;
          console.log(`👋 ${player.name} disconnected from game ${gameId}`);
        }
      }
      this.playerSessions.delete(socket.id);
    }
    this.connectionStats.activeConnections--;
  }

  generateGameId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  sanitizeGame(game) {
    return {
      id: game.id,
      host: game.host,
      category: game.category,
      subject: game.subject,
      players: game.players,
      status: game.status,
      currentQuestion: game.currentQuestion,
      totalQuestions: game.questions.length
    };
  }

  getStats() {
    return {
      ...this.connectionStats,
      activeGames: this.activeGames.size,
      playerSessions: this.playerSessions.size
    };
  }
}

const gameManager = new GameManager();

// Socket.io connection handling
io.on('connection', (socket) => {
  gameManager.connectionStats.totalConnections++;
  gameManager.connectionStats.activeConnections++;
  
  console.log(`✅ User connected: ${socket.id} (Total: ${gameManager.connectionStats.activeConnections})`);

  // Send immediate welcome message
  socket.emit('welcome', { 
    message: 'Connected to quiz server', 
    timestamp: Date.now(),
    connectionId: socket.id
  });

  // Create a new game
  socket.on('create-game', async (data) => {
    try {
      const result = await gameManager.createGame(socket, data);
      socket.emit('game-created', result);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Join existing game
  socket.on('join-game', (data) => {
    try {
      const result = gameManager.joinGame(socket, data);
      socket.to(data.gameId).emit('player-joined', result);
      socket.emit('player-joined', result);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Start the game
  socket.on('start-game', (data) => {
    try {
      const result = gameManager.startGame(socket, data);
      io.to(data.gameId).emit('game-started', result);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Player answers a question
  socket.on('submit-answer', (data) => {
    try {
      const result = gameManager.submitAnswer(socket, data);
      io.to(gameManager.playerSessions.get(socket.id)).emit('player-progress', result);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Manual ping from client
  socket.on('ping', (data) => {
    socket.emit('pong', { 
      timestamp: Date.now(),
      serverTime: Date.now() 
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`❌ User disconnected: ${socket.id}, Reason: ${reason}`);
    gameManager.handleDisconnect(socket);
  });
});

// API Routes
app.get('/api/categories', (req, res) => {
  const categories = {
    primary: {
      name: "Primary Level",
      subjects: ["mathematics", "science", "english", "social_studies"],
      difficulties: ["easy", "medium"],
      description: "Grades 1-6: Basic subjects and foundational knowledge"
    },
    highschool: {
      name: "High School",
      subjects: ["mathematics", "physics", "chemistry", "biology", "history", "geography"],
      difficulties: ["easy", "medium", "hard"],
      description: "Grades 7-12: Advanced sciences and specialized subjects"
    },
    tertiary: {
      name: "Tertiary Level",
      subjects: ["programming", "business", "engineering", "medicine", "law", "economics"],
      difficulties: ["medium", "hard"],
      description: "College & University: Professional and specialized topics"
    }
  };
  res.json(categories);
});

app.get('/api/questions', async (req, res) => {
  try {
    const { category, subject, difficulty, amount } = req.query;
    
    const questions = await questionService.getQuestions(
      category || 'primary',
      subject || 'mathematics',
      difficulty || 'medium',
      parseInt(amount) || 10
    );
    
    res.json({
      success: true,
      category,
      subject,
      difficulty,
      amount: questions.length,
      questions: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/health', (req, res) => {
  const stats = gameManager.getStats();
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    ...stats
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableRoutes: ['/health', '/api/categories', '/api/questions']
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🎉 QuizMaster Backend Server Started!
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🚀 Frontend URL: ${FRONTEND_URL}
📊 Ready for connections...
  `);
});