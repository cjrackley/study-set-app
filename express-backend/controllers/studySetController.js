"use strict";
const model = require('../models/studySetModel');

async function fetchAllStudySets(req, res) {
    try {
        const noteSets = await model.getAllStudySets();
        res.json(noteSets);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchStudySetByTitle(req, res) {
    const title = req.params.title;
    if (title) {
        try {
            const noteSet = await model.getOneStudySetByTitle(title);
            res.json(noteSet);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required title param!");
    }
}

async function removeStudySet(req, res) {
    const title = req.params.title;
    if (title) {
        try {
            const deletedCount = await model.deleteStudySet(title);
            if (deletedCount > 0) {
                res.send(`Study Set with title ${title} deleted successfully.`);
            } else {
                res.status(404).send("Study Set not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required title param!");
    }
}

async function createStudySet(req, res) {
    console.log("BODY:", req.body);
    const { title, description } = req.body;
    if (title && description) {
        try {
            const newStudySet = await model.addStudySet(title, description);
            res.status(201).json(newStudySet);
        } catch (err) {
            console.error("CREATE ERROR:", err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required study set fields!");
    }
}

module.exports = {
    fetchAllStudySets,
    removeStudySet,
    createStudySet,
    fetchStudySetByTitle
};