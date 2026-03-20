/* ═══════════════════════════════════════════════════════════
   UN SECRET / A SECRET  —  COMPLETE GAME v3.0
   100% Vanilla JS · localStorage · No backend needed
═══════════════════════════════════════════════════════════ */

// ══════════════════════════════════════════
// I18N — Bilingual FR / EN
// ══════════════════════════════════════════
const I18N = {
  fr:{
    logo_title:"Un Secret",logo_sub:"Le jeu des mots tendres",
    play:"Jouer",difficulty:"Difficulté",best_score:"Meilleur Score",
    leaderboard:"Classement",achievements:"Succès",collection:"Collection",
    settings:"Paramètres",challenge:"Défier un ami",see_dev:"Voir le développeur",
    dev_credit:"Développé par le formidable et unique Borel .J 😌",
    score:"Score",level:"Niveau",lives:"Vies",time:"Temps",hint:"💡 Indice",
    pause_title:"En Pause",pause_text:"Votre cœur bat toujours…",
    resume:"▶️ Continuer",menu:"🏠 Menu",
    next_level:"💫 Niveau Suivant",points:"Points",combo:"Combo max",
    gameover_title:"Fin du Secret",replay:"🔄 Rejouer",record:"Record",
    win_title:"Secret Révélé !",win_text:"Vous avez percé tous les mystères… 💌",
    close:"✕ Fermer",sound:"Sons & Musique",particles:"Animations",
    auto_hints:"Indices automatiques",clear_scores:"Effacer les records",clear:"Effacer",
    contact_dev:"Contacter le développeur",
    diff_easy:"🌸 Doux",diff_medium:"💕 Tendre",diff_hard:"🔥 Ardent",
    challenge_received:"Défi reçu de ",challenge_word:"Mot à deviner !",
    challenge_share_title:"Défi envoyé !",challenge_share_text:"Lien copié dans le presse-papiers !",
    no_scores:"Aucun score encore",collection_count:" mots découverts",
    gameover_msgs:["Le secret reste voilé pour ce soir…","Chaque défaite rapproche de l'amour…","Les mots résistent encore à votre cœur…"],
    levelup_msgs:["Le secret s'épaissit…","Votre cœur s'enflamme…","Les mots vous révèlent…","L'amour parle pour vous…","Le mystère se dissout…","Vous êtes brillant(e)… 💫"],
    freeze_used:"❄️ Timer gelé !",vowel_revealed:"🔤 Voyelle révélée !",double_active:"×2 Points actifs !",
    streak_broken:"🔥 Série perdue ! Revenez demain.",new_streak:"🔥 Série de ",
    ach_first_word_t:"Premier Mot !",ach_first_word_d:"Votre première devinette réussie",
    ach_combo3_t:"Combo ×3",ach_combo3_d:"3 bonnes lettres consécutives",
    ach_combo5_t:"Combo ×5",ach_combo5_d:"5 bonnes lettres consécutives",
    ach_speed_t:"Éclair ⚡",ach_speed_d:"Mot trouvé en moins de 5 secondes",
    ach_perfect_t:"Sans faute 💎",ach_perfect_d:"Niveau terminé sans erreur",
    ach_streak7_t:"Semaine de feu 🔥",ach_streak7_d:"7 jours consécutifs joués",
    ach_10words_t:"Collectionneur 🃏",ach_10words_d:"10 mots découverts",
    ach_50words_t:"Grand Lecteur 📚",ach_50words_d:"50 mots découverts",
    ach_billionaire_t:"Riche en mots 💰",ach_billionaire_d:"Score total > 5000",
    ach_hint0_t:"Aucun indice 🧠",ach_hint0_d:"Niveau terminé sans indice",
    story_prefix:"✦ Fragment ",story_suffix:" ✦",
  },
  en:{
    logo_title:"A Secret",logo_sub:"The game of tender words",
    play:"Play",difficulty:"Difficulty",best_score:"Best Score",
    leaderboard:"Leaderboard",achievements:"Achievements",collection:"Collection",
    settings:"Settings",challenge:"Challenge a Friend",see_dev:"Meet the Developer",
    dev_credit:"Entirely crafted by the remarkable Borel .J 😌",
    score:"Score",level:"Level",lives:"Lives",time:"Time",hint:"💡 Hint",
    pause_title:"Paused",pause_text:"Your heart still beats…",
    resume:"▶️ Continue",menu:"🏠 Menu",
    next_level:"💫 Next Level",points:"Points",combo:"Max Combo",
    gameover_title:"Secret Ends",replay:"🔄 Play Again",record:"Best",
    win_title:"Secret Revealed!",win_text:"You've uncovered all the mysteries… 💌",
    close:"✕ Close",sound:"Sound & Music",particles:"Animations",
    auto_hints:"Auto Hints",clear_scores:"Clear Records",clear:"Clear",
    contact_dev:"Contact the Developer",
    diff_easy:"🌸 Gentle",diff_medium:"💕 Tender",diff_hard:"🔥 Ardent",
    challenge_received:"Challenge from ",challenge_word:"Guess the word!",
    challenge_share_title:"Challenge sent!",challenge_share_text:"Link copied to clipboard!",
    no_scores:"No scores yet",collection_count:" words discovered",
    gameover_msgs:["The secret stays veiled tonight…","Every defeat brings you closer to love…","The words still resist your heart…"],
    levelup_msgs:["The secret deepens…","Your heart is ablaze…","The words reveal themselves…","Love speaks for you…","The mystery dissolves…","You are brilliant… 💫"],
    freeze_used:"❄️ Timer frozen!",vowel_revealed:"🔤 Vowel revealed!",double_active:"×2 Points active!",
    streak_broken:"🔥 Streak lost! Come back tomorrow.",new_streak:"🔥 Streak of ",
    ach_first_word_t:"First Word!",ach_first_word_d:"Your first successful guess",
    ach_combo3_t:"Combo ×3",ach_combo3_d:"3 correct letters in a row",
    ach_combo5_t:"Combo ×5",ach_combo5_d:"5 correct letters in a row",
    ach_speed_t:"Lightning ⚡",ach_speed_d:"Word found in under 5 seconds",
    ach_perfect_t:"Flawless 💎",ach_perfect_d:"Level completed with no errors",
    ach_streak7_t:"Fire Week 🔥",ach_streak7_d:"7 consecutive days played",
    ach_10words_t:"Collector 🃏",ach_10words_d:"10 words discovered",
    ach_50words_t:"Bookworm 📚",ach_50words_d:"50 words discovered",
    ach_billionaire_t:"Word Rich 💰",ach_billionaire_d:"Total score > 5000",
    ach_hint0_t:"No Hints 🧠",ach_hint0_d:"Level completed without hints",
    story_prefix:"✦ Fragment ",story_suffix:" ✦",
  }
};

let lang = localStorage.getItem('unsecret_lang')||'fr';

function t(key){ return (I18N[lang]&&I18N[lang][key])||I18N.fr[key]||key; }

