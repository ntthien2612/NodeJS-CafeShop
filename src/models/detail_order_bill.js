import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('detail_order_bill', {
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order_bill',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detail_order_bill',
    timestamps: false,
    indexes: [
      {
        name: "id_order",
        using: "BTREE",
        fields: [
          { name: "id_order" },
        ]
      },
      {
        name: "id_product",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
    ]
  });
};
