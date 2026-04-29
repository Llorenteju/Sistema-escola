
import conexao from "../config/db.js";

// LISTAR
export const getProfessores = async () => {
  const [rows] = await conexao.query("SELECT * FROM professores");
  return rows;
};

// BUSCAR POR ID (bom pra validação)
export const getProfessorById = async (id) => {
  const [rows] = await conexao.query(
    "SELECT * FROM professores WHERE id = ?",
    [id]
  );
  return rows[0];
};

// CRIAR
export const createProfessor = async (dados) => {
  const { nome, email, telefone, especialidade } = dados;

  const [result] = await conexao.query(
    "INSERT INTO professores (nome, email, telefone, especialidade) VALUES (?,?,?,?)",
    [nome, email, telefone, especialidade]
  );

  return result.insertId;
};

// ATUALIZAR
export const updateProfessor = async (id, dados) => {
  const { nome, email, telefone, especialidade } = dados;

  await conexao.query(
    "UPDATE professores SET nome=?, email=?, telefone=?, especialidade=? WHERE id=?",
    [nome, email, telefone, especialidade, id]
  );
};

// DELETAR
export const deleteProfessor = async (id) => {
  await conexao.query("DELETE FROM professores WHERE id=?", [id]);
};