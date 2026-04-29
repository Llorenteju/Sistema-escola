import { Router } from "express";
import { registrar, login } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: Julia
 *             email: julia@email.com
 *             senha: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/registrar", registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: julia@email.com
 *             senha: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Login realizado com sucesso
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Email e senha obrigatórios
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 */
router.post("/login", login);

export default router;