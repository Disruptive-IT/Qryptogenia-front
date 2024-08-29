import { FieldArray, Formik, useFormik,Field } from 'formik';
import { useState } from 'react';
import { UseMenu } from './menuContext';
import GradientColorPicker from 'react-gcolor-picker';
import EjectIcon from '@mui/icons-material/Eject';
import './menu.css'

function MenuForm(){
    const[activeCategory,setActiveCategory]=useState(0);
    const[activeProduct,setActiveProduct]=useState(0);
    const[showBackgroundPicker,setShowBackgroundPicker]=useState(false);
    const[showBackCategoryPicker,setShowBackCategoryPicker]=useState(false);
    const[showNamePicker,setShowNamePicker]=useState(false);
    const[showDescriptionPicker,setShowDescriptionPicker]=useState(false);
    const[showPricePicker,setShowPricePicker]=useState(false);
    const[hideCategory,setHideCategory]=useState(false);
    const[hideProduct,setHideProduct]=useState(false);

    const {formData}=UseMenu();
    console.log(formData);

    const handleHideCategory = (index) => {
        setHideCategory(prevState => ({
          ...prevState,
          [index]: !prevState[index]
        }));
      };

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


    const initialValues=formData;

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
                            <Field className='p-2 border rounded' type="text" name='restaurantName' id='restaurantName' />
                        </div>
                        <div className='flex flex-col p-4 mx-4'>
                            <label className='mb-2' htmlFor="restaurantLogo">Logo</label>
                            <Field className='p-2 border rounded' type="file" name="restaurantLogo" id="restaurantLogo"/>
                        </div>
                    </div>

                    {/* Sección del Color de Fondo */}
                    <div className='flex flex-col my-6'>
                        <div className='flex flex-row items-center p-2'>
                            <button className='mx-5 my-2 px-4 py-2 bg-gray-200 rounded' type='button'>
                                Background <button type='button'>icono</button>
                            </button>
                            <div 
                                className='w-20 h-10 border border-gray-300 rounded cursor-pointer'
                                onClick={()=>handleShowBackgroundPicker(!showBackgroundPicker)}
                                style={{ backgroundColor: '#000' }}
                            ></div>
                            {showBackgroundPicker && (
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
                                        color=''
                                        onChange={() => {}}
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
                                    style={{ backgroundColor: '#000' }}
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
                                            gradient
                                            color=''
                                            onChange={() => {}}
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
                                    style={{ backgroundColor: '#000' }}
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
                                            color=''
                                            onChange={() => {}}
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
                                    style={{ backgroundColor: '#000' }}
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
                                            gradient
                                            color=''
                                            onChange={() => {}}
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
                                    style={{ backgroundColor: '#000' }}
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
                                            gradient
                                            color=''
                                            onChange={() => {}}
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
    {({ push, remove }) => (
        <div>
            <button onClick={() => push({ categoryName: "", products: [] })} className='mb-4 px-4 py-2 bg-blue-500 text-white rounded' type='button'>
                + Add new category
            </button>
            {values.category.map((category, index) => (
                <div key={index} className='bg-gray-300 my-5 p-4 pb-2 w-[100%] rounded-2xl'>
                    <div className='mb-4'>
                        <label className='mb-2' htmlFor={`category.${index}.categoryName`}>Category Name</label>
                        <button onClick={()=>handleHideCategory(index)} type="button" className='float-end'><EjectIcon className={hideCategory[index] ? 'rotate-180' : 'rotate-0'}/></button>
                    </div>
                    <div className={hideCategory[index] ? '':'hidden'} id="category-container">
                    <Field className='p-2 border rounded w-full mb-3' type="text" name={`category.${index}.categoryName`} id={`category.${index}.categoryName`} />
                    <FieldArray name={`category.${index}.products`}>
                        {({ push: pushProduct, remove: removeProduct }) => (
                            <div>
                                <button onClick={() => pushProduct({ productImg: null, productName: "", productDescription: "", top: false, price: null })} className='mb-4 px-4 py-2 bg-green-500 text-white rounded' type='button'>
                                    + Add New Product
                                </button>
                                {values.category[index].products.map((product, productIndex) => (
                                    <div className='rounded-2xl bg-white px-2 py-2 mb-3'>
                                        <div className='flex flex-column mb-3 justify-between'>
                                            <h1>Product {productIndex+1}</h1>
                                            <button onClick={()=>handleHideProduct(index,productIndex)} type="button" className='float-end'><EjectIcon className={hideProduct[index]?.[productIndex] ? 'rotate-180' : 'rotate-0'}/></button>
                                        </div>
                                        <div className={hideProduct[index]?.[productIndex] ? '':'hidden'}>
                                        <div key={productIndex} className={'flex flex-col mb-4'}>
                                        <Field className='mb-4 p-2 border rounded' type="file" name={`category.${index}.products.${productIndex}.productImg`} />
                                        <Field className='mb-4 p-2 border rounded' type="text" placeholder='Product Name' name={`category.${index}.products.${productIndex}.productName`} />
                                        <Field className='mb-4 p-2 border rounded' type="text" placeholder='Product Description' name={`category.${index}.products.${productIndex}.productDescription`} />
                                        <div className='flex items-center'>
                                            <div className='flex items-center mr-4'>
                                                <Field className='mr-2' type="checkbox" name={`category.${index}.products.${productIndex}.top`} /> 
                                                <label>Top</label>
                                            </div>
                                            <div className='flex items-center'>
                                                <label className='mr-2'>Price</label>
                                                $<Field className='p-2 border rounded w-20' type="number" name={`category.${index}.products.${productIndex}.price`} />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() =>{if(productIndex=!0){ removeProduct(productIndex)}}} type='button' className='mb-4 px-4 py-2 bg-red-600 text-white rounded'>
                                            Remove Product
                                    </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </FieldArray>
                    <button onClick={() =>{if(index=!0){remove(index)}}} type='button' className='mb-4 px-4 py-2 bg-red-600 text-white rounded'>
                        Remove Category
                    </button>
                    </div>
                </div>
            ))}
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