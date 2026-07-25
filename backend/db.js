import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(import.meta.dirname, "data");
const dbPath = path.join(dataDir, "movies.db");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS media_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        upc TEXT UNIQUE,
        title TEXT NOT NULL,
        year INTEGER,
        type TEXT NOT NULL DEFAULT 'movie',
        format TEXT,
        poster_url TEXT,
        added_by TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);
