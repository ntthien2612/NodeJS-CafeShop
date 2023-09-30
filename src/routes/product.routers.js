import * as controller from "../controllers/product.controller";
import {authJwt} from "../middlewares/authJwt"

export async function ProductRouter(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/product", controller.getAllProduct);
  app.get("/api/v1/product/:categoryId",controller.getProductByCategory);
  app.post("/api/v1/product", controller.createProduct);
  app.put("/api/v1/product/:productId", controller.putProduct);
  app.delete("/api/v1/product/:productId", controller.deleteProduct);
  
}