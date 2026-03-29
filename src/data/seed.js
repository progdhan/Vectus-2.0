// ─── Subjects ─────────────────────────────────────────────────────────────
export const SUBJECTS = [
  { id: 'science',  name: 'Science',     icon: '🔬', color: '#6c63ff', description: 'Life, earth & physical science' },
  { id: 'maths',   name: 'Mathematics', icon: '➕', color: '#06b6d4', description: 'Numbers, algebra & geometry'    },
  { id: 'history', name: 'History',      icon: '🏛️', color: '#f59e0b', description: 'Civilizations & world events'   },
  { id: 'geo',     name: 'Geography',    icon: '🌍', color: '#10b981', description: 'Earth, climate & continents'    },
];

// ─── Topics (3 per subject, one per difficulty) ────────────────────────────
export const TOPICS = [
  // Science
  { id: 'photosynthesis', subjectId: 'science',  title: 'Photosynthesis',          difficulty: 'easy'   },
  { id: 'water-cycle',    subjectId: 'science',  title: 'The Water Cycle',          difficulty: 'medium' },
  { id: 'dna',            subjectId: 'science',  title: 'DNA & Protein Synthesis',  difficulty: 'hard'   },
  // Maths
  { id: 'fractions',   subjectId: 'maths', title: 'What are Fractions?',      difficulty: 'easy'   },
  { id: 'algebra',     subjectId: 'maths', title: 'Introduction to Algebra',  difficulty: 'medium' },
  { id: 'quadratics',  subjectId: 'maths', title: 'Quadratic Equations',      difficulty: 'hard'   },
  // History
  { id: 'egypt', subjectId: 'history', title: 'Ancient Egypt',      difficulty: 'easy'   },
  { id: 'rome',  subjectId: 'history', title: 'The Roman Empire',   difficulty: 'medium' },
  { id: 'ww2',   subjectId: 'history', title: 'World War II',       difficulty: 'hard'   },
  // Geography
  { id: 'continents',     subjectId: 'geo', title: "Earth's Continents",     difficulty: 'easy'   },
  { id: 'plate-tectonics',subjectId: 'geo', title: 'Plate Tectonics',        difficulty: 'medium' },
  { id: 'climate',        subjectId: 'geo', title: 'Global Climate Systems', difficulty: 'hard'   },
];

