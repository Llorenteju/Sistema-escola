import conexao from "../config/db.js";

// LISTAR COM JOIN
export const getAlunos = async () => {
    const [rows] = await conexao.query(`
    SELECT 
      alunos.*,
      turmas.nome AS turma
    FROM alunos
    LEFT JOIN turmas ON alunos.turma_id = turmas.id
  `);

    return rows;
};

// BUSCAR POR ID
export const getAlunoById = async (id) => {
    const [rows] = await conexao.query(
        "SELECT * FROM alunos WHERE id = ?",
        [id]
    );
    return rows[0];
};

// CRIAR
export const createAluno = async (dados) => {
    const {
        nome,
        cpf,
        email,
        telefone,
        data_nascimento,
        turma_id,
        status
    } = dados;

    const [result] = await conexao.query(
        `INSERT INTO alunos 
    (nome, cpf, email, telefone, data_nascimento, turma_id, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            nome,
            cpf,
            email,
            telefone,
            data_nascimento,
            turma_id,
            status || "ativo"
        ]
    );

    return result.insertId;
};

// ATUALIZAR
export const updateAluno = async (id, dados) => {
    const {
        nome,
        cpf,
        email,
        telefone,
        data_nascimento,
        turma_id,
        status
    } = dados;

    await conexao.query(
        `UPDATE alunos SET 
      nome=?, cpf=?, email=?, telefone=?, 
      data_nascimento=?, turma_id=?, status=? 
     WHERE id=?`,
        [
            nome,
            cpf,
            email,
            telefone,
            data_nascimento,
            turma_id,
            status,
            id
        ]
    );
};

// DELETAR
export const deleteAluno = async (id) => {
    await conexao.query("DELETE FROM alunos WHERE id=?", [id]);
};