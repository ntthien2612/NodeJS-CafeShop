import * as controller from "../controllers/table.controller";
import {authJwt} from "../middlewares/authJwt"
export async function TableRouter(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/table",controller.getAllTable);
  app.post("/api/v1/table", controller.createTable);
  app.put("/api/v1/table/:tableId", controller.putTable);
  app.delete("/api/v1/table/:tableId", controller.deleteTable);
  
}