function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    el.textContent=t(k);
  });
  document.querySelectorAll('[data-i18n-diff]').forEach(el=>{
    const k=el.getAttribute('data-i18n-diff');
    el.textContent=t('diff_'+k);
  });
  $('logo-title').textContent=t('logo_title');
  $('logo-sub').textContent=t('logo_sub');
  $$('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  // diff buttons already done above
}

// ══════════════════════════════════════════
// WORDS DATABASE — FR + EN
// ══════════════════════════════════════════
const WORDS_DB = {
  fr:{
    easy:[
      {word:"AMOUR",clue:"Le plus grand des sentiments",category:"Émotion"},
      {word:"COEUR",clue:"Il bat quand tu penses à lui",category:"Symbole"},
      {word:"BAISER",clue:"Un doux contact des lèvres",category:"Geste"},
      {word:"ROSE",clue:"La fleur de l'amour par excellence",category:"Nature"},
      {word:"TENDRE",clue:"Doux et délicat comme une caresse",category:"Qualité"},
      {word:"DOUCEUR",clue:"Ce que procure une étreinte aimante",category:"Sentiment"},
      {word:"CHARME",clue:"Ce qui envoûte et séduit",category:"Magie"},
      {word:"REVE",clue:"Ce que l'amour fait naître la nuit",category:"Nuit"},
      {word:"NUAGE",clue:"On marche dessus quand on est amoureux",category:"Nature"},
      {word:"LUMIERE",clue:"Elle guide les amants dans la nuit",category:"Poésie"},
      {word:"CARESSE",clue:"Un geste doux qui apaise",category:"Toucher"},
      {word:"SOURIRE",clue:"Ce que tu offres sans compter",category:"Visage"},
      {word:"DEVOTION",clue:"Un amour absolu et sans condition",category:"Engagement"},
      {word:"TENDREMENT",clue:"La manière dont on aime vraiment",category:"Adverbe"},
      {word:"ENVOÛTEMENT",clue:"Être sous le charme total de quelqu'un",category:"Magie"},
      {word:"FUSION",clue:"Quand deux êtres ne font plus qu'un",category:"Union"},
      {word:"INTIMITE",clue:"Ce précieux espace partagé entre deux amants",category:"Relation"},
      {word:"FIDELITE",clue:"La promesse tenue au fil des années",category:"Vertu"},
      {word:"ATTIRANCE",clue:"Une force invisible qui rapproche deux êtres",category:"Physique"},
      {word:"COMBLER",clue:"Remplir le cœur de l'autre jusqu'au bord",category:"Sentiment"},
      {word:"RAVISSEMENT",clue:"Un bonheur si intense qu'il surprend",category:"Émotion"},
      {word:"SINCERE",clue:"Un amour vrai, sans masque ni mensonge",category:"Qualité"},
    ],
    medium:[
      {word:"PASSION",clue:"Un feu qui consume et illumine",category:"Émotion"},
      {word:"SERMENT",clue:"Une promesse solennelle d'amour",category:"Engagement"},
      {word:"DESIR",clue:"L'envie ardente de l'autre",category:"Sentiment"},
      {word:"ETERNITE",clue:"Ce que les amants promettent toujours",category:"Temps"},
      {word:"COMPLICE",clue:"Celui qui partage vos petits secrets",category:"Relation"},
      {word:"MYSTERE",clue:"Ce qu'il garde au fond de ses yeux",category:"Secret"},
      {word:"FRISSON",clue:"Ce qu'un regard amoureux provoque",category:"Sensation"},
      {word:"PROMESSE",clue:"Ce que l'on donne avant le serment",category:"Amour"},
      {word:"VELOURS",clue:"Aussi doux que sa peau sous tes doigts",category:"Texture"},
      {word:"SOUPIR",clue:"Le souffle de l'amour en un mot",category:"Poésie"},
      {word:"DEVOTION",clue:"Un amour absolu et sans condition",category:"Engagement"},
      {word:"TENDREMENT",clue:"La manière dont on aime vraiment",category:"Adverbe"},
      {word:"ENVOÛTEMENT",clue:"Être sous le charme total de quelqu'un",category:"Magie"},
      {word:"FUSION",clue:"Quand deux êtres ne font plus qu'un",category:"Union"},
      {word:"INTIMITE",clue:"Ce précieux espace partagé entre deux amants",category:"Relation"},
      {word:"FIDELITE",clue:"La promesse tenue au fil des années",category:"Vertu"},
      {word:"ATTIRANCE",clue:"Une force invisible qui rapproche deux êtres",category:"Physique"},
      {word:"COMBLER",clue:"Remplir le cœur de l'autre jusqu'au bord",category:"Sentiment"},
      {word:"RAVISSEMENT",clue:"Un bonheur si intense qu'il surprend",category:"Émotion"},
      {word:"SINCERE",clue:"Un amour vrai, sans masque ni mensonge",category:"Qualité"},
    ],
    hard:[
      {word:"EPHEMERE",clue:"Aussi fugace qu'un premier amour",category:"Philosophie"},
      {word:"ALCHIMIE",clue:"La magie inexplicable entre deux âmes",category:"Magie"},
      {word:"SERENITE",clue:"La paix que l'amour vrai apporte",category:"Emotion"},
      {word:"RESONANCE",clue:"Quand deux cœurs vibrent à l'unisson",category:"Physique"},
      {word:"VULNERABILITE",clue:"S'ouvrir à l'autre malgré la peur",category:"Psychologie"},
      {word:"MELANCHOLIE",clue:"La douce tristesse des amours perdus",category:"Émotion"},
      {word:"BIENVEILLANCE",clue:"Vouloir le meilleur pour l'être aimé",category:"Vertu"},
      {word:"COMPLICITE",clue:"Ce lien invisible entre deux âmes sœurs",category:"Lien"},
      {word:"ESPERANCE",clue:"Ce qui permet d'aimer encore après la peine",category:"Sentiment"},
      {word:"QUINTESSENCE",clue:"L'essence pure et absolue d'un sentiment",category:"Philosophie"},
      {word:"TRANSCENDANCE",clue:"Quand l'amour dépasse toute limite humaine",category:"Philosophie"},
      {word:"INEFFABLE",clue:"Un sentiment si profond qu'il est indicible",category:"Langage"},
      {word:"SYMBIOSE",clue:"Deux êtres qui s'épanouissent ensemble",category:"Biologie"},
      {word:"SUBLIMATION",clue:"Transformer la souffrance en amour pur",category:"Psychologie"},
      {word:"CONNIVENCE",clue:"Une complicité silencieuse et profonde",category:"Lien"},
      {word:"INCANDESCENCE",clue:"Un amour qui brûle d'une lumière vive",category:"Poésie"},
      {word:"DIAPASON",clue:"Être en parfaite harmonie avec l'autre",category:"Musique"},
      {word:"OSMOSE",clue:"Une fusion naturelle et progressive de deux âmes",category:"Science"},
      {word:"PLÉNITUDE",clue:"La complétude ressentie aux côtés de l'aimé",category:"Philosophie"},
      {word:"RÉSILIENCE",clue:"La force d'aimer encore après la blessure",category:"Psychologie"},
    ]
  },
  en:{
    easy:[
      {word:"LOVE",clue:"The greatest of all feelings",category:"Emotion"},
      {word:"HEART",clue:"It beats when you think of them",category:"Symbol"},
      {word:"KISS",clue:"A gentle touch of the lips",category:"Gesture"},
      {word:"ROSE",clue:"The flower of love",category:"Nature"},
      {word:"TENDER",clue:"Soft and gentle like a caress",category:"Quality"},
      {word:"SWEET",clue:"What a loving embrace provides",category:"Feeling"},
      {word:"CHARM",clue:"What enchants and seduces",category:"Magic"},
      {word:"DREAM",clue:"What love creates at night",category:"Night"},
      {word:"CLOUD",clue:"You walk on them when in love",category:"Nature"},
      {word:"LIGHT",clue:"It guides lovers through the night",category:"Poetry"},
      {word:"SMILE",clue:"What you give away freely",category:"Expression"},
      {word:"BLISS",clue:"Pure and perfect happiness",category:"Feeling"},
      {word:"WARMTH",clue:"The feeling of being truly loved",category:"Sensation"},
      {word:"GENTLE",clue:"How love should always feel",category:"Quality"},
      {word:"LOYAL",clue:"Always by your side, no matter what",category:"Virtue"},
      {word:"GLOW",clue:"What love puts on your face",category:"Light"},
      {word:"BOND",clue:"An invisible tie between two hearts",category:"Connection"},
      {word:"SAFE",clue:"How you feel in the arms of the one you love",category:"Feeling"},
      {word:"PURE",clue:"Love in its most honest form",category:"Quality"},
      {word:"ADORE",clue:"To love someone deeply and openly",category:"Emotion"},
      {word:"SPARK",clue:"The very first sign of love",category:"Magic"},
      {word:"SOFT",clue:"The tone of a loving voice",category:"Touch"},
    ],
    medium:[
      {word:"PASSION",clue:"A fire that consumes and illuminates",category:"Emotion"},
      {word:"PROMISE",clue:"What you give before a vow",category:"Commitment"},
      {word:"DESIRE",clue:"The burning want for another",category:"Feeling"},
      {word:"FOREVER",clue:"What lovers always promise",category:"Time"},
      {word:"PARTNER",clue:"The one who shares your secrets",category:"Relation"},
      {word:"MYSTERY",clue:"What lies deep in their eyes",category:"Secret"},
      {word:"FLUTTER",clue:"What a loving glance creates",category:"Sensation"},
      {word:"DEVOTED",clue:"Wholly committed to another",category:"Love"},
      {word:"VELVET",clue:"Soft as their skin beneath your fingers",category:"Texture"},
      {word:"WHISPER",clue:"The breath of love in one word",category:"Poetry"},
      {word:"LONGING",clue:"The ache of missing someone dearly",category:"Feeling"},
      {word:"CHERISH",clue:"To hold someone precious in your heart",category:"Love"},
      {word:"INTIMATE",clue:"A closeness shared only between two",category:"Relation"},
      {word:"SOULMATE",clue:"The one who completes you entirely",category:"Connection"},
      {word:"SINCERE",clue:"Love without pretense or hidden motives",category:"Quality"},
      {word:"RADIANT",clue:"How someone looks when deeply loved",category:"Expression"},
      {word:"BREATHLESS",clue:"What love can make you when it's real",category:"Sensation"},
      {word:"FAITHFUL",clue:"Staying true through every storm",category:"Virtue"},
      {word:"ARDENT",clue:"Love that burns with fierce intensity",category:"Emotion"},
      {word:"ENTWINED",clue:"Two lives beautifully woven together",category:"Union"},
    ],
    hard:[
      {word:"EPHEMERAL",clue:"As fleeting as a first love",category:"Philosophy"},
      {word:"ALCHEMY",clue:"The inexplicable magic between souls",category:"Magic"},
      {word:"SERENITY",clue:"The peace that true love brings",category:"Emotion"},
      {word:"RESONANCE",clue:"When two hearts vibrate in unison",category:"Physics"},
      {word:"VULNERABLE",clue:"Opening yourself to another despite fear",category:"Psychology"},
      {word:"MELANCHOLY",clue:"The sweet sadness of loves past",category:"Emotion"},
      {word:"BENEVOLENCE",clue:"Wanting the best for the beloved",category:"Virtue"},
      {word:"COMPLICITY",clue:"That invisible bond between kindred souls",category:"Bond"},
      {word:"HOPE",clue:"What lets you love again after sorrow",category:"Feeling"},
      {word:"DEVOTION",clue:"Absolute, selfless commitment to another",category:"Philosophy"},
      {word:"INEFFABLE",clue:"A feeling too deep for words to capture",category:"Language"},
      {word:"TRANSCENDENT",clue:"Love that rises above all earthly limits",category:"Philosophy"},
      {word:"SYMBIOSIS",clue:"Two souls flourishing together as one",category:"Biology"},
      {word:"SUBLIMATION",clue:"Turning heartbreak into something beautiful",category:"Psychology"},
      {word:"INCANDESCENT",clue:"Burning with a love that lights the dark",category:"Poetry"},
      {word:"CONFLUENCE",clue:"Where two separate paths of life meet and merge",category:"Nature"},
      {word:"LUMINESCENCE",clue:"The quiet glow of a love that never fades",category:"Science"},
      {word:"MAGNANIMOUS",clue:"Loving with a generosity beyond measure",category:"Virtue"},
      {word:"SERENDIPITY",clue:"Finding love when you least expected it",category:"Fate"},
      {word:"COVENANT",clue:"A sacred, unbreakable promise between lovers",category:"Commitment"},
    ]
  }
};

