// Export the functions individually using ESM syntax
import { uploadFileMiddleware } from "../middlewares/uploadProduct";

import { constan } from "../const/constan";

import db from "../models/index";
const Product = db.tables.products;

// thư viện OP thực hiện query
const Op = db.Sequelize.Op;

// get all product
const getAllProduct = async (req, res) => {
  try {
    const productName = req.query.product_name;
    if (productName) {
      return await getProductByName(req, res)
    }
    const data_products = await Product.findAll({
      where: {
        delete: 0
      },
      order: [['id_category', 'ASC'], ['product_name', 'ASC']]
    });
    let dataValues = [];
    for (let item of data_products) {
      dataValues.push(item.dataValues);
    }
    return res.status(200).send(JSON.stringify(dataValues));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// get all product by category
const getProductByCategory = async (req, res) => {
  try {
    const categoryId = await req.params.categoryId;
    if (categoryId) {
      const data_products = await Product.findAll({
        where: {
          id_category: Number(categoryId),
          delete: 0
        },
        order: [['product_name', 'ASC']]
      });
      let dataValues = [];
      for (let item of data_products) {
        dataValues.push(item.dataValues);
      }
      return res.status(200).send(JSON.stringify(dataValues));
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// get all product by category
const getProductByName = async (req, res) => {
  try {
    const productName = req.query.product_name;
    console.log(productName);
    const data_products = await Product.findAll({
      where: {
        product_name: { [Op.like]: `%${productName}%` },
        delete: 0
      },
      order: [['product_name', 'ASC']]
    });
    let dataValues = [];
    for (let item of data_products) {
      dataValues.push(item.dataValues);
    }
    return res.status(200).send(JSON.stringify(dataValues));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


const createProduct = async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let img_name = constan.HOST + "/static/assets/uploads/" + req.file.filename;

    const product = req.body;

    let dataCreate = await Product.create({
      id_category: Number(product.id_category),
      product_name: product.product_name,
      price: Number(product.price),
      cost: Number(product.cost),
      img: img_name
    })

    return res.status(200).send({
      message: "Create Product is successfully!"
    });
  } catch (err) {
    return res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
}
const putProduct = async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);
    var img_name = ''
    if (req.file) {
      img_name = constan.HOST + "/static/assets/uploads/" + req.file.filename;
    }

    const productId = await req.params.productId;
    // Find the user by ID
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedProduct = await req.body; // Assuming you send the updated data in the request body

    let result = await product.update({
      id: productId,
      product_name: updatedProduct.product_name,
      price: Number(updatedProduct.price),
      cost: Number(updatedProduct.cost),
      img: img_name || product.img
    })

    return res.status(200).json({ message: 'Product updated successfully!' });

  } catch (err) {
    return res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the user by ID
    const product = await Product.findByPk(productId);

    await product.update({ delete: 1 })

    return res.status(200).send("Product delete successfully!");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export { getAllProduct, createProduct, putProduct, deleteProduct, getProductByCategory, getProductByName }