const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql2");  

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nabrasa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.json());
app.use(cors());


let produtos = [];



app.get("/produtos", (req, res) => {
    console.log("GET /produtos");

    pool.query(
        'SELECT * FROM produtos',
        (err, results) => {
            if (err) {
                console.error("Erro ao buscar produtos:", err);
                return res.status(500).send(err.message);
            }
            console.log("Produtos encontrados:", results);
            res.status(200).json(results);
        }
    );
});

app.post("/produtos", (req, res) => {
    const { ID, Nome, Endereco, Telefone, Data } = req.body;

    pool.query(
        'INSERT INTO produtos(ID, Nome, Endereco, Telefone, Data) VALUES (?, ?, ?, ?, ?)',
        [ID, Nome, Endereco, Telefone, Data],
        (err, results) => {
            if (err) {
                console.error("Erro ao inserir produto:", err);
                return res.status(500).send(err.message);
            }
            console.log("Produto adicionado com sucesso!");
            res.status(200).send('Produto adicionado com sucesso!');
        }
    );
});


app.put("/produtos/:id", (req, res) => {
    const productId = req.params.id;
    const { Nome, Endereco, Telefone, Data } = req.body;

    pool.query(
        'UPDATE produtos SET Nome=?, Endereco=?, Telefone=?, Data=? WHERE ID=?',
        [Nome, Endereco, Telefone, Data, productId],
        (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Produto não encontrado');
            }
            res.status(200).send('Produto atualizado com sucesso!');
        }
    );
});

app.delete("/produtos/:id", (req, res) => {
    const productId = req.params.id;

    pool.query(
        'DELETE FROM produtos WHERE ID=?',
        [productId],
        (err, results) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Produto não encontrado');
            }
            res.status(200).send('Produto removido com sucesso!');
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
