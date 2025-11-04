// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage (in production, use a database)
const games = new Map();
const users = new Map();
const questions = require('./questions-database');
const leaderboard = [];

// Utility functions
const generateGameCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const calculateScore = (correctAnswers, totalQuestions, timeTaken) => {
  const baseScore = (correctAnswers / totalQuestions) * 100;
  const timeBonus = Math.max(0, 100 - timeTaken) * 0.1; // Bonus for faster completion
  return Math.round(baseScore + timeBonus);
};

// Question management
const questionService = {
  getQuestions(category, subject, difficulty, count) {
    let availableQuestions = questions[category]?.[subject]?.[difficulty] || [];
    
    // If no questions for specific difficulty, get any questions for this subject
    if (availableQuestions.length === 0) {
      const subjectQuestions = questions[category]?.[subject];
      if (subjectQuestions) {
        availableQuestions = Object.values(subjectQuestions).flat();
      }
    }
    
    // Shuffle and return requested number of questions
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
        ready: true,
        answers: [],
        connected: true
      }]]),
      settings,
      status: 'waiting', // waiting, starting, in-progress, finished
      currentQuestion: 0,
      questions: [],
      startTime: null,
      created: new Date()
    };
    
    games.set(gameCode, game);
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
      throw new Error('Game is full');
    }
    
    const player = {
      id: playerId,
      name: playerName,
      avatar,
      score: 0,
      ready: false,
      answers: [],
      connected: true
    };
    
    game.players.set(playerId, player);
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
    
    if (game.players.size < 1) {
      throw new Error('Not enough players');
    }
    
    // Get questions for the game
    const { category, subject, difficulty, questionCount } = game.settings;
    game.questions = questionService.getQuestions(category, subject, difficulty, questionCount);
    
    if (game.questions.length === 0) {
      throw new Error('No questions available for this configuration');
    }
    
    game.status = 'starting';
    game.startTime = new Date();
    
    // Set a timeout to automatically start the game
    setTimeout(() => {
      if (game.status === 'starting') {
        game.status = 'in-progress';
        io.to(gameCode).emit('gameStarted', {
          questions: game.questions,
          totalQuestions: game.questions.length
        });
      }
    }, 5000);
    
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
      throw new Error('Already answered this question');
    }
    
    const result = questionService.validateAnswer(question, selectedIndex);
    
    // Calculate points (base points + time bonus)
    const timeElapsed = timestamp - game.startTime;
    const timeBonus = Math.max(0, 30 - (timeElapsed / 1000)) * 10; // Bonus for answering quickly
    
    const points = result.isCorrect ? 100 + timeBonus : 0;
    player.score += points;
    
    player.answers.push({
      questionIndex,
      selectedIndex,
      isCorrect: result.isCorrect,
      points,
      timestamp
    });
    
    return {
      playerId,
      score: player.score,
      isCorrect: result.isCorrect,
      correctAnswer: result.correctAnswer,
      explanation: result.explanation
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
        totalQuestions: game.questions.length
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
        console.log(`Cleaned up old game: ${gameCode}`);
      }
    }
  }
};

// REST API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    activeGames: games.size,
    activeUsers: users.size
  });
});

