const { Router } = require("express");
const { createNote, getNotes, deleteNote } = require("../controllers/NotesController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/create", authMiddleware, createNote);
router.get('/get', authMiddleware, getNotes);
router.delete('/delete/:id',authMiddleware, deleteNote);

module.exports = router;
