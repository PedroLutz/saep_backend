const express = require('express');
const router = express.Router();
const db = require('../db');

const tabela = 'funcionarios';

router.get('/', (req, res) => {
    const sql = `SELECT * FROM ${tabela}`;
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.get('/id/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM ${tabela} WHERE id = ?`;
    db.query(sql, id, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.get('/email/:email', (req, res) => {
    const email = req.params.email;

    const sql = `SELECT * FROM ${tabela} WHERE email LIKE '%${email}%'`;
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

router.post('/', (req, res) => {
    const { nome,
        cpf,
        celular,
        data_nascimento,
        email,
        senha,
        concessionarias_id } = req.body;

    if (!nome || !cpf || !celular || !data_nascimento || !email || !senha || !concessionarias_id) {
        return res.status(400).send('Todos os dados são obrigatórios');
    }

    let sql = `INSERT INTO \`${tabela}\` (\`nome\`, \`cpf\`, \`celular\`, \`data_nascimento\`, \`email\`, \`senha\`, \`concessionarias_id\`) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [nome, cpf, celular, data_nascimento, email, senha, concessionarias_id], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

module.exports = router;
