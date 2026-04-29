import request from "supertest";
import app from "../app.js";

describe("Auth", () => {

    const usuario = {
        nome: "Teste",
        email: `teste${Date.now()}@email.com`,
        senha: "123456"
    };

    it("deve criar um usuário", async () => {
        const res = await request(app)
            .post("/auth/registrar")
            .send(usuario);

        expect(res.statusCode).toBe(201);
    });

    it("não deve criar usuário duplicado", async () => {
        const res = await request(app)
            .post("/auth/registrar")
            .send(usuario);

        expect(res.statusCode).toBe(400);
    });

    it("deve fazer login", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: usuario.email,
                senha: usuario.senha
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("deve falhar com senha errada", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: usuario.email,
                senha: "errada"
            });

        expect(res.statusCode).toBe(401);
    });

});