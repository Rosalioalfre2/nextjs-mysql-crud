import React from "react";
import { ProductForm } from "../components/ProductForm";
import Layout from "../components/Layout";

function NewPages() {
    return (
        <Layout>
            <div className="grid place-items-center h-5/6">
                <ProductForm />
            </div>
        </Layout>
    );
}

export default NewPages;
