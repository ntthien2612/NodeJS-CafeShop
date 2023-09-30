const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto("cafe_shop","root", "", {
  host: "localhost",
  dialect: "mysql",
  directory: './src/models', // Thư mục để lưu trữ các mô hình được tạo ra
  additional: {
    timestamps: false, // Tùy chọn: Tắt tự động thêm createdAt và updatedAt cho mỗi mô hình
  },
  es6: true
});

auto.run(function (err) {
  if (err) throw err;
  console.log('Tạo mô hình thành công!');
});