import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function ProductForm() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
    });

    const router = useRouter();

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(
                `/api/products/${router.query.id}`
            );
            // setProduct({data})
            setProduct({
                name: data.name,
                price: data.price,
                description: data.description,
            });
        };

        if (router.query.id) {
            getProducts();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (router.query.id) {
                await axios.put(`/api/products/${router.query.id}`, product);
                toast.success("Product updated successfully");
            } else {
                await axios.post("/api/products", product);
                toast.success("Product created successfully");
            }
            router.push("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className="w-full max-w-xs">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold my-2"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        value={product.name}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-gray-700 text-sm font-bold my-2"
                    >
                        Price:
                    </label>
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        id="price"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        value={product.price}
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 text-sm font-bold my-2"
                    >
                        Description:
                    </label>
                    <textarea
                        name="description"
                        cols="30"
                        rows="10"
                        id="description"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        value={product.description}
                    ></textarea>
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
                    Save products
                </button>
            </form>
        </div>
    );
}
