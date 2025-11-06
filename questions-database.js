// questions-database.js
const questions = {
  primary: {
    mathematics: {
      easy: [
        {
          question: "What is 5 + 7?",
          options: ["10", "11", "12", "13"],
          correctAnswer: 2,
          explanation: "5 + 7 = 12"
        },
        {
          question: "How many sides does a triangle have?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1,
          explanation: "A triangle has 3 sides"
        },
        {
          question: "What is 10 - 4?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 1,
          explanation: "10 - 4 = 6"
        },
        {
          question: "Which number comes after 99?",
          options: ["98", "99", "100", "101"],
          correctAnswer: 2,
          explanation: "After 99 comes 100"
        },
        {
          question: "What is 3 × 4?",
          options: ["7", "12", "15", "20"],
          correctAnswer: 1,
          explanation: "3 × 4 = 12"
        }
      ],
      medium: [
        {
          question: "What is the place value of 7 in the number 4,732?",
          options: ["Thousands", "Hundreds", "Tens", "Units"],
          correctAnswer: 1,
          explanation: "In 4,732, 7 is in the hundreds place (7 × 100 = 700)."
        },
        {
          question: "If a bag of rice costs GH₵ 25.50 and you pay with GH₵ 50.00, how much change should you receive?",
          options: ["GH₵ 24.50", "GH₵ 25.50", "GH₵ 24.00", "GH₵ 23.50"],
          correctAnswer: 0,
          explanation: "GH₵ 50.00 - GH₵ 25.50 = GH₵ 24.50"
        },
        {
          question: "Calculate: ¾ of 48",
          options: ["12", "24", "36", "40"],
          correctAnswer: 2,
          explanation: "¾ × 48 = (48 ÷ 4) × 3 = 12 × 3 = 36"
        },
        {
          question: "What is 15% of 200?",
          options: ["15", "20", "30", "45"],
          correctAnswer: 2,
          explanation: "15% of 200 = 0.15 × 200 = 30"
        },
        {
          question: "Solve: 2x + 5 = 15",
          options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
          correctAnswer: 0,
          explanation: "2x + 5 = 15 → 2x = 10 → x = 5"
        }
      ]
    },
    science: {
      easy: [
        {
          question: "Which of these is a renewable source of energy?",
          options: ["Solar power", "Coal", "Natural gas", "Petroleum"],
          correctAnswer: 0,
          explanation: "Solar power is renewable because it comes from the sun which won't run out."
        },
        {
          question: "What is the main function of roots in plants?",
          options: ["To absorb water and minerals", "To produce food", "To attract insects", "To store air"],
          correctAnswer: 0,
          explanation: "Roots anchor the plant and absorb water and minerals from the soil."
        },
        {
          question: "Which animal lays eggs?",
          options: ["Dog", "Cat", "Bird", "Cow"],
          correctAnswer: 2,
          explanation: "Birds lay eggs, while dogs, cats, and cows give birth to live young."
        },
        {
          question: "What do we call the study of plants?",
          options: ["Zoology", "Botany", "Biology", "Geology"],
          correctAnswer: 1,
          explanation: "Botany is the scientific study of plants."
        },
        {
          question: "Which sense organ do we use for seeing?",
          options: ["Ears", "Eyes", "Nose", "Skin"],
          correctAnswer: 1,
          explanation: "We use our eyes for seeing and vision."
        }
      ],
      medium: [
        {
          question: "What is the process by which plants make their own food?",
          options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
          correctAnswer: 1,
          explanation: "Photosynthesis is the process where plants use sunlight to make food from carbon dioxide and water."
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1,
          explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide on its surface."
        },
        {
          question: "What is the largest organ in the human body?",
          options: ["Liver", "Brain", "Skin", "Heart"],
          correctAnswer: 2,
          explanation: "The skin is the largest organ in the human body."
        },
        {
          question: "Which gas do plants absorb from the atmosphere?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
          correctAnswer: 1,
          explanation: "Plants absorb carbon dioxide during photosynthesis to produce food."
        },
        {
          question: "What causes day and night on Earth?",
          options: ["Earth's revolution around Sun", "Earth's rotation on its axis", "The Moon's rotation", "Sun's movement"],
          correctAnswer: 1,
          explanation: "Day and night are caused by Earth's rotation on its axis every 24 hours."
        }
      ]
    },
    english: {
      easy: [
        {
          question: "Choose the correct plural form of 'child'",
          options: ["Childs", "Children", "Childes", "Childern"],
          correctAnswer: 1,
          explanation: "The irregular plural of 'child' is 'children'."
        },
        {
          question: "Which word is a verb in this sentence: 'The cat runs quickly'?",
          options: ["cat", "runs", "quickly", "the"],
          correctAnswer: 1,
          explanation: "'Runs' is a verb because it shows action."
        },
        {
          question: "What is the opposite of 'hot'?",
          options: ["Warm", "Cold", "Cool", "Boiling"],
          correctAnswer: 1,
          explanation: "The opposite of hot is cold."
        },
        {
          question: "Which punctuation mark ends a question?",
          options: [".", ",", "!", "?"],
          correctAnswer: 3,
          explanation: "A question mark (?) is used at the end of a question."
        },
        {
          question: "Complete the sentence: I ___ to school every day.",
          options: ["go", "goes", "going", "went"],
          correctAnswer: 0,
          explanation: "With 'I', we use 'go' in present simple tense."
        }
      ],
      medium: [
        {
          question: "Which word is a noun in this sentence: 'The quick brown fox jumps over the lazy dog'?",
          options: ["quick", "jumps", "fox", "over"],
          correctAnswer: 2,
          explanation: "'Fox' is a noun - it's the name of an animal."
        },
        {
          question: "What is the past tense of 'go'?",
          options: ["goed", "went", "going", "gone"],
          correctAnswer: 1,
          explanation: "The past tense of 'go' is 'went'."
        },
        {
          question: "Which of these is a proper noun?",
          options: ["city", "school", "Accra", "book"],
          correctAnswer: 2,
          explanation: "Accra is a proper noun because it's the name of a specific city."
        },
        {
          question: "What do we call a word that describes a noun?",
          options: ["Verb", "Adverb", "Adjective", "Preposition"],
          correctAnswer: 2,
          explanation: "An adjective describes or modifies a noun."
        },
        {
          question: "Which sentence is correct?",
          options: [
            "She don't like apples",
            "She doesn't likes apples", 
            "She doesn't like apples",
            "She don't likes apples"
          ],
          correctAnswer: 2,
          explanation: "With 'she', we use 'doesn't' and the base form of the verb 'like'."
        }
      ]
    },
    social_studies: {
      easy: [
        {
          question: "Who was the first President of Ghana?",
          options: ["Jerry John Rawlings", "Kwame Nkrumah", "John Agyekum Kufuor", "John Atta Mills"],
          correctAnswer: 1,
          explanation: "Dr. Kwame Nkrumah became Ghana's first President after independence in 1957."
        },
        {
          question: "What is the capital city of Ghana?",
          options: ["Kumasi", "Accra", "Takoradi", "Tamale"],
          correctAnswer: 1,
          explanation: "Accra is the capital city of Ghana."
        },
        {
          question: "In which year did Ghana gain independence?",
          options: ["1951", "1957", "1960", "1945"],
          correctAnswer: 1,
          explanation: "Ghana gained independence from British colonial rule on March 6, 1957."
        },
        {
          question: "Which region in Ghana is known for its gold production?",
          options: ["Ashanti Region", "Northern Region", "Volta Region", "Central Region"],
          correctAnswer: 0,
          explanation: "The Ashanti Region is famous for gold mining, particularly in Obuasi."
        },
        {
          question: "What is the official language of Ghana?",
          options: ["Twi", "English", "Ga", "Ewe"],
          correctAnswer: 1,
          explanation: "English is the official language of Ghana, inherited from British colonial rule."
        }
      ],
      medium: [
        {
          question: "Which ethnic group is the largest in Ghana?",
          options: ["Ewe", "Ga", "Akan", "Mole-Dagbon"],
          correctAnswer: 2,
          explanation: "The Akan ethnic group is the largest in Ghana, comprising about 47% of the population."
        },
        {
          question: "What is the name of Ghana's legislative body?",
          options: ["Congress", "Senate", "Parliament", "National Assembly"],
          correctAnswer: 2,
          explanation: "Ghana's legislative body is called Parliament, located in Accra."
        },
        {
          question: "Which Ghanaian leader founded the Convention People's Party (CPP)?",
          options: ["J.B. Danquah", "Kwame Nkrumah", "K.A. Busia", "E.K. Sallah"],
          correctAnswer: 1,
          explanation: "Kwame Nkrumah founded the Convention People's Party in 1949."
        },
        {
          question: "What is the main economic activity in Northern Ghana?",
          options: ["Fishing", "Mining", "Agriculture", "Manufacturing"],
          correctAnswer: 2,
          explanation: "Agriculture is the main economic activity in Northern Ghana, with crops like maize, millet, and sorghum."
        },
        {
          question: "Which festival is celebrated by the Ashanti people?",
          options: ["Hogbetsotso", "Kundum", "Aboakyer", "Akwasidae"],
          correctAnswer: 3,
          explanation: "Akwasidae is a major festival celebrated by the Ashanti people every 42 days."
        }
      ]
    }
  },
  highschool: {
    mathematics: {
      easy: [
        {
          question: "Solve for x: 2x + 5 = 15",
          options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
          correctAnswer: 0,
          explanation: "2x + 5 = 15 → 2x = 10 → x = 5"
        },
        {
          question: "What is the area of a triangle with base 8cm and height 6cm?",
          options: ["14 cm²", "24 cm²", "48 cm²", "28 cm²"],
          correctAnswer: 1,
          explanation: "Area = ½ × base × height = ½ × 8 × 6 = 24 cm²"
        },
        {
          question: "Simplify: 3(x + 4) - 2x",
          options: ["x + 12", "3x + 12", "x + 4", "5x + 12"],
          correctAnswer: 0,
          explanation: "3(x + 4) - 2x = 3x + 12 - 2x = x + 12"
        },
        {
          question: "What is 15% of 200?",
          options: ["15", "20", "30", "45"],
          correctAnswer: 2,
          explanation: "15% of 200 = 0.15 × 200 = 30"
        },
        {
          question: "If a = 3 and b = 4, what is a² + b²?",
          options: ["7", "12", "25", "49"],
          correctAnswer: 2,
          explanation: "a² + b² = 3² + 4² = 9 + 16 = 25"
        }
      ],
      medium: [
        {
          question: "Solve the quadratic equation: x² - 5x + 6 = 0",
          options: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = -1, -6"],
          correctAnswer: 1,
          explanation: "x² - 5x + 6 = (x - 2)(x - 3) = 0 → x = 2 or x = 3"
        },
        {
          question: "What is the value of π (pi) to two decimal places?",
          options: ["3.12", "3.14", "3.16", "3.18"],
          correctAnswer: 1,
          explanation: "π is approximately 3.14159, which rounds to 3.14 to two decimal places."
        },
        {
          question: "Calculate the mean of: 5, 7, 9, 11, 13",
          options: ["8", "9", "10", "11"],
          correctAnswer: 1,
          explanation: "Mean = (5 + 7 + 9 + 11 + 13) ÷ 5 = 45 ÷ 5 = 9"
        },
        {
          question: "What is the perimeter of a rectangle with length 12cm and width 8cm?",
          options: ["20cm", "40cm", "48cm", "96cm"],
          correctAnswer: 1,
          explanation: "Perimeter = 2(length + width) = 2(12 + 8) = 2 × 20 = 40cm"
        },
        {
          question: "Simplify: (2x³y²)³",
          options: ["6x⁶y⁵", "8x⁶y⁵", "6x⁹y⁶", "8x⁹y⁶"],
          correctAnswer: 3,
          explanation: "(2x³y²)³ = 2³ × x³ˣ³ × y²ˣ³ = 8x⁹y⁶"
        }
      ],
      hard: [
        {
          question: "Differentiate: y = 3x² + 2x - 5",
          options: ["dy/dx = 6x + 2", "dy/dx = 3x + 2", "dy/dx = 6x", "dy/dx = 3x² + 2"],
          correctAnswer: 0,
          explanation: "Using power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(-5) = 0"
        },
        {
          question: "Solve: log₂8 = ?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1,
          explanation: "log₂8 = 3 because 2³ = 8"
        },
        {
          question: "What is the probability of getting a prime number when rolling a fair die?",
          options: ["1/2", "1/3", "1/4", "2/3"],
          correctAnswer: 0,
          explanation: "Prime numbers on a die: 2, 3, 5 → 3 favorable outcomes out of 6 total → 3/6 = 1/2"
        },
        {
          question: "Find the value of x in the equation: 2ˣ = 16",
          options: ["2", "3", "4", "5"],
          correctAnswer: 2,
          explanation: "2ˣ = 16 → 2ˣ = 2⁴ → x = 4"
        },
        {
          question: "What is the sum of the interior angles of a hexagon?",
          options: ["540°", "720°", "900°", "1080°"],
          correctAnswer: 1,
          explanation: "Sum of interior angles = (n-2) × 180° = (6-2) × 180° = 4 × 180° = 720°"
        }
      ]
    },
    physics: {
      easy: [
        {
          question: "What is the SI unit of force?",
          options: ["Joule", "Watt", "Newton", "Pascal"],
          correctAnswer: 2,
          explanation: "The newton (N) is the SI unit of force, named after Sir Isaac Newton."
        },
        {
          question: "Which of these is a vector quantity?",
          options: ["Mass", "Speed", "Velocity", "Temperature"],
          correctAnswer: 2,
          explanation: "Velocity is a vector quantity because it has both magnitude and direction."
        },
        {
          question: "What is the acceleration due to gravity on Earth?",
          options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11 m/s²"],
          correctAnswer: 0,
          explanation: "The standard acceleration due to gravity on Earth is approximately 9.8 m/s²."
        },
        {
          question: "Which law states that every action has an equal and opposite reaction?",
          options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
          correctAnswer: 2,
          explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction."
        },
        {
          question: "What type of energy is stored in a stretched spring?",
          options: ["Kinetic energy", "Potential energy", "Thermal energy", "Chemical energy"],
          correctAnswer: 1,
          explanation: "A stretched spring stores potential energy, specifically elastic potential energy."
        }
      ],
      medium: [
        {
          question: "According to Ohm's Law, what is the relationship between voltage (V), current (I), and resistance (R)?",
          options: ["V = I/R", "V = I × R", "V = R/I", "I = V × R"],
          correctAnswer: 1,
          explanation: "Ohm's Law states that Voltage = Current × Resistance (V = I × R)"
        },
        {
          question: "What is the unit of electrical power?",
          options: ["Volt", "Ampere", "Watt", "Ohm"],
          correctAnswer: 2,
          explanation: "The watt (W) is the unit of electrical power, named after James Watt."
        },
        {
          question: "Which type of mirror always forms a virtual image?",
          options: ["Concave mirror", "Convex mirror", "Plane mirror", "Spherical mirror"],
          correctAnswer: 1,
          explanation: "Convex mirrors always form virtual, erect, and diminished images."
        },
        {
          question: "What is the speed of light in vacuum?",
          options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10¹² m/s"],
          correctAnswer: 1,
          explanation: "The speed of light in vacuum is approximately 3 × 10⁸ meters per second."
        },
        {
          question: "Which principle states that the pressure applied to a fluid is transmitted equally in all directions?",
          options: ["Archimedes' Principle", "Pascal's Principle", "Bernoulli's Principle", "Boyle's Law"],
          correctAnswer: 1,
          explanation: "Pascal's Principle states that pressure applied to a confined fluid is transmitted undiminished in all directions."
        }
      ],
      hard: [
        {
          question: "What is the formula for kinetic energy?",
          options: ["½mv²", "mgh", "mv", "Fd"],
          correctAnswer: 0,
          explanation: "Kinetic energy = ½ × mass × velocity² (KE = ½mv²)"
        },
        {
          question: "Which law states that the volume of a gas is inversely proportional to its pressure at constant temperature?",
          options: ["Charles' Law", "Boyle's Law", "Gay-Lussac's Law", "Avogadro's Law"],
          correctAnswer: 1,
          explanation: "Boyle's Law states that at constant temperature, the volume of a gas is inversely proportional to its pressure."
        },
        {
          question: "What is the unit of frequency?",
          options: ["Hertz", "Decibel", "Watt", "Newton"],
          correctAnswer: 0,
          explanation: "The hertz (Hz) is the unit of frequency, representing cycles per second."
        },
        {
          question: "Which type of lens is thicker in the middle than at the edges?",
          options: ["Concave lens", "Convex lens", "Plano-concave lens", "Biconcave lens"],
          correctAnswer: 1,
          explanation: "A convex lens is thicker in the middle and thinner at the edges, causing light rays to converge."
        },
        {
          question: "What is the formula for work done?",
          options: ["mass × acceleration", "force × distance", "pressure × volume", "power × time"],
          correctAnswer: 1,
          explanation: "Work done = force × distance moved in the direction of the force (W = F × d)"
        }
      ]
    },
    chemistry: {
      easy: [
        {
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2,
          explanation: "The chemical symbol for gold is Au (from Latin 'aurum')."
        },
        {
          question: "What is the pH of pure water?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          explanation: "Pure water has a pH of 7, which is neutral."
        },
        {
          question: "Which gas do plants use for photosynthesis?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
          correctAnswer: 1,
          explanation: "Plants use carbon dioxide (CO₂) during photosynthesis to produce glucose and oxygen."
        },
        {
          question: "What is the atomic number of carbon?",
          options: ["6", "12", "14", "16"],
          correctAnswer: 0,
          explanation: "Carbon has an atomic number of 6, meaning it has 6 protons."
        },
        {
          question: "Which of these is a noble gas?",
          options: ["Oxygen", "Nitrogen", "Helium", "Chlorine"],
          correctAnswer: 2,
          explanation: "Helium is a noble gas, which are elements in Group 18 of the periodic table."
        }
      ],
      medium: [
        {
          question: "What is the formula for water?",
          options: ["H₂O", "HO₂", "H₂O₂", "H₃O"],
          correctAnswer: 0,
          explanation: "The chemical formula for water is H₂O, meaning two hydrogen atoms and one oxygen atom."
        },
        {
          question: "Which process involves the change from liquid to gas?",
          options: ["Condensation", "Evaporation", "Sublimation", "Freezing"],
          correctAnswer: 1,
          explanation: "Evaporation is the process where a liquid changes to a gas at temperatures below its boiling point."
        },
        {
          question: "What is the charge of a proton?",
          options: ["Positive", "Negative", "Neutral", "Variable"],
          correctAnswer: 0,
          explanation: "Protons have a positive electrical charge, while electrons have a negative charge."
        },
        {
          question: "Which element is the most abundant in the Earth's atmosphere?",
          options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
          correctAnswer: 2,
          explanation: "Nitrogen makes up about 78% of the Earth's atmosphere, while oxygen is about 21%."
        },
        {
          question: "What type of bond involves the sharing of electrons?",
          options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
          correctAnswer: 1,
          explanation: "Covalent bonds involve the sharing of electron pairs between atoms."
        }
      ],
      hard: [
        {
          question: "What is Avogadro's number?",
          options: ["6.02 × 10²²", "6.02 × 10²³", "6.02 × 10²⁴", "6.02 × 10²⁵"],
          correctAnswer: 1,
          explanation: "Avogadro's number is 6.02 × 10²³, which is the number of particles in one mole of a substance."
        },
        {
          question: "Which law states that equal volumes of gases at the same temperature and pressure contain equal numbers of molecules?",
          options: ["Boyle's Law", "Charles' Law", "Avogadro's Law", "Gay-Lussac's Law"],
          correctAnswer: 2,
          explanation: "Avogadro's Law states that equal volumes of all gases, at the same temperature and pressure, have the same number of molecules."
        },
        {
          question: "What is the pH range for acids?",
          options: ["0-6", "7", "8-14", "0-14"],
          correctAnswer: 0,
          explanation: "Acids have pH values less than 7, with stronger acids having lower pH values."
        },
        {
          question: "Which subatomic particle has negligible mass?",
          options: ["Proton", "Neutron", "Electron", "Nucleus"],
          correctAnswer: 2,
          explanation: "Electrons have negligible mass compared to protons and neutrons."
        },
        {
          question: "What is the formula for calculating moles?",
          options: ["mass × molar mass", "mass ÷ molar mass", "molar mass ÷ mass", "mass + molar mass"],
          correctAnswer: 1,
          explanation: "Number of moles = mass of substance ÷ molar mass"
        }
      ]
    },
    biology: {
      easy: [
        {
          question: "Which cell organelle is known as the 'powerhouse of the cell'?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
          correctAnswer: 1,
          explanation: "Mitochondria produce energy (ATP) for the cell through cellular respiration."
        },
        {
          question: "What is the basic unit of life?",
          options: ["Atom", "Cell", "Molecule", "Tissue"],
          correctAnswer: 1,
          explanation: "The cell is the basic structural and functional unit of all living organisms."
        },
        {
          question: "Which process do plants use to make their own food?",
          options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
          correctAnswer: 1,
          explanation: "Photosynthesis is the process where plants use sunlight to convert carbon dioxide and water into glucose."
        },
        {
          question: "What is the human body's largest organ?",
          options: ["Liver", "Brain", "Skin", "Heart"],
          correctAnswer: 2,
          explanation: "The skin is the largest organ in the human body."
        },
        {
          question: "Which blood cells carry oxygen?",
          options: ["White blood cells", "Red blood cells", "Platelets", "Plasma"],
          correctAnswer: 1,
          explanation: "Red blood cells contain hemoglobin which carries oxygen throughout the body."
        }
      ],
      medium: [
        {
          question: "What is the function of white blood cells?",
          options: ["Carry oxygen", "Fight infection", "Clot blood", "Transport nutrients"],
          correctAnswer: 1,
          explanation: "White blood cells are part of the immune system and help fight infections and diseases."
        },
        {
          question: "Which part of the plant conducts water and minerals from roots to leaves?",
          options: ["Phloem", "Xylem", "Cambium", "Epidermis"],
          correctAnswer: 1,
          explanation: "Xylem tissue transports water and minerals from roots to other parts of the plant."
        },
        {
          question: "What is the process of cell division called?",
          options: ["Mitosis", "Meiosis", "Cytokinesis", "Binary fission"],
          correctAnswer: 0,
          explanation: "Mitosis is the process of cell division that results in two identical daughter cells."
        },
        {
          question: "Which system in the human body is responsible for breathing?",
          options: ["Circulatory system", "Respiratory system", "Digestive system", "Nervous system"],
          correctAnswer: 1,
          explanation: "The respiratory system is responsible for breathing and gas exchange."
        },
        {
          question: "What is DNA?",
          options: ["An energy molecule", "A protein", "Genetic material", "A carbohydrate"],
          correctAnswer: 2,
          explanation: "DNA (Deoxyribonucleic Acid) is the genetic material that carries hereditary information."
        }
      ],
      hard: [
        {
          question: "What is the name of the process where plants lose water vapor?",
          options: ["Transpiration", "Evaporation", "Respiration", "Perspiration"],
          correctAnswer: 0,
          explanation: "Transpiration is the process where plants lose water vapor through their leaves."
        },
        {
          question: "Which blood type is known as the universal donor?",
          options: ["A", "B", "AB", "O"],
          correctAnswer: 3,
          explanation: "Type O negative blood is considered the universal donor because it can be given to people of any blood type."
        },
        {
          question: "What is the function of the ribosomes?",
          options: ["Energy production", "Protein synthesis", "Cellular digestion", "DNA replication"],
          correctAnswer: 1,
          explanation: "Ribosomes are responsible for protein synthesis in cells."
        },
        {
          question: "Which hormone regulates blood sugar levels?",
          options: ["Adrenaline", "Insulin", "Thyroxine", "Estrogen"],
          correctAnswer: 1,
          explanation: "Insulin, produced by the pancreas, regulates blood sugar levels."
        },
        {
          question: "What is the name for the study of ecosystems?",
          options: ["Biology", "Ecology", "Zoology", "Botany"],
          correctAnswer: 1,
          explanation: "Ecology is the study of how organisms interact with each other and their environment."
        }
      ]
    },
    history: {
      easy: [
        {
          question: "In which year did Ghana gain independence?",
          options: ["1951", "1957", "1960", "1945"],
          correctAnswer: 1,
          explanation: "Ghana gained independence from British colonial rule on March 6, 1957."
        },
        {
          question: "Who was the first President of Ghana?",
          options: ["Jerry John Rawlings", "Kwame Nkrumah", "John Agyekum Kufuor", "John Atta Mills"],
          correctAnswer: 1,
          explanation: "Dr. Kwame Nkrumah became Ghana's first President after independence in 1957."
        },
        {
          question: "Which European country colonized Ghana?",
          options: ["France", "Portugal", "Britain", "Germany"],
          correctAnswer: 2,
          explanation: "Ghana was colonized by Britain and was known as the Gold Coast during colonial times."
        },
        {
          question: "What was Ghana originally called before independence?",
          options: ["Ivory Coast", "Gold Coast", "Slave Coast", "Grain Coast"],
          correctAnswer: 1,
          explanation: "Ghana was known as the Gold Coast during the colonial period due to its gold resources."
        },
        {
          question: "Which famous Ghanaian leader founded the Convention People's Party?",
          options: ["J.B. Danquah", "Kwame Nkrumah", "K.A. Busia", "E.K. Sallah"],
          correctAnswer: 1,
          explanation: "Kwame Nkrumah founded the Convention People's Party in 1949."
        }
      ],
      medium: [
        {
          question: "When did Ghana become a republic?",
          options: ["1957", "1960", "1966", "1970"],
          correctAnswer: 1,
          explanation: "Ghana became a republic on July 1, 1960, with Kwame Nkrumah as its first President."
        },
        {
          question: "Which ancient Ghanaian empire was known for its gold trade?",
          options: ["Ashanti Empire", "Mali Empire", "Songhai Empire", "Ghana Empire"],
          correctAnswer: 3,
          explanation: "The Ghana Empire (not to be confused with modern Ghana) was famous for its gold trade from the 6th to 13th centuries."
        },
        {
          question: "What was the name of the first newspaper published by Kwame Nkrumah?",
          options: ["The Accra Mail", "The Ghanaian Times", "The Evening News", "The Daily Graphic"],
          correctAnswer: 2,
          explanation: "Kwame Nkrumah founded 'The Evening News' in 1948 to promote his political agenda."
        },
        {
          question: "Which castle in Ghana was a major center for the slave trade?",
          options: ["Cape Coast Castle", "Elmina Castle", "Christiansborg Castle", "All of the above"],
          correctAnswer: 3,
          explanation: "Cape Coast Castle, Elmina Castle, and Christiansborg Castle were all major centers of the transatlantic slave trade."
        },
        {
          question: "What year saw the first military coup in Ghana?",
          options: ["1966", "1972", "1979", "1981"],
          correctAnswer: 0,
          explanation: "The first military coup in Ghana occurred on February 24, 1966, overthrowing Kwame Nkrumah."
        }
      ],
      hard: [
        {
          question: "Who was the first Ghanaian to earn a university degree?",
          options: ["Kwame Nkrumah", "J.B. Danquah", "James Aggrey", "John Mensah Sarbah"],
          correctAnswer: 2,
          explanation: "James Emman Kwegyir Aggrey was the first Ghanaian to earn a university degree, graduating from Livingstone College in the USA."
        },
        {
          question: "What was the name of the political organization formed by the Big Six?",
          options: ["Convention People's Party", "United Gold Coast Convention", "National Liberation Movement", "People's National Party"],
          correctAnswer: 1,
          explanation: "The United Gold Coast Convention (UGCC) was formed in 1947 by the Big Six to work towards independence."
        },
        {
          question: "Which Ghanaian leader introduced the Economic Recovery Program?",
          options: ["Jerry Rawlings", "Hilla Limann", "John Kufuor", "Kwame Nkrumah"],
          correctAnswer: 0,
          explanation: "Jerry John Rawlings introduced the Economic Recovery Program in 1983 to revive Ghana's economy."
        },
        {
          question: "What year did Ghana discover oil in commercial quantities?",
          options: ["2005", "2007", "2010", "2012"],
          correctAnswer: 1,
          explanation: "Ghana discovered oil in commercial quantities in 2007, with production starting in 2010."
        },
        {
          question: "Which ancient Ghanaian kingdom was known for the Adae and Akwasidae festivals?",
          options: ["Dagomba Kingdom", "Ashanti Kingdom", "Fante Kingdom", "Ewe Kingdom"],
          correctAnswer: 1,
          explanation: "The Ashanti Kingdom is known for the Adae and Akwasidae festivals, which are important cultural celebrations."
        }
      ]
    },
    geography: {
      easy: [
        {
          question: "What is the capital city of Ghana?",
          options: ["Kumasi", "Accra", "Takoradi", "Tamale"],
          correctAnswer: 1,
          explanation: "Accra is the capital city and largest city of Ghana."
        },
        {
          question: "Which region in Ghana is known as the 'Food Basket'?",
          options: ["Ashanti Region", "Eastern Region", "Brong-Ahafo Region", "Northern Region"],
          correctAnswer: 2,
          explanation: "Brong-Ahafo Region is often called Ghana's 'Food Basket' due to its extensive agricultural production."
        },
        {
          question: "What is the longest river in Ghana?",
          options: ["Volta River", "Pra River", "Ankobra River", "Tano River"],
          correctAnswer: 0,
          explanation: "The Volta River is the longest river in Ghana, flowing about 1,500 km through the country."
        },
        {
          question: "Which of these is a natural lake in Ghana?",
          options: ["Lake Bosumtwi", "Lake Volta", "Weija Lake", "Kpong Lake"],
          correctAnswer: 0,
          explanation: "Lake Bosumtwi is a natural lake formed by a meteorite impact, while Lake Volta is man-made."
        },
        {
          question: "What is the highest point in Ghana?",
          options: ["Akwapim Hills", "Mount Afadja", "Kwahu Plateau", "Gambaga Scarp"],
          correctAnswer: 1,
          explanation: "Mount Afadja, also known as Mount Afadjato, is the highest point in Ghana at 885 meters (2,904 ft)."
        }
      ],
      medium: [
        {
          question: "Which climatic zone covers most of Ghana?",
          options: ["Tropical Rainforest", "Tropical Savanna", "Desert", "Mediterranean"],
          correctAnswer: 1,
          explanation: "Most of Ghana has a tropical savanna climate, characterized by distinct wet and dry seasons."
        },
        {
          question: "What is the main mineral resource in Obuasi?",
          options: ["Diamond", "Bauxite", "Gold", "Manganese"],
          correctAnswer: 2,
          explanation: "Obuasi is famous for its gold mines, which have been operational for over a century."
        },
        {
          question: "Which Ghanaian region shares a border with Togo?",
          options: ["Western Region", "Central Region", "Volta Region", "Ashanti Region"],
          correctAnswer: 2,
          explanation: "The Volta Region shares its eastern border with Togo."
        },
        {
          question: "What is the largest man-made lake in the world by surface area?",
          options: ["Lake Kariba", "Lake Volta", "Lake Nasser", "Bratsk Reservoir"],
          correctAnswer: 1,
          explanation: "Lake Volta in Ghana is the largest man-made lake in the world by surface area (8,502 km²)."
        },
        {
          question: "Which vegetation type is found in the northern part of Ghana?",
          options: ["Rainforest", "Savanna", "Mangrove", "Montane"],
          correctAnswer: 1,
          explanation: "The northern part of Ghana is characterized by savanna vegetation, with grasslands and scattered trees."
        }
      ],
      hard: [
        {
          question: "What is the approximate population of Ghana according to 2021 census?",
          options: ["About 20 million", "About 25 million", "About 30 million", "About 35 million"],
          correctAnswer: 2,
          explanation: "Ghana's population was approximately 30.8 million according to the 2021 population and housing census."
        },
        {
          question: "Which Ghanaian city is known as the 'Garden City of West Africa'?",
          options: ["Accra", "Kumasi", "Tamale", "Cape Coast"],
          correctAnswer: 1,
          explanation: "Kumasi is often called the 'Garden City of West Africa' due to its beautiful flora and many parks."
        },
        {
          question: "What is the main economic activity in the coastal areas of Ghana?",
          options: ["Mining", "Fishing", "Agriculture", "Manufacturing"],
          correctAnswer: 1,
          explanation: "Fishing is the main economic activity in Ghana's coastal areas, providing livelihood for many communities."
        },
        {
          question: "Which river forms part of the border between Ghana and Côte d'Ivoire?",
          options: ["Volta River", "Tano River", "Ankobra River", "Pra River"],
          correctAnswer: 1,
          explanation: "The Tano River forms part of the border between Ghana and Côte d'Ivoire in the western region."
        },
        {
          question: "What is the name of Ghana's only natural harbor?",
          options: ["Tema Harbour", "Takoradi Harbour", "Elmina Harbour", "Ada Harbour"],
          correctAnswer: 1,
          explanation: "Takoradi Harbour is Ghana's only natural harbor, while Tema Harbour is artificial."
        }
      ]
    }
  },
  tertiary: {
    programming: {
      easy: [
        {
          question: "Which of these is NOT a programming language?",
          options: ["Python", "Java", "HTML", "C++"],
          correctAnswer: 2,
          explanation: "HTML is a markup language, not a programming language."
        },
        {
          question: "What does CPU stand for?",
          options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"],
          correctAnswer: 1,
          explanation: "CPU stands for Central Processing Unit, which is the brain of the computer."
        },
        {
          question: "Which language is known for web development?",
          options: ["Python", "Java", "JavaScript", "C++"],
          correctAnswer: 2,
          explanation: "JavaScript is primarily used for web development to make websites interactive."
        },
        {
          question: "What is the purpose of a compiler?",
          options: ["To run programs", "To translate code to machine language", "To debug programs", "To design user interfaces"],
          correctAnswer: 1,
          explanation: "A compiler translates high-level programming code into machine code that computers can execute."
        },
        {
          question: "Which data type is used for whole numbers?",
          options: ["String", "Float", "Integer", "Boolean"],
          correctAnswer: 2,
          explanation: "Integer data type is used for whole numbers without decimal points."
        }
      ],
      medium: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correctAnswer: 2,
          explanation: "Binary search has O(log n) time complexity because it halves the search space each time."
        },
        {
          question: "Which programming paradigm focuses on objects?",
          options: ["Procedural", "Functional", "Object-Oriented", "Logical"],
          correctAnswer: 2,
          explanation: "Object-Oriented Programming (OOP) focuses on objects containing both data and methods."
        },
        {
          question: "What does API stand for?",
          options: ["Application Programming Interface", "Advanced Programming Interface", "Application Program Integration", "Automated Programming Interface"],
          correctAnswer: 0,
          explanation: "API stands for Application Programming Interface, which allows different software applications to communicate."
        },
        {
          question: "Which data structure uses LIFO (Last In First Out) principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          explanation: "Stack uses LIFO principle where the last element added is the first one to be removed."
        },
        {
          question: "What is Git used for?",
          options: ["Code editing", "Version control", "Database management", "Web hosting"],
          correctAnswer: 1,
          explanation: "Git is a version control system that helps track changes in source code during software development."
        }
      ],
      hard: [
        {
          question: "What is polymorphism in OOP?",
          options: [
            "Ability to take many forms",
            "Data hiding", 
            "Inheritance of properties",
            "Creating multiple instances"
          ],
          correctAnswer: 0,
          explanation: "Polymorphism allows objects of different classes to be treated as objects of a common super class."
        },
        {
          question: "Which algorithm is used for shortest path finding?",
          options: ["Bubble Sort", "Dijkstra's Algorithm", "Binary Search", "Quick Sort"],
          correctAnswer: 1,
          explanation: "Dijkstra's Algorithm is used to find the shortest path between nodes in a graph."
        },
        {
          question: "What is the purpose of SQL?",
          options: ["Styling web pages", "Managing databases", "Creating animations", "Compiling code"],
          correctAnswer: 1,
          explanation: "SQL (Structured Query Language) is used for managing and manipulating relational databases."
        },
        {
          question: "What does MVC stand for in web development?",
          options: ["Model View Controller", "Main View Component", "Model Variable Control", "Main Variable Controller"],
          correctAnswer: 0,
          explanation: "MVC stands for Model-View-Controller, a design pattern that separates application concerns."
        },
        {
          question: "What is recursion?",
          options: [
            "A function calling itself",
            "Repeating code multiple times",
            "Using loops for iteration", 
            "Creating multiple objects"
          ],
          correctAnswer: 0,
          explanation: "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem."
        }
      ]
    },
    business: {
      easy: [
        {
          question: "What does ROI stand for in business?",
          options: ["Return on Investment", "Rate of Interest", "Return on Income", "Rate of Investment"],
          correctAnswer: 0,
          explanation: "ROI stands for Return on Investment - a measure of profitability."
        },
        {
          question: "What is the primary goal of a business?",
          options: ["To provide employment", "To make profit", "To serve society", "To pay taxes"],
          correctAnswer: 1,
          explanation: "The primary goal of most businesses is to generate profit for their owners."
        },
        {
          question: "Which document shows a company's financial position?",
          options: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Budget Report"],
          correctAnswer: 1,
          explanation: "The Balance Sheet shows a company's assets, liabilities, and equity at a specific point in time."
        },
        {
          question: "What is marketing?",
          options: ["Selling products", "Advertising", "Creating customer value", "Managing finances"],
          correctAnswer: 2,
          explanation: "Marketing is the process of creating, communicating, and delivering value to customers."
        },
        {
          question: "What does SME stand for?",
          options: ["Small Medium Enterprise", "Strategic Management Entity", "Sales Marketing Executive", "System Management Engine"],
          correctAnswer: 0,
          explanation: "SME stands for Small and Medium-sized Enterprises, which are important for economic growth."
        }
      ],
      medium: [
        {
          question: "What is SWOT analysis?",
          options: [
            "Study of Work Operations and Tasks",
            "Strengths, Weaknesses, Opportunities, Threats",
            "Strategic Ways of Thinking", 
            "Systematic Work Organization Technique"
          ],
          correctAnswer: 1,
          explanation: "SWOT analysis examines Strengths, Weaknesses, Opportunities, and Threats for strategic planning."
        },
        {
          question: "What is the break-even point?",
          options: [
            "Where revenue equals costs",
            "Where profit is maximum", 
            "Where sales are highest",
            "Where expenses are lowest"
          ],
          correctAnswer: 0,
          explanation: "Break-even point is where total revenue equals total costs, resulting in zero profit or loss."
        },
        {
          question: "What does CSR stand for?",
          options: [
            "Corporate Social Responsibility",
            "Customer Service Relations", 
            "Company Strategic Resources",
            "Corporate Sales Revenue"
          ],
          correctAnswer: 0,
          explanation: "CSR stands for Corporate Social Responsibility - a business model that helps companies be socially accountable."
        },
        {
          question: "What is inflation?",
          options: [
            "Increase in money supply",
            "Rise in general price levels", 
            "Economic growth",
            "Currency devaluation"
          ],
          correctAnswer: 1,
          explanation: "Inflation is the rate at which the general level of prices for goods and services is rising."
        },
        {
          question: "What is a business plan?",
          options: [
            "A legal document for incorporation",
            "A detailed roadmap for business success",
            "A financial statement", 
            "A marketing campaign"
          ],
          correctAnswer: 1,
          explanation: "A business plan is a formal document outlining business goals and strategies to achieve them."
        }
      ],
      hard: [
        {
          question: "What is the Porter's Five Forces model used for?",
          options: [
            "Financial analysis",
            "Industry analysis and business strategy",
            "Marketing strategy", 
            "Human resource management"
          ],
          correctAnswer: 1,
          explanation: "Porter's Five Forces analyzes industry attractiveness and competition intensity."
        },
        {
          question: "What is the difference between leadership and management?",
          options: [
            "Leadership focuses on people, management on processes",
            "They are the same thing", 
            "Management is more important than leadership",
            "Leadership is only for executives"
          ],
          correctAnswer: 0,
          explanation: "Leadership involves inspiring and guiding people, while management focuses on processes and systems."
        },
        {
          question: "What is venture capital?",
          options: [
            "Government funding for businesses",
            "Funding provided to startups with high growth potential", 
            "Bank loans for small businesses",
            "Personal savings invested in business"
          ],
          correctAnswer: 1,
          explanation: "Venture capital is financing provided to startups and small businesses with long-term growth potential."
        },
        {
          question: "What is the purpose of a balance sheet?",
          options: [
            "To show revenue and expenses",
            "To show financial position at a point in time", 
            "To track cash movements",
            "To project future earnings"
          ],
          correctAnswer: 1,
          explanation: "A balance sheet provides a snapshot of a company's financial position (assets, liabilities, equity) at a specific date."
        },
        {
          question: "What is the concept of 'time value of money'?",
          options: [
            "Money loses value over time due to inflation",
            "Money available now is worth more than the same amount in the future", 
            "Time is money in business",
            "Money should be invested quickly"
          ],
          correctAnswer: 1,
          explanation: "Time value of money principle states that money available now is worth more than the same amount in the future due to its potential earning capacity."
        }
      ]
    },
    engineering: {
      easy: [
        {
          question: "What is the SI unit of electrical resistance?",
          options: ["Volt", "Ampere", "Ohm", "Watt"],
          correctAnswer: 2,
          explanation: "The ohm (Ω) is the SI unit of electrical resistance."
        },
        {
          question: "Which law relates current, voltage, and resistance?",
          options: ["Newton's Law", "Ohm's Law", "Faraday's Law", "Boyle's Law"],
          correctAnswer: 1,
          explanation: "Ohm's Law states that V = I × R (Voltage = Current × Resistance)."
        },
        {
          question: "What type of engineer designs bridges and buildings?",
          options: ["Electrical Engineer", "Mechanical Engineer", "Civil Engineer", "Chemical Engineer"],
          correctAnswer: 2,
          explanation: "Civil engineers design and construct infrastructure like bridges, buildings, and roads."
        },
        {
          question: "What does CAD stand for?",
          options: ["Computer Aided Design", "Computer Assisted Drawing", "Creative Architectural Design", "Calculated Automated Design"],
          correctAnswer: 0,
          explanation: "CAD stands for Computer Aided Design, used by engineers and architects for design work."
        },
        {
          question: "What is the purpose of a transformer?",
          options: ["To store energy", "To change voltage levels", "To generate electricity", "To measure current"],
          correctAnswer: 1,
          explanation: "Transformers are used to increase or decrease AC voltage levels in electrical systems."
        }
      ],
      medium: [
        {
          question: "What is the second law of thermodynamics?",
          options: [
            "Energy cannot be created or destroyed",
            "Entropy of an isolated system always increases", 
            "For every action there is an equal reaction",
            "Pressure and volume are inversely related"
          ],
          correctAnswer: 1,
          explanation: "The second law states that the total entropy of an isolated system can never decrease over time."
        },
        {
          question: "What is the Young's Modulus a measure of?",
          options: ["Electrical conductivity", "Stiffness of a material", "Thermal expansion", "Magnetic permeability"],
          correctAnswer: 1,
          explanation: "Young's Modulus measures the stiffness of a solid material, defined as the ratio of stress to strain."
        },
        {
          question: "What is the purpose of a semiconductor?",
          options: [
            "To conduct electricity perfectly",
            "To act as an insulator", 
            "To control electrical current flow",
            "To store electrical charge"
          ],
          correctAnswer: 2,
          explanation: "Semiconductors have electrical conductivity between conductors and insulators, allowing controlled current flow."
        },
        {
          question: "What does PLC stand for in industrial engineering?",
          options: [
            "Programmable Logic Controller",
            "Power Line Communication", 
            "Professional Licensing Council",
            "Process Load Calculation"
          ],
          correctAnswer: 0,
          explanation: "PLC stands for Programmable Logic Controller, used for automating industrial processes."
        },
        {
          question: "What is the Reynolds number used for?",
          options: [
            "Electrical circuit analysis",
            "Predicting fluid flow patterns", 
            "Structural stress analysis",
            "Thermal efficiency calculation"
          ],
          correctAnswer: 1,
          explanation: "Reynolds number predicts whether fluid flow will be laminar or turbulent."
        }
      ],
      hard: [
        {
          question: "What is the Nyquist-Shannon sampling theorem?",
          options: [
            "A theorem about signal processing and sampling rates",
            "A principle of structural engineering", 
            "A law of thermodynamics",
            "A rule for electrical circuit design"
          ],
          correctAnswer: 0,
          explanation: "The Nyquist-Shannon theorem states that a signal must be sampled at least twice its highest frequency component to be accurately reconstructed."
        },
        {
          question: "What is finite element analysis (FEA) used for?",
          options: [
            "Financial modeling",
            "Numerical analysis of complex structures", 
            "Chemical reaction modeling",
            "Electrical circuit simulation"
          ],
          correctAnswer: 1,
          explanation: "FEA is a computational method for predicting how products react to real-world forces, vibration, heat, etc."
        },
        {
          question: "What is the purpose of a PID controller?",
          options: [
            "To manage database systems",
            "To control industrial processes using feedback", 
            "To design digital circuits",
            "To analyze financial data"
          ],
          correctAnswer: 1,
          explanation: "PID (Proportional-Integral-Derivative) controllers use feedback to continuously adjust process variables."
        },
        {
          question: "What is the difference between stress and strain?",
          options: [
            "Stress is force per unit area, strain is deformation",
            "They are the same thing", 
            "Stress is deformation, strain is force",
            "Stress is in Newtons, strain is in meters"
          ],
          correctAnswer: 0,
          explanation: "Stress is the internal resisting force per unit area, while strain is the measure of deformation."
        },
        {
          question: "What is the Carnot efficiency?",
          options: [
            "Maximum possible efficiency of a heat engine",
            "Efficiency of electrical motors", 
            "Energy conversion rate in transformers",
            "Performance ratio of solar panels"
          ],
          correctAnswer: 0,
          explanation: "Carnot efficiency is the maximum theoretical efficiency possible for a heat engine operating between two temperatures."
        }
      ]
    },
    medicine: {
      easy: [
        {
          question: "What is the normal human body temperature in Celsius?",
          options: ["35°C", "36°C", "37°C", "38°C"],
          correctAnswer: 2,
          explanation: "Normal human body temperature is approximately 37°C (98.6°F)."
        },
        {
          question: "Which organ pumps blood throughout the body?",
          options: ["Liver", "Heart", "Lungs", "Kidneys"],
          correctAnswer: 1,
          explanation: "The heart is responsible for pumping blood throughout the circulatory system."
        },
        {
          question: "What is the study of drugs called?",
          options: ["Pathology", "Pharmacology", "Physiology", "Psychology"],
          correctAnswer: 1,
          explanation: "Pharmacology is the study of drugs and their effects on living organisms."
        },
        {
          question: "Which vitamin is produced when skin is exposed to sunlight?",
          options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
          correctAnswer: 3,
          explanation: "Vitamin D is synthesized in the skin when exposed to sunlight."
        },
        {
          question: "What does BMI stand for?",
          options: ["Body Mass Index", "Basic Metabolic Indicator", "Bone Mass Index", "Blood Measurement Index"],
          correctAnswer: 0,
          explanation: "BMI stands for Body Mass Index, a measure of body fat based on height and weight."
        }
      ],
      medium: [
        {
          question: "What is hypertension?",
          options: ["Low blood pressure", "High blood pressure", "High blood sugar", "Low blood sugar"],
          correctAnswer: 1,
          explanation: "Hypertension is the medical term for high blood pressure."
        },
        {
          question: "Which gland is known as the 'master gland'?",
          options: ["Thyroid gland", "Adrenal gland", "Pituitary gland", "Pancreas"],
          correctAnswer: 2,
          explanation: "The pituitary gland is called the 'master gland' because it controls other endocrine glands."
        },
        {
          question: "What is the function of white blood cells?",
          options: ["Carry oxygen", "Fight infection", "Clot blood", "Transport nutrients"],
          correctAnswer: 1,
          explanation: "White blood cells are part of the immune system and help fight infections."
        },
        {
          question: "What is CPR used for?",
          options: [
            "Treating fractures",
            "Restoring breathing and circulation", 
            "Lowering fever",
            "Reducing pain"
          ],
          correctAnswer: 1,
          explanation: "CPR (Cardiopulmonary Resuscitation) is used to restore breathing and blood circulation in emergency situations."
        },
        {
          question: "Which organ produces insulin?",
          options: ["Liver", "Pancreas", "Stomach", "Kidneys"],
          correctAnswer: 1,
          explanation: "The pancreas produces insulin, which regulates blood sugar levels."
        }
      ],
      hard: [
        {
          question: "What is the difference between benign and malignant tumors?",
          options: [
            "Benign are cancerous, malignant are not",
            "Malignant are cancerous and can spread", 
            "They are the same thing",
            "Benign tumors always become malignant"
          ],
          correctAnswer: 1,
          explanation: "Benign tumors are non-cancerous and don't spread, while malignant tumors are cancerous and can metastasize."
        },
        {
          question: "What is the Hippocratic Oath?",
          options: [
            "A medical code of ethics for physicians",
            "A surgical procedure", 
            "A medical textbook",
            "A pharmaceutical standard"
          ],
          correctAnswer: 0,
          explanation: "The Hippocratic Oath is an ethical code historically taken by physicians, emphasizing patient care and confidentiality."
        },
        {
          question: "What is homeostasis?",
          options: [
            "The body's ability to maintain stable internal conditions",
            "A type of genetic disorder", 
            "A method of disease diagnosis",
            "A surgical technique"
          ],
          correctAnswer: 0,
          explanation: "Homeostasis is the body's ability to maintain stable internal conditions despite external changes."
        },
        {
          question: "What is the purpose of clinical trials?",
          options: [
            "To test new medical treatments in humans",
            "To diagnose diseases", 
            "To perform surgeries",
            "To train medical students"
          ],
          correctAnswer: 0,
          explanation: "Clinical trials research the safety and effectiveness of new medical treatments in human volunteers."
        },
        {
          question: "What is the difference between epidemic and pandemic?",
          options: [
            "Epidemic is worldwide, pandemic is local",
            "Pandemic is worldwide, epidemic is localized", 
            "They mean the same thing",
            "Epidemic affects animals, pandemic affects humans"
          ],
          correctAnswer: 1,
          explanation: "An epidemic is a disease outbreak in a specific region, while a pandemic spreads across multiple countries or worldwide."
        }
      ]
    },
    law: {
      easy: [
        {
          question: "What is the supreme law of Ghana?",
          options: ["The Criminal Code", "The 1992 Constitution", "The Courts Act", "The Chieftaincy Act"],
          correctAnswer: 1,
          explanation: "The 1992 Constitution is the supreme law of Ghana."
        },
        {
          question: "What are the three arms of government in Ghana?",
          options: [
            "Executive, Legislative, Judicial",
            "Military, Police, Judiciary", 
            "President, Parliament, Courts",
            "Central, Regional, District"
          ],
          correctAnswer: 0,
          explanation: "The three arms of government are Executive, Legislative, and Judicial, providing checks and balances."
        },
        {
          question: "What is the minimum voting age in Ghana?",
          options: ["16 years", "18 years", "21 years", "25 years"],
          correctAnswer: 1,
          explanation: "The minimum voting age in Ghana is 18 years."
        },
        {
          question: "Which court is the highest in Ghana?",
          options: ["High Court", "Court of Appeal", "Supreme Court", "Circuit Court"],
          correctAnswer: 2,
          explanation: "The Supreme Court is the highest court and final court of appeal in Ghana."
        },
        {
          question: "What is a bill?",
          options: [
            "A proposed law",
            "An existing law", 
            "A court judgment",
            "A legal document"
          ],
          correctAnswer: 0,
          explanation: "A bill is a proposed law presented to parliament for debate and approval."
        }
      ],
      medium: [
        {
          question: "What is the difference between civil law and criminal law?",
          options: [
            "Civil law deals with disputes between individuals, criminal law with offenses against the state",
            "They are the same thing", 
            "Civil law is more serious than criminal law",
            "Criminal law only applies to businesses"
          ],
          correctAnswer: 0,
          explanation: "Civil law resolves disputes between individuals/organizations, while criminal law deals with crimes against society."
        },
        {
          question: "What is the principle of 'innocent until proven guilty'?",
          options: [
            "A fundamental right in criminal proceedings",
            "Only applies to civil cases", 
            "A rule for contract law",
            "Not recognized in Ghanaian law"
          ],
          correctAnswer: 0,
          explanation: "This principle ensures that the burden of proof is on the prosecution in criminal cases."
        },
        {
          question: "What is judicial review?",
          options: [
            "The power of courts to review the constitutionality of laws",
            "Reviewing judges' performance", 
            "Appealing court decisions",
            "Studying case law"
          ],
          correctAnswer: 0,
          explanation: "Judicial review allows courts to examine and invalidate laws or actions that violate the constitution."
        },
        {
          question: "What is tort law concerned with?",
          options: [
            "Criminal offenses",
            "Civil wrongs and compensation", 
            "Contract agreements",
            "Constitutional matters"
          ],
          correctAnswer: 1,
          explanation: "Tort law deals with civil wrongs that cause harm or loss, resulting in legal liability."
        },
        {
          question: "What is the statute of limitations?",
          options: [
            "The time limit for bringing legal action",
            "The number of laws in a statute book", 
            "The size of legal documents",
            "The power of parliament to make laws"
          ],
          correctAnswer: 0,
          explanation: "Statute of limitations sets the maximum time after an event within which legal proceedings may be initiated."
        }
      ],
      hard: [
        {
          question: "What is the doctrine of separation of powers?",
          options: [
            "Dividing government into three branches to prevent concentration of power",
            "Separating state and religion", 
            "Dividing legislative power between houses",
            "Separating judicial functions"
          ],
          correctAnswer: 0,
          explanation: "Separation of powers divides government into executive, legislative, and judicial branches to prevent abuse of power."
        },
        {
          question: "What is judicial precedent?",
          options: [
            "The principle that courts must follow previous decisions",
            "Predicting court judgments", 
            "Preference for certain judges",
            "Historical court cases"
          ],
          correctAnswer: 0,
          explanation: "Judicial precedent (stare decisis) means courts must follow decisions made in higher courts in similar cases."
        },
        {
          question: "What is the difference between common law and statutory law?",
          options: [
            "Common law is judge-made, statutory law is parliament-made",
            "They are the same thing", 
            "Common law is older than statutory law",
            "Statutory law applies only to statutes"
          ],
          correctAnswer: 0,
          explanation: "Common law develops through court decisions, while statutory law is created by legislative bodies."
        },
        {
          question: "What is equity in law?",
          options: [
            "A system of justice supplementing common law",
            "Equal distribution of wealth", 
            "Fair market value",
            "Equal rights for all"
          ],
          correctAnswer: 0,
          explanation: "Equity refers to a body of law that developed alongside common law to provide remedies where common law was inadequate."
        },
        {
          question: "What is the rule of law?",
          options: [
            "The principle that all people and institutions are subject to and accountable to law",
            "That laws must be written", 
            "That judges make laws",
            "That parliament is supreme"
          ],
          correctAnswer: 0,
          explanation: "The rule of law means that everyone, including government officials, must obey the law and be held accountable under it."
        }
      ]
    },
    economics: {
      easy: [
        {
          question: "What does GDP stand for?",
          options: ["Gross Domestic Product", "General Domestic Price", "Gross Development Product", "General Development Progress"],
          correctAnswer: 0,
          explanation: "GDP stands for Gross Domestic Product - the total value of goods and services produced in a country."
        },
        {
          question: "What is inflation?",
          options: ["Increase in money supply", "Rise in general price levels", "Economic growth", "Currency devaluation"],
          correctAnswer: 1,
          explanation: "Inflation is the rate at which the general level of prices for goods and services is rising."
        },
        {
          question: "What is the basic economic problem?",
          options: ["Unemployment", "Scarcity of resources", "Inflation", "Poverty"],
          correctAnswer: 1,
          explanation: "The basic economic problem is scarcity - unlimited wants but limited resources."
        },
        {
          question: "What is opportunity cost?",
          options: [
            "The cost of missed opportunities",
            "The value of the next best alternative forgone", 
            "The price of goods",
            "The cost of production"
          ],
          correctAnswer: 1,
          explanation: "Opportunity cost is the value of the next best alternative that is given up when making a choice."
        },
        {
          question: "What is a market economy?",
          options: [
            "An economy controlled by government",
            "An economy where decisions are made by market forces", 
            "An economy based on tradition",
            "An economy with no regulations"
          ],
          correctAnswer: 1,
          explanation: "In a market economy, economic decisions and prices are guided by interactions between citizens and businesses."
        }
      ],
      medium: [
        {
          question: "What is the law of demand?",
          options: [
            "As price increases, quantity demanded increases",
            "As price increases, quantity demanded decreases", 
            "Demand always equals supply",
            "Price and demand are unrelated"
          ],
          correctAnswer: 1,
          explanation: "The law of demand states that, all else being equal, as the price of a product increases, quantity demanded decreases."
        },
        {
          question: "What is fiscal policy?",
          options: [
            "Government spending and taxation decisions",
            "Central bank control of money supply", 
            "International trade regulations",
            "Business investment strategies"
          ],
          correctAnswer: 0,
          explanation: "Fiscal policy involves government decisions about spending and taxation to influence the economy."
        },
        {
          question: "What is comparative advantage?",
          options: [
            "Producing at lower opportunity cost than others",
            "Producing more efficiently than others", 
            "Having better technology than others",
            "Having more resources than others"
          ],
          correctAnswer: 0,
          explanation: "Comparative advantage is the ability to produce a good at a lower opportunity cost than trading partners."
        },
        {
          question: "What is monetary policy?",
          options: [
            "Government budget management",
            "Central bank control of money supply and interest rates", 
            "International currency exchange",
            "Business financial planning"
          ],
          correctAnswer: 1,
          explanation: "Monetary policy involves central bank actions to control money supply and interest rates to achieve economic goals."
        },
        {
          question: "What is elasticity of demand?",
          options: [
            "How responsive quantity demanded is to price changes",
            "How flexible prices are", 
            "How demand changes over time",
            "How supply responds to demand"
          ],
          correctAnswer: 0,
          explanation: "Elasticity of demand measures how much the quantity demanded of a good responds to a change in its price."
        }
      ],
      hard: [
        {
          question: "What is the Phillips Curve relationship?",
          options: [
            "Inverse relationship between inflation and unemployment",
            "Direct relationship between GDP and inflation", 
            "Relationship between interest rates and investment",
            "Connection between trade and growth"
          ],
          correctAnswer: 0,
          explanation: "The Phillips Curve shows an inverse relationship between the rate of inflation and the unemployment rate."
        },
        {
          question: "What is the multiplier effect?",
          options: [
            "The proportional amount of increase in final income from an injection of spending",
            "The effect of inflation on prices", 
            "How money multiplies in banks",
            "The impact of exports on GDP"
          ],
          correctAnswer: 0,
          explanation: "The multiplier effect describes how an initial change in spending leads to a larger change in national income."
        },
        {
          question: "What is game theory in economics?",
          options: [
            "The study of mathematical models of strategic interaction",
            "Analysis of sports economics", 
            "Study of economic games",
            "Theory of competitive markets"
          ],
          correctAnswer: 0,
          explanation: "Game theory analyzes strategic interactions where individuals' outcomes depend on others' actions."
        },
        {
          question: "What is the difference between nominal and real GDP?",
          options: [
            "Nominal is current prices, real is adjusted for inflation",
            "Real is current prices, nominal is adjusted", 
            "They are the same thing",
            "Nominal includes services, real only goods"
          ],
          correctAnswer: 0,
          explanation: "Nominal GDP uses current prices, while real GDP is adjusted for inflation to reflect true production changes."
        },
        {
          question: "What is the Laffer Curve?",
          options: [
            "Relationship between tax rates and tax revenue",
            "Curve showing production possibilities", 
            "Demand curve for luxury goods",
            "Supply curve for labor"
          ],
          correctAnswer: 0,
          explanation: "The Laffer Curve illustrates the relationship between tax rates and tax revenue, suggesting there's an optimal tax rate."
        }
      ]
    }
  }
};

module.exports = questions;