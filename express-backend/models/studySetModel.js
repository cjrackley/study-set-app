"use strict";
const pool = require('./dbConnection');

async function getAllStudySets() {
    const queryText = "SELECT * FROM notesets";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneStudySetByTitle(title) {
    const queryText = "SELECT * FROM notesets where title= $1";
    const values = [title];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteStudySet(title) {
    let queryText = "DELETE FROM notesets WHERE title = $1 ";
    const values = [title];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addStudySet(title, description) {
    let queryText = "INSERT INTO notesets ( title, description) VALUES ($1, $2) RETURNING *";
    let values = [title, description];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllStudySets,
    deleteStudySet,
    addStudySet,
    getOneStudySetByTitle
};