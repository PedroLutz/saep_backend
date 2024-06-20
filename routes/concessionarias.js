const express = require('express');
const router = express.Router();
const db = require('../db');

const tabela = 'concessionarias';

router.get('/', (req, res) => {
    const sql = `SELECT * FROM ${tabela}`;
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM ${tabela} WHERE id = ?`;
    db.query(sql, id, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

module.exports = router;
