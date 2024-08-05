const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a student by ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM students WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Create a new student
router.post('/', (req, res) => {
    const sql = 'INSERT INTO students SET ?';
    const newStudent = req.body;
    db.query(sql, newStudent, (err) => {
        if (err) throw err;
        res.json({ message: 'Student added' });
    });
});

// Update a student by ID
router.put('/:id', (req, res) => {
    const sql = 'UPDATE students SET ? WHERE id = ?';
    const updatedStudent = req.body;
    db.query(sql, [updatedStudent, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Student updated' });
    });
});

// Delete a student by ID
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Student deleted' });
    });
});

module.exports = router;
