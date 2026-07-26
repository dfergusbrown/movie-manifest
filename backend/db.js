import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(import.meta.dirname, "data");
const dbPath = path.join(dataDir, "movies.db");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

/**
 * A single item in the media collection.
 *
 * @typedef {Object} MediaItem
 * @property {number} id - Auto-incremented primary key
 * @property {string} upc - Barcode used to look up the item; unique per item
 * @property {string} title
 * @property {number} year - Release year
 * @property {'movie'|'tv_series'} type - What kind of media this is
 * @property {'DVD'|'Blu-ray'|'4K'|'Digital'} format - Physical/digital format owned
 * @property {?string} poster_url - URL to cover art; null if not yet set
 * @property {string} added_by - Which household member added this entry
 * @property {string} created_at - Timestamp string, e.g. "2026-07-25 20:18:24"
 */

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
