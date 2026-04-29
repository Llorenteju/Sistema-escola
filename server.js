import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoute from "./src/routes/authRoute.js"
import usuarioRoute from "./src/routes/usuarioRoute.js"
import professorRoute from "./src/routes/professorRoute.js";
import alunoRoute from "./src/routes/alunoRoute.js";
import notaRoute from "./src/routes/notaRoute.js";
import disciplinaRoute from "./src/routes/disciplinaRoute.js";
import turmaRoute from "./src/routes/turmaRoute.js";

dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://sistema-de-escola.vercel.app"
    ],
    methods: [
        "GET", "POST", "PUT", "DELETE"
    ],
    allowedHeaders: [
        "Content-Type", "Authorization", "ngrok-skip-browser-warning"
    ]
}));

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Api funcionando" })
})

app.get("/teste", (req, res) => {
    res.status(200).json({ ok: true })
})

app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoute);
app.use("/professores", professorRoute);
app.use("/alunos", alunoRoute);
app.use("/notas", notaRoute);
app.use("/disciplinas", disciplinaRoute);
app.use("/turmas", turmaRoute);
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando http://localhost:${process.env.PORT}`);
})
// import app from "./src/app.js";
// import dotenv from "dotenv";

// dotenv.config();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Servidor rodando em http://localhost:${PORT}`);
// });