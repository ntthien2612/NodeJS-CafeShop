import * as controller from "../controllers/orderBill.controller";
import {authJwt} from "../middlewares/authJwt"

export async function OrderBillRouter(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/order", controller.getAllOrder);
  app.get("/api/v1/bill", controller.getAllBill);
  app.get("/api/v1/payment", controller.getAllPayment);
  app.get("/api/v1/getAllOrderBill", controller.getAllOderBill);

  app.post("/api/v1/order/:tableId", [authJwt.verifyToken] , controller.createOrder);

  app.put("/api/v1/order/:orderId",  [authJwt.verifyToken] , controller.conformBill);
  app.put("/api/v1/payment/:orderId", [authJwt.verifyToken] , controller.conformPayment);

  app.delete("/api/v1/order/:orderId",[authJwt.verifyToken],controller.deleteOrder);
  
}