
// Export the configuration object using ESM syntax
export const config =  {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "cafe_shop",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};