"use strict";
const model = require('../models/noteModel');

async function fetchAllNotes(req, res) {
    try {
        const notes = await model.getAllNotes();
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchNotesByStudySet(req, res) {
    const set_id = req.params.set_id;
    if (set_id) {
        try {
            const notes = await model.getNotesByStudySet(set_id);
            res.json(notes);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required title param!");
    }
}

async function removeNote(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteNote(id);
            if (deletedCount > 0) {
                res.send(`Study Set with id ${id} deleted successfully.`);
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

async function createNote(req, res) {
    console.log("BODY:", req.body);
    const { set_id, term, definition, image_url } = req.body;
    if (set_id && term && definition) {
        try {
            const newNote = await model.addNote(set_id, term, definition, image_url);
            res.status(201).json(newNote);
        } catch (err) {
            console.error("CREATE ERROR:", err);
            res.status(500).send(err.message);
        }
    } else {
        res.status(400).send("Missing required study set fields!");
    }
}

module.exports = {
    fetchAllNotes,
    removeNote,
    createNote,
    fetchNotesByStudySet
};