"use strict";
const express = require("express");
const router = express.Router();
const noteController = require('../controllers/noteController');
const cors = require('cors');

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

router.use(cors(corsOptions));

router.get("/", noteController.fetchAllNotes);
router.get("/set/:set_id", noteController.fetchNotesByStudySet);
router.post("/", noteController.createNote);
router.delete("/:id", noteController.removeNote);
module.exports = router;