/* =====================================================================
   UN SECRET — COMPLETE GAME ENGINE
   ===================================================================== */

// ─── DATA ────────────────────────────────────────────────────────────
const WORDS_DB = {
  easy: [
    { word: "AMOUR",      clue: "Le plus grand des sentiments",       category: "Émotion" },
    { word: "COEUR",      clue: "Il bat quand tu penses à lui",       category: "Symbole" },
    { word: "BAISER",     clue: "Un doux contact des lèvres",         category: "Geste" },
    { word: "ROSE",       clue: "La fleur de l'amour par excellence", category: "Nature" },
    { word: "TENDRE",     clue: "Doux et délicat comme une caresse",  category: "Qualité" },
    { word: "DOUCEUR",    clue: "Ce que procure une étreinte aimante",category: "Sentiment" },
    { word: "CHARME",     clue: "Ce qui envoûte et séduit",           category: "Magie" },
    { word: "REVE",       clue: "Ce que l'amour fait naître la nuit", category: "Nuit" },
    { word: "NUAGE",      clue: "On marche dessus quand on est amoureux", category: "Nature" },
    { word: "LUMIERE",    clue: "Elle guide les amants dans la nuit", category: "Poésie" },
  ],
  medium: [
    { word: "PASSION",    clue: "Un feu qui consume et illumine",     category: "Émotion" },
    { word: "SERMENT",    clue: "Une promesse solennelle d'amour",    category: "Engagement" },
    { word: "DESIR",      clue: "L'envie ardente de l'autre",         category: "Sentiment" },
    { word: "ETERNITE",   clue: "Ce que les amants promettent toujours", category: "Temps" },
    { word: "COMPLICE",   clue: "Celui qui partage vos petits secrets", category: "Relation" },
    { word: "MYSTERE",    clue: "Ce qu'il garde au fond de ses yeux", category: "Secret" },
    { word: "FRISSON",    clue: "Ce qu'un regard amoureux provoque",  category: "Sensation" },
    { word: "PROMESSE",   clue: "Ce que l'on donne avant le serment", category: "Amour" },
    { word: "VELOURS",    clue: "Aussi doux que sa peau sous tes doigts", category: "Texture" },
    { word: "SOUPIR",     clue: "Le souffle de l'amour en un mot",    category: "Poésie" },
  ],
  hard: [
    { word: "EPHEMERE",   clue: "Aussi fugace qu'un premier amour",  category: "Philosophie" },
    { word: "ALCHIMIE",   clue: "La magie inexplicable entre deux âmes", category: "Magie" },
    { word: "SERENITE",   clue: "La paix que l'amour vrai apporte",  category: "Emotion" },
    { word: "RESONANCE",  clue: "Quand deux cœurs vibrent à l'unisson", category: "Physique" },
    { word: "QUINTESSENCE", clue: "L'essence pure et absolue d'un sentiment", category: "Philosophie" },
    { word: "VULNERABILITE", clue: "S'ouvrir à l'autre malgré la peur", category: "Psychologie" },
    { word: "MELANCHOLIE", clue: "La douce tristesse des amours perdus", category: "Émotion" },
    { word: "BIENVEILLANCE", clue: "Vouloir le meilleur pour l'être aimé", category: "Vertu" },
    { word: "COMPLICITE",  clue: "Ce lien invisible entre deux âmes sœurs", category: "Lien" },
    { word: "ESPERANCE",   clue: "Ce qui permet d'aimer encore après la peine", category: "Sentiment" },
  ]
};

const KEYBOARD_ROWS = [
  ['A','Z','E','R','T','Y','U','I','O','P'],
  ['Q','S','D','F','G','H','J','K','L','M'],
  ['W','X','C','V','B','N']
];

const DIFFICULTY_SETTINGS = {
  easy:   { lives: 6, timePerWord: 60, pointsBase: 100, hintPenalty: 10  },
  medium: { lives: 5, timePerWord: 45, pointsBase: 150, hintPenalty: 25  },
  hard:   { lives: 4, timePerWord: 30, pointsBase: 200, hintPenalty: 50  },
};

const LEVEL_MESSAGES = [
  "Le secret s'épaissit…",
  "Votre cœur s'enflamme…",
  "Les mots vous révèlent…",
  "L'amour parle pour vous…",
  "Le mystère se dissout…",
  "Vous êtes brillant(e)… 💫",
];

