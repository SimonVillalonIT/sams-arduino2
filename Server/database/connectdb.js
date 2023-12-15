import { Sequelize } from "sequelize";

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

export const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  define: {
    underscored: true,
    freezeTableName: true,
  },
});

export default async function ConnectDB() {
  try {
    await db.authenticate();
    console.log("Conectado a la base de datos.");
    await import("../models/associations.js");
    console.log("Relaciones cargadas");
    await db.sync({force: true});
    console.log("Base de datos sincronizada.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}
