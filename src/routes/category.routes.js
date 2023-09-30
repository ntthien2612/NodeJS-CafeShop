import * as controller from "../controllers/categoty.controller";
import {authJwt} from "../middlewares/authJwt"
export async function CategoryRouter(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/category",controller.getAllCategory);
  app.post("/api/v1/category", controller.createCategory);
  app.put("/api/v1/category/:categoryId", controller.putCategory);
  app.delete("/api/v1/category/:categoryId", controller.deleteCategory);
  
}