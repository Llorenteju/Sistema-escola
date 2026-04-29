import conexao from "../config/db.js";

// LISTAR USUÁRIOS
export const getUsuarios = async () => {
  const [rows] = await conexao.query(`
    SELECT id, nome, email, perfil, criado_em 
    FROM usuarios
  `);

  return rows;
};

// BUSCAR POR ID
export const getUsuarioById = async (id) => {
  const [rows] = await conexao.query(
    "SELECT id, nome, email, perfil, criado_em FROM usuarios WHERE id = ?",
    [id]
  );

  return rows[0];
};

// DELETAR
export const deleteUsuario = async (id) => {
  await conexao.query("DELETE FROM usuarios WHERE id = ?", [id]);
};