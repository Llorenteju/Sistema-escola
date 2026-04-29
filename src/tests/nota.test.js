import request from "supertest";
import app from "../app.js";

let token = "";
let alunoId;
let disciplinaId;

beforeAll(async () => {
    // login
    const login = await request(app).post("/auth/login").send({
        email: "teste@email.com",
        senha: "123456"
    });

    token = login.body.token;

    // cria disciplina
    const disc = await request(app)
        .post("/disciplinas")
        .set("Authorization", `Bearer ${token}`)
        .send({
            nome: "Matemática",
            carga_horaria: 80
        });

    disciplinaId = disc.body.id || 1;

    // cria aluno
    const aluno = await request(app)
        .post("/alunos")
        .set("Authorization", `Bearer ${token}`)
        .send({
            nome: "Aluno Teste",
            cpf: `${Date.now()}`,
        });

    alunoId = aluno.body.id || 1;
});

describe("Notas", () => {

    it("deve criar nota", async () => {
        const res = await request(app)
            .post("/notas")
            .set("Authorization", `Bearer ${token}`)
            .send({
                aluno_id: alunoId,
                disciplina_id: disciplinaId,
                nota: 8.5,
                bimestre: "1º"
            });

        expect(res.statusCode).toBe(201);
    });

});