// ─── STATE ───────────────────────────────────────────────────────────
const state = {
  screen: 'menu',
  difficulty: 'easy',
  score: 0,
  level: 1,
  lives: 6,
  maxLives: 6,
  combo: 0,
  maxCombo: 0,
  totalTime: 0,
  wordQueue: [],
  currentWord: null,
  guessed: new Set(),
  wrongGuesses: 0,
  timerMax: 60,
  timerLeft: 60,
  timerInterval: null,
  paused: false,
  muted: false,
  particles: true,
  autoHints: false,
  hintsUsed: 0,
  wordsThisLevel: 0,
  wordsPerLevel: 3,
  gameOver: false,
};

// ─── DOM REFERENCES ──────────────────────────────────────────────────
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const screens = {
  menu:   $('screen-menu'),
  game:   $('screen-game'),
};
const overlays = {
  pause:    $('overlay-pause'),
  levelup:  $('overlay-levelup'),
  gameover: $('overlay-gameover'),
  win:      $('overlay-win'),
};

// ─── AUDIO ───────────────────────────────────────────────────────────
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

function playTone(freq, type='sine', duration=0.15, vol=0.15, delay=0) {
  if (state.muted) return;
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + delay);
    gain.gain.setValueAtTime(vol, c.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration + 0.05);
  } catch(e) {}
}

const SFX = {
  correct: () => { playTone(523, 'sine', 0.1, 0.2); playTone(659, 'sine', 0.1, 0.15, 0.08); },
  wrong:   () => { playTone(200, 'sawtooth', 0.2, 0.15); },
  win:     () => {
    [523,659,784,1047].forEach((f,i) => playTone(f,'sine',0.2,0.18,i*0.1));
  },
  levelup: () => {
    [392,494,587,784].forEach((f,i) => playTone(f,'triangle',0.15,0.2,i*0.12));
  },
  gameover:() => {
    [300,250,180].forEach((f,i) => playTone(f,'sawtooth',0.3,0.12,i*0.18));
  },
  click:   () => playTone(800,'sine',0.05,0.1),
  hint:    () => { playTone(440,'triangle',0.12,0.15); playTone(550,'triangle',0.08,0.1,0.1); },
  combo:   () => {
    [660,880,1100].forEach((f,i) => playTone(f,'sine',0.12,0.18,i*0.07));
  },
};

// ─── CANVAS BACKGROUND ───────────────────────────────────────────────
const bgCanvas = $('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let particles = [];

function initBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  particles = [];
  const count = Math.min(60, Math.floor(window.innerWidth / 15));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      color: ['#ff4f8b','#c084fc','#f5c842','#ff2060'][Math.floor(Math.random()*4)],
      type: Math.random() > 0.7 ? 'heart' : 'dot',
    });
  }
}

function drawHeart(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.beginPath();
  ctx.moveTo(0, -0.5);
  ctx.bezierCurveTo(0.5, -1, 1, -0.3, 0, 0.6);
  ctx.bezierCurveTo(-1, -0.3, -0.5, -1, 0, -0.5);
  ctx.fill();
  ctx.restore();
}

function animateBg() {
  const w = bgCanvas.width, h = bgCanvas.height;
  bgCtx.clearRect(0, 0, w, h);

  // Background gradient
  const grad = bgCtx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w,h)*0.7);
  grad.addColorStop(0, '#1a0a1e');
  grad.addColorStop(1, '#0d0510');
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, w, h);

  if (!state.particles) { requestAnimationFrame(animateBg); return; }

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -20) { p.y = h + 10; p.x = Math.random() * w; }
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;

    bgCtx.globalAlpha = p.alpha * (0.5 + 0.5 * Math.sin(Date.now() * 0.001 + p.x));
    bgCtx.fillStyle = p.color;

    if (p.type === 'heart') {
      drawHeart(bgCtx, p.x, p.y, p.r * 2);
    } else {
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      bgCtx.fill();
    }
  });

  bgCtx.globalAlpha = 1;
  requestAnimationFrame(animateBg);
}

window.addEventListener('resize', () => { initBgCanvas(); });

// ─── CONFETTI ─────────────────────────────────────────────────────────
const confCanvas = $('confetti-canvas');
const confCtx = confCanvas.getContext('2d');
let confettiPieces = [];
let confettiActive = false;

function launchConfetti() {
  confCanvas.width = window.innerWidth;
  confCanvas.height = window.innerHeight;
  confettiPieces = [];
  const count = Math.min(120, window.innerWidth / 6);
  const colors = ['#ff4f8b','#f5c842','#c084fc','#ff2060','#ffffff','#ffb3d0'];
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * confCanvas.width,
      y: -20,
      r: Math.random() * 6 + 3,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      alpha: 1,
    });
  }
  confettiActive = true;
  animateConfetti();
}

