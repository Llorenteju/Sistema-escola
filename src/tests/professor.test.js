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
describe("Professores", () => {

    it("deve criar professor", async () => {
        const res = await request(app)
            .post("/professores")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Carlos",
                email: "carlos@email.com",
                especialidade: "Matemática"
            });

        expect(res.statusCode).toBe(201);
    });

});