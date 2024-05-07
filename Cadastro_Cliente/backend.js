const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3001;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Coloque sua senha aqui, se houver
    database: 'nabrasa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser.json());
app.use(cors());

app.get("/cliente", (req, res) => {
    console.log("GET /cliente");
    pool.query(
        'SELECT * FROM cliente',
        (err, results) => {
            if (err) {
                console.error("Erro ao buscar cliente:", err);
                return res.status(500).send(err.message);
            }
            console.log("Clientes encontrados:", results);
            res.status(200).json(results);
        }
    );
});

app.post("/cliente", (req, res) => {
    const { ID, Nome, Endereco, Email, Telefone, Senha } = req.body;
    pool.query(
        'INSERT INTO cliente(ID, Nome, Endereco, Email, Telefone, Senha) VALUES (?, ?, ?, ?, ?, ?)',
        [ID, Nome, Endereco, Email, Telefone, Senha],
        (err, results) => {
            if (err) {
                console.error("Erro ao cadastrar cliente:", err);
                return res.status(500).send(err.message);
            }
            console.log("Cliente cadastrado com sucesso!");
            res.status(200).send('Cliente cadastrado com sucesso!');
        }
    );
});

app.put("/cliente/:id", (req, res) => {
    const clientId = req.params.id;
    const { Nome, Endereco, Email, Telefone, Senha } = req.body;
    pool.query(
        'UPDATE cliente SET Nome=?, Endereco=?, Email=?, Telefone=?, Senha=? WHERE ID=?',
        [Nome, Endereco, Email, Telefone, Senha, clientId],
        (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Cliente não encontrado');
            }
            res.status(200).send('Cliente atualizado com sucesso!');
        }
    );
});

app.delete("/cliente/:id", (req, res) => {
    const clientId = req.params.id;
    pool.query(
        'DELETE FROM cliente WHERE ID=?',
        [clientId],
        (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Cliente não encontrado');
            }
            res.status(200).send('Cliente removido com sucesso!');
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
