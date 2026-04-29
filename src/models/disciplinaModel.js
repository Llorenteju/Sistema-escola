import conexao from "../config/db.js";

// LISTAR
export const getDisciplinas = async () => {
    const [rows] = await conexao.query("SELECT * FROM disciplinas");
    return rows;
};

// BUSCAR POR ID
export const getDisciplinaById = async (id) => {
    const [rows] = await conexao.query(
        "SELECT * FROM disciplinas WHERE id = ?",
        [id]
    );
    return rows[0];
};

// CRIAR
export const createDisciplina = async (dados) => {
    const { nome, carga_horaria } = dados;

    const [result] = await conexao.query(
        "INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)",
        [nome, carga_horaria]
    );

    return result.insertId;
};

// ATUALIZAR
export const updateDisciplina = async (id, dados) => {
    const { nome, carga_horaria } = dados;

    await conexao.query(
        "UPDATE disciplinas SET nome=?, carga_horaria=? WHERE id=?",
        [nome, carga_horaria, id]
    );
};

// DELETAR
export const deleteDisciplina = async (id) => {
    await conexao.query("DELETE FROM disciplinas WHERE id=?", [id]);
};