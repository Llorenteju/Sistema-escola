import { Router } from "express";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  deletarAluno
} from "../controllers/alunoController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos com suas turmas
 */
router.get("/", verificarToken, listarAlunos);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cadastrar um novo aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: João Silva
 *             cpf: 12345678900
 *             email: joao@email.com
 *             telefone: "11999999999"
 *             data_nascimento: "2005-08-15"
 *             turma_id: 1
 *             status: ativo
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", verificarToken, criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualizar um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nome: João Atualizado
 *             cpf: 12345678900
 *             turma_id: 2
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.put("/:id", verificarToken, atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Deletar um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete("/:id", verificarToken, deletarAluno);

export default router;