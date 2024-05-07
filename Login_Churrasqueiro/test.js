const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3003;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'nabrasa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    pool.query(
        'SELECT * FROM churrasqueiro WHERE Email = ? AND Senha = ?',
        [username, password],
        (err, results) => {
            if (err) {
                console.error("Erro ao fazer login:", err);
                return res.status(500).send(err.message);
            }
            if (results.length === 0) {
                return res.status(401).send('Credenciais inválidas');
            }
           
            res.sendFile('C:\\Users\\lucas.queiroz1_uscso\\Desktop\\CRUD\\Perfil\\index (3).html');
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor de login iniciado na porta ${port}`);
});

