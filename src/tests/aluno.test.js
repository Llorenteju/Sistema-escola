import request from "supertest";
import app from "../app.js";

let token = "";

beforeAll(async () => {
  
    await request(app)
        .post("/auth/registrar")
        .send({
            nome: "Teste",
            email: "teste@email.com",
            senha: "123456"
        });


    const res = await request(app)
        .post("/auth/login")
        .send({
            email: "teste@email.com",
            senha: "123456"
        });

    token = res.body.token;

    console.log("TOKEN:", token);
});

describe("Alunos", () => {

    it("deve listar alunos", async () => {
        const res = await request(app)
            .get("/alunos")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("deve falhar ao criar aluno sem nome", async () => {
        const res = await request(app)
            .post("/alunos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                cpf: "12345678900"
            });

        expect(res.statusCode).toBe(400);
    });

});