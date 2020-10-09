import React from "react";

const Inventory = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch("http://localhost:5000/addProduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
    };

    return (
        <div>
            <form action="">
                <p>
                    <span>Name:</span>
                    <input type="name" />
                </p>
                <p>
                    <span>Price:</span>
                    <input type="price" />
                </p>
                <p>
                    <span>Quantity:</span>
                    <input type="quantity" />
                </p>
                <p>
                    <span>Product Image</span>
                    <input type="file" />
                </p>
            </form>
        </div>
    );
};

export default Inventory;