// ══════════════════════════════════════════
// STORY FRAGMENTS
// ══════════════════════════════════════════
const STORY = {
  fr:["Elle avait gardé ce secret depuis si longtemps…","Ses lettres parfumaient encore le tiroir fermé à clé.","Un soir de pluie, il avait murmuré son prénom pour la première fois.","Elle ferma les yeux et se souvint de tout.","Leurs regards s'étaient croisés une fraction de seconde — une éternité.","Le secret n'était plus un secret. C'était une promesse.","Et dans ce silence, l'amour parla plus fort que tout.","Fin. Ou peut-être… le commencement."],
  en:["She had kept this secret for so long…","His letters still perfumed the locked drawer.","On a rainy evening, he whispered her name for the first time.","She closed her eyes and remembered everything.","Their gazes met for a fraction of a second — an eternity.","The secret was no longer a secret. It was a promise.","And in that silence, love spoke louder than anything.","The end. Or perhaps… the beginning."]
};

// ══════════════════════════════════════════
// ACHIEVEMENTS DEFINITION
// ══════════════════════════════════════════
const ACHIEVEMENTS_DEF = [
  {id:'first_word',icon:'🌱',t:'ach_first_word_t',d:'ach_first_word_d'},
  {id:'combo3',icon:'⚡',t:'ach_combo3_t',d:'ach_combo3_d'},
  {id:'combo5',icon:'💥',t:'ach_combo5_t',d:'ach_combo5_d'},
  {id:'speed',icon:'🏎️',t:'ach_speed_t',d:'ach_speed_d'},
  {id:'perfect',icon:'💎',t:'ach_perfect_t',d:'ach_perfect_d'},
  {id:'streak7',icon:'🔥',t:'ach_streak7_t',d:'ach_streak7_d'},
  {id:'words10',icon:'🃏',t:'ach_10words_t',d:'ach_10words_d'},
  {id:'words50',icon:'📚',t:'ach_50words_t',d:'ach_50words_d'},
  {id:'rich',icon:'💰',t:'ach_billionaire_t',d:'ach_billionaire_d'},
  {id:'nohint',icon:'🧠',t:'ach_hint0_t',d:'ach_hint0_d'},
];

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
const DIFF = {
  easy:  {lives:6,time:60,pts:100,hintCost:10},
  medium:{lives:5,time:45,pts:150,hintCost:25},
  hard:  {lives:4,time:30,pts:200,hintCost:50},
};

