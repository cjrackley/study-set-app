"use strict";
const pool = require('./dbConnection');

async function getAllNotes() {
    const queryText = "SELECT * FROM notes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getNotesByStudySet(set_id) {
    let queryText = "SELECT * FROM notes where set_id= $1";
    const values = [set_id];
    const result = await pool.query(queryText, values);
    return result.rows;
}


async function deleteNote(id) {
    let queryText = "DELETE FROM notes WHERE id = $1 ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addNote(set_id, term, definition, image_url = null) {
    let queryText = "INSERT INTO notes ( set_id, term, definition, image_url) VALUES ($1, $2, $3, $4) RETURNING *";
    let values = [set_id, term, definition, image_url];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllNotes,
    getNotesByStudySet,
    deleteNote,
    addNote
};