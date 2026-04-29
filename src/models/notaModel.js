import conexao from "../config/db.js";

// LISTAR COM JOIN
export const getNotas = async () => {
    const [rows] = await conexao.query(`
    SELECT 
      notas.id,
      alunos.nome AS aluno,
      disciplinas.nome AS disciplina,
      notas.nota,
      notas.bimestre,
      notas.observacao
    FROM notas
    INNER JOIN alunos ON notas.aluno_id = alunos.id
    INNER JOIN disciplinas ON notas.disciplina_id = disciplinas.id
  `);

    return rows;
};

// BUSCAR POR ID
export const getNotaById = async (id) => {
    const [rows] = await conexao.query(
        "SELECT * FROM notas WHERE id = ?",
        [id]
    );
    return rows[0];
};

// CRIAR
export const createNota = async (dados) => {
    const { aluno_id, disciplina_id, nota, bimestre, observacao } = dados;

    const [result] = await conexao.query(
        `INSERT INTO notas 
    (aluno_id, disciplina_id, nota, bimestre, observacao)
    VALUES (?, ?, ?, ?, ?)`,
        [aluno_id, disciplina_id, nota, bimestre, observacao]
    );

    return result.insertId;
};

// ATUALIZAR
export const updateNota = async (id, dados) => {
    const { aluno_id, disciplina_id, nota, bimestre, observacao } = dados;

    await conexao.query(
        `UPDATE notas SET 
      aluno_id=?, disciplina_id=?, nota=?, bimestre=?, observacao=? 
     WHERE id=?`,
        [aluno_id, disciplina_id, nota, bimestre, observacao, id]
    );
};

// DELETAR
export const deleteNota = async (id) => {
    await conexao.query("DELETE FROM notas WHERE id=?", [id]);
};

// MÉDIA POR ALUNO
export const getMediaPorAluno = async () => {
    const [rows] = await conexao.query(`
    SELECT 
      alunos.nome AS aluno,
      AVG(notas.nota) AS media
    FROM notas
    INNER JOIN alunos ON notas.aluno_id = alunos.id
    GROUP BY alunos.id
  `);

    return rows;
};