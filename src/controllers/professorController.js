import * as professorModel from "../models/professorModel.js";

// LISTAR
export const listarProfessores = async (req, res) => {
  try {
    const professores = await professorModel.getProfessores();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar professores" });
  }
};

export const criarProfessor = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade } = req.body;

    const emailValido = /\S+@\S+\.\S+/;

    if (!nome?.trim() || !email?.trim() || !especialidade?.trim()) {
      return res.status(400).json({
        erro: "Nome, email e especialidade são obrigatórios"
      });
    }

    if (!emailValido.test(email)) {
      return res.status(400).json({
        erro: "Email inválido"
      });
    }

    const id = await professorModel.createProfessor({
      nome,
      email,
      telefone,
      especialidade,
    });

    res.status(201).json({
      mensagem: "Professor criado com sucesso",
      id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar professor" });
  }
};

// ATUALIZAR
export const atualizarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professorExistente = await professorModel.getProfessorById(id);

    if (!professorExistente) {
      return res.status(404).json({ erro: "Professor não encontrado" });
    }

    await professorModel.updateProfessor(id, req.body);

    res.json({ mensagem: "Professor atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar professor" });
  }
};

// DELETAR
export const deletarProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professorExistente = await professorModel.getProfessorById(id);

    if (!professorExistente) {
      return res.status(404).json({ erro: "Professor não encontrado" });
    }

    await professorModel.deleteProfessor(id);

    res.json({ mensagem: "Professor deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar professor" });
  }
};