const state = {
  screen:'menu',difficulty:'easy',
  score:0,level:1,lives:6,maxLives:6,combo:0,maxCombo:0,
  totalTime:0,wordQueue:[],currentWord:null,
  guessed:new Set(),wrongGuesses:0,
  timerMax:60,timerLeft:60,timerInterval:null,
  paused:false,muted:false,particles:true,autoHints:false,
  hintsUsed:0,wordsThisLevel:0,wordsPerLevel:3,
  gameOver:false,doubleActive:false,timerFrozen:false,
  hintPenaltyThisLevel:0,errorsThisLevel:0,
};

// Persistent player profile
function loadProfile(){
  const def={name:'Joueur',playerLevel:1,xp:0,coins:0,streak:0,lastPlayed:'',totalScore:0,wordsFound:[],achievements:[],storyIdx:0,leaderboard:[]};
  try{ return Object.assign(def,JSON.parse(localStorage.getItem('unsecret_profile')||'{}')); }catch(e){return def;}
}
function saveProfile(p){ localStorage.setItem('unsecret_profile',JSON.stringify(p)); }
let profile = loadProfile();

// ══════════════════════════════════════════
// DOM
// ══════════════════════════════════════════
const $ = id=>document.getElementById(id);
const $$ = s=>document.querySelectorAll(s);
const screens={menu:$('screen-menu'),game:$('screen-game')};
const overlays={pause:$('overlay-pause'),levelup:$('overlay-levelup'),gameover:$('overlay-gameover'),win:$('overlay-win'),lb:$('overlay-lb'),achievements:$('overlay-achievements'),collection:$('overlay-collection'),dev:$('overlay-dev')};

// ══════════════════════════════════════════
// AUDIO (Web Audio API — no files needed)
// ══════════════════════════════════════════
let actx=null;
function getACtx(){ if(!actx) actx=new(window.AudioContext||window.webkitAudioContext)(); return actx; }
function tone(f,type='sine',dur=.15,vol=.15,delay=0){
  if(state.muted) return;
  try{
    const c=getACtx(),o=c.createOscillator(),g=c.createGain();
    o.connect(g);g.connect(c.destination);
    o.type=type;o.frequency.setValueAtTime(f,c.currentTime+delay);
    g.gain.setValueAtTime(vol,c.currentTime+delay);
    g.gain.exponentialRampToValueAtTime(.001,c.currentTime+delay+dur);
    o.start(c.currentTime+delay);o.stop(c.currentTime+delay+dur+.05);
  }catch(e){}
}
const SFX={
  correct:()=>{tone(523,'sine',.1,.2);tone(659,'sine',.1,.15,.08);},
  wrong:()=>tone(200,'sawtooth',.2,.15),
  win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,'sine',.2,.18,i*.1)),
  levelup:()=>[392,494,587,784].forEach((f,i)=>tone(f,'triangle',.15,.2,i*.12)),
  gameover:()=>[300,250,180].forEach((f,i)=>tone(f,'sawtooth',.3,.12,i*.18)),
  click:()=>tone(800,'sine',.05,.1),
  hint:()=>{tone(440,'triangle',.12,.15);tone(550,'triangle',.08,.1,.1);},
  combo:()=>[660,880,1100].forEach((f,i)=>tone(f,'sine',.12,.18,i*.07)),
  coin:()=>{tone(880,'sine',.08,.12);tone(1100,'sine',.06,.1,.07);},
  achievement:()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,'sine',.15,.15,i*.08)),
};

// ══════════════════════════════════════════
// BG PARTICLES
// ══════════════════════════════════════════
const bgC=$('bg-canvas'),bgX=bgC.getContext('2d');
let bParts=[];
function initBg(){
  bgC.width=innerWidth;bgC.height=innerHeight;bParts=[];
  const n=Math.min(60,Math.floor(innerWidth/15));
  for(let i=0;i<n;i++) bParts.push({x:Math.random()*bgC.width,y:Math.random()*bgC.height,r:Math.random()*3+1,vx:(Math.random()-.5)*.4,vy:-Math.random()*.5-.2,alpha:Math.random()*.5+.1,color:['#ff4f8b','#c084fc','#f5c842','#ff2060'][0|Math.random()*4],type:Math.random()>.7?'heart':'dot'});
}
function dHeart(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(0,-.5);c.bezierCurveTo(.5,-1,1,-.3,0,.6);c.bezierCurveTo(-1,-.3,-.5,-1,0,-.5);c.fill();c.restore();}
function animBg(){
  const w=bgC.width,h=bgC.height;bgX.clearRect(0,0,w,h);
  const gr=bgX.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*.7);
  gr.addColorStop(0,'#1a0a1e');gr.addColorStop(1,'#0d0510');
  bgX.fillStyle=gr;bgX.fillRect(0,0,w,h);
  if(state.particles) bParts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.y<-20){p.y=h+10;p.x=Math.random()*w;}
    if(p.x<0)p.x=w;if(p.x>w)p.x=0;
    bgX.globalAlpha=p.alpha*(.5+.5*Math.sin(Date.now()*.001+p.x));
    bgX.fillStyle=p.color;
    p.type==='heart'?dHeart(bgX,p.x,p.y,p.r*2):(bgX.beginPath(),bgX.arc(p.x,p.y,p.r,0,Math.PI*2),bgX.fill());
  });
  bgX.globalAlpha=1;requestAnimationFrame(animBg);
}
window.addEventListener('resize',initBg);

// ══════════════════════════════════════════
// CONFETTI
// ══════════════════════════════════════════
const confC=$('confetti-canvas'),confX=confC.getContext('2d');
let confParts=[],confActive=false;
function launchConfetti(){
  confC.width=innerWidth;confC.height=innerHeight;confParts=[];
  const cols=['#ff4f8b','#f5c842','#c084fc','#ff2060','#ffffff','#ffb3d0'];
  for(let i=0;i<Math.min(120,innerWidth/6);i++) confParts.push({x:Math.random()*confC.width,y:-20,r:Math.random()*6+3,vx:(Math.random()-.5)*6,vy:Math.random()*4+2,rot:Math.random()*360,rotV:(Math.random()-.5)*8,color:cols[0|Math.random()*cols.length],shape:Math.random()>.5?'rect':'circle',alpha:1});
  confActive=true;animConf();
}
function animConf(){
  if(!confActive){confX.clearRect(0,0,confC.width,confC.height);return;}
  confX.clearRect(0,0,confC.width,confC.height);let alive=false;
  confParts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.rot+=p.rotV;if(p.y>confC.height+20)p.alpha-=.05;if(p.alpha>0)alive=true;confX.save();confX.globalAlpha=Math.max(0,p.alpha);confX.translate(p.x,p.y);confX.rotate(p.rot*Math.PI/180);confX.fillStyle=p.color;p.shape==='rect'?confX.fillRect(-p.r,-p.r/2,p.r*2,p.r):(confX.beginPath(),confX.arc(0,0,p.r/2,0,Math.PI*2),confX.fill());confX.restore();});
  alive?requestAnimationFrame(animConf):(confActive=false,confX.clearRect(0,0,confC.width,confC.height));
}

