// Import necessary modules using ESM syntax
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";

import { AuthRouter } from "./routes/auth.routes"
import { TableRouter } from "./routes/table.routes"
import { CategoryRouter } from "./routes/category.routes";
import { ProductRouter } from "./routes/product.routers"
import { OrderBillRouter } from "./routes/order_bill.routes"
import bodyParser from "body-parser";

import path from "path";

import db from "./models/index";

global.__basedir = __dirname;


var corsOptions = {
  origin: "http://localhost:8081"
};



const app = express();

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// give public access to public folder
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as a secret environment variable
    httpOnly: true,
  })
);


const roles = db.tables.roles;


// khởi tạo database khi chưa có
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
 
// });

// khởi tạo quyền khi chưa có
// if(!checkIfTableHasData(roles)){
//   initial();
// }

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// main router
AuthRouter(app);
TableRouter(app);
CategoryRouter(app);
ProductRouter(app);
OrderBillRouter(app);

// connect server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:8081`);
});

// khởi tạo quyền người dùng
function initial() {
  roles.create({
    id: 1,
    role_name	: "admin"
  });

  roles.create({
    id: 2,
    role_name	: "order"
  });

  roles.create({
    id: 3,
    role_name	: "bartender"
  });
}

// check table có dữ liệu chưa
async function checkIfTableHasData(Table) {
    const rowCount = await Table.count();
    if (rowCount > 0) {
      return true;
    } else {
      return false;
    }
}