// ─── Lessons (one per topic) ───────────────────────────────────────────────
export const LESSONS = [
  {
    id: 'photosynthesis', topicId: 'photosynthesis',
    title: '🌱 Photosynthesis',
    body: `Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored as glucose.\n\nThis process takes place mainly in the leaves of plants, specifically inside structures called chloroplasts, which contain a green pigment called chlorophyll.\n\nThe basic equation is:\n\n💡 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nIn simple terms: plants take in carbon dioxide and water, use sunlight, and produce sugar (food) and oxygen.\n\nThis is why plants are called "primary producers" — they create the energy that fuels almost all life on Earth.`,
  },
  {
    id: 'water-cycle', topicId: 'water-cycle',
    title: '⚡ The Water Cycle',
    body: `The water cycle (hydrological cycle) is the continuous movement of water through Earth's systems.\n\n🔵 Evaporation: Heat from the sun causes water from oceans, lakes, and rivers to turn into water vapour.\n\n☁️ Condensation: As water vapour rises, it cools and condenses to form clouds and fog.\n\n🌧️ Precipitation: Water falls back to Earth as rain, snow, sleet, or hail.\n\n🏞️ Collection: Water collects in oceans, rivers, and underground aquifers, and the cycle begins again.\n\nThe water cycle is vital for distributing freshwater around the planet and regulating climate temperatures.`,
  },
  {
    id: 'dna', topicId: 'dna',
    title: '🔬 DNA & Protein Synthesis',
    body: `DNA (deoxyribonucleic acid) carries the genetic instructions for all living organisms.\n\nGene expression occurs in two key steps:\n\n📖 Transcription: Inside the nucleus, a segment of DNA is "read" by RNA polymerase, which creates a complementary messenger RNA (mRNA) strand.\n\n🏭 Translation: The mRNA travels to a ribosome in the cytoplasm, where transfer RNA (tRNA) molecules bring specific amino acids that are linked together to form a protein.\n\nThe sequence of nucleotide bases (A, T, G, C in DNA; A, U, G, C in RNA) determines which amino acids are used and what protein is built.\n\nProteins are the workhorses of the cell — they form structures, catalyse reactions, and carry signals.`,
  },
  {
    id: 'fractions', topicId: 'fractions',
    title: '➕ What are Fractions?',
    body: `A fraction represents a part of a whole. It consists of two numbers separated by a line.\n\nThe top number is called the numerator (how many parts we have).\nThe bottom number is called the denominator (total equal parts).\n\nExample: In ¾, the numerator is 3 and the denominator is 4.\n\nTypes of fractions:\n\n✅ Proper fractions: numerator < denominator (e.g. ½, ¾)\n\n📈 Improper fractions: numerator ≥ denominator (e.g. 5/3, 7/4)\n\n🔢 Mixed numbers: whole number + proper fraction (e.g. 1½, 2¾)\n\nAdding fractions with the same denominator — just add the numerators:\n¼ + 2/4 = 3/4`,
  },
  {
    id: 'algebra', topicId: 'algebra',
    title: '🔢 Introduction to Algebra',
    body: `Algebra is a branch of mathematics that uses symbols (usually letters called variables) to represent unknown numbers.\n\nKey concepts:\n\n🔤 Variable: A letter representing an unknown value (e.g., x, y, n).\n\n📝 Expression: Variables, numbers, and operations combined (e.g., 3x + 5).\n\n⚖️ Equation: Two expressions set equal to each other (e.g., 3x + 5 = 14).\n\n✅ Solution: The value that makes the equation true.\n\nSolving step-by-step:\n3x + 5 = 14\n3x = 14 - 5 = 9\nx = 9 ÷ 3 = 3 ✓\n\nRule: Whatever you do to one side of an equation, do the same to the other side.`,
  },
  {
    id: 'quadratics', topicId: 'quadratics',
    title: '📐 Quadratic Equations',
    body: `A quadratic equation is a polynomial equation of degree 2:\n\nax² + bx + c = 0  (where a ≠ 0)\n\nThe Quadratic Formula solves any quadratic equation:\n\nx = (−b ± √(b² − 4ac)) / 2a\n\nThe discriminant (b² − 4ac) tells us how many solutions exist:\n\n📗 > 0 → Two distinct real solutions\n📘 = 0 → One repeated real solution\n📕 < 0 → No real solutions (complex numbers)\n\nExample: x² − 5x + 6 = 0\na=1, b=-5, c=6\nx = (5 ± √(25 − 24)) / 2 = (5 ± 1) / 2\nx = 3  or  x = 2 ✓`,
  },
  {
    id: 'egypt', topicId: 'egypt',
    title: '🏛️ Ancient Egypt',
    body: `Ancient Egypt was one of the world's oldest civilizations, lasting over 3,000 years (c. 3100–30 BCE).\n\n🌊 The Nile River: Egypt's lifeline, providing water and fertile soil in an otherwise desert landscape.\n\n👑 Pharaohs: God-kings who ruled with absolute power. Famous pharaohs include Tutankhamun, Ramesses II, and Cleopatra.\n\n🔺 Pyramids: Massive stone tombs built for pharaohs. The Great Pyramid of Giza (c. 2560 BCE) is one of the Seven Wonders of the Ancient World.\n\n📜 Hieroglyphics: Egypt's writing system using pictures and symbols to encode language.\n\n⚱️ Mummification: The process of preserving a body for the afterlife, central to Egyptian religious beliefs.\n\nEgypt declined after conquest by Alexander the Great (332 BCE) and became a Roman province in 30 BCE.`,
  },
  {
    id: 'rome', topicId: 'rome',
    title: '🏛️ The Roman Empire',
    body: `The Roman Empire was one of history's largest political entities, existing from 27 BCE to 476 CE (Western) and to 1453 CE (Eastern/Byzantine).\n\n👑 Founded by Augustus Caesar (27 BCE), the first Roman Emperor.\n\n🗺️ At its peak under Emperor Trajan (117 CE), it stretched from Britain to Mesopotamia.\n\nKey Roman contributions:\n⚙️ Engineering: roads, aqueducts, arches, concrete buildings\n⚖️ Law: codified legal principles still used today\n🌐 Language: Latin evolved into French, Spanish, Italian, Portuguese\n\n✝️ Christianity became the official state religion under Emperor Constantine in 313 CE.\n\nThe Western Empire fell in 476 CE when the Germanic chieftain Odoacer deposed the last emperor, Romulus Augustulus.`,
  },
  {
    id: 'ww2', topicId: 'ww2',
    title: '⚔️ World War II',
    body: `World War II (1939–1945) was the deadliest conflict in human history, involving over 30 countries and causing 70–85 million deaths.\n\n🔥 Causes: Rise of Nazism in Germany, fascism in Italy, Japanese militarism; failure of appeasement; invasion of Poland on September 1, 1939.\n\n🤝 Main sides:\n🌍 Allies — Britain, France, USSR, USA, China\n⚔️ Axis Powers — Germany, Italy, Japan\n\nMajor turning points:\n📍 Battle of Stalingrad (1942–43) — crushing defeat for Germany\n📍 D-Day Normandy invasion (June 6, 1944) — Allied liberation of Europe\n📍 Atomic bombs on Hiroshima & Nagasaki (August 1945)\n\n💔 The Holocaust: Nazi Germany's systematic genocide of approximately 6 million Jews.\n\n🏳️ Germany surrendered May 8, 1945 (V-E Day); Japan surrendered September 2, 1945 (V-J Day).`,
  },
  {
    id: 'continents', topicId: 'continents',
    title: '🌍 Earth\'s Continents',
    body: `Earth's land is divided into seven continents — large continuous landmasses separated by oceans.\n\n🌎 North America: 3rd largest, 23 countries including USA, Canada & Mexico.\n\n🌎 South America: 4th largest, dominated by the Amazon rainforest and Andes mountains.\n\n🌍 Europe: 6th largest, 44 countries, birthplace of Western civilization.\n\n🌍 Africa: 2nd largest, 54 countries, home to the Sahara Desert and the Nile River.\n\n🌏 Asia: Largest continent, 48 countries, home to 60% of the world's population.\n\n🌏 Australia/Oceania: Smallest continent, includes thousands of Pacific islands.\n\n❄️ Antarctica: Southernmost continent, covered in ice, no permanent human population.\n\nContinents cover about 30% of Earth's surface; oceans cover the remaining 70%.`,
  },
  {
    id: 'plate-tectonics', topicId: 'plate-tectonics',
    title: '🌋 Plate Tectonics',
    body: `Plate tectonics explains how Earth's outer shell (the lithosphere) is broken into large moving plates.\n\n🪨 Tectonic plates: About 15 major slabs of rock floating on the semi-liquid mantle beneath them.\n\n🌀 Movement: Plates move 1–15 cm/year, driven by convection currents in the mantle.\n\nTypes of plate boundaries:\n\n🔴 Convergent (colliding plates): Forms mountains (Himalayas) or ocean trenches. One plate may subduct under another.\n\n🔵 Divergent (separating plates): Creates rift valleys (East Africa) and mid-ocean ridges.\n\n🟡 Transform (sliding plates): Plates grind past each other horizontally, causing earthquakes. Example: San Andreas Fault, California.\n\n🌋 Effects: Earthquakes, volcanoes, mountain formation, and new seafloor are all created by plate movement.`,
  },
  {
    id: 'climate', topicId: 'climate',
    title: '🌡️ Global Climate Systems',
    body: `Climate is the long-term pattern of weather in a region, shaped by latitude, altitude, ocean currents, and atmospheric circulation.\n\nMajor climate zones:\n\n🌴 Tropical: Near the equator, high temperatures and heavy rainfall year-round (Amazon, Congo).\n\n🏜️ Arid/Desert: Very low rainfall, extreme temperatures (Sahara, Arabian Desert).\n\n🍂 Temperate: Moderate temperatures, four seasons (most of Europe, Eastern USA).\n\n❄️ Polar/Arctic: Extremely cold year-round, very little precipitation (Antarctica, Greenland).\n\n🏔️ Alpine/Highland: Cold temperatures at high altitudes regardless of latitude.\n\nKey drivers:\n🌀 The Coriolis Effect — Earth's rotation deflects winds, creating global circulation patterns.\n🌊 Ocean currents — carry warm/cold water, moderating coastal climates (Gulf Stream warms NW Europe).\n🏭 Greenhouse gases — CO₂ and methane trap heat, driving climate change.`,
  },
];

