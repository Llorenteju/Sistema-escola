import * as alunoModel from "../models/alunoModel.js";

// LISTAR
export const listarAlunos = async (req, res) => {
  try {
    const alunos = await alunoModel.getAlunos();
    res.json(alunos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar alunos" });
  }
};

// CRIAR
export const criarAluno = async (req, res) => {
  try {
    const {
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status
    } = req.body;

    if (!nome?.trim() || !cpf?.trim()) {
      return res.status(400).json({
        erro: "Nome e CPF são obrigatórios"
      });
    }

    const id = await alunoModel.createAluno({
      nome,
      cpf,
      email,
      telefone,
      data_nascimento,
      turma_id,
      status
    });

    res.status(201).json({
      mensagem: "Aluno criado com sucesso",
      id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar aluno" });
  }
};

// ATUALIZAR
export const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const alunoExistente = await alunoModel.getAlunoById(id);

    if (!alunoExistente) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    await alunoModel.updateAluno(id, req.body);

    res.json({ mensagem: "Aluno atualizado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar aluno" });
  }
};

// DELETAR
export const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const alunoExistente = await alunoModel.getAlunoById(id);

    if (!alunoExistente) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    await alunoModel.deleteAluno(id);

    res.json({ mensagem: "Aluno deletado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar aluno" });
  }
};