function animateConfetti() {
  if (!confettiActive) { confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height); return; }
  confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  let alive = false;
  confettiPieces.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12;
    p.rot += p.rotV;
    if (p.y > confCanvas.height + 20) { p.alpha -= 0.05; }
    if (p.alpha > 0) alive = true;

    confCtx.save();
    confCtx.globalAlpha = Math.max(0, p.alpha);
    confCtx.translate(p.x, p.y);
    confCtx.rotate(p.rot * Math.PI / 180);
    confCtx.fillStyle = p.color;
    if (p.shape === 'rect') {
      confCtx.fillRect(-p.r, -p.r/2, p.r*2, p.r);
    } else {
      confCtx.beginPath();
      confCtx.arc(0, 0, p.r/2, 0, Math.PI*2);
      confCtx.fill();
    }
    confCtx.restore();
  });

  if (alive) requestAnimationFrame(animateConfetti);
  else { confettiActive = false; confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height); }
}

// ─── SCREEN MANAGEMENT ───────────────────────────────────────────────
function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => {
    el.classList.toggle('hidden', k !== name);
  });
  state.screen = name;
}

function showOverlay(name) {
  Object.entries(overlays).forEach(([k, el]) => {
    el.classList.toggle('hidden', k !== name);
  });
}

function hideOverlays() {
  Object.values(overlays).forEach(el => el.classList.add('hidden'));
}

// ─── KEYBOARD RENDER ────────────────────────────────────────────────
function renderKeyboard() {
  const kb = $('keyboard');
  kb.innerHTML = '';
  KEYBOARD_ROWS.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row';
    row.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.textContent = letter;
      btn.dataset.letter = letter;
      if (state.guessed.has(letter)) {
        const isCorrect = state.currentWord && state.currentWord.word.includes(letter);
        btn.classList.add('used', isCorrect ? 'correct' : 'wrong');
      }
      btn.addEventListener('click', () => handleGuess(letter));
      rowEl.appendChild(btn);
    });
    kb.appendChild(rowEl);
  });
}

// ─── WORD DISPLAY ────────────────────────────────────────────────────
function renderWord() {
  const wd = $('word-display');
  wd.innerHTML = '';
  if (!state.currentWord) return;

  const wordStr = state.currentWord.word;
  // Support multi-word (spaces)
  const parts = wordStr.split(' ');
  parts.forEach((part, pi) => {
    part.split('').forEach(letter => {
      const box = document.createElement('div');
      box.className = 'letter-box';
      if (state.guessed.has(letter)) {
        box.textContent = letter;
        box.classList.add('revealed');
      }
      wd.appendChild(box);
    });
    if (pi < parts.length - 1) {
      const sp = document.createElement('div');
      sp.className = 'word-space';
      wd.appendChild(sp);
    }
  });
}

// ─── LIVES ───────────────────────────────────────────────────────────
function renderLives() {
  const lw = $('lives-display');
  lw.innerHTML = '';
  for (let i = 0; i < state.maxLives; i++) {
    const span = document.createElement('span');
    span.className = 'life-icon' + (i >= state.lives ? ' lost' : '');
    span.textContent = i < state.lives ? '❤️' : '🖤';
    lw.appendChild(span);
  }
}

// ─── TIMER ───────────────────────────────────────────────────────────
function startTimer() {
  clearInterval(state.timerInterval);
  const fill = $('timer-fill');
  state.timerInterval = setInterval(() => {
    if (state.paused || state.gameOver) return;
    state.timerLeft -= 0.1;
    state.totalTime += 0.1;
    const pct = Math.max(0, state.timerLeft / state.timerMax * 100);
    fill.style.width = pct + '%';
    fill.classList.toggle('danger', pct < 25);

    if (state.timerLeft <= 0) {
      clearInterval(state.timerInterval);
      onTimerExpired();
    }
  }, 100);
}

function onTimerExpired() {
  state.lives--;
  state.combo = 0;
  renderLives();
  SFX.wrong();
  if (state.lives <= 0) {
    triggerGameOver();
  } else {
    showToast('⏰ Temps écoulé !', 'Le mot était : ' + state.currentWord.word);
    setTimeout(loadNextWord, 1500);
  }
}

