import * as disciplinaModel from "../models/disciplinaModel.js";

// LISTAR
export const listarDisciplinas = async (req, res) => {
    try {
        const disciplinas = await disciplinaModel.getDisciplinas();
        res.json(disciplinas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar disciplinas" });
    }
};

// CRIAR
export const criarDisciplina = async (req, res) => {
    try {
        const { nome, carga_horaria } = req.body;

        if (!nome?.trim() || !carga_horaria) {
            return res.status(400).json({
                erro: "Nome e carga_horaria são obrigatórios"
            });
        }

        const id = await disciplinaModel.createDisciplina({
            nome,
            carga_horaria
        });

        res.status(201).json({
            mensagem: "Disciplina criada com sucesso",
            id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar disciplina" });
    }
};

// ATUALIZAR
export const atualizarDisciplina = async (req, res) => {
    try {
        const { id } = req.params;

        const disciplinaExistente = await disciplinaModel.getDisciplinaById(id);

        if (!disciplinaExistente) {
            return res.status(404).json({ erro: "Disciplina não encontrada" });
        }

        await disciplinaModel.updateDisciplina(id, req.body);

        res.json({ mensagem: "Disciplina atualizada com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar disciplina" });
    }
};

// DELETAR
export const deletarDisciplina = async (req, res) => {
    try {
        const { id } = req.params;

        const disciplinaExistente = await disciplinaModel.getDisciplinaById(id);

        if (!disciplinaExistente) {
            return res.status(404).json({ erro: "Disciplina não encontrada" });
        }

        await disciplinaModel.deleteDisciplina(id);

        res.json({ mensagem: "Disciplina deletada com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar disciplina" });
    }
};