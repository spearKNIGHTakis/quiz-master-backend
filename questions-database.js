// questions-database.js
const questions = {
  primary: {
    mathematics: {
      easy: [
        {
          question: "What is 5 + 7?",
          options: ["11", "12", "13", "14"],
          correctAnswer: 1,
          explanation: "5 + 7 equals 12."
        },
        {
          question: "How many sides does a triangle have?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1,
          explanation: "A triangle has 3 sides."
        },
        {
          question: "What is 8 × 3?",
          options: ["16", "24", "32", "40"],
          correctAnswer: 1,
          explanation: "8 multiplied by 3 equals 24."
        },
        {
          question: "What is 15 - 6?",
          options: ["8", "9", "10", "11"],
          correctAnswer: 1,
          explanation: "15 minus 6 equals 9."
        },
        {
          question: "How many minutes are in an hour?",
          options: ["50", "60", "70", "100"],
          correctAnswer: 1,
          explanation: "There are 60 minutes in one hour."
        }
      ],
      medium: [
        {
          question: "What is 15 × 6?",
          options: ["75", "80", "90", "100"],
          correctAnswer: 2,
          explanation: "15 multiplied by 6 equals 90."
        },
        {
          question: "If a pizza is divided into 8 equal slices and you eat 3, how many are left?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 2,
          explanation: "8 slices minus 3 eaten equals 5 slices remaining."
        },
        {
          question: "What is the perimeter of a square with sides of 5cm?",
          options: ["10cm", "15cm", "20cm", "25cm"],
          correctAnswer: 2,
          explanation: "Perimeter of a square is 4 × side length = 4 × 5 = 20cm."
        }
      ]
    },
    science: {
      easy: [
        {
          question: "Which animal lays eggs?",
          options: ["Dog", "Cat", "Bird", "Cow"],
          correctAnswer: 2,
          explanation: "Birds lay eggs, while dogs, cats, and cows give birth to live young."
        },
        {
          question: "What planet do we live on?",
          options: ["Mars", "Venus", "Earth", "Jupiter"],
          correctAnswer: 2,
          explanation: "We live on planet Earth."
        },
        {
          question: "What do plants need to grow?",
          options: ["Water", "Sunlight", "Soil", "All of the above"],
          correctAnswer: 3,
          explanation: "Plants need water, sunlight, and soil to grow properly."
        }
      ],
      medium: [
        {
          question: "What gas do plants absorb from the atmosphere?",
          options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
          correctAnswer: 2,
          explanation: "Plants absorb carbon dioxide for photosynthesis."
        },
        {
          question: "Which of these is NOT a state of matter?",
          options: ["Solid", "Liquid", "Gas", "Energy"],
          correctAnswer: 3,
          explanation: "The three states of matter are solid, liquid, and gas. Energy is not a state of matter."
        }
      ]
    },
    english: {
      easy: [
        {
          question: "What is the past tense of 'run'?",
          options: ["Running", "Runned", "Ran", "Runs"],
          correctAnswer: 2,
          explanation: "The past tense of 'run' is 'ran'."
        },
        {
          question: "Which word is a noun?",
          options: ["Run", "Beautiful", "School", "Quickly"],
          correctAnswer: 2,
          explanation: "'School' is a noun, while 'run' is a verb, 'beautiful' is an adjective, and 'quickly' is an adverb."
        }
      ]
    }
  },
  highschool: {
    mathematics: {
      easy: [
        {
          question: "What is the value of x in the equation 2x + 5 = 15?",
          options: ["5", "10", "15", "20"],
          correctAnswer: 0,
          explanation: "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5."
        },
        {
          question: "What is the area of a circle with radius 7? (Use π = 22/7)",
          options: ["44", "88", "154", "308"],
          correctAnswer: 2,
          explanation: "Area = πr² = (22/7) × 7 × 7 = 154."
        }
      ],
      medium: [
        {
          question: "Solve for x: x² - 5x + 6 = 0",
          options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = -1, -6"],
          correctAnswer: 0,
          explanation: "The equation factors to (x-2)(x-3)=0, so x=2 or x=3."
        },
        {
          question: "What is the derivative of x³?",
          options: ["3x²", "3x", "x²", "2x³"],
          correctAnswer: 0,
          explanation: "The derivative of x³ is 3x²."
        }
      ],
      hard: [
        {
          question: "What is the limit of (sin x)/x as x approaches 0?",
          options: ["0", "1", "∞", "Undefined"],
          correctAnswer: 1,
          explanation: "This is a fundamental limit in calculus, and the value is 1."
        }
      ]
    },
    physics: {
      easy: [
        {
          question: "What is the SI unit of force?",
          options: ["Joule", "Watt", "Newton", "Pascal"],
          correctAnswer: 2,
          explanation: "The SI unit of force is the Newton (N)."
        }
      ],
      medium: [
        {
          question: "According to Newton's second law, F = ?",
          options: ["mv", "ma", "m/a", "m²a"],
          correctAnswer: 1,
          explanation: "Newton's second law states that Force = mass × acceleration (F = ma)."
        }
      ]
    },
    chemistry: {
      easy: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "O2", "NaCl"],
          correctAnswer: 0,
          explanation: "The chemical formula for water is H₂O."
        }
      ]
    }
  },
  tertiary: {
    programming: {
      medium: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
          ],
          correctAnswer: 0,
          explanation: "HTML stands for Hyper Text Markup Language, used for creating web pages."
        },
        {
          question: "Which of these is NOT a programming language?",
          options: ["Python", "Java", "HTML", "C++"],
          correctAnswer: 2,
          explanation: "HTML is a markup language, not a programming language."
        }
      ],
      hard: [
        {
          question: "In object-oriented programming, what is encapsulation?",
          options: [
            "Binding data with functions that manipulate the data",
            "Creating multiple functions with the same name",
            "Inheriting properties from a parent class",
            "Hiding the implementation details of a class"
          ],
          correctAnswer: 0,
          explanation: "Encapsulation is the bundling of data with the methods that operate on that data."
        }
      ]
    },
    business: {
      medium: [
        {
          question: "What does ROI stand for in business?",
          options: [
            "Return on Investment",
            "Rate of Interest",
            "Return on Income", 
            "Rate of Investment"
          ],
          correctAnswer: 0,
          explanation: "ROI stands for Return on Investment, a performance measure used to evaluate investment efficiency."
        }
      ]
    }
  }
};

module.exports = questions;