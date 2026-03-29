import { SUBJECTS, TOPICS, LESSONS, QUESTIONS } from '../data/seed.js';

const DB_NAME = 'VectusDB';
const DB_VERSION = 1;
let _db = null;

/* ── Delete entire DB ───────────────────────────────────────────────────── */
export function deleteDB() {
  _db = null;
  return new Promise((resolve) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => resolve();
    req.onblocked = () => setTimeout(resolve, 300);
  });
}

/* ── Open / cache connection ─────────────────────────────────────────────── */
function openDB() {
  if (_db) return Promise.resolve(_db);

  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      // Drop everything for a clean slate
      Array.from(db.objectStoreNames).forEach((n) => db.deleteObjectStore(n));

      db.createObjectStore('subjects', { keyPath: 'id' });

      const topics = db.createObjectStore('topics', { keyPath: 'id' });
      topics.createIndex('subjectId', 'subjectId', { unique: false });

      db.createObjectStore('lessons', { keyPath: 'id' });

      const questions = db.createObjectStore('questions', { keyPath: 'id' });
      questions.createIndex('topicId', 'topicId', { unique: false });
    };

    req.onsuccess = (e) => {
      _db = e.target.result;
      _db.onversionchange = () => { _db.close(); _db = null; };
      resolve(_db);
    };

    req.onerror = async (e) => {
      const err = e.target.error;
      if (err?.name === 'VersionError') {
        await deleteDB();
        try { resolve(await openDB()); } catch (r) { reject(r); }
      } else {
        reject(err);
      }
    };

    req.onblocked = async () => {
      await deleteDB();
      try { resolve(await openDB()); } catch (r) { reject(r); }
    };
  });
}

/* ── Seed a store if empty ─────────────────────────────────────────────────── */
function seedStore(db, storeName, records) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const cnt = store.count();
    cnt.onsuccess = () => {
      if (cnt.result === 0) records.forEach((r) => store.put(r));
    };
    cnt.onerror = () => reject(cnt.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(new Error(`Seed aborted: ${storeName}`));
  });
}

/* ── Public: initialize DB ──────────────────────────────────────────────── */
export async function seedDB() {
  const db = await openDB();
  await seedStore(db, 'subjects', SUBJECTS);
  await seedStore(db, 'topics', TOPICS);
  await seedStore(db, 'lessons', LESSONS);
  await seedStore(db, 'questions', QUESTIONS);
}

/* ── Queries ────────────────────────────────────────────────────────────── */
function getAll(storeName) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db.transaction(storeName, 'readonly').objectStore(storeName).getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
  );
}

function getByIndex(storeName, indexName, value) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const idx = db
          .transaction(storeName, 'readonly')
          .objectStore(storeName)
          .index(indexName);
        const req = idx.getAll(value);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
  );
}

function getById(storeName, id) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const req = db.transaction(storeName, 'readonly').objectStore(storeName).get(id);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
      })
  );
}

export const getAllSubjects = () => getAll('subjects');
export const getTopicsBySubjectId = (subjectId) => getByIndex('topics', 'subjectId', subjectId);
export const getLessonByTopicId = (topicId) => getById('lessons', topicId);
export const getTopicById = (topicId) => getById('topics', topicId);
export const getSubjectById = (subjectId) => getById('subjects', subjectId);

/** Fetch exactly 3 questions for a topic at the given difficulty level.
 *  Falls back to any available questions for that topic if none exist at that difficulty. */
export async function getQuestionsByTopicAndDifficulty(topicId, difficulty) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const idx = db
      .transaction('questions', 'readonly')
      .objectStore('questions')
      .index('topicId');
    const req = idx.getAll(topicId);
    req.onsuccess = () => {
      const all = req.result;
      const filtered = all.filter((q) => q.difficulty === difficulty);
      resolve((filtered.length > 0 ? filtered : all).slice(0, 3));
    };
    req.onerror = () => reject(req.error);
  });
}