// ─── SCORE POPUP ─────────────────────────────────────────────────────
function showScorePopup(points, color='#f5c842') {
  const el = document.createElement('div');
  el.className = 'score-popup';
  el.style.color = color;
  el.style.left = (30 + Math.random() * 40) + '%';
  el.style.top = (30 + Math.random() * 20) + '%';
  el.textContent = '+' + points;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function showCelebrationRing() {
  const ring = document.createElement('div');
  ring.className = 'celebration-ring';
  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 800);
}

// ─── COMBO DISPLAY ───────────────────────────────────────────────────
function showComboText(combo) {
  const cd = $('combo-display');
  const msgs = ['', '', '×2 Combo!', '×3 Incroyable!', '×4 Magnifique!', '×5 SUBLIME!'];
  const msg = msgs[Math.min(combo, msgs.length-1)] || `×${combo} FANTASTIQUE!`;
  if (!msg) return;
  const el = document.createElement('div');
  el.className = 'combo-text';
  el.textContent = msg;
  cd.innerHTML = '';
  cd.appendChild(el);
  if (combo >= 3) SFX.combo();
}

// ─── GUESS HANDLING ──────────────────────────────────────────────────
function handleGuess(letter) {
  if (state.guessed.has(letter) || state.paused || state.gameOver) return;
  SFX.click();
  state.guessed.add(letter);

  const word = state.currentWord.word;
  const isCorrect = word.includes(letter);

  // Visual feedback on key
  const key = document.querySelector(`.key[data-letter="${letter}"]`);
  if (key) {
    key.classList.add('used', isCorrect ? 'correct' : 'wrong');
    key.classList.remove('key');
  }

  if (isCorrect) {
    SFX.correct();
    state.combo++;
    if (state.combo > state.maxCombo) state.maxCombo = state.combo;
    if (state.combo >= 2) showComboText(state.combo);

    // Reveal letters
    renderWord();
    showCelebrationRing();

    // Check win
    const allRevealed = word.split('').every(l => l === ' ' || state.guessed.has(l));
    if (allRevealed) {
      onWordComplete();
    }
  } else {
    SFX.wrong();
    state.combo = 0;
    state.wrongGuesses++;
    state.lives--;
    renderLives();

    // Flash wrong key
    const boxes = document.querySelectorAll('.letter-box');
    boxes.forEach(b => { b.classList.add('wrong'); setTimeout(()=>b.classList.remove('wrong'), 400); });

    if (state.lives <= 0) {
      clearInterval(state.timerInterval);
      triggerGameOver();
    }
  }
}

function onWordComplete() {
  clearInterval(state.timerInterval);
  const settings = DIFFICULTY_SETTINGS[state.difficulty];

  // Score calculation
  const timeBonus  = Math.floor(state.timerLeft * 2);
  const comboBonus = Math.floor(settings.pointsBase * (state.combo * 0.1));
  const points     = settings.pointsBase + timeBonus + comboBonus;

  state.score += points;
  $('hud-score').textContent = state.score;
  $('hud-score').classList.add('flash');
  setTimeout(() => $('hud-score').classList.remove('flash'), 500);

  showScorePopup(points);
  SFX.win();
  launchConfetti();

  state.wordsThisLevel++;
  const progressPct = (state.wordsThisLevel / state.wordsPerLevel) * 100;
  $('level-progress-fill').style.width = Math.min(progressPct, 100) + '%';

  if (state.wordsThisLevel >= state.wordsPerLevel) {
    // Level complete
    if (state.wordQueue.length === 0) {
      setTimeout(triggerWin, 800);
    } else {
      setTimeout(triggerLevelUp, 800);
    }
  } else {
    setTimeout(loadNextWord, 800);
  }
}

