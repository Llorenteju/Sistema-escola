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

describe("Turmas", () => {

    it("deve criar turma", async () => {
        const res = await request(app)
            .post("/turmas")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Turma A",
                ano_letivo: 2025
            });

        expect(res.statusCode).toBe(201);
    });

});