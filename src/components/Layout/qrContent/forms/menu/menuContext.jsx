import { createContext, useContext, useEffect, useState } from "react";
import { menuFormData } from "./menuData.jsx";
import instance from "../../../../../libs/axios.jsx";

const MenuContext=createContext();

export default function MenuProvider({children}) {
    const [formData, setFormData] = useState({...structuredClone(menuFormData)});
    const [isStyleCheck,setIsStyleCheck]=useState(false);
      
    const handleRestaurantName =(e, handler) => {
        setFormData(prevValues=>({
            ...prevValues,
            restaurantName:e.target.value
        }))
        handler(e);
    };

    const handleTemplate=(e)=>{
        setFormData(prevValues=>({
            ...prevValues,
            imgTemplate:e.target.id
        }))
    }

    const templateNull=()=>{
        setFormData((prevValues)=>({
            ...prevValues,
            imgTemplate:null
        }))
    }

    const usertemplateNull=()=>{
        setFormData((prevValues)=>({
            ...prevValues,
            userTemplate:null
        }))
    }

    const handleLogo = (e,handler) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.addEventListener("load", (event) => {
                const previewElement = document.getElementById("restaurantLogoPreview");
                if (previewElement) {
                    previewElement.src = reader.result;
                }
            });
            
            setFormData((prevValues) => ({
                ...prevValues,
                restaurantLogo: file
            }));
    
            reader.readAsDataURL(file); 
        } else {
            console.error("Por favor, selecciona un archivo de imagen válido.");
        }

        if(handler) handler(e);
    };
    
    const handleUserTemplate = (e,handler) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.addEventListener("load", (event) => {
                const previewElement = document.getElementById("userTemplate");
                if (previewElement) {
                    previewElement.src = reader.result;
                }
            });
            
            setFormData((prevValues) => ({
                ...prevValues,
                userTemplate: file
            }));
    
            reader.readAsDataURL(file); 
        } else {
            console.error("Por favor, selecciona un archivo de imagen válido.");
        }

        if(handler) handler(e);
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

    const handleMenuColor=(color)=>{
        if(color){
            setFormData((prevValues)=>({
                ...prevValues,
                colorMenu:color
            }))
        }
    }

    function addCategory(newCategory) {
        setFormData((prevValues) => ({
            ...prevValues,
            category: [...prevValues.category, newCategory]
        }));
    }

    function handleFontFamily(e){
        setFormData((prevValues)=>({
            ...prevValues,
            fontFamily:e.target.value
        }))
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

    function handleChangeCategoryName(index, e,handler) {
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories[index].categoryName=e.target.value
            return {
                ...prevValues,
                category: updatedCategories,
            };
        });

        if(handler) handler(e);
    }
    
    function addProductToCategory(index, newProduct) {
        console.log('Adding product to category index:', index);
        console.log('New product:', newProduct);
    
        setFormData((prevValues) => {
            const updatedCategories = [...prevValues.category];
            updatedCategories[index].products.push(newProduct);
    
            console.log('Updated categories in formData:', updatedCategories);
    
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

    

    const handleProductField = (indexOne, indexTwo, field, value,handler,e) => {
        setFormData((prevValues) => {
          const updatedCategories = [...prevValues.category];

          if (updatedCategories[indexOne] && updatedCategories[indexOne].products[indexTwo]) {
            updatedCategories[indexOne].products[indexTwo] = {
              ...updatedCategories[indexOne].products[indexTwo],
              [field]: value
            };
          }
      
          return {
            ...prevValues,
            category: updatedCategories
          };
        });

        if(handler) handler(e);
      };
      

    const handleProductFieldStyle = (categoryIndex, field, value) => {
        setFormData((prevValues) => {
          const updatedCategories = [...prevValues.category];
    
          updatedCategories[categoryIndex] = {
            ...updatedCategories[categoryIndex],
            products: updatedCategories[categoryIndex].products.map((product) => ({
              ...product,
              [field]: value
            }))
          };
      
          return {
            ...prevValues,
            category: updatedCategories
          };
        });
      };
    
    const handleImgProduct = (indexOne, indexTwo, e,handler) => {
        const file = e.target.files[0];
    
        // Creamos una nueva instancia de FileReader
        const reader = new FileReader();
        reader.onload = () => {
            const imgProductPreview = document.getElementById(`imgProductPreview-${indexOne}-${indexTwo}`);
            if (imgProductPreview) {
                imgProductPreview.src = reader.result;
            }

            setFormData((prevValues) => {
                const updatedCategory = [...prevValues.category];
                const updatedProducts = [...updatedCategory[indexOne].products];
                
                updatedProducts[indexTwo] = {
                    ...updatedProducts[indexTwo],
                    productImg: file
                };
    
                updatedCategory[indexOne] = {
                    ...updatedCategory[indexOne],
                    products: updatedProducts
                };
    
                return {
                    ...prevValues,
                    category: updatedCategory
                };
            });
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
        if(handler) handler;
    };
    
    const handleBackgroundProduct=(indexOne, color)=>{
        handleProductFieldStyle(indexOne,'backgroundProductCard',color);
    }
    const handleColorNameProduct=(indexOne,color)=>{
        handleProductFieldStyle(indexOne,'colorName',color);
    }
    const handleColorDescriptionProduct=(indexOne,color)=>{
        handleProductFieldStyle(indexOne,'colorDescription',color);
    }
    const handleColorPriceProduct=(indexOne,color)=>{
        handleProductFieldStyle(indexOne,'colorPrice',color);
    }

    const handleProductName = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productName', e.target.value,handler);
    };

    const handleProductDescription = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'productDescription', e.target.value,handler);
    };

    const handleProductTop = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'top', e.target.checked,handler);
    };

    const handleProductPrice = (indexOne, indexTwo, e, handler) => {
        handleProductField(indexOne, indexTwo, 'price', parseFloat(e.target.value),handler);
    };

    return(
        <MenuContext.Provider value={{
            formData,
            setFormData,
            isStyleCheck,
            setIsStyleCheck,
            setFormData,
            handleRestaurantName,
            handleTemplate,
            templateNull,
            handleLogo,
            handleBackgroundCard,
            handleMenuColor,
            handleFontFamily,
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
            handleImgProduct,
            handleProductName,
            handleProductDescription,
            handleProductPrice,
            handleProductTop,
            handleUserTemplate,
            usertemplateNull
        }}>
            {children}
        </MenuContext.Provider>
    )
}

export const UseMenu=()=>useContext(MenuContext);
