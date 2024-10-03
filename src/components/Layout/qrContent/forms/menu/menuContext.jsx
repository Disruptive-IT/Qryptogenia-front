import { createContext, useContext, useEffect, useState } from "react";
import { menuFormData } from "./menuData.jsx";

const MenuContext=createContext();

export default function MenuProvider({children}) {
    const [formData, setFormData] = useState({...structuredClone(menuFormData)});
    const [isStyleCheck,setIsStyleCheck]=useState(false);
      
    const handleRestaurantName =(e,handler) => {
        setFormData(prevValues=>({
            ...prevValues,
            restaurantName:e.target.value
        }))

        handler(e);
    };

    const uploadImageToCloudinary = async (file) => {
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;
      
        const formData = new FormData();
        formData.append('file', file); // El archivo de imagen a subir
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET); // Upload preset
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: formData,
          });
      
          const data = await response.json();
      
          if (response.ok) {
            return data.secure_url; // Retorna la URL de la imagen subida
          } else {
            console.error('Error al subir la imagen:', data.error.message);
          }
        } catch (error) {
          console.error('Error en la petición:', error);
        }
    }

    const handleFileUpload = async () => {
        try {
            // Inicializa la URL del logo
            let logoUrl = null;
            let userTemplateUrl=null;
    
            // Subir el logo si existe
            if (formData.restaurantLogo) {
                logoUrl = await uploadImageToCloudinary(formData.restaurantLogo);
                if (logoUrl) {
                    console.log('Logo subido.');
                }
            }

            if(formData.idUserTemplate){
                userTemplateUrl=await uploadImageToCloudinary(formData.idUserTemplate);
                if(userTemplateUrl){
                    console.log("template subido");
                }
            }
    
            // Manejo de la carga de imágenes para todos los productos
            const updatedCategories = await Promise.all(
                formData.category.map(async (category) => {
                    const updatedProducts = await Promise.all(
                        category.products.map(async (product) => {
                            const file = product.productImg; // Asegúrate de que este sea un objeto File
    
                            if (file) {
                                const imageUrl = await uploadImageToCloudinary(file);
                                return {
                                    ...product,
                                    productImg: imageUrl, // Actualiza con la URL de la imagen
                                };
                            }
                            return product; // Devuelve el producto sin cambios si no hay imagen
                        })
                    );
    
                    return {
                        ...category,
                        products: updatedProducts, // Actualiza la lista de productos
                    };
                })
            );
    
            // Crear el objeto actualizado de formData
            const updatedFormData = {
                ...formData,
                restaurantLogo: logoUrl,
                idUserTemplate:userTemplateUrl, // Actualiza con la URL del logo
                category: updatedCategories, // Actualiza la lista de categorías
            };
    
            // Actualiza el estado con el objeto actualizado
            setFormData(updatedFormData);
    
            console.log('Todas las imágenes fueron subidas y el estado actualizado.');
    
            // Retorna el objeto formData actualizado
            return updatedFormData; 
        } catch (error) {
            console.error(error.message);
            // También puedes retornar un valor predeterminado o lanzar el error si es necesario
            return formData; // O puedes lanzar el error si prefieres
        }
    };
    
    

    const handleTemplate=(e)=>{
        setFormData(prevValues=>({
            ...prevValues,
            idImgTemplate:e.target.id
        }))
    }

    const templateNull=()=>{
        setFormData((prevValues)=>({
            ...prevValues,
            idImgTemplate:null
        }))
    }

    const usertemplateNull=()=>{
        setFormData((prevValues)=>({
            ...prevValues,
            idUserTemplate:null
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
                idUserTemplate: file
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
            idFontPreview:e.target.value
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
            usertemplateNull,
            handleFileUpload
        }}>
            {children}
        </MenuContext.Provider>
    )
}

export const UseMenu=()=>useContext(MenuContext);
