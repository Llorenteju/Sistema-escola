import conexao from "../config/db.js";

export const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexao.query(`
      SELECT id, nome, email, perfil, criado_em 
      FROM usuarios
    `);

        res.json(usuarios);

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar usuarios",
            erro: error.message
        });
    }
};