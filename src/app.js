import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import professorRoute from "./routes/professorRoute.js";
import alunoRoute from "./routes/alunoRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js"
import notaRoute from "./routes/notaRoute.js";
import turmaRoute from "./routes/turmaRoute.js"
import disciplinaRoute from "./routes/disciplinaRoute.js"


const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/professores", professorRoute);
app.use("/alunos", alunoRoute);
app.use("/usuarios", usuarioRoute);
app.use("/notas", notaRoute);
app.use("/turmas", turmaRoute);
app.use("/disciplinas", disciplinaRoute);

export default app;