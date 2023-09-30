// Export the functions individually using ESM syntax
import db from "../models/index";
const Table = db.tables.tables;

const getAllTable = async (req, res) => {


    try {
        const data_tables = await Table.findAll({
            where: {
                delete: 0
            }
        });
        let dataValues = [];
        for (let item of data_tables) {
            dataValues.push(item.dataValues);
        }

        return res.status(200).send(JSON.stringify(dataValues));
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const createTable = async (req, res) => {
    try {
        const table = req.body;

        let dataCreate = await Table.create({
            table_name: table.table_name
        })

        console.log(dataCreate);
        return res.status(200).send("create table successfully!");
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

};

const putTable = async (req, res) => {
    try {

        const tableId = req.params.tableId;
        const updatedTable = req.body; // Assuming you send the updated data in the request body

        // Find the user by ID
        const table = await Table.findByPk(tableId);

        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        // Update the user's data
        await table.update(updatedTable);

        return res.status(200).json({ message: 'Table updated successfully' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

};

const deleteTable = async (req, res) => {
    try {
        const tableId = req.params.tableId;

        // Find the user by ID
        const table = await Table.findByPk(tableId);

        await table.update({delete:1})

        return res.status(200).send("Table delete successfully");
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export { getAllTable, createTable, putTable, deleteTable }