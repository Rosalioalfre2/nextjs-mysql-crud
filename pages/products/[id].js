import axios from "axios";
import Layout from "../../components/Layout";
import Router from "next/router";
import { toast } from "react-toastify";

function ProductPages({ product }) {
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("/api/products/" + id);
            Router.push("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleEdit = async (id) => {
        Router.push(`/products/edit/${id}`);
    };

    return (
        <Layout>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>

            <button
                className="bg-red-500 hover:bg-red-700 rounded-md text-white px-3 py-2"
                onClick={() => handleDelete(product.id)}
            >
                Delete
            </button>

            <button
                className="bg-blue-500 hover:bg-blue-700 rounded-md text-white px-5 py-2 ml-2"
                onClick={() => handleEdit(product.id)}
            >
                Edit
            </button>
        </Layout>
    );
}

export const getServerSideProps = async (context) => {
    const { data: product } = await axios.get(
        "http://localhost:3000/api/products/" + context.query.id
    );

    return {
        props: {
            product,
        },
    };
};

export default ProductPages;
