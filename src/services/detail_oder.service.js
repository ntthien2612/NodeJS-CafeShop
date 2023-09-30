// import bd
import db from "../models/index";
const Product = db.tables.products;

const Op = db.Sequelize.Op;
// Sử dụng async/await để lấy danh sách vai trò của người dùng
async function getPriceProduct(detail_order_bill) {
    try {
        // get price product
        var PriceProduct = []
        for (let item of detail_order_bill) {
            const product = await Product.findByPk(item.id_product);
            PriceProduct.push({id_product: product.id, price: product.price});
        }

        return PriceProduct;

    } catch (error) {
        console.error('Lỗi không lấy được danh sách sản phẩm:', error);
    } 
}

async function createDetailOrderBill(orderId,detail_order_bill) {
    try {
        // create obj detail order
        const addDetailOrder = detail_order_bill.map((item) => ({
            id_order: orderId,
            id_product: item.id_product,
            number : item.number,
            note: item.note
        }));

        return addDetailOrder
    } catch (error) {
        console.error('Lỗi không lấy được danh sách sản phẩm:', error);
    } 
}

export { getPriceProduct , createDetailOrderBill};