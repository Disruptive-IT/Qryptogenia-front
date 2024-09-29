import { FieldArray, Formik, useFormik,Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { UseMenu } from './menuContext';
import GradientColorPicker from 'react-gcolor-picker';
import { motion } from "framer-motion";
import EjectIcon from '@mui/icons-material/Eject';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import {Accordion,AccordionItem} from '@nextui-org/accordion'
import './menu.css'
import instance from '../../../../../libs/axios';
import { toast } from 'sonner';
import { duration } from '@mui/material';
import { useValidate } from '../../../../../context/validateFormContext';

function MenuForm(){
    const {formData,handleRestaurantName,handleLogo,handleBackgroundCard,addCategory,
        addProductToCategory,removeCategory,removeProductToCategory,handleProductName,handleProductDescription,
        handleProductTop,handleProductPrice,handleChangeCategoryName,handleImgProduct,handleBackgroundProduct,
        handleColorNameProduct,
        handleFontFamily,
        handleTemplate,
        templateNull,
        handleColorDescriptionProduct,
        handleColorPriceProduct,
        isStyleCheck,setIsStyleCheck,
        handleMenuColor,handleUserTemplate,usertemplateNull
    }=UseMenu();


    const[activeCategory,setActiveCategory]=useState(0);
    const[activeProduct,setActiveProduct]=useState(0);
    const[initialValues,setInitialValues]=useState(formData);
    const [confirmAddCategory,setConfirmAddCategory]=useState(false);
    const [confirmAddProduct,setConfirmAddProduct]=useState(false);
    const[showBackgroundPicker,setShowBackgroundPicker]=useState(false);
    const[showMenuPicker,setShowMenuPicker]=useState(false);
    const[showBackCategoryPicker,setShowBackCategoryPicker]=useState(false);
    const[showNamePicker,setShowNamePicker]=useState(false);
    const[showDescriptionPicker,setShowDescriptionPicker]=useState(false);
    const[showPricePicker,setShowPricePicker]=useState(false);
    const[fonts,setFonts]=useState([]);
    const[templates,setTemplates]=useState([]);

    const [currentTemplate, setCurrentTemplate] = useState(0);
    const [indexTemplate,setIndexTemplate]=useState(null);

    const {validateFormMenu,setValidateFormMenu}=useValidate();

      console.log(formData);
      // console.log("categoria ",activeCategory);
      // console.log("producto ",activeProduct);
      // console.log("fonts",fonts);
      // console.log("templates: ",templates);

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

    const validateFormFields = () => {
      if (Object.keys(formik.errors).length > 1) {
        setValidateFormMenu(false);
        return false;
      } else {
        setValidateFormMenu(true);
        return true;
      }
    };

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

    const handleShowBackgroundPicker=(value)=>{
        setShowBackgroundPicker(value)
    }

    const handleShowMenuPicker=(value)=>{
        setShowMenuPicker(value)
    }

    const handleShowBackCategoryPicker=(value)=>{
        setShowBackCategoryPicker(value)
    }

    const handleShowNamePicker=(value)=>{
        setShowNamePicker(value)
    }

    const handleShowDescriptionPicker=(value)=>{
        setShowDescriptionPicker(value)
    }
    
    const handleShowPricePicker=(value)=>{
        setShowPricePicker(value)
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
      } else if (specials.test(values.restaurantName)) {
        errors.restaurantName = 'Restaurant name cannot contain special characters';
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
    
    
    const formik=useFormik({
        initialValues,
        validate:validation,
        onsubmit:(values,{setSubmitting})=>{
            console.log(values);
        },
    });
    console.log("intial values ",formik.values);

    useEffect(()=>{
      const executeFunctions=async()=>{
        await getFonts();
        await getTemplates();
      }

      executeFunctions();
    },[])

    useEffect(()=>{
      validateFormFields()
    },[formik.errors])

    console.log("formik errors",formik.errors);

return (
    <div className='p-4'>
        <Formik
            initialValues={formData}
            validate={validation}
            onSubmit={(values) => {
                console.log(values);
            }}
            validateOnBlur={true}
        >
            {({ values }) => (
                <form action="" className='w-full h-auto flex flex-col'>
            {/* Sección de Nombre del Restaurante y Logo */}
            <div className="flex flex-row mb-6">
              {/* Contenedor del input para el nombre del restaurante */}
              <div className="flex flex-col p-4 mr-4">
                <label className="my-1" htmlFor="restaurantName">Restaurant Name</label>
                <input
                  onChange={(e)=>handleRestaurantName(e,formik.handleChange)}
                  className="mb-1 p-2 border rounded w-80"
                  type="text"
                  onBlur={formik.handleBlur}
                  name="restaurantName"
                  id="restaurantName"
                />
                {formik.touched.restaurantName && formik.errors.restaurantName ? (<div className='text-red-600 my-1 text-[13px]'>{formik.errors.restaurantName}</div>):<div className='max-h-[13px] my-1'></div>}
              </div>

              {/* Contenedor del botón para subir el logo */}
              <div className="flex flex-col justify-center items-center p-4 mt-7 ml-6">
                <label
                  htmlFor="restaurantLogo"
                  onClick={(e)=>{formik.setTouched({ ...formik.touched, restaurantLogo: true });}}
                  className="cursor-pointer bg-light-blue hover:bg-dark-blue text-white py-2 px-4 rounded-md"
                >
                  load logo
                </label>
                {/* {formik.touched.restaurantLogo && formik.errors.restaurantLogo ? <div className='text-red-600 my-1 text-[13px]'>{formik.errors.restaurantLogo}</div>:null} */}
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  name="restaurantLogo"
                  id="restaurantLogo"
                  onBlur={formik.handleBlur}
                  onChange={(e) => {handleLogo(e); formik.setFieldValue('restaurantLogo',e.target.files[0]);}}
                />
              </div>
            </div>
                    {/* Sección del Color de Fondo */}
                    <div className="flex flex-col md:flex-row justify-start items-center space-x-6 py-4">
                    {/* Background Section */}
                    <div className="flex items-center space-x-4 mx-3">
                    <label htmlFor="">Background color:</label>
                    <button></button>
                      <div 
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                        onClick={() =>indexTemplate==null && (handleShowBackgroundPicker(!showBackgroundPicker))}
                        aria-disabled={indexTemplate!=null ? false:true}
                        style={{ backgroundColor: formData.backgroundCard || "#000" }}
                      />
                      {showBackgroundPicker && (
                        <div className="colorPickerr z-50">
                          <GradientColorPicker
                            enableAlpha
                            disableHueSlider={false}
                            disableAlphaSlider={false}
                            disableInput={false}
                            disableHexInput={false}
                            disableRgbInput={false}
                            disableAlphaInput={false}
                            presetColors={[]}
                            gradient={true}
                            color={formik.values.backgroundCard}
                            value={formik.values.backgroundCard}
                            onChange={(color) => {
                              handleBackgroundCard(color);
                              formik.setFieldValue("backgroundCard", color);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Menu Color Section */}
                    <div className="flex items-center space-x-4">
                      <label className="text-[17px]">Color navbar:</label>
                      <div 
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                        onClick={() => handleShowMenuPicker(!showMenuPicker)}
                        style={{ backgroundColor: formData.colorMenu || "#000" }}
                      />
                      {showMenuPicker && (
                        <div className="menuPicker z-50">
                          <GradientColorPicker
                            enableAlpha
                            disableHueSlider={false}
                            disableAlphaSlider={false}
                            disableInput={false}
                            disableHexInput={false}
                            disableRgbInput={false}
                            disableAlphaInput={false}
                            presetColors={[]}
                            gradient={true}
                            value={formData.colorMenu}
                            color={formData.colorMenu}
                            onChange={(color) => handleMenuColor(color)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <Accordion>
                    <AccordionItem className='bg-gray-300 px-3 rounded-[10px] my-3' aria-label='Background Templates' key={'1'} title='Background templates'>
                    <div className='flex flex-col my-2'>
                    <div className="relative w-full overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out w-full p-4"
                        style={{ transform: `translateX(-${currentTemplate * 100}%)` }}
                      >
                        <div onClick={()=>{templateNull(); setIndexTemplate(null)}} className={`w-1/5 px-2 flex-shrink-0 flex align-middle justify-center bg-white rounded-lg ${indexTemplate==null ? 'border-[2px] border-black':''}`}>
                            <CancelIcon sx={{width:80,height:80,marginTop:5}} id='nullTemplate' className='text-red-600 text-center' />
                        </div>
                        {templates?.length > 0 && templates.map((element, index) => (
                          <motion.div whileHover={{translateY:'-1px',transition:'.4s'}}  key={index} className="w-1/5 px-2 flex-shrink-0">
                            <img onClick={(e)=>{handleTemplate(e); setIndexTemplate(index)}} id={element.id} className={`w-full h-full object-cover rounded-lg hover:shadow-md hover:shadow-black ${indexTemplate==index ? 'brightness-50':''}`} src={element.image} alt="imagen" />
                          </motion.div>
                        ))}
                        <div onClick={()=>{templateNull();setIndexTemplate(null)}} className={`w-1/5 flex-shrink-0 flex align-middle justify-center bg-white rounded-lg overflow-auto ${indexTemplate==null ? 'border-[2px] border-black':''}`}>
                            <div className='w-ful h-full flex align-middle items-center'>
                              <label className={` ${formData.idUserTemplate!==null ? 'hidden':'p-4 bg-light-blue hover:bg-dark-blue text-white rounded-md'}`} htmlFor="userTemplate">+</label>
                              <input onChange={(e)=>handleUserTemplate(e,formik.handleChange)} className='hidden' name='userTemplate' id='userTemplate' type="file" accept='image/*' />
                              <div className={`${formData.idUserTemplate!==null ? 'w-full h-full relative top-0 overflow-auto':'hidden'}`}>
                                <span onClick={async()=>{await resetUserTemplate(); if(formData.idUserTemplate!==null){usertemplateNull();}}} className='z-50 absolute top-1 right-2 cursor-pointer text-red-600 font-bold'>x</span>
                                <img src={formData.idUserTemplate!==null ? URL.createObjectURL(formData.idUserTemplate):''} className={`${formData.idUserTemplate!==null ? 'object-cover w-full h-full':''}`} alt="" id='userTemplate' />
                              </div>
                            </div>
                        </div>
                      </div>
                      <button onClick={handlePrev} type='button' className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 opacity-75 hover:opacity-100">‹</button>
                      <button onClick={handleNext} type='button' className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 opacity-75 hover:opacity-100">›</button>
                      </div>
                    </div>
                    </AccordionItem>
                  </Accordion>
                  <div className='my-3 mb-4 flex flex-row justify-start align-middle'>
                          <h1 className='mt-3 text-lg font-semibold mr-6'>Font style:</h1>
                          <select className='p-4 rounded-[10px] bg-gray-300' name="fontFamily" id="" onChange={(e)=>handleFontFamily(e)}>
                          {fonts?.map((item, index) => (
                            <option style={{ fontFamily: item.fontName }} key={index} id={item.id} value={item.id}>
                              {item.fontName}
                            </option>
                          ))}
                          </select>
                  </div>
                    {/* Sección de Personalización de la Tarjeta de Producto */}
                    <div className='flex flex-col mb-6 '>
                        <h1 className='mb-2 text-lg font-semibold'>Customize your product card</h1>
                        <div className='flex flex-row w-[80%] p-4 justify-around'>
                            {/* Color de Fondo */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Background</label>
                                <div 
                                    className='w-10 h-10 border-2 border-gray-300 rounded  cursor-pointer'
                                    onClick={()=>handleShowBackCategoryPicker(!showBackCategoryPicker)}
                                    style={{ backgroundColor:formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || "#000" }}
                                ></div>
                                {showBackCategoryPicker && (
                                    <div className='colorPicker'>
                                <GradientColorPicker
                                    enableAlpha
                                    disableHueSlider={false}
                                    disableAlphaSlider={false}
                                    disableInput={false}
                                    disableHexInput={false}
                                    disableRgbInput={false}
                                    disableAlphaInput={false}
                                    presetColors={[]}
                                    gradient={true}
                                    color={formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || '#FFFFFF'}
                                    value={formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || '#FFFFFF'}
                                    onChange={(color) => {
                                        if (activeCategory !== null) {
                                          handleBackgroundProduct(activeCategory, color);
                                      }
                                      }}
                                />
                                    </div>
                                )}
                            </div>

                            {/* Color del Nombre */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Name-Color</label>
                                <div 
                                    className='w-10 h-10 border border-gray-300 rounded cursor-pointer'
                                    onClick={()=>handleShowNamePicker(!showNamePicker)}
                                    style={{ backgroundColor:formData.category?.[activeCategory]?.products[0]?.colorName || '#000' }}
                                ></div>
                                {showNamePicker && (
                                    <div className='colorPicker'>
                                        <GradientColorPicker
                                            enableAlpha
                                            disableHueSlider={false}
                                            disableAlphaSlider={false}
                                            disableInput={false}
                                            disableHexInput={false}
                                            disableRgbInput={false}
                                            disableAlphaInput={false}
                                            presetColors={[]}
                                            gradient
                                            color={formData.category?.[activeCategory]?.products?.colorName || "#FFFFF"}
                                            value={formData.category?.[activeCategory]?.products?.colorName || "#FFFFF"}
                                            onChange={(color) =>{handleColorNameProduct(activeCategory,color)}}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Color de la Descripción */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Description-Color</label>
                                <div 
                                    className='w-10 h-10 border border-gray-300 rounded cursor-pointer'
                                    onClick={()=>handleShowDescriptionPicker(!showDescriptionPicker)}
                                    style={{ backgroundColor:formData.category?.[activeCategory]?.products[0]?.colorDescription || '#000' }}
                                ></div>
                                {showDescriptionPicker && (
                                    <div className='colorPicker'>
                                        <GradientColorPicker
                                            enableAlpha
                                            disableHueSlider={false}
                                            disableAlphaSlider={false}
                                            disableInput={false}
                                            disableHexInput={false}
                                            disableRgbInput={false}
                                            disableAlphaInput={false}
                                            presetColors={[]}
                                            gradient={true}
                                            color={formData.category?.[activeCategory]?.products?.colorDescription || "#FFFFF"}
                                            value={formData.category?.[activeCategory]?.products?.colorDescription || "#FFFFF"}
                                            onChange={(color) =>{handleColorDescriptionProduct(activeCategory,color)}}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Color del Precio */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Price-Color</label>
                                <div 
                                    className='w-10 h-10 border border-gray-300 rounded cursor-pointer'
                                    onClick={()=>handleShowPricePicker(!showPricePicker)}
                                    style={{ backgroundColor:formData.category?.[activeCategory]?.products[0]?.colorPrice || '#000' }}
                                ></div>
                                {showPricePicker && (
                                    <div className='colorPicker'>
                                        <GradientColorPicker
                                            enableAlpha
                                            disableHueSlider={false}
                                            disableAlphaSlider={false}
                                            disableInput={false}
                                            disableHexInput={false}
                                            disableRgbInput={false}
                                            disableAlphaInput={false}
                                            presetColors={[]}
                                            gradient={true}
                                            color={formData.category?.[activeCategory]?.products?.colorPrice || "#FFFFF"}
                                            value={formData.category?.[activeCategory]?.products?.colorPrice || "#FFFFF"}
                                            onChange={(color) =>{ handleColorPriceProduct(activeCategory,color)}}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sección para Agregar Nueva Categoría y Productos */}
                    <div className='flex flex-col mt-6'>
                        {values.category && values.category.length <= 0 ? (
                            <div><h1>no hay categorias agregadas</h1></div>
                        ) : (
<FieldArray name="category">
  {({ remove, push }) => (
    <div>
      {/* <div className='flex flex-row py-1 justify-start mx-1 mb-2'>
        <input onClick={()=>setIsStyleCheck(!isStyleCheck)} className='mr-4 p-3 text-blue-500 text-[16px]' type="checkbox" name='productStyle' id='productStyle' />
        <label htmlFor="">Apply a same style on all categories</label>
      </div> */}
      {/* Botón para agregar nueva categoría */}
      <button
        onClick={() => {
          if(formik.errors.category?.length>0){
            toast.warning('please complete all category fields',{duration:2000})
          }else{
             push({
              categoryName: "",
              products: [{
                backgroundProductCard: "#fff",
                colorName: "#000",
                colorDescription: "#000",
                colorPrice: "#000",
                productImg: null,
                productName: "",
                productDescription: "",
                top: false,
                price: null
              }]
            });
            addCategory({
              categoryName: "",
              products: [{
                backgroundProductCard: "#fff",
                colorName: "#000",
                colorDescription: "#000",
                colorPrice: "#000",
                productImg: null,
                productName: "",
                productDescription: "",
                top: false,
                price: null
              }],
            });
            formik.setFieldValue('category', [
              ...formik.values.category,
              {
                categoryName: "",
                products: [{
                  backgroundProductCard: "#fff",
                  colorName: "#000",
                  colorDescription: "#000",
                  colorPrice: "#000",
                  productImg: null,
                  productName: "",
                  productDescription: "",
                  top: false,
                  price: null
                }]
              }
            ]);
        }}}        
        className="mb-4 px-4 py-2 bg-light-blue hover:bg-dark-blue text-white rounded"
        type="button"
      >
        + Add new category
      </button>

      {/* Asegurarse de que hay categorías antes de mostrar el Accordion */}
      {values.category.length > 0 && (
        <Accordion variant="splitted">
          {values.category.map((category, index) => (
            <AccordionItem
              className={`bg-gray-300 my-2 p-3 pb-2 w-full rounded-2xl cursor-pointer ${
                  activeCategory === index ? "border-2 border-zinc-800" : ""
                }`}
              key={index}
              aria-label={`category ${index}`}
              title={
                <div onClick={()=>handleActiveCategory(index)} className="flex justify-between p-2">
                  <label htmlFor={`category.${index}.categoryName`} className="">
                    Category Name
                  </label>
                    <button
                      onClick={() => {
                        if (values.category.length>1 && formData.category.length>1) {
                          remove(index);
                          removeCategory(index);
                        }
                        if (activeCategory === index) {
                          handleActiveCategory(index - 1);
                        }
                        const updatedCategories=[...formik.values.category];
                        updatedCategories.splice(index,1)
                        formik.setFieldValue(`category`,updatedCategories);
                      }}
                      type="button"
                      className={`p-1 text-red-600 self-end font-semibold hover:underline ${values.category.length > 1 ? "" : "hidden"}`}
                    >
                      <DeleteIcon className='text-red-600 hover:underline hover:translate-y-[-2px] hover:duration-[.4s]' />
                    </button>
                </div>
              }
              keepContentMounted={true}
            >
              <div
                onClick={() => setActiveCategory(index)}
                className={`bg-gray-300 my-1 p-3 w-full rounded-2xl cursor-pointer`}
              >
                <div className='flex flex-col'>
                  {/* Input para el nombre de la categoría */}
                  <input
                    onChange={(e) => handleChangeCategoryName(index, e,formik.handleChange)}
                    className="p-2 border rounded w-full"
                    type="text"
                    name={`category[${index}].categoryName`}
                    placeholder="Enter category name"
                    onBlur={formik.handleBlur}
                  />
                {formik.touched.category?.[index] && formik.errors.category?.[index]?.categoryName ? (
                  <div className='text-[13px] text-red-600 my-2'>
                    {formik.errors.category[index].categoryName}
                  </div>) : (<div className='text-[13px] my-2 min-h-[20px]'></div>)}
                </div>
                {/* Si hay productos en la categoría, se muestran dentro del FieldArray */}
                <FieldArray name={`category[${index}].products`}>
                  {({ push: pushProduct, remove: removeProduct }) => (
                    <div>
                      {/* Botón para agregar un nuevo producto */}
                      <button
                        onClick={() => {
                          if(
                            formik.errors.category &&
                            formik.errors.category[index] &&
                            formik.errors.category[index].products &&
                            formik.errors.category[index].products.length > 0
                          ){
                            toast.warning('please complete the previous product')
                          }else{
                            pushProduct({
                              backgroundProductCard:formData.category?.[index]?.products?.[0]?.backgroundProductCard || "#fff",
                              colorName:formData.category?.[index]?.products?.[0]?.colorName || "#000",
                              colorDescription:formData.category?.[index]?.products?.[0]?.colorDescription || "#000",
                              colorPrice:formData.category?.[index]?.products?.[0]?.colorPrice || "#000",
                              productImg: null,
                              productName: "",
                              productDescription: "",
                              top: false,
                              price: null,
                            });
                            addProductToCategory(index, {
                              backgroundProductCard:formData.category?.[index]?.products?.[0]?.backgroundProductCard || "#fff",
                              colorName:formData.category?.[index]?.products?.[0]?.colorName || "#000",
                              colorDescription:formData.category?.[index]?.products?.[0]?.colorDescription || "#000",
                              colorPrice:formData.category?.[index]?.products?.[0]?.colorPrice || "#000",
                              productImg: null,
                              productName: "",
                              productDescription: "",
                              top: false,
                              price: null,
                            });
                            formik.setFieldValue(`category[${index}].products`,[
                              ...formik.values.category[index]?.products,
                              {
                                backgroundProductCard:formData.category?.[index]?.products?.[0]?.backgroundProductCard || "#fff",
                                colorName:formData.category?.[index]?.products?.[0]?.colorName || "#000",
                                colorDescription:formData.category?.[index]?.products?.[0]?.colorDescription || "#000",
                                colorPrice:formData.category?.[index]?.products?.[0]?.colorPrice || "#000",
                                productImg: null,
                                productName: "",
                                productDescription: "",
                                top: false,
                                price: null,
                              }
                            ])
                          }
                          }}
                        className="mb-4 px-4 py-2 bg-light-blue hover:bg-dark-blue text-white rounded"
                        type="button"
                      >
                        + Add New Product
                      </button>

                      {/* Accordion para los productos */}
                      <Accordion>
                        {values.category[index].products.map((product, productIndex) => (
                            <AccordionItem
                            key={`${index}-${productIndex}`}
                            aria-label={`product ${index}-${productIndex}`}
                            title={
                              <div className="flex justify-between px-2">
                                <h1 className="">Product {productIndex + 1}</h1>
                                <div className="self-end">
                                  {/* Botón para eliminar producto, visible solo si hay más de uno */}
                                  <button
                                    onClick={() => {
                                      if (values.category[index].products.length>1 && formData.category[index].products.length>1) {
                                        handleActiveProduct(productIndex - 1);
                                        removeProduct(productIndex);
                                        removeProductToCategory(index, productIndex);
                                        const updatedProducts=[...formik.values.category[index].products]
                                        updatedProducts.splice(productIndex,1);
                                        formik.setFieldValue(`category[${index}].products`,updatedProducts);
                                      }
                                    }}
                                    type="button"
                                    className={`p-1 text-red-600 font-semibold hover:underline ${
                                      values.category[index].products.length > 1 ? "" : "hidden"
                                    }`}
                                  >
                                    <DeleteIcon className='text-red-600 hover:translate-y-[-2px]' />
                                  </button>
                                </div>
                              </div>
                            }
                            keepContentMounted={true}
                            className={`bg-white p-3 my-2 rounded-[10px]`}
                          >
                            {/* Contenedor de cada producto */}
                            <div>
                              {/* Contenedor de la imagen y detalles del producto */}
                              <div className="flex flex-row m-0">
                                <div className="w-[30%] rounded-[10px] bg-slate-600">
                                  <img
                                    id={`imgProductPreview-${index}-${productIndex}`}
                                    className="object-cover w-full h-full rounded-[10px]"
                                    src=""
                                    alt=""
                                  />
                                </div>
                                <div className="w-[68%] ml-4 flex flex-col">
                                  <div className='flex flex-row align-middle content-center'>
                                    {/* Input para la imagen del producto */}
                                  <input
                                    onChange={(e) => {handleImgProduct(index, productIndex, e),formik.setFieldValue(`category[${index}].products[${productIndex}].productImg`,e.target.files[0])}}
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    name={`category[${index}].products[${productIndex}].productImg`}
                                    id={`category[${index}].products[${productIndex}].productImg`}
                                    onBlur={formik.handleBlur}
                                  />
                                  <label onClick={() => {
                                    const touched = { ...formik.touched };
                                    
                                    // Asegúrate de que 'category' y 'products' estén inicializados en touched
                                    if (!touched.category) {
                                      touched.category = [];
                                    }
                                    if (!touched.category[index]) {
                                      touched.category[index] = { products: [] };
                                    }
                                    if (!touched.category[index].products) {
                                      touched.category[index].products = [];
                                    }
                                    if (!touched.category[index].products[productIndex]) {
                                      touched.category[index].products[productIndex] = {};
                                    }

                                    // Establece productImg como touched
                                    touched.category[index].products[productIndex].productImg = true;

                                    formik.setTouched(touched);
                                  }}
                                  htmlFor={`category[${index}].products[${productIndex}].productImg`} className='p-2 text-[17px] rounded-md my-3 w-[25%] text-center bg-light-blue text-white hover:bg-dark-blue'>add image</label>
                                        {formik.touched?.category?.[index]?.products?.[productIndex]?.productImg &&
                                      formik.errors?.category?.[index]?.products?.[productIndex]?.productImg ? (
                                      <div className='text-[13px] text-red-600 mx-2 mt-6'>
                                        {formik.errors.category[index].products[productIndex].productImg}
                                      </div>
                                    ) : (
                                      <div className='mx-2 my-2 min-h-[20px]'></div>
                                    )}
                                  </div>
                                    {/* Input para el nombre del producto */}
                                    <input
                                      className="mb-1 p-2 border rounded w-full"
                                      type="text"
                                      placeholder="Product Name"
                                      name={`category[${index}].products[${productIndex}].productName`}
                                      onBlur={formik.handleBlur}
                                      onChange={(e) => {
                                        handleProductName(index, productIndex, e);
                                        formik.setFieldValue(`category[${index}].products[${productIndex}].productName`, e.target.value);
                                      }}
                                    />
                                    {/* Mostrar mensaje de error para el nombre del producto */}
                                    {formik.touched?.category?.[index]?.products?.[productIndex]?.productName &&
                                      formik.errors?.category?.[index]?.products?.[productIndex]?.productName ? (
                                      <div className='text-[13px] text-red-600 mx-2 my-2'>
                                        {formik.errors.category[index].products[productIndex].productName}
                                      </div>
                                    ) : (
                                      <div className='mx-2 my-2 min-h-[20px]'></div>
                                    )}

                                    {/* Input para la descripción del producto */}
                                    <input
                                      className="mb-1 p-2 border rounded w-full"
                                      type="text"
                                      placeholder="Product Description"
                                      id={`category[${index}].products[${productIndex}].productDescription`}
                                      name={`category[${index}].products[${productIndex}].productDescription`}
                                      onBlur={formik.handleBlur}
                                      onChange={(e) => {
                                        handleProductDescription(index, productIndex, e);
                                        formik.setFieldValue(`category[${index}].products[${productIndex}].productDescription`, e.target.value);
                                      }}
                                    />
                                    {/* Mostrar mensaje de error para la descripción del producto */}
                                    {formik.touched?.category?.[index]?.products?.[productIndex]?.productDescription &&
                                      formik.errors?.category?.[index]?.products?.[productIndex]?.productDescription ? (
                                      <div className='text-[13px] text-red-600 mx-2 my-2'>
                                        {formik.errors.category[index].products[productIndex].productDescription}
                                      </div>
                                    ) : (
                                      <div className='mx-2 my-2 min-h-[20px]'></div>
                                    )}
                                  {/* Checkbox y input para el precio */}
                                  <div className="flex items-center">
                                    <div className="flex items-center mr-4">
                                      <label>Top</label>
                                      <input
                                        className="mx-2"
                                        type="checkbox"
                                        name={`category[${index}].products[${productIndex}].top`}
                                        onBlur={formik.handleBlur}
                                        onChange={(e)=>{handleProductTop(index,productIndex,e); formik.setFieldValue(`category[${index}].products[${productIndex}].top`,e.target.checked)}}
                                      />
                                    </div>
                                    <div className="flex items-center">
                                      <label className="mx-2">Price $</label>
                                      <input
                                        className="p-2 border rounded w-24 h-10"
                                        type="number"
                                        name={`category[${index}].products[${productIndex}].price`}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) =>{handleProductPrice(index, productIndex, e); formik.setFieldValue(`category[${index}].products[${productIndex}].price`,e.target.value)}}
                                      />
                                      {formik.touched?.category?.[index]?.products?.[productIndex]?.price && 
                                      formik.errors?.category?.[index]?.products?.[productIndex]?.price ? (
                                      <div className='text-[13px] text-red-600 mx-2'>{formik.errors.category[index].products[productIndex].price}</div>
                                ) : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </FieldArray>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )}
</FieldArray>
                        )}
                    </div>
                </form>
            )}
        </Formik>
    </div>
);

}

export default MenuForm;