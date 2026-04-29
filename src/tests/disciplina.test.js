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

describe("Disciplinas", () => {

    it("deve criar disciplina", async () => {
        const res = await request(app)
            .post("/disciplinas")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Matemática",
                carga_horaria: 80
            });

        expect(res.statusCode).toBe(201);
    });

    it("deve falhar sem carga horária", async () => {
        const res = await request(app)
            .post("/disciplinas")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "História"
            });

        expect(res.statusCode).toBe(400);
    });

});