// ══════════════════════════════════════════
// SCREEN / OVERLAY MANAGEMENT
// ══════════════════════════════════════════
function showScreen(n){Object.entries(screens).forEach(([k,el])=>el.classList.toggle('hidden',k!==n));state.screen=n;}
function showOverlay(n){Object.entries(overlays).forEach(([k,el])=>el.classList.toggle('hidden',k!==n));}
function hideOverlays(){Object.values(overlays).forEach(el=>el.classList.add('hidden'));}

// ══════════════════════════════════════════
// RENDER
// ══════════════════════════════════════════
const KB=[['A','Z','E','R','T','Y','U','I','O','P'],['Q','S','D','F','G','H','J','K','L','M'],['W','X','C','V','B','N']];

function renderKeyboard(){
  const kb=$('keyboard');kb.innerHTML='';
  KB.forEach(row=>{
    const rEl=document.createElement('div');rEl.className='key-row';
    row.forEach(l=>{
      const b=document.createElement('button');b.className='key';b.textContent=l;b.dataset.letter=l;
      if(state.guessed.has(l)){const ok=state.currentWord&&state.currentWord.word.includes(l);b.classList.add('used',ok?'correct':'wrong');}
      b.addEventListener('click',()=>handleGuess(l));rEl.appendChild(b);
    });
    kb.appendChild(rEl);
  });
}

function renderWord(){
  const wd=$('word-display');wd.innerHTML='';if(!state.currentWord)return;
  state.currentWord.word.split(' ').forEach((part,pi,arr)=>{
    part.split('').forEach(l=>{
      const box=document.createElement('div');box.className='letter-box';
      if(state.guessed.has(l)){box.textContent=l;box.classList.add('revealed');}
      wd.appendChild(box);
    });
    if(pi<arr.length-1){const sp=document.createElement('div');sp.className='word-space';wd.appendChild(sp);}
  });
}

function renderLives(){
  const lw=$('lives-display');lw.innerHTML='';
  for(let i=0;i<state.maxLives;i++){const s=document.createElement('span');s.className='life-icon'+(i>=state.lives?' lost':'');s.textContent=i<state.lives?'❤️':'🖤';lw.appendChild(s);}
}

function updateCoinsUI(){
  $('coins-display').textContent=profile.coins;
  $('coins-hud').textContent=profile.coins;
}

function updatePlayerBar(){
  const lvlXp=[0,100,250,500,900,1500,2500,4000,6000,10000];
  const lvl=Math.max(1,lvlXp.findLastIndex?lvlXp.findLastIndex(x=>profile.totalScore>=x)+1:lvlXp.reduce((acc,x,i)=>profile.totalScore>=x?i+1:acc,1));
  profile.playerLevel=lvl;
  const curMin=lvlXp[Math.min(lvl-1,lvlXp.length-1)];
  const nextMin=lvlXp[Math.min(lvl,lvlXp.length-1)];
  const pct=nextMin>curMin?Math.min(100,(profile.totalScore-curMin)/(nextMin-curMin)*100):100;
  $('player-level-display').textContent='LVL '+lvl;
  $('xp-bar').style.width=pct+'%';
  $('streak-num').textContent=profile.streak;
  saveProfile(profile);
}

// ══════════════════════════════════════════
// STREAK CHECK
// ══════════════════════════════════════════
function checkStreak(){
  const today=new Date().toDateString();
  const last=profile.lastPlayed;
  if(last===today) return;
  const yesterday=new Date(Date.now()-86400000).toDateString();
  if(last===yesterday){profile.streak++;if(profile.streak===7) unlockAchievement('streak7');}
  else if(last&&last!==today){profile.streak=1;}
  else{profile.streak=1;}
  profile.lastPlayed=today;saveProfile(profile);
  if(profile.streak>1) showAchievementToast('🔥',t('new_streak')+profile.streak,' ');
}

// ══════════════════════════════════════════
// TIMER
// ══════════════════════════════════════════
function startTimer(){
  clearInterval(state.timerInterval);
  const fill=$('timer-fill');
  state.timerInterval=setInterval(()=>{
    if(state.paused||state.gameOver||state.timerFrozen)return;
    state.timerLeft-=.1;state.totalTime+=.1;
    const pct=Math.max(0,state.timerLeft/state.timerMax*100);
    fill.style.width=pct+'%';fill.classList.toggle('danger',pct<25);
    if(state.timerLeft<=0){clearInterval(state.timerInterval);onTimerExpired();}
  },100);
}

function onTimerExpired(){
  state.lives--;state.combo=0;state.errorsThisLevel++;renderLives();SFX.wrong();
  if(state.lives<=0) triggerGameOver();
  else{showToast('⏰','...');setTimeout(loadNextWord,1200);}
}

// ══════════════════════════════════════════
// GUESS
// ══════════════════════════════════════════
function handleGuess(letter){
  if(state.guessed.has(letter)||state.paused||state.gameOver)return;
  SFX.click();state.guessed.add(letter);
  const word=state.currentWord.word;
  const ok=word.includes(letter);
  const key=document.querySelector(`.key[data-letter="${letter}"]`);
  if(key){key.classList.add('used',ok?'correct':'wrong');key.classList.remove('key');}
  if(ok){
    SFX.correct();state.combo++;
    if(state.combo>state.maxCombo)state.maxCombo=state.combo;
    if(state.combo>=2)showComboText(state.combo);
    if(state.combo>=3)unlockAchievement('combo3');
    if(state.combo>=5)unlockAchievement('combo5');
    renderWord();showCelebRing();
    if(word.split('').every(l=>l===' '||state.guessed.has(l))) onWordComplete();
  } else {
    SFX.wrong();state.combo=0;state.wrongGuesses++;state.errorsThisLevel++;state.lives--;renderLives();
    $$('.letter-box').forEach(b=>{b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),400);});
    if(state.lives<=0){clearInterval(state.timerInterval);triggerGameOver();}
  }
}

