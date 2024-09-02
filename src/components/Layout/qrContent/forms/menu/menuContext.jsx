import { createContext, useContext, useEffect, useState } from "react";
import { menuFormData } from "./menuData.jsx";


const MenuContext=createContext();

export default function MenuProvider({children}) {
    const [formData, setFormData] = useState({...menuFormData});

    const handleRestaurantName =(e, handler) => {
        setFormData(prevValues=>({
            ...prevValues,
            restaurantName:e.target.value
        }))
        handler(e);
    };
    

    const handleLogo = (e, handler) => {
        const file = e.target.files[0];
        
        setFormData((prevValues) => ({
            ...prevValues,
            restaurantLogo: file
        }));
    
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            const previewElement = document.getElementById("restaurantLogoPreview");
            if (previewElement) {
                previewElement.src = event.target.result;
            }
        });
    
        if (file) {
            reader.readAsDataURL(file);
        }
    
        if (handler) handler();
    };
    

    const handleBackgroundCard = (color) => {
        if (color) {
            setFormData((prevValues) => ({
                ...prevValues,
                backgroundCard: color
            }));
        } else {
            console.error("Color is undefined or null");
        }
    };
    
    const handleColorName = (e, handler) => {
        setFormData((prevValues) => ({
            ...prevValues,
            styleProductCard: {
                ...prevValues.styleProductCard,
                colorName: e.target.value
            }
        }));
        if (handler) handler();
    };

    const handleColorDescription = (e, handler) => {
        setFormData((prevValues) => ({
            ...prevValues,
            styleProductCard: {
                ...prevValues.styleProductCard,
                colorDescription: e.target.value
            }
        }));
        if (handler) handler();
    };

    const handleColorPrice = (e, handler) => {
        setFormData((prevValues) => ({
            ...prevValues,
            styleProductCard: {
                ...prevValues.styleProductCard,
                colorPrice: e.target.value
            }
        }));
        if (handler) handler();
    };

    function addCategory(newCategory) {
        setFormData((prevValues) => ({
            ...prevValues,
            category: [...prevValues.category, newCategory]
        }));
    }

    function removeCategory(index) {
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories.splice(index, 1);
            return {
                ...prevValues,
                category: updatedCategories,
            };
        });
    }

    function handleChangeCategoryName(index, e) {
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories[index].categoryName=e.target.value
            return {
                ...prevValues,
                category: updatedCategories,
            };
        });
    }
    
    
    function addProductToCategory(index, newProduct) {
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories[index].products.push(newProduct);
            
            return {
                ...prevValues,
                category: updatedCategories
            };
        });
    }

    function removeProductToCategory(index, indexProd) {
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories[index].products.splice(indexProd,1);
            
            return {
                ...prevValues,
                category: updatedCategories
            };
        });
    }

    

    const handleProductField = (indexOne, indexTwo, field, value, handler) => {
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories[indexOne].products[indexTwo] = {
                ...updatedCategories[indexOne].products[indexTwo],
                [field]: value
            };
            return {
                ...prevValues,
                category: updatedCategories
            };
        });
        if (handler) handler();
    };

    const handleProductImg = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productImg', e.target.files[0], handler);
    };

    const handleProductName = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productName', e.target.value, handler);
    };

    const handleProductDescription = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productDescription', e.target.value, handler);
    };

    const handleProductTop = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'top', e.target.checked, handler);
    };

    const handleProductPrice = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'price', parseFloat(e.target.value), handler);
    };

    return(
        <MenuContext.Provider value={{
            formData,
            setFormData,
            handleRestaurantName,
            handleLogo,
            handleBackgroundCard,
            handleColorName,
            handleColorDescription,
            handleColorPrice,
            handleChangeCategoryName,
            addCategory,
            removeCategory,
            addProductToCategory,
            removeProductToCategory,
            handleProductField,
            handleProductImg,
            handleProductName,
            handleProductDescription,
            handleProductPrice,
            handleProductTop,
        }}>
            {children}
        </MenuContext.Provider>
    )
}

export const UseMenu=()=>useContext(MenuContext);
