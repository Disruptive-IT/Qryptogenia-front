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
    

    const handleLogo = (e) => {
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

    

    const handleProductField = (indexOne, indexTwo, field, value) => {
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
    };

    const handleBackgroundProduct=(indexOne, indexTwo, color)=>{
        handleProductField(indexOne,indexTwo,'backgroundProductCard',color);
    }
    const handleColorNameProduct=(indexOne, indexTwo, color)=>{
        handleProductField(indexOne,indexTwo,'colorName',color);
    }
    const handleColorDescriptionProduct=(indexOne, indexTwo, color)=>{
        handleProductField(indexOne,indexTwo,'colorDescription',color);
    }
    const handleColorPriceProduct=(indexOne, indexTwo, color)=>{
        handleProductField(indexOne,indexTwo,'colorPrice',color);
    }

    const handleProductImg = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productImg', e.target.files[0]);
    };

    const handleProductName = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productName', e.target.value);
    };

    const handleProductDescription = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productDescription', e.target.value);
    };

    const handleProductTop = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'top', e.target.checked);
    };

    const handleProductPrice = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'price', parseFloat(e.target.value));
    };

    return(
        <MenuContext.Provider value={{
            formData,
            setFormData,
            handleRestaurantName,
            handleLogo,
            handleBackgroundCard,
            handleChangeCategoryName,
            addCategory,
            removeCategory,
            addProductToCategory,
            removeProductToCategory,
            handleProductField,
            handleBackgroundProduct,
            handleColorNameProduct,
            handleColorDescriptionProduct,
            handleColorPriceProduct,
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
