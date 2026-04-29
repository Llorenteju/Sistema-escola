import conexao from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

// REGISTRAR
export const registrar = async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Nome, email e senha são obrigatórios"
            });
        }

        const [rows] = await conexao.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({
                mensagem: "Email já cadastrado"
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await conexao.query(
            `INSERT INTO usuarios (nome, email, senha, perfil)
       VALUES (?, ?, ?, ?)`,
            [nome, email, senhaCriptografada, perfil || "admin"]
        );

        res.status(201).json({
            mensagem: "Usuário criado com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao registrar",
            erro: error.message
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios"
            });
        }

        const [rows] = await conexao.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        const usuario = rows[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: "Senha inválida"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        res.json({
            mensagem: "Login realizado com sucesso",
            token
        });

    } catch (error) {
        res.status(500).json({
            mensagem: "Erro no login",
            erro: error.message
        });
    }
};