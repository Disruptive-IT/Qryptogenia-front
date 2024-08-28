import { useFormik } from 'formik';
import { useState } from 'react';
import { UseMenu } from './menuContext';
import './menu.css'

function MenuForm(){
    const[activeCategory,setActiveCategory]=useState(0);
    const[activeProduct,setActiveProduct]=useState(0);

    const {formData}=UseMenu;

    const handleActiveCategory = (index) => {
        setActiveCategory(index);
    };
    
    const handleActiveProduct = (index) => {
        setActiveProduct(index);
    };

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

    return(
        <div className=''>
            <form action="" className='w-full h-auto flex flex-col flex-wrap'>
                <div className='flex flex-row mb-4'> {/* div padre*/}
                    <div className='flex flex-col p-4 my-2 mx-4'>
                        <label className='my-1' htmlFor="">Restaurant Name</label>
                        <input type="text" name='restaurantName' id='restaurantName' />
                    </div>
                    <div className='flex flex-row p-4 my-2 mx-4'>
                        <label className='mx-4' htmlFor="restaurantLogo">Logo</label>
                        <input type="file" name="restaurantLogo" id="RestaurantLogo"/>
                    </div>
                </div>
                <div className='flex flex-col flex-wrap my-3 mb-6'> {/* div padre*/}
                    <div className='flex flex-row p-2'>
                        <button className='mx-5 my-2' type='button'>BackGround <button type='button'>icono</button></button>
                        <h1 className='mx-5 my-2'>colorpicker</h1>
                    </div>
                    <div className='w-[80%] h-auto flex justify-around items-start'>
                        <h1 className='w-[10%] h-auto border-2 border-black'>carta</h1>
                        <h1 className='w-[10%] h-auto border-2 border-black'>carta</h1>
                        <h1 className='w-[10%] h-auto border-2 border-black'>carta</h1>
                        <h1 className='w-[10%] h-auto border-2 border-black'>carta</h1>
                    </div>
                </div>
                <div className='flex flex-col flex-wrap'> {/* div padre*/}
                    <h1>Customize your product card</h1>
                    <div className='flex flex-row w-[80%] h-auto p-4 justify-around align-middle'>
                        <div className='flex flex-col p-2 flex-wrap'>
                            <label className='my-2' htmlFor="">Background</label>
                            <input type="color" name="" id="" />
                        </div>
                        <div className='flex flex-col p-2 flex-wrap'>
                            <label className='my-2' htmlFor="">Name-Color</label>
                            <input type="color" name="" id="" />
                        </div>
                        <div className='flex flex-col p-2 flex-wrap'>
                            <label className='my-2' htmlFor="">Description</label>
                            <input type="color" name="" id="" />
                        </div>
                        <div className='flex flex-col p-2 flex-wrap'>
                            <label className='my-2' htmlFor="">Price</label>
                            <input type="color" name="" id="" />
                        </div>
                    </div>
                </div>
                <div> {/* div padre*/}
                    <button type='button'>+ Add new category</button>
                    <div>
                        <div>
                            <label htmlFor="">Category Name</label>
                            <input type="text" name='' id='' />
                        </div>
                        <button type='button'>+ Add New Product</button>
                    </div>
                    <div>
                        <div>
                            <input type="file" />
                        </div>
                        <div>
                            <input type="text" name='' id='' placeholder='Product Name'/>
                            <input type="text" name='' id='' placeholder='Product Description'/>
                            <div>
                                <div>
                                    <input type="checkBox" name='' id=''/> 
                                    <label htmlFor="">Top</label>
                                </div>
                                <div>
                                    <label htmlFor="">Price</label>
                                    $<input type="number" name='' id=''/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MenuForm;