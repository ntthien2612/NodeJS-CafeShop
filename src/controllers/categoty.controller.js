// Export the functions individually using ESM syntax
import db from "../models/index";
const Category = db.tables.category;

const getAllCategory = async (req, res) => {

  try {
    const data_categorys = await Category.findAll({
      where: {
        delete: 0
      }
    });
    let dataValues = [];
    for (let item of data_categorys) {
      dataValues.push(item.dataValues);
    }

    return res.status(200).send(JSON.stringify(dataValues));
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

};

const createCategory = async (req, res) => {
  try {
    const category = req.body;

    let dataCreate = await Category.create({
      category_name: category.category_name
    })
    return res.status(200).send("create category successfully!");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

};

const putCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = req.body; // Assuming you send the updated data in the request body

    // Find the user by ID
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the user's data
    await category.update(updatedCategory);

    return res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find the user by ID
    const category = await Category.findByPk(categoryId);

    await category.update({ delete: 1 })

    return res.status(200).send("Category delete successfully");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export { getAllCategory, createCategory, putCategory, deleteCategory }