// ─── Questions (3 per topic) ───────────────────────────────────────────────
export const QUESTIONS = [
  // Science — Photosynthesis (easy)
  { id: 1,  topicId: 'photosynthesis', difficulty: 'easy',   question: 'What is the primary pigment used in photosynthesis?',           options: ['Melanin','Chlorophyll','Carotene','Hemoglobin'],                          answer: 'Chlorophyll' },
  { id: 2,  topicId: 'photosynthesis', difficulty: 'easy',   question: 'What gas do plants release as a by-product of photosynthesis?',  options: ['Carbon dioxide','Nitrogen','Oxygen','Hydrogen'],                          answer: 'Oxygen' },
  { id: 3,  topicId: 'photosynthesis', difficulty: 'easy',   question: 'Where does photosynthesis mainly occur in a plant?',             options: ['Roots','Stem','Flowers','Leaves'],                                        answer: 'Leaves' },
  // Science — Water Cycle (medium)
  { id: 4,  topicId: 'water-cycle',    difficulty: 'medium', question: 'Which process converts liquid water to water vapour?',            options: ['Condensation','Precipitation','Evaporation','Runoff'],                    answer: 'Evaporation' },
  { id: 5,  topicId: 'water-cycle',    difficulty: 'medium', question: 'What term describes water falling from the atmosphere to Earth?', options: ['Evaporation','Transpiration','Condensation','Precipitation'],             answer: 'Precipitation' },
  { id: 6,  topicId: 'water-cycle',    difficulty: 'medium', question: 'Where does condensation primarily form clouds?',                  options: ['Underground','At ground level','High in the atmosphere','In the ocean'], answer: 'High in the atmosphere' },
  // Science — DNA (hard)
  { id: 7,  topicId: 'dna',            difficulty: 'hard',   question: 'Which enzyme reads DNA during transcription?',                    options: ['DNA Polymerase','RNA Polymerase','Helicase','Ligase'],                    answer: 'RNA Polymerase' },
  { id: 8,  topicId: 'dna',            difficulty: 'hard',   question: 'Where does translation (protein synthesis) occur in a cell?',    options: ['Nucleus','Mitochondria','Ribosome','Golgi Apparatus'],                   answer: 'Ribosome' },
  { id: 9,  topicId: 'dna',            difficulty: 'hard',   question: 'Which molecule carries amino acids to the ribosome?',            options: ['mRNA','DNA','tRNA','rRNA'],                                               answer: 'tRNA' },
  // Maths — Fractions (easy)
  { id: 10, topicId: 'fractions',      difficulty: 'easy',   question: 'In the fraction ¾, what is the denominator?',                    options: ['3','4','7','1'],                                                          answer: '4' },
  { id: 11, topicId: 'fractions',      difficulty: 'easy',   question: 'Which type of fraction has a numerator larger than its denominator?', options: ['Proper fraction','Improper fraction','Mixed number','Unit fraction'],  answer: 'Improper fraction' },
  { id: 12, topicId: 'fractions',      difficulty: 'easy',   question: 'What is ¼ + 2/4?',                                               options: ['½','¾','1','3/8'],                                                        answer: '¾' },
  // Maths — Algebra (medium)
  { id: 13, topicId: 'algebra',        difficulty: 'medium', question: 'In algebra, what is a letter representing an unknown value called?', options: ['Constant','Variable','Coefficient','Exponent'],                        answer: 'Variable' },
  { id: 14, topicId: 'algebra',        difficulty: 'medium', question: 'Solve: 3x + 5 = 14. What is x?',                                 options: ['2','3','4','5'],                                                          answer: '3' },
  { id: 15, topicId: 'algebra',        difficulty: 'medium', question: 'What do you call two expressions set equal to each other?',      options: ['Expression','Formula','Equation','Identity'],                             answer: 'Equation' },
  // Maths — Quadratics (hard)
  { id: 16, topicId: 'quadratics',     difficulty: 'hard',   question: 'What is the degree of a quadratic equation?',                    options: ['1','2','3','4'],                                                          answer: '2' },
  { id: 17, topicId: 'quadratics',     difficulty: 'hard',   question: 'What does the discriminant (b²−4ac) > 0 mean?',                  options: ['No real solutions','One solution','Two distinct real solutions','Infinite solutions'], answer: 'Two distinct real solutions' },
  { id: 18, topicId: 'quadratics',     difficulty: 'hard',   question: 'Solve x² − 5x + 6 = 0. What are the solutions?',                options: ['x=1 or x=6','x=2 or x=3','x=−2 or x=−3','x=5 or x=−6'],               answer: 'x=2 or x=3' },
  // History — Egypt (easy)
  { id: 19, topicId: 'egypt',          difficulty: 'easy',   question: 'Which river was vital to ancient Egyptian civilization?',         options: ['The Amazon','The Nile','The Euphrates','The Ganges'],                     answer: 'The Nile' },
  { id: 20, topicId: 'egypt',          difficulty: 'easy',   question: 'What were the rulers of ancient Egypt called?',                  options: ['Emperors','Kings','Pharaohs','Sultans'],                                  answer: 'Pharaohs' },
  { id: 21, topicId: 'egypt',          difficulty: 'easy',   question: 'What writing system did ancient Egyptians use?',                 options: ['Cuneiform','Latin','Hieroglyphics','Arabic'],                             answer: 'Hieroglyphics' },
  // History — Rome (medium)
  { id: 22, topicId: 'rome',           difficulty: 'medium', question: 'Who was the first Roman Emperor?',                               options: ['Julius Caesar','Augustus Caesar','Nero','Constantine'],                   answer: 'Augustus Caesar' },
  { id: 23, topicId: 'rome',           difficulty: 'medium', question: 'In which year did the Western Roman Empire fall?',               options: ['27 BCE','117 CE','313 CE','476 CE'],                                      answer: '476 CE' },
  { id: 24, topicId: 'rome',           difficulty: 'medium', question: 'Which religion became official under Emperor Constantine?',      options: ['Paganism','Judaism','Islam','Christianity'],                              answer: 'Christianity' },
  // History — WW2 (hard)
  { id: 25, topicId: 'ww2',            difficulty: 'hard',   question: 'On which date did Germany invade Poland, starting WWII?',        options: ['June 6, 1944','August 6, 1945','September 1, 1939','November 11, 1918'], answer: 'September 1, 1939' },
  { id: 26, topicId: 'ww2',            difficulty: 'hard',   question: 'What was the Allied invasion of Normandy in 1944 known as?',     options: ['V-E Day','D-Day','Operation Barbarossa','The Blitz'],                    answer: 'D-Day' },
  { id: 27, topicId: 'ww2',            difficulty: 'hard',   question: 'Approximately how many Jews were killed in the Holocaust?',      options: ['1 million','6 million','10 million','20 million'],                       answer: '6 million' },
  // Geography — Continents (easy)
  { id: 28, topicId: 'continents',     difficulty: 'easy',   question: 'Which is the largest continent by area?',                        options: ['Africa','North America','Asia','Antarctica'],                             answer: 'Asia' },
  { id: 29, topicId: 'continents',     difficulty: 'easy',   question: 'What percentage of Earth\'s surface is covered by oceans?',      options: ['30%','50%','70%','90%'],                                                 answer: '70%' },
  { id: 30, topicId: 'continents',     difficulty: 'easy',   question: 'Which continent has no permanent human population?',             options: ['Australia','Greenland','Antarctica','Arctic'],                            answer: 'Antarctica' },
  // Geography — Plate Tectonics (medium)
  { id: 31, topicId: 'plate-tectonics',difficulty: 'medium', question: 'What drives the movement of tectonic plates?',                  options: ["Earth's rotation","Gravity from the Moon","Convection currents in the mantle","Solar wind"], answer: 'Convection currents in the mantle' },
  { id: 32, topicId: 'plate-tectonics',difficulty: 'medium', question: 'What type of plate boundary creates mountains and trenches?',   options: ['Divergent','Convergent','Transform','Passive'],                          answer: 'Convergent' },
  { id: 33, topicId: 'plate-tectonics',difficulty: 'medium', question: 'Which famous fault in California is a transform boundary?',     options: ['Rocky Mountain Fault','New Madrid Fault','San Andreas Fault','Cascadia Subduction Zone'], answer: 'San Andreas Fault' },
  // Geography — Climate (hard)
  { id: 34, topicId: 'climate',        difficulty: 'hard',   question: 'What effect causes winds to be deflected by Earth\'s rotation?', options: ['The Greenhouse Effect','The Coriolis Effect','The El Niño Effect','The Foehn Effect'], answer: 'The Coriolis Effect' },
  { id: 35, topicId: 'climate',        difficulty: 'hard',   question: 'Which ocean current helps warm northwestern Europe?',            options: ['The Humboldt Current','The Gulf Stream','The Kuroshio Current','The Canaries Current'], answer: 'The Gulf Stream' },
  { id: 36, topicId: 'climate',        difficulty: 'hard',   question: 'Which climate zone is found near the equator with high rainfall?',options: ['Arid','Temperate','Tropical','Polar'],                                answer: 'Tropical' },

  // ── ADAPTIVE TIER: additional easy/medium/hard per topic ─────────────────

  // Photosynthesis — medium (37-39)
  { id: 37, topicId: 'photosynthesis', difficulty: 'medium', question: 'In which organelle does photosynthesis occur?',                  options: ['Mitochondria','Chloroplast','Nucleus','Ribosome'],                        answer: 'Chloroplast' },
  { id: 38, topicId: 'photosynthesis', difficulty: 'medium', question: 'What colour of light is LEAST effective for photosynthesis?',    options: ['Red','Blue','Green','Violet'],                                             answer: 'Green' },
  { id: 39, topicId: 'photosynthesis', difficulty: 'medium', question: 'What do plants use glucose for after photosynthesis?',           options: ['Eliminating waste','Energy and building structures','Cooling','Absorbing water'], answer: 'Energy and building structures' },
  // Photosynthesis — hard (40-42)
  { id: 40, topicId: 'photosynthesis', difficulty: 'hard',   question: 'What are the two main stages of photosynthesis?',               options: ['Glycolysis and Krebs cycle','Light-dependent reactions and the Calvin cycle','Transcription and translation','Oxidation and reduction'], answer: 'Light-dependent reactions and the Calvin cycle' },
  { id: 41, topicId: 'photosynthesis', difficulty: 'hard',   question: 'Where do the light-dependent reactions occur in the chloroplast?',options: ['Stroma','Thylakoid membrane','Cell wall','Cytoplasm'],                  answer: 'Thylakoid membrane' },
  { id: 42, topicId: 'photosynthesis', difficulty: 'hard',   question: 'Which molecule is produced as an immediate energy carrier in the light reactions?', options: ['Glucose','DNA','ATP','Protein'],                            answer: 'ATP' },

  // Water Cycle — easy (43-45)
  { id: 43, topicId: 'water-cycle',    difficulty: 'easy',   question: 'What energy source drives the water cycle?',                    options: ['The Moon','The Sun','Wind','Gravity alone'],                              answer: 'The Sun' },
  { id: 44, topicId: 'water-cycle',    difficulty: 'easy',   question: 'Which stage of the water cycle forms clouds?',                  options: ['Evaporation','Condensation','Precipitation','Collection'],                answer: 'Condensation' },
  { id: 45, topicId: 'water-cycle',    difficulty: 'easy',   question: 'What do we call water falling from clouds as rain or snow?',    options: ['Evaporation','Condensation','Precipitation','Transpiration'],              answer: 'Precipitation' },
  // Water Cycle — hard (46-48)
  { id: 46, topicId: 'water-cycle',    difficulty: 'hard',   question: 'What is the term for water vapour released by plant leaves?',   options: ['Evaporation','Condensation','Transpiration','Infiltration'],              answer: 'Transpiration' },
  { id: 47, topicId: 'water-cycle',    difficulty: 'hard',   question: 'What happens to latent heat when water vapour condenses?',      options: ['It is absorbed','It is released into the atmosphere','It is destroyed','It is stored'], answer: 'It is released into the atmosphere' },
  { id: 48, topicId: 'water-cycle',    difficulty: 'hard',   question: 'What drives water to seep underground and become groundwater?',  options: ['Wind','Solar energy','Gravity and pressure','Capillary action only'],    answer: 'Gravity and pressure' },

  // DNA — easy (49-51)
  { id: 49, topicId: 'dna',            difficulty: 'easy',   question: 'What does DNA stand for?',                                      options: ['Deoxyribonucleic acid','Diphosphate nitrogen acid','Dual nucleotide array','Direct nucleic amino'], answer: 'Deoxyribonucleic acid' },
  { id: 50, topicId: 'dna',            difficulty: 'easy',   question: 'Where in a cell is most DNA found?',                            options: ['Cytoplasm','Cell membrane','Nucleus','Ribosome'],                         answer: 'Nucleus' },
  { id: 51, topicId: 'dna',            difficulty: 'easy',   question: 'What are the building blocks of DNA called?',                   options: ['Amino acids','Proteins','Nucleotides','Sugars'],                          answer: 'Nucleotides' },
  // DNA — medium (52-54)
  { id: 52, topicId: 'dna',            difficulty: 'medium', question: 'Which four bases are found in DNA?',                            options: ['A, U, G, C','A, T, G, C','A, B, G, D','P, Q, R, S'],                    answer: 'A, T, G, C' },
  { id: 53, topicId: 'dna',            difficulty: 'medium', question: 'What is the process of copying DNA called?',                    options: ['Transcription','Replication','Translation','Mutation'],                   answer: 'Replication' },
  { id: 54, topicId: 'dna',            difficulty: 'medium', question: 'In the DNA double helix, Adenine pairs with which base?',       options: ['Cytosine','Guanine','Thymine','Uracil'],                                  answer: 'Thymine' },

  // Fractions — medium (55-57)
  { id: 55, topicId: 'fractions',      difficulty: 'medium', question: 'What is ½ + ⅓?',                                               options: ['2/5','2/6','5/6','1/6'],                                                  answer: '5/6' },
  { id: 56, topicId: 'fractions',      difficulty: 'medium', question: 'What is ¾ × ⅖?',                                               options: ['5/12','3/10','6/20','1/2'],                                               answer: '3/10' },
  { id: 57, topicId: 'fractions',      difficulty: 'medium', question: 'To divide ¾ ÷ ½, you multiply ¾ by what?',                     options: ['½','2 (reciprocal of ½)','¾','¼'],                                      answer: '2 (reciprocal of ½)' },
  // Fractions — hard (58-60)
  { id: 58, topicId: 'fractions',      difficulty: 'hard',   question: 'Convert ⅞ to a decimal.',                                       options: ['0.78','0.875','0.758','0.987'],                                            answer: '0.875' },
  { id: 59, topicId: 'fractions',      difficulty: 'hard',   question: 'Simplify 18/24 to its lowest terms.',                           options: ['⅔','¾','9/12','3/5'],                                                    answer: '¾' },
  { id: 60, topicId: 'fractions',      difficulty: 'hard',   question: 'What is 2⅓ + 1¾?',                                             options: ['3 1/12','4 1/12','4 7/12','3 7/12'],                                     answer: '4 1/12' },

  // Algebra — easy (61-63)
  { id: 61, topicId: 'algebra',        difficulty: 'easy',   question: 'If x = 4, what is 3x − 2?',                                    options: ['10','12','14','6'],                                                       answer: '10' },
  { id: 62, topicId: 'algebra',        difficulty: 'easy',   question: 'Solve: x − 5 = 9. What is x?',                                 options: ['4','14','45','5'],                                                        answer: '14' },
  { id: 63, topicId: 'algebra',        difficulty: 'easy',   question: 'In the expression 4x, what is "x" called?',                    options: ['Constant','Variable','Exponent','Coefficient'],                           answer: 'Variable' },
  // Algebra — hard (64-66)
  { id: 64, topicId: 'algebra',        difficulty: 'hard',   question: 'Expand and simplify (x + 4)(x − 1).',                          options: ['x²−3x−4','x²+3x−4','x²+3x+4','x²−3x+4'],                              answer: 'x²+3x−4' },
  { id: 65, topicId: 'algebra',        difficulty: 'hard',   question: 'Solve simultaneously: x+y=8, x−y=2. What is y?',               options: ['2','3','5','6'],                                                          answer: '3' },
  { id: 66, topicId: 'algebra',        difficulty: 'hard',   question: 'What is the gradient of the line y = −2x + 5?',                options: ['−2','5','2','−5'],                                                        answer: '−2' },

  // Quadratics — easy (67-69)
  { id: 67, topicId: 'quadratics',     difficulty: 'easy',   question: 'Which of the following is a quadratic equation?',              options: ['2x + 3 = 0','x³ + 2 = 0','x² − 4 = 0','√x = 3'],                      answer: 'x² − 4 = 0' },
  { id: 68, topicId: 'quadratics',     difficulty: 'easy',   question: 'In ax² + bx + c = 0, what must "a" NOT equal?',               options: ['1','0','−1','2'],                                                         answer: '0' },
  { id: 69, topicId: 'quadratics',     difficulty: 'easy',   question: 'What shape is the graph of a quadratic equation called?',      options: ['Line','Circle','Parabola','Hyperbola'],                                   answer: 'Parabola' },
  // Quadratics — medium (70-72)
  { id: 70, topicId: 'quadratics',     difficulty: 'medium', question: 'If b²−4ac = 0, how many solutions does the quadratic have?',   options: ['None','Exactly one','Two','Three'],                                        answer: 'Exactly one' },
  { id: 71, topicId: 'quadratics',     difficulty: 'medium', question: 'Factorise x² + 7x + 12.',                                      options: ['(x+2)(x+6)','(x+3)(x+4)','(x+1)(x+12)','(x−3)(x−4)'],                answer: '(x+3)(x+4)' },
  { id: 72, topicId: 'quadratics',     difficulty: 'medium', question: 'What is the vertex of the parabola y = x² + 2x + 1?',          options: ['(0,1)','(−1,0)','(1,0)','(0,−1)'],                                      answer: '(−1,0)' },

  // Egypt — medium (73-75)
  { id: 73, topicId: 'egypt',          difficulty: 'medium', question: 'What was the primary purpose of Egyptian pyramids?',            options: ['Temples for worship','Storage for grain','Tombs for pharaohs','Astronomical observatories'], answer: 'Tombs for pharaohs' },
  { id: 74, topicId: 'egypt',          difficulty: 'medium', question: 'Which artefact was key to decoding hieroglyphics?',             options: ['The Book of the Dead','The Rosetta Stone','The Papyrus of Ani','The Narmer Palette'], answer: 'The Rosetta Stone' },
  { id: 75, topicId: 'egypt',          difficulty: 'medium', question: 'Who was the Egyptian god of the afterlife?',                    options: ['Ra','Anubis','Osiris','Horus'],                                            answer: 'Osiris' },
  // Egypt — hard (76-78)
  { id: 76, topicId: 'egypt',          difficulty: 'hard',   question: 'Which pharaoh built the Great Pyramid at Giza?',               options: ['Tutankhamun','Ramesses II','Khufu','Cleopatra'],                          answer: 'Khufu' },
  { id: 77, topicId: 'egypt',          difficulty: 'hard',   question: 'Who deciphered Egyptian hieroglyphics using the Rosetta Stone?',options: ['Howard Carter','Napoleon Bonaparte','Jean-François Champollion','Julius Caesar'], answer: 'Jean-François Champollion' },
  { id: 78, topicId: 'egypt',          difficulty: 'hard',   question: 'Egypt became a Roman province after the defeat of whom?',      options: ['Ramesses II','Tutankhamun','Akhenaten','Cleopatra VII and Mark Antony'], answer: 'Cleopatra VII and Mark Antony' },

  // Rome — easy (79-81)
  { id: 79, topicId: 'rome',           difficulty: 'easy',   question: 'What was the capital city of the Roman Empire?',               options: ['Athens','Carthage','Rome','Alexandria'],                                  answer: 'Rome' },
  { id: 80, topicId: 'rome',           difficulty: 'easy',   question: 'What language did ancient Romans speak?',                      options: ['Greek','Italian','French','Latin'],                                        answer: 'Latin' },
  { id: 81, topicId: 'rome',           difficulty: 'easy',   question: 'Which Roman structure was used for gladiatorial combat?',      options: ['The Pantheon','The Forum','The Colosseum','Circus Maximus'],              answer: 'The Colosseum' },
  // Rome — hard (82-84)
  { id: 82, topicId: 'rome',           difficulty: 'hard',   question: 'What Roman construction material is still used in building today?', options: ['Steel','Brick','Concrete (opus caementicium)','Glass'],              answer: 'Concrete (opus caementicium)' },
  { id: 83, topicId: 'rome',           difficulty: 'hard',   question: 'Which emperor divided the Roman Empire into Eastern and Western halves?', options: ['Constantine','Augustus','Nero','Diocletian'],                     answer: 'Diocletian' },
  { id: 84, topicId: 'rome',           difficulty: 'hard',   question: 'What was the Pax Romana?',                                     options: ['A type of Roman law','A military formation','A period of ~200 years of relative peace','A religious festival'], answer: 'A period of ~200 years of relative peace' },

  // WW2 — easy (85-87)
  { id: 85, topicId: 'ww2',            difficulty: 'easy',   question: 'Which country did Germany invade on September 1, 1939?',       options: ['France','Russia','Poland','Britain'],                                     answer: 'Poland' },
  { id: 86, topicId: 'ww2',            difficulty: 'easy',   question: 'Who led Nazi Germany during World War II?',                    options: ['Stalin','Churchill','Mussolini','Adolf Hitler'],                          answer: 'Adolf Hitler' },
  { id: 87, topicId: 'ww2',            difficulty: 'easy',   question: 'In which year did World War II end?',                          options: ['1918','1939','1944','1945'],                                              answer: '1945' },
  // WW2 — medium (88-90)
  { id: 88, topicId: 'ww2',            difficulty: 'medium', question: 'What was the codename for Germany\'s 1941 invasion of the USSR?', options: ['Operation Overlord','Operation Barbarossa','Operation Market Garden','Operation Sea Lion'], answer: 'Operation Barbarossa' },
  { id: 89, topicId: 'ww2',            difficulty: 'medium', question: 'Which two Japanese cities were hit by atomic bombs in 1945?',  options: ['Tokyo and Osaka','Kyoto and Hiroshima','Hiroshima and Nagasaki','Nagasaki and Tokyo'], answer: 'Hiroshima and Nagasaki' },
  { id: 90, topicId: 'ww2',            difficulty: 'medium', question: 'What was the name of the Allied beach landings in Normandy?',  options: ['Battle of the Bulge','D-Day (Operation Overlord)','Battle of Midway','Operation Barbarossa'], answer: 'D-Day (Operation Overlord)' },

  // Continents — medium (91-93)
  { id: 91, topicId: 'continents',     difficulty: 'medium', question: 'Which continent contains the most countries?',                 options: ['Asia','Europe','Africa','North America'],                                 answer: 'Africa' },
  { id: 92, topicId: 'continents',     difficulty: 'medium', question: 'What is the world\'s largest ocean?',                         options: ['Atlantic','Indian','Pacific','Arctic'],                                    answer: 'Pacific' },
  { id: 93, topicId: 'continents',     difficulty: 'medium', question: 'On which continent is the Amazon rainforest located?',        options: ['Africa','Asia','Australia','South America'],                              answer: 'South America' },
  // Continents — hard (94-96)
  { id: 94, topicId: 'continents',     difficulty: 'hard',   question: 'What is the name of the ancient supercontinent that included all of today\'s continents?', options: ['Gondwana','Laurasia','Pangaea','Rodinia'], answer: 'Pangaea' },
  { id: 95, topicId: 'continents',     difficulty: 'hard',   question: 'Which of the following is NOT one of the seven continents?',  options: ['Antarctica','Australia','Greenland','Africa'],                            answer: 'Greenland' },
  { id: 96, topicId: 'continents',     difficulty: 'hard',   question: 'What theory explains how the continents were once joined?',   options: ['Island arc theory','Continental drift','Subduction theory','Isostasy'],  answer: 'Continental drift' },

  // Plate Tectonics — easy (97-99)
  { id: 97, topicId: 'plate-tectonics',difficulty: 'easy',   question: 'What are the large sections of Earth\'s crust called?',       options: ['Continents','Tectonic plates','Ocean floors','Magma chambers'],           answer: 'Tectonic plates' },
  { id: 98, topicId: 'plate-tectonics',difficulty: 'easy',   question: 'Do tectonic plates move?',                                    options: ['No, they are fixed','Yes, but very slowly','Only during earthquakes','Only underwater'], answer: 'Yes, but very slowly' },
  { id: 99, topicId: 'plate-tectonics',difficulty: 'easy',   question: 'Which natural disaster is most directly caused by plate movement?', options: ['Hurricane','Tornado','Earthquake','Drought'],                       answer: 'Earthquake' },
  // Plate Tectonics — hard (100-102)
  { id: 100,topicId: 'plate-tectonics',difficulty: 'hard',   question: 'What was the name of the supercontinent ~300 million years ago?', options: ['Gondwana','Laurasia','Pangaea','Rodinia'],                            answer: 'Pangaea' },
  { id: 101,topicId: 'plate-tectonics',difficulty: 'hard',   question: 'At a subduction zone, which type of crust typically sinks?',  options: ['Continental crust','Oceanic crust','Both equally','Neither sinks'],       answer: 'Oceanic crust' },
  { id: 102,topicId: 'plate-tectonics',difficulty: 'hard',   question: 'What type of seismic wave can travel through both solid and liquid?', options: ['S-waves','P-waves (Primary waves)','Love waves','Surface waves'],  answer: 'P-waves (Primary waves)' },

  // Climate — easy (103-105)
  { id: 103,topicId: 'climate',        difficulty: 'easy',   question: 'What is the difference between weather and climate?',         options: ['They are the same','Weather is short-term, climate is long-term','Weather is long-term, climate is short-term','Climate only applies to cold regions'], answer: 'Weather is short-term, climate is long-term' },
  { id: 104,topicId: 'climate',        difficulty: 'easy',   question: 'Which gas makes up most of Earth\'s atmosphere?',             options: ['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'],                          answer: 'Nitrogen' },
  { id: 105,topicId: 'climate',        difficulty: 'easy',   question: 'Which climate zone has high temperatures and heavy rainfall near the equator?', options: ['Polar','Temperate','Arid','Tropical'],                       answer: 'Tropical' },
  // Climate — medium (106-108)
  { id: 106,topicId: 'climate',        difficulty: 'medium', question: 'What is El Niño?',                                            options: ['A cold polar vortex','A warming of Pacific Ocean surface temperatures','A type of monsoon','A hurricane season'], answer: 'A warming of Pacific Ocean surface temperatures' },
  { id: 107,topicId: 'climate',        difficulty: 'medium', question: 'Which human-produced gas is the biggest driver of the greenhouse effect?', options: ['Oxygen (O₂)','Nitrogen (N₂)','Carbon dioxide (CO₂)','Argon (Ar)'], answer: 'Carbon dioxide (CO₂)' },
  { id: 108,topicId: 'climate',        difficulty: 'medium', question: 'What does the "albedo" of a surface measure?',                options: ['How hot it gets','How much solar radiation it reflects','How much rain falls','Its humidity'], answer: 'How much solar radiation it reflects' },
];
