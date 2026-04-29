import * as notaModel from "../models/notaModel.js";

// LISTAR
export const listarNotas = async (req, res) => {
    try {
        const notas = await notaModel.getNotas();
        res.json(notas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar notas" });
    }
};

// CRIAR
export const criarNota = async (req, res) => {
    try {
        const { aluno_id, disciplina_id, nota, bimestre } = req.body;

        if (!aluno_id || !disciplina_id || nota == null || !bimestre) {
            return res.status(400).json({
                erro: "aluno_id, disciplina_id, nota e bimestre são obrigatórios"
            });
        }

        const id = await notaModel.createNota(req.body);

        res.status(201).json({
            mensagem: "Nota cadastrada com sucesso",
            id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar nota" });
    }
};

// ATUALIZAR
export const atualizarNota = async (req, res) => {
    try {
        const { id } = req.params;

        const notaExistente = await notaModel.getNotaById(id);

        if (!notaExistente) {
            return res.status(404).json({ erro: "Nota não encontrada" });
        }

        await notaModel.updateNota(id, req.body);

        res.json({ mensagem: "Nota atualizada com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar nota" });
    }
};

// DELETAR
export const deletarNota = async (req, res) => {
    try {
        const { id } = req.params;

        const notaExistente = await notaModel.getNotaById(id);

        if (!notaExistente) {
            return res.status(404).json({ erro: "Nota não encontrada" });
        }

        await notaModel.deleteNota(id);

        res.json({ mensagem: "Nota deletada com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar nota" });
    }
};

// MÉDIA
export const mediaPorAluno = async (req, res) => {
    try {
        const medias = await notaModel.getMediaPorAluno();
        res.json(medias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao calcular média" });
    }
};