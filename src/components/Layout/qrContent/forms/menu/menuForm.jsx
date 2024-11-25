import { FieldArray, Formik, useFormik} from 'formik';
import { useEffect, useState } from 'react';
import { UseMenu } from './menuContext';
import { motion } from "framer-motion";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import {Accordion,AccordionItem} from '@nextui-org/accordion'
import './menu.css'
import { toast } from 'sonner';
import { useValidate } from '../../../../../context/validateFormContext';
import ColorPicker from '../form-helpers/picker';
import SkeletonLoader from '../Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
/*
 * @Author : Nicolas Barrios,   @date 2024-11-05 17:41:54
 * @description : formulario de menu con validaciones realizadas
 * @Props :
 * @return :
 */

function MenuForm(){
    const { formData,productsCategory,editFormdata,activeCategory,currentTemplate,indexTemplate,setIndexTemplate,showBackgroundPicker,showMenuPicker,showBackCategoryPicker,backgroundPickerRef,menuPickerRef,backgroundProductPickerRef,namePickerRef,descriptionPickerRef,pricePickerRef,setShowBackgroundPicker,setShowBackCategoryPicker,setShowMenuPicker,setShowNamePicker,setShowDescriptionPicker,setShowPricePicker,
            showNamePicker,showDescriptionPicker,showPricePicker,fonts,templates,isEditRoute,initialFormDataRef,validateLink,getFonts,getTemplates,handlePrev,handleNext,handleActiveCategory,handleRestaurantName,handleActiveProduct,handleShowBackgroundPicker,handleShowMenuPicker,handleShowBackCategoryPicker,handleShowNamePicker,handleShowDescriptionPicker,handleShowPricePicker,resetUserTemplate,validation,getDataToEdit,handleTemplate,
            templateNull,usertemplateNull,handleLogo,handleUserTemplate,handleBackgroundCard,handleMenuColor,addCategory,handleFontFamily,removeCategory,handleChangeCategoryName,addProductToCategory,removeProductToCategory,handleProductField,handleImgProduct,handleBackgroundProduct,handleColorNameProduct,handleColorDescriptionProduct,handleColorPriceProduct,handleProductName,handleProductDescription,handleProductTop,handleProductPrice, loading, setLoading,
    }=UseMenu();

    const { t } = useTranslation();
    const{setValidateFormMenu}=useValidate();
    const [initialValues,setInitialValues]=useState(formData);

    const validateFormFields = () => {
      if (Object.keys(formik.errors).length > 1) {
        setValidateFormMenu(false);
        return false;
      } else {
        setValidateFormMenu(true);
        return true;
      }
    };
    
    const formik=useFormik({
        initialValues,
        validate:validation,
        onsubmit:(values,{setSubmitting})=>{
           // console.log(values);
        },
        enableReinitialize:true
    });
    //console.log(" values ",formik.values);
    //console.log("formdata: ",formData);
    // console.log("formdata", formData);

    useEffect(()=>{
      const executeFunctions=async()=>{
        await getFonts();
        await getTemplates();
        if(formData){
          setInitialValues({
            restaurantName:isEditRoute && formData ? formData.restaurantName:'',
            restaurantLogo:isEditRoute && formData ? formData.restaurantLogo :null,
            backgroundCard:isEditRoute && formData ? formData.backgroundCard : '#000',
            colorMenu:isEditRoute && formData ? formData.colorMenu : '#fff',
            idFontPreview:isEditRoute && formData ? formData.idFontPreview : null,
            iduserTemplate:isEditRoute && formData ? formData.idUserTemplate : null,
            idImgTemplate:isEditRoute && formData ? formData.idImgTemplate : null,
            category:isEditRoute && formData ? formData.category : [{categoryName:"",products:[{ backgroundProductCard:"#fff",colorName:"#000",colorDescription:"#000",colorPrice:"#000",productImg:null, productName:"", productDescription:"", top:false,price:null}]}]
        })
        }
      }

      executeFunctions();
    },[isEditRoute,formData])

    useEffect(()=>{
      validateFormFields()
    },[formik.errors])

    useEffect(()=>{
      document.addEventListener("mousedown",handleShowBackgroundPicker);
      document.addEventListener("mousedown",handleShowMenuPicker);
      document.addEventListener("mousedown",handleShowBackCategoryPicker);
      document.addEventListener("mousedown",handleShowNamePicker);
      document.addEventListener("mousedown",handleShowDescriptionPicker);
      document.addEventListener("mousedown",handleShowPricePicker);
      return()=>{
        document.addEventListener("mousedown",handleShowBackgroundPicker);
        document.addEventListener("mousedown",handleShowMenuPicker);
        document.addEventListener("mousedown",handleShowBackCategoryPicker);
        document.addEventListener("mousedown",handleShowNamePicker);
        document.addEventListener("mousedown",handleShowDescriptionPicker);
        document.addEventListener("mousedown",handleShowPricePicker);
      }
    },[])

    useEffect(()=>{
      if(isEditRoute){
        formik.setValues((prevValues)=>({
          ...prevValues,
          restaurantName:formData.restaurantName,
          category:formData.category
        }))
      }
    },[])

    useEffect(()=>{
      setLoading(false);
    },[])
    // console.log("isss ",editFormdata);
    console.log("fomik values: ",formik.values);
    console.log("intial values: ",formik.initialValues);
    console.log("formik errors",formik.errors);
return (
    <div className='p-4'>
      {loading ? (
                <SkeletonLoader />
            ) : (
        <Formik
            initialValues={initialValues}
            validate={validation}
            onSubmit={(values) => {
                //console.log(values);
            }}
            validateOnBlur={true}
            enableReinitialize={true}
        >
            {({ values }) => (
                <form action="" className='w-full h-auto flex flex-col'>
            {/* Sección de Nombre del Restaurante y Logo */}
            <div className="flex flex-col md:flex-row flex-wrap sm:mx-3 md:mx-3 mb-6">
            {/* Contenedor del input para el nombre del restaurante */}
            <div className="flex flex-col p-4 sm:mr-0 md:mr-4 w-full md:w-auto">
              <label className="my-1" htmlFor="restaurantName">{t('Restaurant Name')}</label>
              <input
                onChange={(e) => { handleRestaurantName(e, formik.handleChange); }}
                className="mb-1 p-2 border rounded w-full md:w-80"
                type="text"
                value={formData.restaurantName}
                onBlur={formik.handleBlur}
                name="restaurantName"
                id="restaurantName"
              />
              {formik.touched.restaurantName && formik.errors.restaurantName ? (
                <div className='text-red-600 my-1 text-[13px]'>{formik.errors.restaurantName}</div>
              ) : (
                <div className='max-h-[13px] my-1'></div>
              )}
            </div>

            {/* Contenedor del botón para subir el logo */}
            <div className="flex flex-col md:flex-row justify-center items-center p-4 mt-2 sm:mt-1 md:mt-0 w-full md:w-auto">
              <label
                htmlFor="restaurantLogo"
                onClick={(e) => { formik.setTouched({ ...formik.touched, restaurantLogo: true }); }}
                className="cursor-pointer bg-light-blue hover:bg-dark-blue text-white py-2 px-4 rounded-md"
              >
                {t('Load logo')}
              </label>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                name="restaurantLogo"
                id="restaurantLogo"
                onBlur={formik.handleBlur}
                onChange={(e) => { handleLogo(e); formik.setFieldValue('restaurantLogo', e.target.files[0]); }}
              />
            </div>
          </div>          
          {/* Sección del Color de Fondo */}
          <div className="flex flex-col md:flex-row justify-start items-start space-y-4 md:space-y-0 md:space-x-6 py-4">
            {/* Background Section */}
            <div className="flex items-center space-x-6 mx-3">
              <label htmlFor="backgroundColor">{t('Background color')}</label>
              <button></button>
              <div 
                className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                onClick={() => indexTemplate == null && (setShowBackgroundPicker(!showBackgroundPicker))}
                aria-disabled={indexTemplate != null ? false : true}
                style={{ backgroundColor: formData.backgroundCard || "#000" ,backgroundImage:formData?.backgroundCard.includes("gradient") ? formData?.backgroundCard : "none"}}
              />
              {showBackgroundPicker && (
                <div className="colorPickerr z-50" ref={backgroundPickerRef}>
                  <ColorPicker gradient={true} handlerFunction={(color) => { handleBackgroundCard(color); }} pickerValue={formData.backgroundCard} pickerColor={formData.backgroundCard} />
                </div>
              )}
            </div>

            {/* Menu Color Section */}
            <div className="flex items-center space-x-12 mx-3">
              <label htmlFor="menuColor" className="text-[17px]">{t('Color navbar')}</label>
              <div className="w-10 h-10 border border-gray-300 rounded cursor-pointer" onClick={() => setShowMenuPicker(!showMenuPicker)} style={{ backgroundColor: formData.colorMenu || "#000" }}
              />
              {showMenuPicker && (
                <div className="menuPicker z-50" ref={menuPickerRef}>
                  <ColorPicker gradient={false} handlerFunction={(color) => { handleMenuColor(color); }} pickerValue={formData.colorMenu} pickerColor={formData.colorMenu} />
                </div>
              )}
            </div>
          </div>
                  <Accordion>
                    <AccordionItem className='bg-gray-300 px-3 rounded-[10px] my-3 mx-0' aria-label='Background Templates' key={'1'} title={t('Background templates')}>
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
                            <img onClick={(e)=>{
                              setIndexTemplate(formData.idImgTemplate); handleTemplate(e); setIndexTemplate(index)}} id={element.id} className={`w-full h-full object-cover rounded-lg hover:shadow-md hover:shadow-black ${indexTemplate==element.id ? 'brightness-50':''}`} src={element.image} alt="imagen" />
                          </motion.div>
                        ))}
                        <div onClick={()=>{templateNull();setIndexTemplate(null)}} className={`w-1/5 flex-shrink-0 flex align-middle justify-center bg-white rounded-lg overflow-auto ${indexTemplate==null ? 'border-[2px] border-black':''}`}>
                            <div className='w-ful h-full flex align-middle items-center'>
                              <label className={` ${formData.idUserTemplate!==null ? 'hidden':'p-4 bg-light-blue hover:bg-dark-blue text-white rounded-md'}`} htmlFor="userTemplate">+</label>
                              <input onChange={(e)=>handleUserTemplate(e,formik.handleChange)} className='hidden' name='userTemplate' id='userTemplate' type="file" accept='image/*' />
                              <div className={`${formData.idUserTemplate!==null ? 'w-full h-full relative top-0 overflow-auto':'hidden'}`}>
                                <span onClick={async()=>{await resetUserTemplate(); if(formData.idUserTemplate!==null){usertemplateNull();}}} className='z-50 absolute top-1 right-2 cursor-pointer text-red-600 font-bold'>x</span>
                                <img src={validateLink.test(formData?.idUserTemplate)  ? (isEditRoute ? formData?.idUserTemplate : '') : (formData?.idUserTemplate instanceof File ? URL.createObjectURL(formData?.idUserTemplate) : '')} className={`${formData?.idUserTemplate!==null ? 'object-cover w-full h-full':''}`} alt="" id='userTemplate' />
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
                  <div className='my-3 mb-4 flex flex-col sm:flex-col md:flex-col lg:flex-row flex-wrap justify-start items-center lg:items-start'>
                    <h1 className='mt-3 text-lg font-semibold mb-3 lg:mr-6 lg:mb-0'>{t('Font style')}</h1>
                    <select 
                      value={isEditRoute ? formData.idFontPreview : ''} 
                      className='p-4 rounded-[10px] bg-gray-300 w-full lg:w-auto'
                      name="fontFamily" 
                      id="fontFamily" 
                      onChange={(e) => handleFontFamily(e)}
                    >
                      {fonts?.map((item, index) => (
                        <option style={{ fontFamily: item.fontName }} key={index} id={item.id} value={item.id}>
                          {item.fontName}
                        </option>
                      ))}
                    </select>
                  </div>
                    {/* Sección de Personalización de la Tarjeta de Producto */}
                    <div className='flex flex-col mb-6'>
                      <h1 className='mb-2 text-lg font-semibold'>{t('Customize your product card')}</h1>
                      <div className='flex flex-col sm:flex-row flex-wrap w-full sm:w-[80%] p-4 justify-around gap-4'>
                        {/* Color de Fondo */}
                        <div className='flex flex-col items-center'>
                          <label className='my-2' htmlFor="background">Background</label>
                          <div className='w-10 h-10 border-2 border-gray-300 rounded cursor-pointer' onClick={() =>setShowBackCategoryPicker(!showBackCategoryPicker)} style={{backgroundColor:formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || "#000",backgroundImage:formData.category?.[activeCategory]?.products[0]?.backgroundProductCard.includes("gradient") ? formData.category?.[activeCategory]?.products[0]?.backgroundProductCard : "none" }}
                          ></div>
                          {showBackCategoryPicker && (
                            <div className='colorPicker z-50' ref={backgroundProductPickerRef}>
                              <ColorPicker handlerFunction={(color) => { if (activeCategory !== null) {handleBackgroundProduct(activeCategory, color); }}}   pickerValue={formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || '#FFFFFF'}  pickerColor={formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || '#FFFFFF'} gradient={true}/>
                            </div>
                          )}
                        </div>

                        {/* Color del Nombre */}
                        <div className='flex flex-col items-center'>
                          <label className='my-2' htmlFor="nameColor">{t('Name Color')}</label>
                          <div className='w-10 h-10 border border-gray-300 rounded cursor-pointer'  onClick={() => setShowNamePicker(!showNamePicker)}   style={{ backgroundColor: formData.category?.[activeCategory]?.products[0]?.colorName || '#000' }}
                          ></div>
                          {showNamePicker && (
                            <div className='colorPicker' ref={namePickerRef}>
                              <ColorPicker gradient={false} handlerFunction={(color) =>{handleColorNameProduct(activeCategory, color); }} pickerValue={formData.category?.[activeCategory]?.products?.[0].colorName || "#000"} pickerColor={formData.category?.[activeCategory]?.products?.[0].colorName || "#FFFFFF"} />
                            </div>
                          )}
                        </div>

                        {/* Color de la Descripción */}
                        <div className='flex flex-col items-center'>
                          <label className='my-2' htmlFor="descriptionColor">{t('Description Color')}</label>
                          <div  className='w-10 h-10 border border-gray-300 rounded cursor-pointer'  onClick={() => setShowDescriptionPicker(!showDescriptionPicker)}  style={{ backgroundColor: formData.category?.[activeCategory]?.products[0]?.colorDescription || '#000' }}></div>
                          {showDescriptionPicker && (
                            <div className='colorPicker' ref={descriptionPickerRef}>
                              <ColorPicker gradient={false}  handlerFunction={(color) => { handleColorDescriptionProduct(activeCategory, color); }} pickerValue={formData.category?.[activeCategory]?.products[0]?.colorDescription || "#FFFFFF"} pickerColor={formData.category?.[activeCategory]?.products?.[0].colorDescription || "#FFFFFF"} />
                            </div>
                          )}
                        </div>

                        {/* Color del Precio */}
                        <div className='flex flex-col items-center'>
                          <label className='my-2' htmlFor="priceColor">{t('Price Color')}</label>
                          <div  className='w-10 h-10 border border-gray-300 rounded cursor-pointer'  onClick={() => setShowPricePicker(!showPricePicker)}  style={{ backgroundColor: formData.category?.[activeCategory]?.products[0]?.colorPrice || '#000' }}
                          ></div>
                          {showPricePicker && (
                            <div className='colorPicker' ref={pricePickerRef}>
                              <ColorPicker gradient={false} handlerFunction={(color) => { handleColorPriceProduct(activeCategory, color); }} pickerValue={formData.category?.[activeCategory]?.products?.[0].colorPrice || "#FFFFFF"} pickerColor={formData.category?.[activeCategory]?.products?.[0].colorPrice || "#FFFFFF"} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Sección para Agregar Nueva Categoría y Productos */}
                    <div className='flex flex-col mt-6'>
                        {values?.category && values?.category.length <= 0 ? (
                            <div><h1>no hay categorias agregadas</h1></div>
                        ) : (
<FieldArray name="category">
  {({ remove, push }) => (
    <div>
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
        {t('+ Add new category')}
      </button>

      {/* Asegurarse de que hay categorías antes de mostrar el Accordion */}
      {values?.category.length > 0 && (
        <Accordion variant="splitted">
          {values?.category.map((category, index) => (
            <AccordionItem
              className={`bg-gray-300 my-2 p-3 pb-2 w-full rounded-2xl cursor-pointer ${
                  activeCategory === index ? "border-2 border-zinc-800" : ""
                }`}
              key={index}
              aria-label={`category ${index}`}
              title={
                <div onClick={()=>handleActiveCategory(index)} className="flex justify-between p-2">
                  <label htmlFor={`category.${index}.categoryName`} className="">
                    {!productsCategory?.[index].categoryName=="" ? productsCategory?.[index]?.categoryName:t('Category name')}
                  </label>
                    <button
                      onClick={() => {
                        if (values?.category.length>1 && formData.category.length>1) {
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
                className={`bg-gray-300 my-1 p-3 sm:p-1 md:p-1 w-full rounded-2xl cursor-pointer`}
              >
                <div className='flex flex-col'>
                  {/* Input para el nombre de la categoría */}
                  <input
                    onChange={(e) => handleChangeCategoryName(index, e,formik.handleChange)}
                    className="p-2 border rounded w-full"
                    type="text"
                    value={formData?.category[index]?.categoryName}
                    name={`category[${index}].categoryName`}
                    placeholder={t("Enter category name")}
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
                        {t('+ Add New Product')}
                      </button>

                      {/* Accordion para los productos */}
                      <Accordion>
                        {values.category[index].products.map((product, productIndex) => (
                            <AccordionItem
                            key={`${index}-${productIndex}`}
                            aria-label={`product ${index}-${productIndex}`}
                            title={
                              <div className="flex justify-between px-2">
                                <h1 className=""> {!productsCategory?.[index].products?.[productIndex].productName=="" ? productsCategory?.[index]?.products?.[productIndex]?.productName:`${t('Product')} ${productIndex+1}`}</h1>
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
                              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4 m-0 w-full">
                                {/* Contenedor de la Imagen */}
                                <div
                                  className={`lg:w-1/3 w-full sm:h-40 lg:h-auto rounded-[10px] bg-slate-600 ${formData?.category[index]?.products[productIndex]?.productImg == null ? 'hidden' : ''}`}
                                >
                                  <img
                                    id={`imgProductPreview-${index}-${productIndex}`}
                                    className="w-full h-full rounded-[10px]"
                                    src={
                                      validateLink.test(formData?.category[index]?.products[productIndex]?.productImg)
                                        ? isEditRoute
                                          ? formData?.category[index]?.products[productIndex]?.productImg
                                          : ''
                                        : formData?.category[index]?.products[productIndex]?.productImg instanceof File
                                        ? URL.createObjectURL(formData?.category[index]?.products[productIndex]?.productImg)
                                        : ''
                                    }
                                    alt=""
                                  />
                                </div>

                                {/* Contenedor de los Detalles */}
                                <div className="lg:w-2/3 w-full flex flex-col gap-4">
                                  {/* Input de Imagen */}
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <input
                                      onChange={(e) => {
                                        handleImgProduct(index, productIndex, e);
                                        formik.setFieldValue(`category[${index}].products[${productIndex}].productImg`, e.target.files[0]);
                                      }}
                                      className="hidden"
                                      type="file"
                                      accept="image/*"
                                      name={`category[${index}].products[${productIndex}].productImg`}
                                      id={`category[${index}].products[${productIndex}].productImg`}
                                      onBlur={formik.handleBlur}
                                    />
                                    <label
                                      onClick={() => {
                                        const touched = { ...formik.touched };
                                        if (!touched.category) touched.category = [];
                                        if (!touched.category[index]) touched.category[index] = { products: [] };
                                        if (!touched.category[index].products) touched.category[index].products = [];
                                        if (!touched.category[index].products[productIndex]) touched.category[index].products[productIndex] = {};
                                        touched.category[index].products[productIndex].productImg = true;
                                        formik.setTouched(touched);
                                      }}
                                      htmlFor={`category[${index}].products[${productIndex}].productImg`}
                                      className="p-2 text-base rounded-md w-full sm:w-auto sm:max-w-xs text-center bg-light-blue text-white hover:bg-dark-blue"
                                    >
                                      {t('Add Image')}
                                    </label>
                                    {formik.touched?.category?.[index]?.products?.[productIndex]?.productImg &&
                                    formik.errors?.category?.[index]?.products?.[productIndex]?.productImg ? (
                                      <div className="text-sm text-red-600">
                                        {formik.errors.category[index].products[productIndex].productImg}
                                      </div>
                                    ) : null}
                                  </div>

                                  {/* Input para Nombre y Descripción */}
                                  <div className="flex flex-col gap-2">
                                    <input
                                      className="p-2 border rounded w-full"
                                      type="text"
                                      placeholder={t('Product Name')}
                                      value={formData?.category[index]?.products[productIndex]?.productName}
                                      name={`category[${index}].products[${productIndex}].productName`}
                                      onBlur={formik.handleBlur}
                                      onChange={(e) => {
                                        handleProductName(index, productIndex, e);
                                        formik.setFieldValue(`category[${index}].products[${productIndex}].productName`, e.target.value);
                                      }}
                                    />
                                    {formik.touched?.category?.[index]?.products?.[productIndex]?.productName &&
                                    formik.errors?.category?.[index]?.products?.[productIndex]?.productName ? (
                                      <div className="text-sm text-red-600">
                                        {formik.errors.category[index].products[productIndex].productName}
                                      </div>
                                    ) : null}

                                    <input
                                      className="p-2 border rounded w-full"
                                      type="text"
                                      placeholder={t('Product Description')}
                                      value={formData?.category[index]?.products[productIndex]?.productDescription}
                                      name={`category[${index}].products[${productIndex}].productDescription`}
                                      onBlur={formik.handleBlur}
                                      onChange={(e) => {
                                        handleProductDescription(index, productIndex, e);
                                        formik.setFieldValue(`category[${index}].products[${productIndex}].productDescription`, e.target.value);
                                      }}
                                    />
                                    {formik.touched?.category?.[index]?.products?.[productIndex]?.productDescription &&
                                    formik.errors?.category?.[index]?.products?.[productIndex]?.productDescription ? (
                                      <div className="text-sm text-red-600">
                                        {formik.errors.category[index].products[productIndex].productDescription}
                                      </div>
                                    ) : null}
                                  </div>

                                  {/* Checkbox y Precio */}
                                  <div className="flex flex-col lg:flex-row gap-4">
                                    {/* Checkbox "Top" */}
                                    <div className="flex items-center gap-2">
                                      <label>{t('Top')}</label>
                                      <input
                                        type="checkbox"
                                        defaultChecked={isEditRoute ? formData?.category[index]?.products[productIndex]?.top : false}
                                        name={`category[${index}].products[${productIndex}].top`}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                          handleProductTop(index, productIndex, e);
                                          formik.setFieldValue(`category[${index}].products[${productIndex}].top`, e.target.checked);
                                        }}
                                      />
                                    </div>

                                    {/* Input "Price" */}
                                    <div className="flex items-center h-16 gap-2 p-2">
                                      <label className="sm:mr-2">{t('Price')}</label>
                                      <div className='flex flex-col'>
                                        <input
                                          className="p-2 border rounded w-full"
                                          type="number"
                                          value={formData.category[index]?.products[productIndex]?.price}
                                          name={`category[${index}].products[${productIndex}].price`}
                                          onBlur={formik.handleBlur}
                                          min={0}
                                          onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/\D/g, ""); 
                                            handleProductPrice(index, productIndex, e);
                                            formik.setFieldValue(`category[${index}].products[${productIndex}].price`, onlyNums);
                                          }}
                                        />
                                        {formik.touched?.category?.[index]?.products?.[productIndex]?.price &&
                                        formik.errors?.category?.[index]?.products?.[productIndex]?.price ? (
                                          <div className="text-sm text-red-600">
                                            {formik.errors.category[index].products[productIndex].price}
                                          </div>
                                        ) : null}
                                      </div>
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
      )}      
    </div>
);

}

export default MenuForm;