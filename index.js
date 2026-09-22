const profileRoutes = require("./routes/profileRoutes");
const technologyRoutes = require("./routes/technologyRoutes");
const projectRoutes = require("./routes/projectRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/profiles", profileRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        mensagem: "API raquel api funcionando!"
    });
});

app.get("/teste-banco", async (req, res) => {
    try {
        const resultado = await pool.query("SELECT NOW()");

        res.json({
            mensagem: "Banco de dados conectado!",
            horario: resultado.rows[0].now
        });
    } catch (error) {
        console.error("=================================");
        console.error("ERRO AO CONECTAR AO BANCO:");
        console.error(error.message);
        console.error("=================================");

        res.status(500).json({
            erro: "Não foi possível conectar ao banco de dados.",
            detalhe: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});