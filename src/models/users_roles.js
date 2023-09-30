import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('users_roles', {
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    roles_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'users_roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "users_id" },
          { name: "roles_id" },
        ]
      },
      {
        name: "roles_id",
        using: "BTREE",
        fields: [
          { name: "roles_id" },
        ]
      },
    ]
  });
};