// Get questions
app.post('/api/questions', (req, res) => {
  try {
    const { category, subject, difficulty, count = 10 } = req.body;
    
    if (!category || !subject || !difficulty) {
      return res.status(400).json({ 
        error: 'Missing required fields: category, subject, difficulty' 
      });
    }
    
    const questionList = questionService.getQuestions(category, subject, difficulty, count);
    
    res.json({
      questions: questionList,
      total: questionList.length,
      category,
      subject,
      difficulty
    });
    
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Submit quiz results
app.post('/api/results', (req, res) => {
  try {
    const { 
      playerName, 
      category, 
      subject, 
      score, 
      correctAnswers, 
      totalQuestions, 
      timeTaken,
      difficulty 
    } = req.body;
    
    const result = {
      playerName,
      category,
      subject,
      score,
      correctAnswers,
      totalQuestions,
      accuracy: (correctAnswers / totalQuestions) * 100,
      timeTaken,
      difficulty,
      timestamp: new Date()
    };
    
    // Add to leaderboard
    leaderboard.push(result);
    
    // Keep only top 100 scores
    if (leaderboard.length > 100) {
      leaderboard.sort((a, b) => b.score - a.score);
      leaderboard.splice(100);
    }
    
    res.json({ 
      success: true, 
      rank: leaderboard.length,
      message: 'Results saved successfully' 
    });
    
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const { category, subject, limit = 10 } = req.query;
    
    let filteredLeaderboard = leaderboard;
    
    if (category) {
      filteredLeaderboard = filteredLeaderboard.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (subject) {
      filteredLeaderboard = filteredLeaderboard.filter(item => 
        item.subject.toLowerCase() === subject.toLowerCase()
      );
    }
    
    // Sort by score (descending) and get top results
    const topScores = filteredLeaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, parseInt(limit));
    
    res.json({
      leaderboard: topScores,
      total: filteredLeaderboard.length,
      category,
      subject
    });
    
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user statistics
app.get('/api/users/:userId/stats', (req, res) => {
  try {
    const { userId } = req.params;
    
    const userResults = leaderboard.filter(result => 
      result.playerName === userId
    );
    
    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const stats = {
      totalQuizzes: userResults.length,
      averageScore: userResults.reduce((sum, result) => sum + result.score, 0) / userResults.length,
      averageAccuracy: userResults.reduce((sum, result) => sum + result.accuracy, 0) / userResults.length,
      bestScore: Math.max(...userResults.map(result => result.score)),
      totalCorrectAnswers: userResults.reduce((sum, result) => sum + result.correctAnswers, 0),
      totalQuestions: userResults.reduce((sum, result) => sum + result.totalQuestions, 0),
      favoriteCategory: getMostFrequentCategory(userResults),
      recentQuizzes: userResults.slice(-5).reverse()
    };
    
    res.json(stats);
    
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// Helper function for user stats
function getMostFrequentCategory(results) {
  const categories = results.reduce((acc, result) => {
    acc[result.category] = (acc[result.category] || 0) + 1;
    return acc;
  }, {});
  
  return Object.keys(categories).reduce((a, b) => 
    categories[a] > categories[b] ? a : b
  );
}

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// WebSocket Connection Handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Store user information
  users.set(socket.id, {
    id: socket.id,
    connectedAt: new Date(),
    currentGame: null
  });
  
  // Create a new game
  socket.on('createGame', (data) => {
    try {
      const { playerName, avatar, settings } = data;
      
      const game = gameService.createGame(socket.id, playerName, avatar, settings);
      
      // Join the game room
      socket.join(game.gameCode);
      users.get(socket.id).currentGame = game.gameCode;
      
      socket.emit('gameCreated', game);
      console.log(`Game created: ${game.gameCode} by ${playerName}`);
      
    } catch (error) {
      socket.emit('gameError', { message: error.message });
    }
  });
  
  // Join an existing game
  socket.on('joinGame', (data) => {
    try {
      const { gameCode, playerName, avatar } = data;
      
      const game = gameService.joinGame(gameCode, socket.id, playerName, avatar);
      
      // Join the game room
      socket.join(gameCode);
      users.get(socket.id).currentGame = gameCode;
      
      // Notify all players in the game
      io.to(gameCode).emit('playerJoined', {
        id: socket.id,
        name: playerName,
        avatar,
        score: 0,
        ready: false
      });
      
      socket.emit('gameJoined', game);
      console.log(`Player ${playerName} joined game: ${gameCode}`);
      
    } catch (error) {
      socket.emit('gameError', { message: error.message });
    }
  });
  
  // Start the game
  socket.on('startGame', (data) => {
    try {
      const { gameCode } = data;
      const game = games.get(gameCode);
      
      if (!game || game.hostId !== socket.id) {
        throw new Error('Only the host can start the game');
      }
      
      const startedGame = gameService.startGame(gameCode);
      
      // Notify all players that game is starting
      io.to(gameCode).emit('gameStarting', {
        countdown: 5,
        totalQuestions: startedGame.questions.length
      });
      
      // Start the game after countdown
      setTimeout(() => {
        startedGame.status = 'in-progress';
        io.to(gameCode).emit('gameStarted', {
          questions: startedGame.questions,
          totalQuestions: startedGame.questions.length
        });
      }, 5000);
      
    } catch (error) {
      socket.emit('gameError', { message: error.message });
    }
  });
  
  // Submit answer
  socket.on('submitAnswer', (data) => {
    try {
      const { gameCode, questionIndex, selectedIndex } = data;
      
      const result = gameService.submitAnswer(
        gameCode, 
        socket.id, 
        questionIndex, 
        selectedIndex,
        Date.now()
      );
      
      // Notify all players about the answer
      io.to(gameCode).emit('playerAnswered', result);
      
      // Check if all players have answered this question
      const game = games.get(gameCode);
      const allAnswered = Array.from(game.players.values())
        .every(player => player.answers.some(a => a.questionIndex === questionIndex));
      
      if (allAnswered) {
        // Move to next question after a delay
        setTimeout(() => {
          const nextQuestionIndex = questionIndex + 1;
          
          if (nextQuestionIndex < game.questions.length) {
            game.currentQuestion = nextQuestionIndex;
            io.to(gameCode).emit('nextQuestion', {
              index: nextQuestionIndex,
              question: game.questions[nextQuestionIndex]
            });
          } else {
            // Game finished
            game.status = 'finished';
            const results = gameService.getGameResults(gameCode);
            io.to(gameCode).emit('gameFinished', results);
            
            // Save results to leaderboard
            results.players.forEach(player => {
              leaderboard.push({
                playerName: player.name,
                category: game.settings.category,
                subject: game.settings.subject,
                score: player.score,
                correctAnswers: player.correctAnswers,
                totalQuestions: game.questions.length,
                accuracy: (player.correctAnswers / game.questions.length) * 100,
                timeTaken: results.duration / 1000,
                difficulty: game.settings.difficulty,
                timestamp: new Date()
              });
            });
          }
        }, 3000);
      }
      
    } catch (error) {
      socket.emit('gameError', { message: error.message });
    }
  });
  
  // Player ready status
  socket.on('playerReady', (data) => {
    try {
      const { gameCode, ready } = data;
      const game = games.get(gameCode);
      
      if (game && game.players.has(socket.id)) {
        game.players.get(socket.id).ready = ready;
        
        io.to(gameCode).emit('playerReadyChanged', {
          playerId: socket.id,
          ready
        });
      }
    } catch (error) {
      socket.emit('gameError', { message: error.message });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    const user = users.get(socket.id);
    if (user && user.currentGame) {
      const game = games.get(user.currentGame);
      if (game) {
        // Notify other players
        socket.to(user.currentGame).emit('playerLeft', socket.id);
        
        // If host disconnects, assign new host or end game
        if (game.hostId === socket.id && game.status === 'waiting') {
          const otherPlayers = Array.from(game.players.keys()).filter(id => id !== socket.id);
          if (otherPlayers.length > 0) {
            game.hostId = otherPlayers[0];
            io.to(user.currentGame).emit('newHost', otherPlayers[0]);
          } else {
            // No players left, remove game
            games.delete(user.currentGame);
          }
        }
        
        // Remove player from game
        game.players.delete(socket.id);
      }
    }
    
    users.delete(socket.id);
  });
  
  // Ping-pong for connection health
  socket.on('ping', () => {
    socket.emit('pong');
  });
});

// Clean up old games periodically
setInterval(() => {
  gameService.cleanupOldGames();
}, 30 * 60 * 1000); // Every 30 minutes

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`QuizMaster server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});