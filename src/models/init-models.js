import { DataTypes } from "sequelize";
import _category from "./category";
import _detail_order_bill from "./detail_order_bill";
import _order_bill from "./order_bill";
import _products from "./products";
import _roles from "./roles";
import _tables from "./tables";
import _users from "./users";
import _users_roles from "./users_roles";

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var detail_order_bill = _detail_order_bill(sequelize, DataTypes);
  var order_bill = _order_bill(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var tables = _tables(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_roles = _users_roles(sequelize, DataTypes);

  roles.belongsToMany(users, { as: 'users_id_users', through: users_roles, foreignKey: "roles_id", otherKey: "users_id" });
  users.belongsToMany(roles, { as: 'roles_id_roles', through: users_roles, foreignKey: "users_id", otherKey: "roles_id" });
  products.belongsTo(category, { as: "id_category_category", foreignKey: "id_category"});
  category.hasMany(products, { as: "products", foreignKey: "id_category"});
  detail_order_bill.belongsTo(order_bill, { as: "id_order_order_bill", foreignKey: "id_order"});
  order_bill.hasMany(detail_order_bill, { as: "detail_order_bills", foreignKey: "id_order"});
  detail_order_bill.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(detail_order_bill, { as: "detail_order_bills", foreignKey: "id_product"});
  users_roles.belongsTo(roles, { as: "role", foreignKey: "roles_id"});
  roles.hasMany(users_roles, { as: "users_roles", foreignKey: "roles_id"});
  order_bill.belongsTo(tables, { as: "id_table_table", foreignKey: "id_table"});
  tables.hasMany(order_bill, { as: "order_bills", foreignKey: "id_table"});
  order_bill.belongsTo(users, { as: "id_user_order_user", foreignKey: "id_user_order"});
  users.hasMany(order_bill, { as: "order_bills", foreignKey: "id_user_order"});
  users_roles.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(users_roles, { as: "users_roles", foreignKey: "users_id"});

  return {
    category,
    detail_order_bill,
    order_bill,
    products,
    roles,
    tables,
    users,
    users_roles,
  };
}
export { initModels} ;