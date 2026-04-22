import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const verificarToken = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ menasagem: "Token não informado" })
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwtverify(token, jwtConfig.secret);
        req.usuario = decoded
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido" })
    }
}