// ══════════════════════════════════════════
// WORD COMPLETE
// ══════════════════════════════════════════
function onWordComplete(){
  clearInterval(state.timerInterval);
  const cfg=DIFF[state.difficulty];
  const timeBonus=Math.floor(state.timerLeft*2);
  const comboBonus=Math.floor(cfg.pts*(state.combo*.1));
  let pts=(cfg.pts+timeBonus+comboBonus)*(state.doubleActive?2:1);
  state.doubleActive=false;
  state.score+=pts;profile.totalScore+=pts;
  // coins reward
  const coinsEarned=Math.floor(pts/50)+1;
  profile.coins+=coinsEarned;SFX.coin();
  $('hud-score').textContent=state.score;
  $('hud-score').classList.add('flash');setTimeout(()=>$('hud-score').classList.remove('flash'),500);
  updateCoinsUI();showScorePopup(pts);SFX.win();launchConfetti();
  // achievements
  unlockAchievement('first_word');
  if(state.timerLeft>=cfg.time-5)unlockAchievement('speed');
  if(state.errorsThisLevel===0&&state.wordsThisLevel===state.wordsPerLevel-1)unlockAchievement('perfect');
  if(state.hintsUsed===0&&state.wordsThisLevel===state.wordsPerLevel-1)unlockAchievement('nohint');
  if(profile.totalScore>=5000)unlockAchievement('rich');
  // collect word
  const wrd=state.currentWord.word;
  if(!profile.wordsFound.includes(wrd)){profile.wordsFound.push(wrd);if(profile.wordsFound.length>=10)unlockAchievement('words10');if(profile.wordsFound.length>=50)unlockAchievement('words50');}
  updatePlayerBar();saveProfile(profile);
  state.wordsThisLevel++;
  $('level-progress-fill').style.width=Math.min(state.wordsThisLevel/state.wordsPerLevel*100,100)+'%';
  if(state.wordsThisLevel>=state.wordsPerLevel){
    if(state.wordQueue.length===0)setTimeout(triggerWin,800);
    else setTimeout(triggerLevelUp,800);
  } else {
    showStoryFragment();
    setTimeout(loadNextWord,900);
  }
}

// ══════════════════════════════════════════
// STORY FRAGMENT
// ══════════════════════════════════════════
function showStoryFragment(){
  const storyArr=STORY[lang]||STORY.fr;
  const idx=profile.storyIdx%storyArr.length;
  const banner=document.createElement('div');banner.className='story-banner';
  banner.innerHTML=`<span>${t('story_prefix')}${idx+1}${t('story_suffix')}</span><p>${storyArr[idx]}</p>`;
  document.body.appendChild(banner);
  profile.storyIdx=idx+1;saveProfile(profile);
  setTimeout(()=>banner.remove(),3200);
}

// ══════════════════════════════════════════
// HINT
// ══════════════════════════════════════════
function useHint(){
  if(!state.currentWord)return;
  const cfg=DIFF[state.difficulty];
  if(profile.coins<cfg.hintCost){showToast('💎','...');return;}
  SFX.hint();
  const word=state.currentWord.word;
  const unrevealed=word.split('').filter(l=>l!==' '&&!state.guessed.has(l));
  if(!unrevealed.length)return;
  const l=unrevealed[0|Math.random()*unrevealed.length];
  state.guessed.add(l);state.hintsUsed++;
  profile.coins-=cfg.hintCost;updateCoinsUI();saveProfile(profile);
  renderWord();renderKeyboard();
  $('hint-btn').textContent=`💡 -${cfg.hintCost}💎`;$('hint-btn').disabled=true;
  setTimeout(()=>{$('hint-btn').disabled=false;$('hint-btn').textContent=t('hint');},3000);
  if(word.split('').every(l=>l===' '||state.guessed.has(l)))onWordComplete();
}

// ══════════════════════════════════════════
// POWER-UPS
// ══════════════════════════════════════════
function usePowerup(type){
  if(state.paused||state.gameOver)return;
  SFX.coin();
  if(type==='freeze'){if(profile.coins<15)return;profile.coins-=15;state.timerFrozen=true;updateCoinsUI();showToast('❄️',t('freeze_used'));setTimeout(()=>{state.timerFrozen=false;},8000);}
  else if(type==='vowel'){if(profile.coins<20)return;profile.coins-=20;updateCoinsUI();const vow='AEIOU'.split('');const word=state.currentWord.word;const avail=word.split('').filter(l=>vow.includes(l)&&!state.guessed.has(l));if(avail.length){state.guessed.add(avail[0|Math.random()*avail.length]);renderWord();renderKeyboard();}showToast('🔤',t('vowel_revealed'));}
  else if(type==='double'){if(profile.coins<30)return;profile.coins-=30;state.doubleActive=true;updateCoinsUI();showToast('×2',t('double_active'));}
  saveProfile(profile);
}

// ══════════════════════════════════════════
// SCORE VISUALS
// ══════════════════════════════════════════
function showScorePopup(pts,color='#f5c842'){
  const el=document.createElement('div');el.className='score-popup';el.style.color=color;
  el.style.left=(30+Math.random()*40)+'%';el.style.top=(30+Math.random()*20)+'%';
  el.textContent=(state.doubleActive?'×2 ':'')+'+'+pts;document.body.appendChild(el);setTimeout(()=>el.remove(),900);
}
function showCelebRing(){const r=document.createElement('div');r.className='celebration-ring';document.body.appendChild(r);setTimeout(()=>r.remove(),800);}
function showComboText(combo){
  const cd=$('combo-display');
  const msgs=['','','×2 Combo!','×3 Incroyable!','×4 Magnifique!','×5 SUBLIME!'];
  const msg=msgs[Math.min(combo,msgs.length-1)]||`×${combo} FANTASTIQUE!`;
  if(!msg)return;const el=document.createElement('div');el.className='combo-text';el.textContent=msg;cd.innerHTML='';cd.appendChild(el);if(combo>=3)SFX.combo();
}
function showToast(icon,msg){
  const orig=$('clue-text').textContent;
  $('clue-text').textContent=`${icon} ${msg}`;$('clue-text').style.color='var(--accent-rose)';
  setTimeout(()=>{$('clue-text').textContent=orig;$('clue-text').style.color='';},1600);
}

// ══════════════════════════════════════════
// ACHIEVEMENTS
// ══════════════════════════════════════════
function unlockAchievement(id){
  if(profile.achievements.includes(id))return;
  profile.achievements.push(id);saveProfile(profile);
  const def=ACHIEVEMENTS_DEF.find(a=>a.id===id);if(!def)return;
  SFX.achievement();
  showAchievementToast(def.icon,t(def.t),t(def.d));
}
function showAchievementToast(icon,title,desc){
  const el=document.createElement('div');el.className='achievement-toast';
  el.innerHTML=`<span class="toast-icon">${icon}</span><div class="toast-body"><div class="toast-title">${title}</div><div class="toast-desc">${desc}</div></div>`;
  document.body.appendChild(el);
  setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),400);},3000);
}
function renderAchievements(){
  const list=$('achievements-list');list.innerHTML='';
  ACHIEVEMENTS_DEF.forEach(a=>{
    const unlocked=profile.achievements.includes(a.id);
    const row=document.createElement('div');
    row.style.cssText=`display:flex;align-items:center;gap:10px;padding:8px 12px;background:${unlocked?'#220d2a':'#1a0a1e'};border-radius:10px;border:1px solid ${unlocked?'#ff4f8b33':'#ffffff08'};opacity:${unlocked?1:.5}`;
    row.innerHTML=`<span style="font-size:1.2rem">${a.icon}</span><div style="flex:1"><div style="font-family:var(--fd);font-size:.85rem;color:${unlocked?'var(--text-main)':'var(--text-dim)'}">${t(a.t)}</div><div style="font-family:var(--fb);font-size:.7rem;font-style:italic;color:var(--text-dim)">${t(a.d)}</div></div>${unlocked?'<span style="color:var(--accent-gold);font-size:.8rem">✓</span>':''}`;
    list.appendChild(row);
  });
}
function renderCollection(){
  const list=$('collection-list');list.innerHTML='';
  $('collection-count').textContent=profile.wordsFound.length+t('collection_count');
  if(!profile.wordsFound.length){list.innerHTML=`<p style="color:var(--text-dim);font-style:italic;font-family:var(--fb)">${t('no_scores')}</p>`;return;}
  profile.wordsFound.forEach(w=>{
    const card=document.createElement('div');
    card.style.cssText='padding:6px 12px;background:var(--bg-card);border:1px solid #ff4f8b22;border-radius:8px;font-family:var(--fd);font-size:.8rem;color:var(--accent-pink)';
    card.textContent=w;list.appendChild(card);
  });
}

