export const jwtConfig = {
  secret: process.env.JWT_SECRET || "segredo_super_secreto",
  expiresIn: "1d"
};