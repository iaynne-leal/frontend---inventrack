import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function InputOptionInventoryCount(props) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsConta, setProductsConta] = useState([]);

    const getProductConta = async () => {
        try {
            const response = await apiSystem.get(`/countInventory`);
            const productContaData = response.data?.countInventorys;
            const productContaNames = productContaData.map((r) => ({
                key: r.pk_countinventory,
                label: r.product,
            }));
            setProductsConta(productContaNames);
        } catch (error) {
            console.error("Error fetching inventory count products:", error);
        }
    };

    useEffect(() => {
        getProductConta();
    }, []);

    const selectedProductTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.label}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const productOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.label}</div>
            </div>
        );
    };

    const handleChange = (e) => {
        setSelectedProduct(e.value);
        props?.onSelect(e.value?.key);
    };

    return (
        <div className="card flex justify-content-center">
            <Dropdown 
                value={selectedProduct} 
                onChange={handleChange} 
                options={productsConta} 
                optionLabel="label" 
                placeholder="Seleccione un producto"
                filter 
                valueTemplate={selectedProductTemplate} 
                itemTemplate={productOptionTemplate} 
                className="w-full md:w-14rem" 
            />
        </div>
    );
}