// ══════════════════════════════════════════
// LEADERBOARD (localStorage — global via shared key)
// ══════════════════════════════════════════
function submitScore(score){
  let lb=[];try{lb=JSON.parse(localStorage.getItem('unsecret_lb')||'[]');}catch(e){}
  lb.push({name:profile.name||'Joueur',score,date:new Date().toLocaleDateString()});
  lb.sort((a,b)=>b.score-a.score);lb=lb.slice(0,100);
  localStorage.setItem('unsecret_lb',JSON.stringify(lb));
}
function renderLeaderboard(){
  let lb=[];try{lb=JSON.parse(localStorage.getItem('unsecret_lb')||'[]');}catch(e){}
  const list=$('lb-list');list.innerHTML='';
  if(!lb.length){list.innerHTML=`<p style="color:var(--text-dim);font-style:italic;font-family:var(--fb);text-align:center">${t('no_scores')}</p>`;return;}
  lb.slice(0,20).forEach((row,i)=>{
    const el=document.createElement('div');el.className='lb-row';
    el.innerHTML=`<span class="lb-rank${i<3?' top':''}">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</span><span class="lb-name">${row.name}</span><span class="lb-score">${row.score.toLocaleString()}</span>`;
    list.appendChild(el);
  });
}

// ══════════════════════════════════════════
// CHALLENGE VIA URL
// ══════════════════════════════════════════
function checkChallenge(){
  const hash=location.hash.slice(1);if(!hash)return;
  try{
    const params=new URLSearchParams(hash);
    const word=params.get('w');const from=params.get('f')||'?';
    if(!word)return;
    $('challenge-bar').classList.remove('hidden');
    $('challenge-text').textContent=t('challenge_received')+from+' — '+t('challenge_word');
    // inject word at front of queue when game starts
    window._challengeWord={word:word.toUpperCase(),clue:'— Défi —',category:'Défi 💌'};
  }catch(e){}
}
function shareChallenge(){
  if(!state.currentWord&&(!state.wordQueue||!state.wordQueue.length))return;
  const word=(state.currentWord||state.wordQueue[0]||{}).word||'AMOUR';
  const url=`${location.href.split('#')[0]}#w=${word}&f=${encodeURIComponent(profile.name||'Ami')}`;
  navigator.clipboard.writeText(url).then(()=>showAchievementToast('💌',t('challenge_share_title'),t('challenge_share_text'))).catch(()=>{});
}

// ══════════════════════════════════════════
// WORD LOADING
// ══════════════════════════════════════════
function buildQueue(){
  const pool=[...(WORDS_DB[lang]||WORDS_DB.fr)[state.difficulty]];
  for(let i=pool.length-1;i>0;i--){const j=0|Math.random()*(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
  if(window._challengeWord){pool.unshift(window._challengeWord);window._challengeWord=null;}
  return pool;
}
function loadNextWord(){
  if(!state.wordQueue.length){triggerWin();return;}
  state.currentWord=state.wordQueue.shift();
  state.guessed=new Set();state.wrongGuesses=0;state.hintsUsed=0;state.doubleActive=false;state.timerFrozen=false;
  state.errorsThisLevel=0;
  const cfg=DIFF[state.difficulty];
  state.timerMax=cfg.time;state.timerLeft=cfg.time;
  $('clue-category').textContent=state.currentWord.category;
  $('clue-text').textContent=state.currentWord.clue;$('clue-text').style.color='';
  $('hint-btn').disabled=false;$('hint-btn').textContent=t('hint');
  $('timer-fill').style.width='100%';$('timer-fill').classList.remove('danger');
  renderWord();renderKeyboard();startTimer();
}

// ══════════════════════════════════════════
// LEVEL TRANSITIONS
// ══════════════════════════════════════════
function triggerLevelUp(){
  SFX.levelup();state.level++;state.wordsThisLevel=0;
  $('hud-level').textContent=state.level;$('level-progress-fill').style.width='0%';
  const lm=t('levelup_msgs');const msgs=Array.isArray(lm)?lm:(I18N[lang]?.levelup_msgs||I18N.fr.levelup_msgs);
  $('levelup-title').textContent=(lang==='en'?'Level ':'Niveau ')+state.level+' !';
  $('levelup-text').textContent=msgs[(state.level-2)%msgs.length];
  $('levelup-score').textContent=state.score;$('levelup-combo').textContent=state.maxCombo+'x';
  const coinsBonus=state.level*5;profile.coins+=coinsBonus;$('levelup-coins').textContent='+'+coinsBonus;
  $('levelup-emoji').textContent=['🎉','💫','🌹','✨','💖','🦋'][(state.level-2)%6];
  updateCoinsUI();saveProfile(profile);showOverlay('levelup');state.paused=true;
}
function triggerGameOver(){
  state.gameOver=true;clearInterval(state.timerInterval);SFX.gameover();
  submitScore(state.score);
  const best=getBest();if(state.score>best)saveBest(state.score);
  $('go-score').textContent=state.score;$('go-level').textContent=state.level;$('go-best').textContent=Math.max(state.score,best);
  const msgs=I18N[lang]?.gameover_msgs||I18N.fr.gameover_msgs;
  $('gameover-text').textContent=msgs[0|Math.random()*msgs.length];
  saveProfile(profile);setTimeout(()=>showOverlay('gameover'),600);
}
function triggerWin(){
  state.gameOver=true;clearInterval(state.timerInterval);SFX.levelup();launchConfetti();
  submitScore(state.score);
  const best=getBest();if(state.score>best)saveBest(state.score);
  const winCoins=50;profile.coins+=winCoins;
  $('win-score').textContent=state.score;$('win-time').textContent=Math.floor(state.totalTime)+'s';$('win-coins').textContent='+'+winCoins;
  updateCoinsUI();saveProfile(profile);setTimeout(()=>showOverlay('win'),600);
}

// ══════════════════════════════════════════
// GAME START
// ══════════════════════════════════════════
function startGame(){
  clearInterval(state.timerInterval);checkStreak();
  const cfg=DIFF[state.difficulty];
  Object.assign(state,{score:0,level:1,lives:cfg.lives,maxLives:cfg.lives,combo:0,maxCombo:0,totalTime:0,wordQueue:buildQueue(),currentWord:null,guessed:new Set(),wrongGuesses:0,paused:false,gameOver:false,wordsThisLevel:0,wordsPerLevel:3,doubleActive:false,timerFrozen:false,hintPenaltyThisLevel:0,errorsThisLevel:0});
  $('hud-score').textContent='0';$('hud-level').textContent='1';$('level-progress-fill').style.width='0%';
  hideOverlays();renderLives();updateCoinsUI();showScreen('game');loadNextWord();
}

// ══════════════════════════════════════════
// PERSISTENCE
// ══════════════════════════════════════════
function getBest(){return parseInt(localStorage.getItem('unsecret_best_'+state.difficulty)||'0');}
function saveBest(s){localStorage.setItem('unsecret_best_'+state.difficulty,s);updateMenuHighscore();}
function updateMenuHighscore(){const b=getBest();$('menu-highscore').textContent=b>0?b.toLocaleString()+' pts':'—';}

// ══════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════
const settingsPanel=$('settings-panel');
function openSettings(){settingsPanel.classList.add('open');}
function closeSettings(){settingsPanel.classList.remove('open');}
function initToggle(id,key,cb){
  const el=$(id);
  el.addEventListener('click',()=>{state[key]=!state[key];el.classList.toggle('on',state[key]);el.setAttribute('aria-checked',state[key]);if(cb)cb(state[key]);});
}

// ══════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════
// Lang switch
$$('.lang-btn').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;localStorage.setItem('unsecret_lang',lang);applyLang();updateMenuHighscore();}));

