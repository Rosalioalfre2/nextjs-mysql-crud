import { ProductForm } from "../../../components/ProductForm";
import { pool } from "../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getProduct(req, res);
        case "DELETE":
            return await deleteProducts(req, res);
        case "PUT":
            return await updateProducts(req, res);
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;

        const [result] = await pool.query(
            "SELECT * FROM product WHERE id = ?",
            [id]
        );

        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await pool.query("DELETE FROM product WHERE id = ?", [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateProducts = async (req, res) => {
    const { id } = req.query;
    const { name, price, description } = req.body;

    try {
        const result = await pool.query(
            "UPDATE product SET name= ?, description = ?, price = ? WHERE id = ?",
            [name, description, price, id]
        );
        return res.status(204).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
