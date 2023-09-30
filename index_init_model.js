import { config } from "../config/db.config";
import { Sequelize, DataTypes } from "sequelize";
import { initModels } from "./init-models"
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    define: {
      timestamps: false
    }
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.ROLES = ["admin", "order", "bartender"];

// conact table
db.tables = initModels(sequelize);

export default db;