// ─── WORD LOADING ────────────────────────────────────────────────────
function buildWordQueue() {
  const pool = [...WORDS_DB[state.difficulty]];
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

function loadNextWord() {
  if (state.wordQueue.length === 0) {
    triggerWin();
    return;
  }
  state.currentWord = state.wordQueue.shift();
  state.guessed = new Set();
  state.wrongGuesses = 0;
  state.hintsUsed = 0;

  const settings = DIFFICULTY_SETTINGS[state.difficulty];
  state.timerMax = settings.timePerWord;
  state.timerLeft = settings.timePerWord;

  $('clue-category').textContent = state.currentWord.category;
  $('clue-text').textContent = state.currentWord.clue;
  $('hint-btn').disabled = false;
  $('hint-btn').textContent = '💡 Indice';

  renderWord();
  renderKeyboard();
  startTimer();
}

// ─── HINT ────────────────────────────────────────────────────────────
function useHint() {
  if (!state.currentWord) return;
  SFX.hint();
  const word = state.currentWord.word;
  const unrevealed = word.split('').filter(l => l !== ' ' && !state.guessed.has(l));
  if (unrevealed.length === 0) return;

  const letter = unrevealed[Math.floor(Math.random() * unrevealed.length)];
  state.guessed.add(letter);
  state.hintsUsed++;

  const penalty = DIFFICULTY_SETTINGS[state.difficulty].hintPenalty;
  state.score = Math.max(0, state.score - penalty);
  $('hud-score').textContent = state.score;

  renderWord();
  renderKeyboard();

  $('hint-btn').textContent = `💡 -${penalty}pts`;
  $('hint-btn').disabled = true;
  setTimeout(() => { $('hint-btn').disabled = false; $('hint-btn').textContent = '💡 Indice'; }, 3000);

  const allRevealed = word.split('').every(l => l === ' ' || state.guessed.has(l));
  if (allRevealed) onWordComplete();
}

// ─── LEVEL TRANSITIONS ───────────────────────────────────────────────
function triggerLevelUp() {
  SFX.levelup();
  state.level++;
  state.wordsThisLevel = 0;
  $('hud-level').textContent = state.level;
  $('level-progress-fill').style.width = '0%';

  $('levelup-title').textContent = `Niveau ${state.level} !`;
  $('levelup-text').textContent = LEVEL_MESSAGES[(state.level-2) % LEVEL_MESSAGES.length];
  $('levelup-score').textContent = state.score;
  $('levelup-combo').textContent = state.maxCombo + 'x';
  $('levelup-emoji').textContent = ['🎉','💫','🌹','✨','💖','🦋'][(state.level-2)%6];

  showOverlay('levelup');
  state.paused = true;
}

function triggerGameOver() {
  state.gameOver = true;
  clearInterval(state.timerInterval);
  SFX.gameover();

  const best = getBestScore();
  if (state.score > best) saveBestScore(state.score);

  $('go-score').textContent = state.score;
  $('go-level').textContent = state.level;
  $('go-best').textContent = Math.max(state.score, best);

  const messages = [
    "Le secret reste voilé pour ce soir…",
    "Chaque défaite est un pas vers l'amour…",
    "Les mots résistent encore à votre cœur…",
  ];
  $('gameover-text').textContent = messages[Math.floor(Math.random()*messages.length)];

  setTimeout(() => showOverlay('gameover'), 600);
}

function triggerWin() {
  state.gameOver = true;
  clearInterval(state.timerInterval);
  SFX.levelup();
  launchConfetti();

  const best = getBestScore();
  if (state.score > best) saveBestScore(state.score);

  $('win-score').textContent = state.score;
  $('win-time').textContent = Math.floor(state.totalTime) + 's';

  setTimeout(() => showOverlay('win'), 600);
}

// ─── GAME START ──────────────────────────────────────────────────────
function startGame() {
  clearInterval(state.timerInterval);
  Object.assign(state, {
    score: 0,
    level: 1,
    lives: DIFFICULTY_SETTINGS[state.difficulty].lives,
    maxLives: DIFFICULTY_SETTINGS[state.difficulty].lives,
    combo: 0,
    maxCombo: 0,
    totalTime: 0,
    wordQueue: buildWordQueue(),
    currentWord: null,
    guessed: new Set(),
    wrongGuesses: 0,
    paused: false,
    gameOver: false,
    wordsThisLevel: 0,
    wordsPerLevel: 3,
  });

  $('hud-score').textContent = '0';
  $('hud-level').textContent = '1';
  $('level-progress-fill').style.width = '0%';
  hideOverlays();
  renderLives();
  showScreen('game');
  loadNextWord();
}

// ─── PERSISTENCE ─────────────────────────────────────────────────────
function getBestScore() {
  return parseInt(localStorage.getItem('unsecret_best_' + state.difficulty) || '0');
}
function saveBestScore(s) {
  localStorage.setItem('unsecret_best_' + state.difficulty, s);
  updateMenuHighscore();
}
function updateMenuHighscore() {
  const best = getBestScore();
  $('menu-highscore').textContent = best > 0 ? best.toLocaleString() + ' pts' : '—';
}

// ─── SETTINGS ────────────────────────────────────────────────────────
const settingsPanel = $('settings-panel');
function openSettings() { settingsPanel.classList.add('open'); }
function closeSettings() { settingsPanel.classList.remove('open'); }

function initToggle(id, stateKey, onChange) {
  const el = $(id);
  el.addEventListener('click', () => {
    state[stateKey] = !state[stateKey];
    el.classList.toggle('on', state[stateKey]);
    el.setAttribute('aria-checked', state[stateKey]);
    if (onChange) onChange(state[stateKey]);
  });
}

// ─── KEYBOARD EVENTS ─────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (state.screen !== 'game' || state.paused || state.gameOver) return;
  const letter = e.key.toUpperCase();
  if (/^[A-Z]$/.test(letter) && letter.length === 1) handleGuess(letter);
});

