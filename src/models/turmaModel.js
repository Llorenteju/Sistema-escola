import conexao from "../config/db.js";

// LISTAR COM JOIN
export const getTurmas = async () => {
    const [rows] = await conexao.query(`
    SELECT 
      turmas.*,
      professores.nome AS professor
    FROM turmas
    LEFT JOIN professores ON turmas.professor_id = professores.id
  `);

    return rows;
};

// BUSCAR POR ID
export const getTurmaById = async (id) => {
    const [rows] = await conexao.query(
        "SELECT * FROM turmas WHERE id = ?",
        [id]
    );
    return rows[0];
};

// CRIAR
export const createTurma = async (dados) => {
    const { nome, ano_letivo, professor_id } = dados;

    const [result] = await conexao.query(
        `INSERT INTO turmas (nome, ano_letivo, professor_id)
     VALUES (?, ?, ?)`,
        [nome, ano_letivo, professor_id]
    );

    return result.insertId;
};

// ATUALIZAR
export const updateTurma = async (id, dados) => {
    const { nome, ano_letivo, professor_id } = dados;

    await conexao.query(
        `UPDATE turmas 
     SET nome=?, ano_letivo=?, professor_id=? 
     WHERE id=?`,
        [nome, ano_letivo, professor_id, id]
    );
};

// DELETAR
export const deleteTurma = async (id) => {
    await conexao.query("DELETE FROM turmas WHERE id=?", [id]);
};