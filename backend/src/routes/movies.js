import { Router } from "express";
import { db } from "../../db.js";
import LookupController from "../controllers/lookupController.js";

const router = Router();

const lookupController = new LookupController();

/**
 * GET ALL MOVIES
 * @type {import('express').RequestHandler}
 */
router.get("/", (req, res) => {
  const movies = db.prepare("SELECT * FROM media_items").all();
  res.json(movies);
});

/**
 * POST individual movie
 * @type {import('express').RequestHandler}
 */
router.post("/", (req, res) => {
  const { upc, title, year, type, format, poster_url, added_by } = req.body;
  const stmt = db.prepare(`
        INSERT INTO media_items (upc, title, year, type, format, poster_url, added_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
  const result = stmt.run(upc, title, year, type, format, poster_url, added_by);
  res.status(201).json({ id: result.lastInsertRowid });
});

/**
 * GET individual movie by database ID.
 * @type {import('express').RequestHandler}
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare(`
        SELECT * FROM media_items
        WHERE id = (?)
        `);
  const result = stmt.get(id);

  if (!result) {
    res.status(404).json({ error: "No movie could be found" });
  }

  res.status(200).json(result);
});

const ALLOWED_COLUMNS = [
  "upc",
  "title",
  "year",
  "type",
  "format",
  "poster_url",
  "added_by",
];
/**
 * PUT - edit individual movie
 * @type {import('express').RequestHandler}
 */
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const columns = Object.keys(updates).filter((col) =>
    ALLOWED_COLUMNS.includes(col),
  );
  if (columns.length === 0) {
    return res.status(400).json({ error: "No valid fields provided" });
  }

  const setClause = columns.map((col) => `${col} = @${col}`).join(", ");
  const stmt = db.prepare(`
        UPDATE media_items
        SET ${setClause}
        WHERE id = @id
        `);
  const result = stmt.run({ ...updates, id });

  if (result.changes === 0) {
    res.status(400).json({ error: "Unknown error" });
  }

  res.status(201).json({ updated: result.changes });
});

/**
 * DELETE individual movie
 * @type {import('express').RequestHandler}
 */
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const stmt = db.prepare(`
    DELETE FROM media_items
    WHERE id = @id
    `);
  const result = stmt.run({ id });

  if (result.changes === 0) {
    return res.status(400).json({ error: "Resource was NOT deleted" });
  }

  res.status(200).json({ updated: result.changes });
});

/**
 * LOOKUP upc via upcmdb
 * @type {import('express').RequestHandler}
 */
router.get("/lookup/:upc", lookupController.barcodeLookup);

export default router;
//   const { upc } = req.params;
//   const apiBaseURL = process.env.UPCMDB_BASE_URL;
//   const apiKey = process.env.UPCMDB_API_KEY;
//   if (!apiKey || !apiBaseURL) {
//     throw new Error("apiKey or apiBaseURL is not set");
//   }
//   const headers = {
//     "Content-Type": "application/json",
//     "x-api-key": apiKey,
//   };
//   // console.log({
//   //   apiBaseURL,
//   //   headers,
//   //   URL: `${apiBaseURL}/v1/lookup/${upc}`,
//   // });

//   try {
//     console.log("sending query to UPCMD");
//     const response = await fetch(`${apiBaseURL}/v1/lookup/${upc}`, {
//       method: "GET",
//       headers,
//     });
//     console.log(response);
//     if (response.status === 503) {
//       res
//         .status(503)
//         .send(
//           "UPC - movie lookup API is currently unavailable -- see https://upcmdb.com/status",
//         );
//     }
//     const item = await response.json();

//     res.status(200).json({
//       upc,
//       title: item.title || "",
//       year: item.year ? Number(item.year) : null,
//       poster_url: item.productImageUrl || null,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(502).send(error);
//   }
// });
