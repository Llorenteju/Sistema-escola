import * as turmaModel from "../models/turmaModel.js";
import conexao from "../config/db.js";

// LISTAR
export const listarTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getTurmas();
        res.json(turmas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar turmas" });
    }
};

// CRIAR
export const criarTurma = async (req, res) => {
    try {
        const { nome, ano_letivo, professor_id } = req.body;

        if (!nome?.trim() || !ano_letivo) {
            return res.status(400).json({
                erro: "Nome e ano_letivo são obrigatórios"
            });
        }


        if (professor_id) {
            const [prof] = await conexao.query(
                "SELECT id FROM professores WHERE id = ?",
                [professor_id]
            );

            if (!prof.length) {
                return res.status(404).json({
                    erro: "Professor não encontrado"
                });
            }
        }

        const id = await turmaModel.createTurma({
            nome,
            ano_letivo,
            professor_id
        });

        res.status(201).json({
            mensagem: "Turma criada com sucesso",
            id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar turma" });
    }
};

// ATUALIZAR
export const atualizarTurma = async (req, res) => {
    try {
        const { id } = req.params;

        const turmaExistente = await turmaModel.getTurmaById(id);

        if (!turmaExistente) {
            return res.status(404).json({ erro: "Turma não encontrada" });
        }

        await turmaModel.updateTurma(id, req.body);

        res.json({ mensagem: "Turma atualizada com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar turma" });
    }
};

// DELETAR
export const deletarTurma = async (req, res) => {
    try {
        const { id } = req.params;

        const turmaExistente = await turmaModel.getTurmaById(id);

        if (!turmaExistente) {
            return res.status(404).json({ erro: "Turma não encontrada" });
        }

        await turmaModel.deleteTurma(id);

        res.json({ mensagem: "Turma deletada com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar turma" });
    }
};