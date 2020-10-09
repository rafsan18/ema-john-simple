import React from "react";

const Inventory = () => {
    const handleAddProduct = () => {
        fetch("http://localhost:5000/addProduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
    };

    return (
        <div>
            <button className="btn btn-warning" onClick={handleAddProduct}>
                Add Product
            </button>
        </div>
    );
};

export default Inventory;
