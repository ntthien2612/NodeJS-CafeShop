import { constan } from "../const/constan";
import { getPriceProduct, createDetailOrderBill } from "../services/detail_oder.service"
import db from "../models/index";
const OrderBill = db.tables.order_bill;
const DetailOrder = db.tables.detail_order_bill;

export const getAllOrder = async (req, res) => {

    try {
        const data_order_bill = await OrderBill.findAll();
        let dataValues = [];
        for (let item of data_order_bill) {
            dataValues.push(item.dataValues);
        }
        return res.status(200).send(JSON.stringify(dataValues));
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getAllBill = async (req, res) => {

    try {
        const data_order_bill = await OrderBill.findAll();
        let dataValues = [];
        for (let item of data_order_bill) {
            dataValues.push(item.dataValues);
        }
        return res.status(200).send(JSON.stringify(dataValues));
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getAllPayment = async (req, res) => {

    try {
        const data_order_bill = await OrderBill.findAll();
        let dataValues = [];
        for (let item of data_order_bill) {
            dataValues.push(item.dataValues);
        }
        return res.status(200).send(JSON.stringify(dataValues));
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getAllOderBill = async (req, res) => {

    try {
        const data_order_bill = await OrderBill.findAll();
        let dataValues = [];
        for (let item of data_order_bill) {
            dataValues.push(item.dataValues);
        }
        return res.status(200).send(JSON.stringify(dataValues));
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


export const createOrder = async (req, res) => {
    try {
        const id_table = req.params.tableId;
        const dataCreate = req.body;
        const id_user_order = req.userId;
        let total_money = 0;
        let detail_order_bill = dataCreate.detail_order_bill;
        let priceOderBill
        // check detail order
        if (detail_order_bill) {
            priceOderBill = await getPriceProduct(detail_order_bill);
        } else {
            return res.status(404).json({ message: 'Detail Order Bill not found' });
        }
        // tính giá 
        priceOderBill.forEach((element, index) => {
            total_money += element.price * detail_order_bill[index].number;
        });
        // tạo obj order
        const order = {
            id_table: id_table,
            id_user_order: id_user_order,
            status: "order",
            total_money: total_money,
        }
        // create oder
        var result = await OrderBill.create(order);
        // create detail order bill
        var dataAddDetailOrder = await createDetailOrderBill(result.dataValues.id, detail_order_bill);
        await DetailOrder.bulkCreate(dataAddDetailOrder);

        return res.status(200).send("Order successfully!");
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

};

export const conformBill = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const dataconformBill = req.body;
        const id_user_bartender = req.userId;

        const order_bill = await OrderBill.findByPk(orderId);

        if (!order_bill) {
            return res.status(404).json({ message: 'No Bill!' });
        }
        if (order_bill.status !== "order" && order_bill.delete == 0) {
            return res.status(404).json({ message: 'Bill has no order!' });
        }
        await order_bill.update({
            id_user_bartender: id_user_bartender,
            status: dataconformBill.status,
            updatedAt: Date.now()
        })

        return res.status(200).json({ message: 'Finished mixing successfully!' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const conformPayment = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const dataconformPayment = req.body;
        const id_user_payment = req.userId;

        const order_bill = await OrderBill.findByPk(orderId);

        if (!order_bill) {
            return res.status(404).json({ message: 'No Bill!' });
        }
        if (order_bill.status !== "bill") {
            return res.status(404).json({ message: 'No Bill payment!' });
        }
        await order_bill.update({
            id_user_order: id_user_payment,
            status: dataconformPayment.status,
            updatedAt: Date.now()
        })

        return res.status(200).json({ message: 'Payment has been successful' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};



export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        // Find the user by ID
        const dataOrder = await OrderBill.findByPk(orderId);
        
        if (!dataOrder) {
            return res.status(404).json({ message: 'No Order!' });
        }
        if (dataOrder.status !== "order") {
            return res.status(404).json({ message: 'Can not delete!' });
        }

        await dataOrder.update({ delete: 1 })
        
        return res.status(200).send("Order delete successfully");
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

