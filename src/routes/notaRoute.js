import { Router } from "express";
import {
    listarNotas,
    criarNota,
    atualizarNota,
    deletarNota,
    mediaPorAluno
} from "../controllers/notaController.js";

import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Lista todas as notas com aluno e disciplina
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas com informações de aluno e disciplina
 */
router.get("/", verificarToken, listarNotas);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Cadastrar uma nova nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             aluno_id: 1
 *             disciplina_id: 2
 *             nota: 8.5
 *             bimestre: "1º"
 *             observacao: "Boa participação"
 *     responses:
 *       201:
 *         description: Nota cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", verificarToken, criarNota);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualizar uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             aluno_id: 1
 *             disciplina_id: 2
 *             nota: 9.0
 *             bimestre: "1º"
 *             observacao: "Melhora significativa"
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.put("/:id", verificarToken, atualizarNota);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Deletar uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota deletada com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.delete("/:id", verificarToken, deletarNota);

/**
 * @swagger
 * /notas/media:
 *   get:
 *     summary: Retorna a média das notas por aluno
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista com médias dos alunos
 */
router.get("/media", verificarToken, mediaPorAluno);

export default router;