import { Router } from "express";
import { listarUsuarios } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddlewares.js";

const router = Router();

router.get("/", verificarToken, listarUsuarios);

export default router;