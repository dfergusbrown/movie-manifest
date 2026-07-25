import { Router } from "express";
import { db } from "../db.js";

const router = Router()

router.get('/', (req, res) => {
    const movies = db.prepare('SELECT * FROM media_items').all();
    res.json(movies)
})

router.post('/', (req, res) => {
    const { upc, title, year, type, format, poster_url, added_by } = req.body;
    const stmt = db.prepare(`
        INSERT INTO media_items (upc, title, year, type, format, poster_url, added_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
    const result = stmt.run(upc, title, year, type, format, poster_url, added_by);
    res.status(201).json({ id: result.lastInsertRowid})
})

export default router;