// Play
$('btn-play').addEventListener('click',()=>{SFX.click();startGame();});

// Difficulty
$$('.diff-btn').forEach(b=>b.addEventListener('click',()=>{$$('.diff-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.difficulty=b.dataset.diff;updateMenuHighscore();SFX.click();}));

// Pause
$('btn-pause').addEventListener('click',()=>{if(state.gameOver)return;SFX.click();state.paused=true;showOverlay('pause');});
$('btn-resume').addEventListener('click',()=>{SFX.click();hideOverlays();state.paused=false;});
$('btn-quit-pause').addEventListener('click',()=>{SFX.click();clearInterval(state.timerInterval);hideOverlays();showScreen('menu');updateMenuHighscore();});

// Mute
$('btn-mute').addEventListener('click',()=>{state.muted=!state.muted;$('btn-mute').textContent=state.muted?'🔇':'🔊';$('btn-mute').classList.toggle('active',state.muted);});

// Level up
$('btn-next-level').addEventListener('click',()=>{SFX.click();hideOverlays();state.paused=false;loadNextWord();});

// Game over
$('btn-replay').addEventListener('click',()=>{SFX.click();startGame();});
$('btn-menu-go').addEventListener('click',()=>{SFX.click();hideOverlays();showScreen('menu');updateMenuHighscore();});

// Win
$('btn-play-win').addEventListener('click',()=>{SFX.click();startGame();});
$('btn-menu-win').addEventListener('click',()=>{SFX.click();hideOverlays();showScreen('menu');updateMenuHighscore();});

// Hint
$('hint-btn').addEventListener('click',()=>useHint());

// Power-ups
$('pu-freeze').addEventListener('click',()=>usePowerup('freeze'));
$('pu-vowel').addEventListener('click',()=>usePowerup('vowel'));
$('pu-double').addEventListener('click',()=>usePowerup('double'));

// Leaderboard
$('btn-lb').addEventListener('click',()=>{SFX.click();renderLeaderboard();showOverlay('lb');});
$('btn-close-lb').addEventListener('click',()=>{SFX.click();hideOverlays();});

// Achievements
$('btn-achievements').addEventListener('click',()=>{SFX.click();renderAchievements();showOverlay('achievements');});
$('btn-close-ach').addEventListener('click',()=>{SFX.click();hideOverlays();});

// Collection
$('btn-collection').addEventListener('click',()=>{SFX.click();renderCollection();showOverlay('collection');});
$('btn-close-col').addEventListener('click',()=>{SFX.click();hideOverlays();});

// Challenge
$('btn-challenge-share').addEventListener('click',()=>{SFX.click();shareChallenge();});

// Developer modal
function openDevModal(){SFX.click();showOverlay('dev');}
$('btn-dev').addEventListener('click',openDevModal);
$('btn-dev-game').addEventListener('click',openDevModal);
$('btn-close-dev').addEventListener('click',()=>{SFX.click();hideOverlays();});

// Settings
$('btn-settings-menu').addEventListener('click',()=>{SFX.click();openSettings();});
$('btn-settings-game').addEventListener('click',()=>{SFX.click();openSettings();});
$('btn-close-settings').addEventListener('click',()=>{SFX.click();closeSettings();});

initToggle('toggle-sound','muted',v=>{state.muted=!v;$('btn-mute').textContent=state.muted?'🔇':'🔊';$('toggle-sound').classList.toggle('on',!state.muted);});
initToggle('toggle-particles','particles');
initToggle('toggle-hints','autoHints');

$('btn-clear-scores').addEventListener('click',()=>{['easy','medium','hard'].forEach(d=>localStorage.removeItem('unsecret_best_'+d));updateMenuHighscore();SFX.click();$('btn-clear-scores').textContent='✓';setTimeout(()=>$('btn-clear-scores').textContent=t('clear'),1500);});

// Keyboard
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(settingsPanel.classList.contains('open')){closeSettings();return;}if(state.screen==='game'&&!state.paused){state.paused=true;showOverlay('pause');}return;}
  if(state.screen!=='game'||state.paused||state.gameOver)return;
  const l=e.key.toUpperCase();if(/^[A-Z]$/.test(l))handleGuess(l);
});

// Close settings on outside click
document.addEventListener('click',e=>{
  if(settingsPanel.classList.contains('open')&&!settingsPanel.contains(e.target)&&!e.target.closest('#btn-settings-menu')&&!e.target.closest('#btn-settings-game'))closeSettings();
});

// ══════════════════════════════════════════
// PHOTO LIGHTBOX
// ══════════════════════════════════════════
function openPhotoLightbox(){
  const src=$('dev-photo').src;
  const lb=$('photo-lightbox');
  const img=$('photo-lightbox-img');
  // Only open if there's a real photo loaded
  if(!src||src===window.location.href||$('dev-photo').style.display==='none'){
    // No photo set — wiggle the emoji instead
    const wrap=$('dev-photo-wrap');
    wrap.style.animation='none';
    setTimeout(()=>{wrap.style.animation='';},10);
    showAchievementToast('📸','Photo bientôt disponible','Revenez plus tard !');
    return;
  }
  img.src=src;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}
function closePhotoLightbox(){
  $('photo-lightbox').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePhotoLightbox();});

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
initBg();animBg();applyLang();updateMenuHighscore();updatePlayerBar();updateCoinsUI();checkChallenge();showScreen('menu');
