"use strict";
const express = require("express");
const router = express.Router();
const studySetController = require('../controllers/studySetController');

const cors = require('cors');

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

router.use(cors(corsOptions));

router.get("/", studySetController.fetchAllStudySets);
router.get("/:title", studySetController.fetchStudySetByTitle);
router.post("/", studySetController.createStudySet);
router.delete("/:title", studySetController.removeStudySet);
module.exports = router;