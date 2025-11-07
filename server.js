// server.js - FIXED VERSION
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// FIX 1: Proper Socket.io CORS configuration
const io = socketIo(server, {
  cors: {
    origin: [
      "https://quiz-end-five.vercel.app",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:8080",
      "http://127.0.0.1:8080"
    ],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"]
  },
  transports: ['websocket', 'polling'], // Allow both transports
  pingTimeout: 60000,
  pingInterval: 25000
});

// Middleware
app.use(cors({
  origin: [
    "https://quiz-end-five.vercel.app",
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8080"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage
const games = new Map();
const users = new Map();
const questions = require('./questions-database');
const leaderboard = [];

// Utility functions
const generateGameCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  do {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (games.has(code)); // Ensure unique code
  return code;
};

// Question management
const questionService = {
  getQuestions(category, subject, difficulty, count) {
    let availableQuestions = [];
    
    // FIX 2: Better question fetching logic
    if (difficulty === 'all') {
      // Get all questions from all difficulties
      const subjectQuestions = questions[category]?.[subject];
      if (subjectQuestions) {
        availableQuestions = Object.values(subjectQuestions).flat();
      }
    } else {
      // Get questions for specific difficulty
      availableQuestions = questions[category]?.[subject]?.[difficulty] || [];
      
      // Fallback: if no questions for specific difficulty, get from all difficulties
      if (availableQuestions.length === 0) {
        const subjectQuestions = questions[category]?.[subject];
        if (subjectQuestions) {
          availableQuestions = Object.values(subjectQuestions).flat();
        }
      }
    }
    
    // Shuffle and return requested number of questions
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  validateAnswer(question, selectedIndex) {
    return {
      isCorrect: selectedIndex === question.correctAnswer,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    };
  }
};

// Game management
const gameService = {
  createGame(hostId, playerName, avatar, settings) {
    const gameCode = generateGameCode();
    
    const game = {
      gameCode,
      hostId,
      players: new Map([[hostId, {
        id: hostId,
        name: playerName,
        avatar,
        score: 0,
        ready: true, // Host starts ready
        answers: [],
        connected: true,
        isHost: true
      }]]),
      settings: {
        ...settings,
        questionCount: parseInt(settings.questionCount) || 10,
        difficulty: settings.difficulty || 'medium'
      },
      status: 'waiting',
      currentQuestion: 0,
      questions: [],
      startTime: null,
      created: new Date()
    };
    
    games.set(gameCode, game);
    console.log(`✅ Game created: ${gameCode} by ${playerName}`);
    return game;
  },

  joinGame(gameCode, playerId, playerName, avatar) {
    const game = games.get(gameCode);
    if (!game) {
      throw new Error('Game not found');
    }
    
    if (game.status !== 'waiting') {
      throw new Error('Game already in progress');
    }
    
    if (game.players.size >= 8) {
      throw new Error('Game is full (max 8 players)');
    }
    
    // Check if player already exists (rejoin case)
    if (game.players.has(playerId)) {
      const player = game.players.get(playerId);
      player.connected = true;
      return game;
    }
    
    // Check if player name is already taken
    const existingPlayer = Array.from(game.players.values()).find(p => 
      p.name.toLowerCase() === playerName.toLowerCase() && p.id !== playerId
    );
    
    if (existingPlayer) {
      throw new Error('Player name already taken in this room');
    }
    
    const player = {
      id: playerId,
      name: playerName,
      avatar,
      score: 0,
      ready: false,
      answers: [],
      connected: true,
      isHost: false
    };
    
    game.players.set(playerId, player);
    console.log(`✅ Player ${playerName} joined game: ${gameCode}`);
    return game;
  },

  startGame(gameCode) {
    const game = games.get(gameCode);
    if (!game) {
      throw new Error('Game not found');
    }
    
    if (game.status !== 'waiting') {
      throw new Error('Game already started');
    }
    
    if (game.players.size < 2) {
      throw new Error('Need at least 2 players to start');
    }
    
    // Check if all players are ready
    const allReady = Array.from(game.players.values()).every(player => player.ready);
    if (!allReady) {
      throw new Error('All players must be ready to start');
    }
    
    // FIX 3: Get questions for the game
    const { category, subject, difficulty, questionCount } = game.settings;
    game.questions = questionService.getQuestions(category, subject, difficulty, questionCount);
    
    if (game.questions.length === 0) {
      throw new Error('No questions available for this configuration');
    }
    
    console.log(`📚 Loaded ${game.questions.length} questions for game ${gameCode}`);
    
    game.status = 'starting';
    game.startTime = new Date();
    
    return game;
  },

  submitAnswer(gameCode, playerId, questionIndex, selectedIndex, timestamp) {
    const game = games.get(gameCode);
    if (!game) {
      throw new Error('Game not found');
    }
    
    if (game.status !== 'in-progress') {
      throw new Error('Game not in progress');
    }
    
    const player = game.players.get(playerId);
    if (!player) {
      throw new Error('Player not in game');
    }
    
    const question = game.questions[questionIndex];
    if (!question) {
      throw new Error('Invalid question');
    }
    
    // Check if player already answered this question
    const existingAnswer = player.answers.find(a => a.questionIndex === questionIndex);
    if (existingAnswer) {
      return existingAnswer; // Return existing answer instead of error
    }
    
    const result = questionService.validateAnswer(question, selectedIndex);
    
    // Calculate points (base points + time bonus)
    const timeElapsed = (timestamp - game.startTime.getTime()) / 1000;
    const timeBonus = Math.max(0, 30 - timeElapsed) * 10;
    
    const points = result.isCorrect ? Math.round(100 + timeBonus) : 0;
    player.score += points;
    
    const answer = {
      questionIndex,
      selectedIndex,
      isCorrect: result.isCorrect,
      points,
      timestamp
    };
    
    player.answers.push(answer);
    
    console.log(`Player ${player.name} answered Q${questionIndex}: ${result.isCorrect ? '✅' : '❌'} (+${points} pts)`);
    
    return {
      playerId,
      score: player.score,
      isCorrect: result.isCorrect,
      correctAnswer: result.correctAnswer,
      explanation: result.explanation,
      points: points
    };
  },

  getGameResults(gameCode) {
    const game = games.get(gameCode);
    if (!game) {
      throw new Error('Game not found');
    }
    
    const players = Array.from(game.players.values())
      .map(player => ({
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        score: player.score,
        correctAnswers: player.answers.filter(a => a.isCorrect).length,
        totalQuestions: game.questions.length,
        isHost: player.isHost
      }))
      .sort((a, b) => b.score - a.score);
    
    return {
      players,
      questions: game.questions.length,
      duration: new Date() - game.startTime
    };
  },

  cleanupOldGames() {
    const now = new Date();
    const MAX_GAME_AGE = 2 * 60 * 60 * 1000; // 2 hours
    
    for (const [gameCode, game] of games.entries()) {
      if (now - game.created > MAX_GAME_AGE) {
        games.delete(gameCode);
        console.log(`🧹 Cleaned up old game: ${gameCode}`);
      }
    }
  }
};

// REST API Routes (keep existing routes...)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    activeGames: games.size,
    activeUsers: users.size
  });
});

// WebSocket Connection Handling
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);
  
  users.set(socket.id, {
    id: socket.id,
    connectedAt: new Date(),
    currentGame: null
  });
  
  // Create game
  socket.on('createGame', (data, callback) => {
    try {
      console.log('📝 Create game request:', data);
      const { playerName, avatar, settings } = data;
      
      const game = gameService.createGame(socket.id, playerName, avatar, settings);
      socket.join(game.gameCode);
      users.get(socket.id).currentGame = game.gameCode;
      
      callback({ 
        success: true, 
        gameCode: game.gameCode,
        hostId: game.hostId
      });
      
      socket.emit('gameCreated', {
        gameCode: game.gameCode,
        hostId: game.hostId,
        players: Array.from(game.players.values()),
        settings: game.settings
      });
      
    } catch (error) {
      console.error('❌ Error creating game:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  // Join game
  socket.on('joinGame', (data, callback) => {
    try {
      console.log('🚪 Join game request:', data);
      const { gameCode, playerName, avatar } = data;
      
      const game = gameService.joinGame(gameCode, socket.id, playerName, avatar);
      socket.join(gameCode);
      users.get(socket.id).currentGame = gameCode;
      
      callback({ 
        success: true, 
        gameCode: gameCode,
        hostId: game.hostId
      });
      
      // Notify all players
      io.to(gameCode).emit('playerJoined', {
        id: socket.id,
        name: playerName,
        avatar: avatar,
        score: 0,
        ready: false,
        isHost: false
      });
      
      socket.emit('gameJoined', {
        gameCode: gameCode,
        players: Array.from(game.players.values()),
        settings: game.settings,
        hostId: game.hostId
      });
      
    } catch (error) {
      console.error('❌ Error joining game:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  // Start game - FIX 4: Proper game start flow
  socket.on('startGame', (data, callback) => {
    try {
      console.log('🎮 Start game request:', data);
      const { gameCode } = data;
      const game = games.get(gameCode);
      
      if (!game || game.hostId !== socket.id) {
        throw new Error('Only the host can start the game');
      }
      
      const startedGame = gameService.startGame(gameCode);
      
      callback({ success: true });
      
      // Notify countdown
      io.to(gameCode).emit('gameStarting', {
        countdown: 5,
        totalQuestions: startedGame.questions.length
      });
      
      // Start game after countdown
      setTimeout(() => {
        if (startedGame.status === 'starting') {
          startedGame.status = 'in-progress';
          startedGame.currentQuestion = 0;
          
          console.log(`🎯 Game ${gameCode} started with ${startedGame.questions.length} questions`);
          
          io.to(gameCode).emit('gameStarted', {
            questions: startedGame.questions,
            totalQuestions: startedGame.questions.length
          });
        }
      }, 5000);
      
    } catch (error) {
      console.error('❌ Error starting game:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  // Submit answer
  socket.on('submitAnswer', (data, callback) => {
    try {
      const { gameCode, questionIndex, selectedIndex } = data;
      
      const result = gameService.submitAnswer(
        gameCode, 
        socket.id, 
        questionIndex, 
        selectedIndex,
        Date.now()
      );
      
      callback({ success: true, result });
      
      io.to(gameCode).emit('playerAnswered', {
        playerId: socket.id,
        score: result.score,
        isCorrect: result.isCorrect,
        points: result.points
      });
      
      // Check if all answered
      const game = games.get(gameCode);
      const allAnswered = Array.from(game.players.values())
        .every(player => player.answers.some(a => a.questionIndex === questionIndex));
      
      if (allAnswered) {
        setTimeout(() => {
          const nextQuestionIndex = questionIndex + 1;
          
          if (nextQuestionIndex < game.questions.length) {
            game.currentQuestion = nextQuestionIndex;
            io.to(gameCode).emit('nextQuestion', {
              index: nextQuestionIndex
            });
          } else {
            game.status = 'finished';
            const results = gameService.getGameResults(gameCode);
            io.to(gameCode).emit('gameFinished', results);
          }
        }, 3000);
      }
      
    } catch (error) {
      console.error('❌ Error submitting answer:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  // Player ready
  socket.on('playerReady', (data, callback) => {
    try {
      const { gameCode, ready } = data;
      const game = games.get(gameCode);
      
      if (game && game.players.has(socket.id)) {
        game.players.get(socket.id).ready = ready;
        callback({ success: true });
        
        io.to(gameCode).emit('playerReadyChanged', {
          playerId: socket.id,
          ready
        });
      }
    } catch (error) {
      console.error('❌ Error setting ready:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  // Chat message
  socket.on('chatMessage', (data, callback) => {
    try {
      const { gameCode, message, playerName, playerId } = data;
      const game = games.get(gameCode);
      
      if (game && game.players.has(playerId)) {
        callback({ success: true });
        
        io.to(gameCode).emit('chatMessage', {
          playerName,
          message,
          playerId,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ Error sending chat:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log(`🔌 User disconnected: ${socket.id}`);
    
    const user = users.get(socket.id);
    if (user && user.currentGame) {
      const game = games.get(user.currentGame);
      if (game) {
        const player = game.players.get(socket.id);
        
        socket.to(user.currentGame).emit('playerLeft', {
          playerId: socket.id,
          playerName: player?.name || 'Player'
        });
        
        // Handle host leaving
        if (game.hostId === socket.id && game.status === 'waiting') {
          const otherPlayers = Array.from(game.players.keys()).filter(id => id !== socket.id);
          if (otherPlayers.length > 0) {
            const newHostId = otherPlayers[0];
            game.hostId = newHostId;
            game.players.get(newHostId).isHost = true;
            io.to(user.currentGame).emit('newHost', newHostId);
          } else {
            games.delete(user.currentGame);
          }
        }
        
        game.players.delete(socket.id);
      }
    }
    
    users.delete(socket.id);
  });
});

// Cleanup old games
setInterval(() => {
  gameService.cleanupOldGames();
}, 30 * 60 * 1000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 QuizMaster server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});