// ─── TOAST (simple) ──────────────────────────────────────────────────
function showToast(title, msg) {
  // Just update clue box briefly
  const orig = $('clue-text').textContent;
  $('clue-text').textContent = `${title} ${msg}`;
  $('clue-text').style.color = 'var(--accent-rose)';
  setTimeout(() => {
    $('clue-text').textContent = orig;
    $('clue-text').style.color = '';
  }, 1400);
}

// ─── EVENT LISTENERS ─────────────────────────────────────────────────
$('btn-play').addEventListener('click', () => { SFX.click(); startGame(); });

// Difficulty buttons
$$('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.difficulty = btn.dataset.diff;
    updateMenuHighscore();
    SFX.click();
  });
});

// Pause
$('btn-pause').addEventListener('click', () => {
  if (state.gameOver) return;
  SFX.click();
  state.paused = true;
  showOverlay('pause');
});
$('btn-resume').addEventListener('click', () => { SFX.click(); hideOverlays(); state.paused = false; });
$('btn-quit-pause').addEventListener('click', () => {
  SFX.click();
  clearInterval(state.timerInterval);
  hideOverlays();
  showScreen('menu');
  updateMenuHighscore();
});

// Mute
$('btn-mute').addEventListener('click', () => {
  state.muted = !state.muted;
  $('btn-mute').textContent = state.muted ? '🔇' : '🔊';
  $('btn-mute').classList.toggle('active', state.muted);
});

// Level Up → next
$('btn-next-level').addEventListener('click', () => {
  SFX.click();
  hideOverlays();
  state.paused = false;
  loadNextWord();
});

// Game Over
$('btn-replay').addEventListener('click', () => { SFX.click(); startGame(); });
$('btn-menu-go').addEventListener('click', () => { SFX.click(); hideOverlays(); showScreen('menu'); updateMenuHighscore(); });

// Win
$('btn-play-win').addEventListener('click', () => { SFX.click(); startGame(); });
$('btn-menu-win').addEventListener('click', () => { SFX.click(); hideOverlays(); showScreen('menu'); updateMenuHighscore(); });

// Hint
$('hint-btn').addEventListener('click', () => useHint());

// Settings
$('btn-settings-menu').addEventListener('click', () => { SFX.click(); openSettings(); });
$('btn-settings-game').addEventListener('click', () => { SFX.click(); openSettings(); });
$('btn-close-settings').addEventListener('click', () => { SFX.click(); closeSettings(); });

initToggle('toggle-sound', 'muted', v => {
  state.muted = !v;
  $('btn-mute').textContent = state.muted ? '🔇' : '🔊';
  $('toggle-sound').classList.toggle('on', !state.muted);
});
initToggle('toggle-particles', 'particles');
initToggle('toggle-hints', 'autoHints');

$('btn-clear-scores').addEventListener('click', () => {
  ['easy','medium','hard'].forEach(d => localStorage.removeItem('unsecret_best_' + d));
  updateMenuHighscore();
  SFX.click();
  $('btn-clear-scores').textContent = '✓ Effacé';
  setTimeout(() => $('btn-clear-scores').textContent = 'Effacer', 1500);
});

// Close settings on outside click
document.addEventListener('click', e => {
  if (settingsPanel.classList.contains('open') &&
      !settingsPanel.contains(e.target) &&
      !e.target.closest('#btn-settings-menu') &&
      !e.target.closest('#btn-settings-game')) {
    closeSettings();
  }
});

// Physical keyboard support
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (settingsPanel.classList.contains('open')) { closeSettings(); return; }
    if (state.screen === 'game' && !state.paused) {
      state.paused = true;
      showOverlay('pause');
    }
  }
});

// ─── INIT ─────────────────────────────────────────────────────────────
initBgCanvas();
animateBg();
updateMenuHighscore();
showScreen('menu');