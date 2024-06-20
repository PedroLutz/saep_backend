const express = require('express');
const router = express.Router();
const db = require('../db');

const tabela = 'automoveis';

router.get('/', (req, res) => {
    let sql = `SELECT * FROM ${tabela}`;
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * FROM ${tabela} WHERE id = ?`;
    db.query(sql, id, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.get('/por_concessionaria/:id', (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * FROM ${tabela} WHERE concessionarias_id = ?`;
    db.query(sql, id, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.post('/', (req, res) => {
    const { nome, concessionarias_id } = req.body;

    if (!nome || !concessionarias_id) {
        return res.status(400).send('Nome e Concessionarias_id são obrigatórios');
    }

    let sql = `INSERT INTO \`${tabela}\` (\`nome\`, \`concessionarias_id\`) VALUES (?, ?)`;

    db.query(sql, [nome, concessionarias_id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.put('/:id', (req, res) => {
    const nome = req.body;
    const id = req.params.id;

    let sql = `UPDATE \`${tabela}\` SET ? WHERE (\`id\` = ?)`;

    db.query(sql, [nome , id], (err, results)=>{
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    let sql = `DELETE FROM \`${tabela}\` WHERE (\`id\` = ?);`

    db.query(sql, id, (err, results)=>{
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

module.exports = router;