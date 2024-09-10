import { FieldArray, Formik, useFormik,Field } from 'formik';
import { useEffect, useState } from 'react';
import { UseMenu } from './menuContext';
import GradientColorPicker from 'react-gcolor-picker';
import EjectIcon from '@mui/icons-material/Eject';
import DeleteIcon from '@mui/icons-material/Delete';
import {Accordion,AccordionItem} from '@nextui-org/accordion'
import './menu.css'

function MenuForm(){
    const {formData,handleRestaurantName,handleLogo,handleBackgroundCard,addCategory,
        addProductToCategory,removeCategory,removeProductToCategory,handleProductName,handleProductDescription,
        handleProductTop,handleProductPrice,handleChangeCategoryName,handleImgProduct,handleBackgroundProduct,
        handleColorNameProduct,
        handleColorDescriptionProduct,
        handleColorPriceProduct
    }=UseMenu();

    const[activeCategory,setActiveCategory]=useState(0);
    const[activeProduct,setActiveProduct]=useState(0);
    const[initialValues,setInitialValues]=useState(formData);
    const[showBackgroundPicker,setShowBackgroundPicker]=useState(false);
    const[showBackCategoryPicker,setShowBackCategoryPicker]=useState(false);
    const[showNamePicker,setShowNamePicker]=useState(false);
    const[showDescriptionPicker,setShowDescriptionPicker]=useState(false);
    const[showPricePicker,setShowPricePicker]=useState(false);
    const[isStyleCheck,setIsStyleCheck]=useState(false);



    const handleHideCategory = (index) => {
        setHideCategory(prevState => ({
          ...prevState,
          [index]: !prevState[index]
        }));
      };
      console.log(formData);
      console.log("categoria ",activeCategory);
      console.log("producto ",activeProduct);

      const handleHideProduct = (index, indexProd) => {
        setHideProduct(prevState => ({
          ...prevState,
          [index]: {
            ...prevState[index],
            [indexProd]: !prevState[index]?.[indexProd]
          }
        }));
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



    const validation=(values)=>{
        const errors={};

        if(!values.restaurantName){
            errors.restaurantName="restaurant name is required";
        }
        if(!values.restaurantLogo){
            errors.restaurantLogo="logo is required";
        }

        if(!values.category.categoryName){
            errors.category.categoryName="category name is required";
        }

        if(!values.category.products.productName){
            errors.category.products.productName="product name is required"
        }

        if(!values.category.products.productDescription){
            errors.category.products.productDescription="product description is required"
        }

        if(!values.category.products.productPrice){
            values.category.products.productPrice="product price is required"
        }

        return errors;
    }

    const formik=useFormik({
        initialValues,
        validation,
        onsubmit:(values,{setSubmitting})=>{
            console.log(values);
        }
});


return (
    <div className='p-4'>
        <Formik
            initialValues={formData}
            validate={validation}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ values }) => (
                <form action="" className='w-full h-auto flex flex-col'>
                    {/* Sección de Nombre del Restaurante y Logo */}
                    <div className='flex flex-row mb-6'>
                        <div className='flex flex-col p-4 mx-4'>
                            <label className='my-1' htmlFor="restaurantName">Restaurant Name</label>
                            <input onChange={(e)=>handleRestaurantName(e,formik.handleChange)} className='p-2 border rounded' type="text" name='restaurantName' id='restaurantName' />
                        </div>
                        <div className='flex flex-col p-4 mx-4'>
                            <label className='mb-2' htmlFor="restaurantLogo">Logo</label>
                            <input onChange={(e)=>handleLogo(e,formik.handleChange)} className='p-2 border rounded' type="file" name="restaurantLogo" id="restaurantLogo"/>
                        </div>
                    </div>

                    {/* Sección del Color de Fondo */}
                    <div className='flex flex-col my-6'>
                        <div className='flex flex-row items-center p-2'>
                            <button className='mx-5 my-2 px-4 py-2 bg-gray-200 rounded' type='button'>
                                Background <button type='button'><EjectIcon /></button>
                            </button>
                            <div 
                                className='w-20 h-10 border border-gray-300 rounded cursor-pointer'
                                onClick={()=>handleShowBackgroundPicker(!showBackgroundPicker)}
                                style={{backgroundColor:formData.backgroundCard || "#000"}}
                            ></div>
                            {showBackgroundPicker && (
                                <div className='colorPickerr'>
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
                                            formik.setFieldValue("backgroundCard",color);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='flex w-full justify-around items-start mt-4'>
                            <h1 className='w-1/5 h-auto border-2 border-black p-4 text-center'>Carta</h1>
                            <h1 className='w-1/5 h-auto border-2 border-black p-4 text-center'>Carta</h1>
                            <h1 className='w-1/5 h-auto border-2 border-black p-4 text-center'>Carta</h1>
                            <h1 className='w-1/5 h-auto border-2 border-black p-4 text-center'>Carta</h1>
                        </div>
                    </div>

                    {/* Sección de Personalización de la Tarjeta de Producto */}
                    <div className='flex flex-col mb-6'>
                        <h1 className='mb-4 text-lg font-semibold'>Customize your product card</h1>
                        <div className='flex flex-row w-[80%] p-4 justify-around'>
                            {/* Color de Fondo */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Background</label>
                                <div 
                                    className='w-20 h-10 border border-gray-300 rounded cursor-pointer'
                                    onClick={()=>handleShowBackCategoryPicker(!showBackCategoryPicker)}
                                    style={{ backgroundColor: formData.category?.[activeCategory]?.products[0]?.backgroundProductCard || "#000" }}
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
                                    className='w-20 h-10 border border-gray-300 rounded cursor-pointer'
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
                                            onChange={(color) =>handleColorNameProduct(activeCategory,color)}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Color de la Descripción */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Description-Color</label>
                                <div 
                                    className='w-20 h-10 border border-gray-300 rounded cursor-pointer'
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
                                            onChange={(color) =>handleColorDescriptionProduct(activeCategory,color)}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Color del Precio */}
                            <div className='flex flex-col items-center'>
                                <label className='my-2' htmlFor="">Price-Color</label>
                                <div 
                                    className='w-20 h-10 border border-gray-300 rounded cursor-pointer'
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
                                            onChange={(color) =>handleColorPriceProduct(activeCategory,color)}
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
      {/* Botón para agregar nueva categoría */}
      <button
        onClick={() => {
          push({
            categoryName: "",
            products: [{backgroundProductCard:"#fff",
              colorName:"#000",
              colorDescription:"#000",
              colorPrice:"#000", 
              productImg: null, 
              productName: "", 
              productDescription: "", 
              top: false, 
              price: null }],
          });
          addCategory({
            categoryName: "",
            products: [{backgroundProductCard:"#fff",
              colorName:"#000",
              colorDescription:"#000",
              colorPrice:"#000", 
              productImg: null, 
              productName: "", 
              productDescription: "", 
              top: false, 
              price: null }],
          });
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
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
                        if (index !== 0) {
                          remove(index);
                          removeCategory(index);
                        }
                        if (activeCategory === index) {
                          handleActiveCategory(index - 1);
                        }
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
                className={`bg-gray-300 my-1 p-3 pb-2 w-full rounded-2xl cursor-pointer`}
              >
                {/* Input para el nombre de la categoría */}
                <input
                  onChange={(e) => handleChangeCategoryName(index, e)}
                  className="p-2 border rounded w-full mb-3"
                  type="text"
                  name={`category.${index}.categoryName`}
                  placeholder="Enter category name"
                />

                {/* Si hay productos en la categoría, se muestran dentro del FieldArray */}
                <FieldArray name={`category.${index}.products`}>
                  {({ push: pushProduct, remove: removeProduct }) => (
                    <div>
                      {/* Botón para agregar un nuevo producto */}
                      <button
                        onClick={() => {
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
                        }}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
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
                                      if (productIndex !== 0) {
                                        handleActiveProduct(productIndex - 1);
                                        removeProduct(productIndex);
                                        removeProductToCategory(index, productIndex);
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
                              <div className="flex flex-row">
                                <div className="w-[30%] rounded-[10px] bg-slate-600">
                                  <img
                                    id={`imgProductPreview-${index}-${productIndex}`}
                                    className="object-cover w-full h-full rounded-[10px]"
                                    src=""
                                    alt=""
                                  />
                                </div>
                                <div className="w-[68%] ml-4 flex flex-col">
                                  {/* Input para la imagen del producto */}
                                  <input
                                    onChange={(e) => handleImgProduct(index, productIndex, e)}
                                    className="mb-4 p-2 border rounded"
                                    type="file"
                                    name={`category.${index}.products.${productIndex}.productImg`}
                                  />
                                  {/* Input para el nombre del producto */}
                                  <input
                                    onChange={(e) => handleProductName(index, productIndex, e)}
                                    className="mb-4 p-2 border rounded"
                                    type="text"
                                    placeholder="Product Name"
                                    name={`category.${index}.products.${productIndex}.productName`}
                                  />
                                  {/* Input para la descripción del producto */}
                                  <input
                                    onChange={(e) => handleProductDescription(index, productIndex, e)}
                                    className="mb-4 p-2 border rounded"
                                    type="text"
                                    placeholder="Product Description"
                                    name={`category.${index}.products.${productIndex}.productDescription`}
                                  />
                                  {/* Checkbox y input para el precio */}
                                  <div className="flex items-center">
                                    <div className="flex items-center mr-4">
                                      <input
                                        onChange={(e)=>handleProductTop(index,productIndex,e)}
                                        className="mr-2"
                                        type="checkbox"
                                        name={`category.${index}.products.${productIndex}.top`}
                                      />
                                      <label>Top</label>
                                    </div>
                                    <div className="flex items-center">
                                      <label className="mr-2">Price</label>
                                      $
                                      <input
                                        onChange={(e) => handleProductPrice(index, productIndex, e)}
                                        className="p-2 border rounded w-20"
                                        type="number"
                                        name={`category.${index}.products.${productIndex}.price`}
                                      />
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