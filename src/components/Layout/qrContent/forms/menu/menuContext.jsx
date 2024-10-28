import { createContext, useContext, useEffect, useState,useRef } from "react";
import { menuFormData } from "./menuData.jsx";
import axios from "axios";
import instance from "../../../../../libs/axios.jsx";

const MenuContext=createContext();

export default function MenuProvider({children}) {
    const [formData, setFormData] = useState({...structuredClone(menuFormData)});
    const[editFormdata,setEditFormData]=useState(null); //guarda el objeto de datos a editar
    const[activeCategory,setActiveCategory]=useState(0);
    const[activeProduct,setActiveProduct]=useState(0);
    const [userTemplate,setUserTemplate]=useState(null);
    const[showBackgroundPicker,setShowBackgroundPicker]=useState(false);
    const[showMenuPicker,setShowMenuPicker]=useState(false);
    const[showBackCategoryPicker,setShowBackCategoryPicker]=useState(false);
    const[showNamePicker,setShowNamePicker]=useState(false);
    const[showDescriptionPicker,setShowDescriptionPicker]=useState(false);
    const[showPricePicker,setShowPricePicker]=useState(false);
    const backgroundPickerRef=useRef(null);
    const menuPickerRef=useRef(null);
    const backgroundProductPickerRef=useRef(null);
    const namePickerRef=useRef(null);
    const descriptionPickerRef=useRef(null);
    const pricePickerRef=useRef(null);
    const[fonts,setFonts]=useState([]);
    const[templates,setTemplates]=useState([]);
    const isEditRoute = location.pathname.startsWith('/edit');
    const initialFormDataRef=useRef();
    const validateLink=/.webp/

    const [currentTemplate, setCurrentTemplate] = useState(0);
    const [indexTemplate,setIndexTemplate]=useState(null);

    const initialValues={
        restaurantName:isEditRoute && formData ? formData.restaurantName:'',
        restaurantLogo:isEditRoute && formData ? formData.restaurantLogo :null,
        backgroundCard:isEditRoute && formData ? formData.backgroundCard : '#000',
        colorMenu:isEditRoute && formData ? formData.colorMenu : '#fff',
        idFontPreview:isEditRoute && formData ? formData.idFontPreview : null,
        iduserTemplate:isEditRoute && formData ? formData.idUserTemplate : null,
        idImgTemplate:isEditRoute && formData ? formData.idImgTemplate : null,
        category:isEditRoute && formData ? formData.category : [{categoryName:"",products:[{ backgroundProductCard:"#fff",colorName:"#000",colorDescription:"#000",colorPrice:"#000",productImg:null, productName:"", productDescription:"", top:false,price:null}]}]
    }

    const getFonts=async()=>{
        try{
            const getFontsArray=await instance.get('getFonts');
            setFonts(getFontsArray.data);
            return getFontsArray.data;
        }catch(error){
            console.error("error fonts request: ",error.message);
        }
    }

    const getTemplates=async()=>{
        try{
            const getTemplatesArray=await instance.get('getTemplates');
            setTemplates(getTemplatesArray.data);
            return getTemplatesArray.data;
        }catch(error){
            console.error("error fonts request: ",error.message);
        }
    }

    const handlePrev = () => {
        setCurrentTemplate((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : templates.length - 1));
      };
      
      const handleNext = () => {
        setCurrentTemplate((prevIndex) => (prevIndex < templates.length - 1 ? prevIndex + 1 : 0));
      };

    const handleActiveCategory = (index) => {
        setActiveCategory(index);
    };
    
    const handleActiveProduct = (index) => {
        setActiveProduct(index);
    };

    const handleShowBackgroundPicker=(e)=>{
        if(backgroundPickerRef.current && !backgroundPickerRef.current.contains(e.target)){
        setShowBackgroundPicker(false)
        }
    }

    const handleShowMenuPicker=(e)=>{
        if(menuPickerRef.current && !menuPickerRef.current.contains(e.target)){
        setShowMenuPicker(false)
        }
    }

    const handleShowBackCategoryPicker=(e)=>{
        if(backgroundProductPickerRef.current && !backgroundProductPickerRef.current.contains(e.target)){
        setShowBackCategoryPicker(false)
        }
    }

    const handleShowNamePicker=(e)=>{
        if(namePickerRef.current && !namePickerRef.current.contains(e.target)){
        setShowNamePicker(false)
        }
    }

    const handleShowDescriptionPicker=(e)=>{
        if(descriptionPickerRef.current && !descriptionPickerRef.current.contains(e.target)){
        setShowDescriptionPicker(false)
        }
    }
    
    const handleShowPricePicker=(e)=>{
        if(pricePickerRef.current && !pricePickerRef.current.contains(e.target)){
        setShowPricePicker(false)
        }
    }

    const resetUserTemplate=(e)=>{
      const input=document.getElementById('userTemplate');
      input.value='';
    }

    const validation = (values) => {
        const errors = {};
      
        const specials = /(?=.*?[#?!@$ %^&*-<>])/;
        const letters = /[a-zA-Z]/;
      
        // Validación del nombre del restaurante
        if (!values.restaurantName) {
          errors.restaurantName = 'Restaurant name is required';
        }
  
      
        // Validación del logo del restaurante
        // if (!values.restaurantLogo) {
        //   errors.restaurantLogo = 'Restaurant logo is required';
        // }
      
        // Validación de las categorías y productos
        values.category.forEach((category, indexCategory) => {
          if (!errors.category) {
            errors.category = [];
          }
      
          // Validación del nombre de la categoría
          if (!category.categoryName) {
            if (!errors.category[indexCategory]) {
              errors.category[indexCategory] = {};
            }
            errors.category[indexCategory].categoryName = 'Category name is required';
          }
      
          // Validación de los productos dentro de la categoría
          if (category.products.length > 0) {
            category.products.forEach((prod, indexProd) => {
              if (!errors.category[indexCategory]) {
                errors.category[indexCategory] = {};
              }
              if (!errors.category[indexCategory].products) {
                errors.category[indexCategory].products = [];
              }
      
              // Validaciones de producto
              if (!prod.productImg) {
                errors.category[indexCategory].products[indexProd] = {
                  ...errors.category[indexCategory].products[indexProd],
                  productImg: 'Product image is required',
                };
              }
      
              if (!prod.productName) {
                errors.category[indexCategory].products[indexProd] = {
                  ...errors.category[indexCategory].products[indexProd],
                  productName: 'Product name is required',
                };
              }
      
              if (!prod.productDescription) {
                errors.category[indexCategory].products[indexProd] = {
                  ...errors.category[indexCategory].products[indexProd],
                  productDescription: 'Product description is required',
                };
              }
      
              if (!prod.price) {
                errors.category[indexCategory].products[indexProd] = {
                  ...errors.category[indexCategory].products[indexProd],
                  price: 'Price is required',
                };
              } else if (letters.test(prod.price)) {
                errors.category[indexCategory].products[indexProd] = {
                  ...errors.category[indexCategory].products[indexProd],
                  price: 'Price cannot contain letters',
                };
              } else if (prod.price <= 0) {
                errors.category[indexCategory].products[indexProd] = {
                  ...errors.category[indexCategory].products[indexProd],
                  price: 'Price cannot be negative or zero',
                };
              }
            });
      
            // Eliminar el array de productos si está vacío
            if (errors.category[indexCategory].products.length === 0) {
              delete errors.category[indexCategory].products;
            }
          }
      
          // Eliminar la categoría si no hay errores
          if (Object.keys(errors.category[indexCategory] || {}).length === 0) {
            delete errors.category[indexCategory];
          }
        });
      
        // Eliminar el array de categorías si está vacío
        if (errors.category && errors.category.length === 0) {
          delete errors.category;
        }
      
        return errors;
      };

    const getDataToEdit = async () => {
      try {
          if (isEditRoute) {
              if (!initialFormDataRef.current) {
                  initialFormDataRef.current = await structuredClone(formData);
              }
              setEditFormData(initialFormDataRef.current);
          }
      } catch (error) {
          console.error("Error al obtener los datos para editar:", error);
          setLoading(false);
      }finally{
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
  };
      
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

    const getPublicIdImage=(url)=>{
        const parts = url.split('/');
        const indexOfUpload = parts.indexOf('upload');
        const publicIdWithExtension = parts.slice(indexOfUpload + 1).join('/');
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');
        return publicId;
    }

    const deleteImageCloudinary=async(idImg)=>{
        try{
            const encodedPublicId =encodeURIComponent(idImg);
            const response=await instance.delete(`/qr/imgCloudinary/${encodedPublicId}`);
            if (response.status === 200) {
                console.log("Imagen eliminada exitosamente:", response.data);
                return true;
            }
        }catch(error){
            console.error("error deleting image: ",error.message);
            return false;
        }
    }

    const editUploadFiles = async () => {
        try {
            console.log("Iniciando editUploadFiles");
        
            let updatedFormData = { ...formData }; // Crear una copia para manipular los datos
    
            // Manejo del logo del restaurante
            if (updatedFormData.restaurantLogo instanceof File) {
                const newLogoUrl = await uploadImageToCloudinary(updatedFormData.restaurantLogo);
                if (newLogoUrl) {
                    updatedFormData.restaurantLogo = newLogoUrl;
                } else {
                    console.error("Error al subir el logo del restaurante.");
                    return null;
                }
            }
    
            // Manejo de imágenes de productos en las categorías
            for (let i = 0; i < updatedFormData.category.length; i++) {
                const newCategory = updatedFormData.category[i];
    
                // Procesar productos de la categoría actual
                if (newCategory.products) {
                    for (let j = 0; j < newCategory.products.length; j++) {
                        const newProduct = newCategory.products[j];
    
                        // Subir la nueva imagen solo si es un archivo (File)
                        if (newProduct.productImg instanceof File) {
                            const newProductImgUrl = await uploadImageToCloudinary(newProduct.productImg);
                            if (newProductImgUrl) {
                                newProduct.productImg = newProductImgUrl; // Actualizar la imagen del producto
                            } else {
                                console.error("Error al subir la nueva imagen del producto.");
                                return null; // Retornar null si no se pudo subir la imagen
                            }
                        }
                    }
                }
            }
    
            // Actualizar el estado de formData de una sola vez, después de procesar todas las imágenes
            setFormData(updatedFormData);
    
            console.log("Valores actualizados en editUploadFiles:", updatedFormData);
            return updatedFormData; // Retornar siempre los datos actualizados
        } catch (error) {
            console.error("Error en editUploadFiles:", error.message);
            return null; // Retorna null si algo falla
        }
    };

    const handleFileUpload = async () => {
        try {
            let logoUrl = null;
            let userTemplateUrl=null;

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
                idUserTemplate:userTemplateUrl,
                category: updatedCategories,
            };
    
            setFormData(updatedFormData);
    
            console.log('Todas las imágenes fueron subidas y el estado actualizado.');
    
            // Retorna el objeto formData actualizado
            return updatedFormData; 
        } catch (error) {
            console.error(error.message);
            return error.message
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

    const loadFormDataImgs=async(data)=>{
        try{
            const loadLogo=await serverCloud.upload.load(data.restaurantLogo);
            const urlLogo=loadLogo.secure_url;
            if (urlLogo) setFormData((prevValues)=>({...prevValues,restaurantLogo:urlLogo}));

            const updatedCategories = await Promise.all(
                data.category.map(async (category) => {
                    // Iterar sobre los productos de cada categoría
                    const updatedProducts = await Promise.all(
                        category.products.map(async (product) => {
                            if (product.productImg) {
                                // Subir la imagen del producto
                                const loadProductImage = await serverCloud.upload.load(product.productImg);
                                const urlProductImage = loadProductImage.secure_url;
    
                                // Retornar el producto con la URL de la imagen actualizada
                                return {
                                    ...product,
                                    productImg: urlProductImage,
                                };
                            }
                            return product; // Si no tiene imagen, retornar el producto sin cambios
                        })
                    );
    
                    // Retornar la categoría con los productos actualizados
                    return {
                        ...category,
                        products: updatedProducts,
                    };
                })
            );
    
            // Actualizar el estado con las categorías y sus productos
            setFormData((prevValues) => ({
                ...prevValues,
                category: updatedCategories,
            }));
        }catch(error){
            console.error(error.message);
        }
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

    // const getUsertemplate=async(id)=>{
    //     try{
    //         const usertemplate=await instance.get(`/getUserTemplate/${id}`);
    //         const response=await usertemplate.data;
    //         setUserTemplate(response);
    //     }catch(error){
    //         console.error("error getting user template: ",error.message);
    //     }
    // }

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
            //variables use state
            formData,
            editFormdata,
            activeCategory,
            activeProduct,
            currentTemplate,
            indexTemplate,
            initialValues,
            showBackgroundPicker,
            showMenuPicker,
            showBackCategoryPicker,
            showNamePicker,
            showDescriptionPicker,
            showPricePicker,
            fonts,
            templates,
            userTemplate,
            isEditRoute,
            initialFormDataRef,
            validateLink,
            backgroundPickerRef,
            menuPickerRef,
            backgroundProductPickerRef,
            namePickerRef,
            descriptionPickerRef,
            pricePickerRef,
            //funciones use state
            setFormData,
            setEditFormData,
            setFonts,
            setTemplates,
            setIndexTemplate,
            setShowBackgroundPicker,
            setShowBackCategoryPicker,
            setShowMenuPicker,
            setShowNamePicker,
            setShowDescriptionPicker,
            setShowPricePicker,
            setUserTemplate,
            //funciones axios
            getFonts,
            getTemplates,
            //funciones handler,
            handlePrev,
            handleNext,
            handleActiveCategory,
            handleActiveProduct,
            handleShowBackgroundPicker,
            handleShowMenuPicker,
            handleShowBackCategoryPicker,
            handleShowNamePicker,
            handleShowDescriptionPicker,
            handleShowPricePicker,
            resetUserTemplate,
            validation,
            getDataToEdit,
            editUploadFiles,
            handleFileUpload,
            handleTemplate,
            templateNull,
            usertemplateNull,
            handleLogo,
            handleRestaurantName,
            handleUserTemplate,
            handleBackgroundCard,
            handleMenuColor,
            addCategory,
            handleFontFamily,
            removeCategory,
            handleChangeCategoryName,
            addProductToCategory,
            removeProductToCategory,
            handleProductField,
            handleImgProduct,
            handleBackgroundProduct,
            handleColorNameProduct,
            handleColorDescriptionProduct,
            handleColorPriceProduct,
            handleProductName,
            handleProductDescription,
            handleProductTop,
            handleProductPrice
            }}>
            {children}
        </MenuContext.Provider>
    )
}

export const UseMenu=()=>useContext(MenuContext);
