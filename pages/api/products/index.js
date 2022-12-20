import { pool } from "../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getProducts(req, res);
        case "POST":
            return await saveProduct(req, res);
    }
}

const getProducts = async (req, res) => {
    const [result] = await pool.query("SELECT * FROM product");
    return res.status(200).json(result);
};

const saveProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO product SET ?", {
            name,
            price,
            description,
        });
        return res
            .status(200)
            .json({ id: result.insertId, name, description, price });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
