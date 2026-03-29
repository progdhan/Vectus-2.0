const SCORE_KEY        = 'vectus_score';
const TOPIC_KEY        = 'vectus_topic_id';
const TOPIC_LEVELS_KEY = 'vectus_topic_levels'; // { [topicId]: 'easy'|'medium'|'hard' }
const HISTORY_KEY      = 'vectus_quiz_history';  // { [topicId]: { attempts, bestScore, lastScore } }

/* ── Current quiz score ─────────────────────────────────────────────────── */
export function saveScore(score) { localStorage.setItem(SCORE_KEY, String(score)); }
export function getScore()       { return Number(localStorage.getItem(SCORE_KEY) ?? 0); }

/* ── Currently-selected topic ───────────────────────────────────────────── */
export function saveTopicId(id) { localStorage.setItem(TOPIC_KEY, id); }
export function getTopicId()    { return localStorage.getItem(TOPIC_KEY) ?? null; }

/* ── Per-topic adaptive difficulty ─────────────────────────────────────── */
function loadLevels() {
  try { return JSON.parse(localStorage.getItem(TOPIC_LEVELS_KEY) ?? '{}'); }
  catch { return {}; }
}

/** Get the stored quiz difficulty for this topic (defaults to 'easy' on first visit). */
export function getTopicLevel(topicId) {
  return loadLevels()[topicId] ?? 'easy';
}

/** Returns true only if the user has already completed this topic at least once. */
export function hasTopicBeenAttempted(topicId) {
  return topicId in loadLevels();
}

/** Advance the topic's difficulty based on quiz score. Returns the new level. */
export function advanceTopicLevel(topicId, score) {
  const nextLevel = score <= 1 ? 'easy' : score === 2 ? 'medium' : 'hard';
  const levels = loadLevels();
  levels[topicId] = nextLevel;
  localStorage.setItem(TOPIC_LEVELS_KEY, JSON.stringify(levels));
  return nextLevel;
}

/* ── Quiz history (progress tracker) ───────────────────────────────────── */
export function getQuizHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '{}'); }
  catch { return {}; }
}

/** Record a quiz completion. Updates attempts, bestScore and lastScore for the topic. */
export function saveQuizResult(topicId, score) {
  try {
    const history = getQuizHistory();
    const prev = history[topicId] ?? { attempts: 0, bestScore: 0, lastScore: 0 };
    history[topicId] = {
      attempts:   prev.attempts + 1,
      bestScore:  Math.max(prev.bestScore, score),
      lastScore:  score,
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

/* ── Shared constants ───────────────────────────────────────────────────── */
export const LEVEL_META = {
  easy:   { label: 'Easy',   emoji: '🌱', color: '#4ade80', badge: 'badge-easy'   },
  medium: { label: 'Medium', emoji: '⚡', color: '#facc15', badge: 'badge-medium' },
  hard:   { label: 'Hard',   emoji: '🔬', color: '#f87171', badge: 'badge-hard'   },
};
