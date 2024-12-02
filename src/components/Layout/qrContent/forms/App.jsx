/*
 * @Author : Jaider cuartas,   @date 2024-07-15 20:13:14
 * @description : Componente para el formulario de configuración de la aplicación QR. Permite al usuario ingresar y modificar el título, descripción, colores de fondo y caja, y subir una imagen.
 * @Props :
 *   - onFormChangeApp: Función callback para actualizar el estado de la aplicación con los valores del formulario.
 * @return : Retorna un formulario interactivo que permite al usuario configurar los detalles de la aplicación QR, incluyendo título, descripción, colores y carga de imagen.
 */
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, FormikContext } from "formik";
import Select from 'react-select';
import { useValidate } from '../../../../context/validateFormContext';
import { IoIosClose } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { MdOutlineCloudUpload } from "react-icons/md";
import ColorPicker from './form-helpers/picker';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonLoader from './Skeleton/Skeleton';
import { UseMenu } from './menu/menuContext';
import { appOptions } from '../preview-helpers/handlePreviewButtons';
import { resizeImage } from '../preview-helpers/handlerColor';
import { toast } from 'sonner';

export const AppForm = ({ onFormChangeApp, location, appFormValues }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const maxLength = 250;
    const maxTitle = 30;
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(180deg, rgb(253, 93, 8) 0.00%,rgb(251, 164, 14) 100.00%)');
    const [boxColor, setBoxColor] = useState('rgb(216, 61, 34)');
    const [colorTitle, setTitleColor] = useState('rgb(6, 35, 254)');
    const [descriptionColor, setDescriptionColor] = useState('rgb(42, 40, 40)');
    const [borderImg, setBorderColor] = useState('#ffffff');
    const [fontPreview,setFontPreview]=useState('');
    const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
    const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
    const [showDescriptionColorPicker, setShowDescriptionColorPicker] = useState(false);
    const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);
    const [showBoxColorPicker, setShowBoxColorPicker] = useState(false);
    const borderColorPickerRef = useRef(null);
    const titleColorPickerRef = useRef(null);
    const descriptionColorPickerRef = useRef(null);
    const backgroundColorPickerRef = useRef(null);
    const boxColorPickerRef = useRef(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [image, setImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const { t } = useTranslation();
    const isEditRoute = location.pathname.startsWith('/edit')
    const {validateFormApp,setValidateFormApp}=useValidate();
    const [loading, setLoading] = useState(true); // Por defecto está cargando
    const [appFontsPreview, setAppFontsPreview] = useState([]);
    const {getFontsPreview}=UseMenu();
    const {changeTabValue,globalTabValue}=useValidate();

    //console.log("validate from app",validateFormApp, formErrors);

    const validateFormFields = () => {
        if (Object.keys(formErrors).length > 0) {
          setValidateFormApp(false);
          return false;
        } else {
          setValidateFormApp(true);
          return true;
        }
      };

useEffect(() => {
    const fetchFontsPreview = async () => {
        setLoading(true); // Activa el loading antes de la petición
        try {
            await getFontsPreview(setAppFontsPreview);
        } catch (error) {
           // console.error("Error fetching fonts preview:", error);
        } finally {
            setLoading(false); // Desactiva el loading al terminar
        }
    };

    fetchFontsPreview();
}, []);

//console.log("these are the selected options: ",appFormValues.selectedOptions);

    const validateForm = (values) => {
        const errors = {};

        // Validar el título
        if (!values.title) {
            errors.title = t("Title is required");
        }

        // if(!values.description) {
        //     errors.description=t("Description is required");
        // }

        // Validar la selección de opciones
        if (selectedOptions.length === 0) {
            errors.selectedOptions = t("At least one option must be selected");
        }
       // console.log(selectedOptions)
        // Validar cada campo url en selectedOptions
        selectedOptions.forEach((option, index) => {
            //console.log(option.url)
            if (!option.url) {
                errors[`url_${index}`] = t("URL is required");
            }
        });
        //console.log(errors)

        return errors;
    };


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        onFormChangeApp((prevValues) => ({ ...prevValues, title: e.target.value }));
        const value = e.target.value;
        if (value.length <= maxTitle) {
            setTitle(value);
        }

    };

    const handleSelectedFont=(e)=>{
        setFontPreview(e.target.value);
        onFormChangeApp((prevValues)=>({...prevValues,idFontPreview:e.target.value}))
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        onFormChangeApp((prevValues) => ({ ...prevValues, description: e.target.value }));
        const value = e.target.value;
        if (value.length <= maxLength) {
            setDescription(value);
        }
    };

    const handleBackgroundColorChange = (newHexColor) => {
        setBackgroundColor(newHexColor);
        onFormChangeApp((prevValues) => ({ ...prevValues, backgroundColor: newHexColor }));
    };


    const handleBoxColorChange = (newHexColor) => {
        setBoxColor(newHexColor);
        onFormChangeApp((prevValues) => ({ ...prevValues, boxColor: newHexColor }));

    };
    const handleBorderColorChange = (newHexCoor) => {
        setBorderColor(newHexCoor);
        onFormChangeApp((prevValues) => ({ ...prevValues, borderImg: newHexCoor }));
    };

    const handleTitleColorChange = (newHexColor) => {
        setTitleColor(newHexColor);
        onFormChangeApp((prevValues) => ({ ...prevValues, colorTitle: newHexColor }));

    };

    const handleDescriptionColorChange = (newHexColor) => {
        setDescriptionColor(newHexColor);
        onFormChangeApp((prevValues) => ({ ...prevValues, descriptionColor: newHexColor }));
    };


    const handleTitleClickOutside = (e) => {
        if (titleColorPickerRef.current && !titleColorPickerRef.current.contains(e.target)) {
            setShowTitleColorPicker(false);
        }
    };

    const handleDescriptionClickOutside = (e) => {
        if (descriptionColorPickerRef.current && !descriptionColorPickerRef.current.contains(e.target)) {
            setShowDescriptionColorPicker(false);
        }
    };

    const handleBackgroundClickOutside = (e) => {
        if (backgroundColorPickerRef.current && !backgroundColorPickerRef.current.contains(e.target)) {
            setShowBackgroundColorPicker(false);
        }
    };

    const handleBoxClickOutside = (e) => {
        if (boxColorPickerRef.current && !boxColorPickerRef.current.contains(e.target)) {
            setShowBoxColorPicker(false);
        }
    };

    const handleMultiSelectChange = (selectedOptions) => {
        const updatedOptions = selectedOptions.map(option => ({
            value: option.value,
            url: option.url || ''
        }));
        setSelectedOptions(updatedOptions);
        onFormChangeApp((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
    };

    const handleUrlChange = (index, value) => {
        // Crear una copia inmutable de selectedOptions
        const updatedOptions = selectedOptions.map((option, idx) => {
            if (index === idx) {
                return { ...option, url: value };
            }
            return option;
        });
    
        setSelectedOptions(updatedOptions);
    
        onFormChangeApp((prevValues) => ({
            ...prevValues,
            selectedOptions: updatedOptions,
        }));
    };
    

    const handleBorderClickOutside = (e) => {
        if (borderColorPickerRef.current && !borderColorPickerRef.current.contains(e.target)) {
            setShowBorderColorPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleTitleClickOutside);
        document.addEventListener('mousedown', handleDescriptionClickOutside);
        document.addEventListener('mousedown', handleBackgroundClickOutside);
        document.addEventListener('mousedown', handleBoxClickOutside);
        document.addEventListener('mousedown', handleBorderClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleTitleClickOutside);
            document.removeEventListener('mousedown', handleBorderClickOutside);
            document.removeEventListener('mousedown', handleDescriptionClickOutside);
            document.removeEventListener('mousedown', handleBackgroundClickOutside);
            document.removeEventListener('mousedown', handleBoxClickOutside);
        };
    }, []);

    useEffect(()=>{
        validateFormFields();
    },[formErrors]);

    useEffect(() => {
        if (isEditRoute && appFormValues) {
            setTitle(appFormValues.title || '');
            setDescription(appFormValues.description || '');
            setTitleColor(appFormValues.colorTitle || '');
            setDescriptionColor(appFormValues.descriptionColor || '');
            setBackgroundColor(appFormValues.backgroundColor || '');
            setBoxColor(appFormValues.boxColor || '');
            setBorderColor(appFormValues.borderImg || '');
            setSelectedOptions(appFormValues.selectedOptions || []);
            setImage(appFormValues.image || null);
        }
    }, [isEditRoute, appFormValues]);

    const initialValues = {
        title: isEditRoute && appFormValues ? appFormValues.title : '',
        description: isEditRoute && appFormValues ? appFormValues.description : '',
        colorTitle: isEditRoute && appFormValues ? appFormValues.colorTitle : '',
        descriptionColor: isEditRoute && appFormValues ? appFormValues.descriptionColor : '',
        backgroundColor: isEditRoute && appFormValues ? appFormValues.backgroundColor : '',
        boxColor: isEditRoute && appFormValues ? appFormValues.boxColor : '',
        borderImg: isEditRoute && appFormValues ? appFormValues.borderImg : '',
        selectedOptions: isEditRoute && appFormValues ? appFormValues.selectedOptions : [],
        image: isEditRoute && appFormValues ? appFormValues.image : null,
    };
   // console.log(selectedOptions)

    const fileInputRef = React.createRef();

    const handleClick = () => {
        fileInputRef.current.click();
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            resizeImage(file, 300, 300, (resizedImage) => {
                setImage(resizedImage);
                // Guarda solo la parte base64 del dataURL
                onFormChangeApp((prevValues) => ({ ...prevValues, image: resizedImage.split(',')[1] }));
            });
        }
    };

    const [updatedSelectedOptions, setUpdatedSelectedOptions] = useState([]);

    useEffect(() => {
        // Actualiza el estado de las opciones seleccionadas con los íconos correspondientes
        const updatedOptions = selectedOptions.map((option) => {
            const fullOption = appOptions?.find((opt) => opt.value === option.value);
            return {
                ...option,
                icon: fullOption ? fullOption.icon : '',
                label: fullOption ? fullOption.label : '',
            };
        });
        setUpdatedSelectedOptions(updatedOptions);
    }, [selectedOptions]);

    const handleRemoveImage = () => {
        setImage(null);
        onFormChangeApp((prevValues) => ({
            ...prevValues,
            image: null // Elimina la imagen del estado global
        }));
    };

    const isOptionSelected = (option) => {
        return selectedOptions.some(selected => selected.value === option.value);
    };

    // console.log(formErrors)

    // Skeleton Loader
            useEffect(() => {
                setLoading(false); // Cambia a false una vez que los datos hayan cargado
            }, []);            
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async(values, actions) => {
                const errors = validateForm(values);
                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors);
                  actions.setSubmitting(false);
                } else {
                  setFormErrors({});
                  changeTabValue(); // Verificar si esta función está disponible
                  await onSubmit(values);
                  actions.setSubmitting(false);
                }
              }}
              
            validateOnBlur={true}
            validateOnChange={true}
            >
           {({ setFieldValue}) => (
      <Form className="max-w-4xl mx-auto mt-8 relative">
        {/* Mostrar el Skeleton mientras loading sea verdadero */}
        {loading ? (

            <SkeletonLoader />

        ) : (
            <div>
            <div className="flex flex-col md:flex-row md:items-start md:mb-4">
              <div className="flex flex-col w-full md:w-3/4 mr-6 mb-4 md:mb-0">
              <div>
        
              </div>
                <label htmlFor="title" className="mb-2">{t("Title")}</label>
                <Field
                  type="text"
                  id="title"
                  placeholder={t("Title")}
                  className="border w-full border-gray-300 rounded p-2 focus:ring-0 focus:outline-none"
                  value={title}
                  maxLength={maxTitle}
                  disabled={globalTabValue==1}
                  onChange={(e) => {
                    handleTitleChange(e);
                    setFieldValue('title', e.target.value);
                  }}
                />
                <div className="text-right text-sm text-gray-900">
                  {title.length}/{maxTitle} Characters
                </div>
                { formErrors.title && <div className="text-red-500 text-sm">{formErrors.title}</div>}
              </div>
        
              <div className="flex flex-col relative">
          {/* Flex para alinear ambos títulos {color e uploadimagen} */}
          <div className="flex flex-wrap md:flex-nowrap items-start space-x-12 w-full">
        
                                  {/* Seccion del selector de color */}
                                  <div className="flex flex-col md:flex-nowrap items-start mb-4">
                                  <label htmlFor="colorTitle" className="mb-2">{t("Color")}</label>
                                  <div className="flex items-center">
                                  <div
                                      className="w-10 h-10 md:w-10 border border-gray-300 rounded cursor-pointer"
                                      style={{ background: colorTitle }}
                                      onClick={() => {if(globalTabValue!==1)setShowTitleColorPicker(!showTitleColorPicker)}}
                                  ></div>
                                  {showTitleColorPicker && (
                                      <div className="absolute mt-2 left-0 top-full z-50" ref={titleColorPickerRef}>
                                      {/* Color Picker */}
                                      </div>
                                  )}
                                  </div>
                                  </div>
                                  {/* seccion de subir imagen */}
                                  <div className="flex flex-col items-center ">
                                  <label className="mb-2 block">{t("Upload Image")}</label>
        
                                  {/* Icono de subir imagen */}
                                  <div className="flex items-center ">
                                      <input
                                      disabled={globalTabValue==1}
                                      type="file"
                                      className="hidden "
                                      ref={fileInputRef}
                                      accept="image/*"
                                      onChange={handleImageChange}
                                      />
                                      <button
                                      onClick={handleClick}
                                      type='button'
                                      className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                      >
                                      <MdOutlineCloudUpload size="40" /> 
                                      </button>
        
                                      {image && (
                                      <div className="relative w-12 ml-2">
                                          <img
                                          src={isEditRoute ? `data:image/png;base64,${image}` : image}
                                          width="30"
                                          alt="Uploaded"
                                          />
                                          <button
                                          onClick={handleRemoveImage}
                                          disabled={globalTabValue==1}
                                          className="absolute top-0 right-0 bg-white p-0.5 rounded-full hover:bg-gray-200"
                                          >
                                          <IoIosClose size="15" />
                                          </button>
                                      </div>
                                      )}
                                  </div>
                                  </div>
                                  </div>
                                          {/* Color Picker */}
                                          {showTitleColorPicker && (
                                          <div className="absolute mt-2 left-0 top-full z-50" ref={titleColorPickerRef}>
                                          <ColorPicker gradient={false} handlerFunction={handleTitleColorChange} pickerColor={colorTitle} pickerValue={colorTitle}/>
                                      </div>
                                  )}
                              </div>
                          </div>
        
            <div className="flex flex-col md:flex-row md:items-start md:mb-4 mt-4">
              <div className="flex flex-col w-full md:w-3/4 mr-6 mb-4 md:mb-0">
                <label htmlFor="description" className="mb-2">{t("Description")}</label>
                <Field
                  as="textarea"
                  rows="5"
                  type="text"
                  placeholder={t("Description")}
                  disabled={globalTabValue==1}
                  maxLength={maxLength}
                  id="description"
                  className="w-full min-h-20 max-h-40 border border-gray-300 rounded p-2 focus:ring-0 focus:outline-none"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <div className="text-right text-sm text-gray-900">
                  {description.length}/{maxLength} Characters
                </div>
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="descriptionColor" className="mb-2">{t("Color")}</label>
                <div className="flex items-center">
                  <div
                    className="w-10 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    style={{ background: descriptionColor }}
                    onClick={() =>{if(globalTabValue!==1) setShowDescriptionColorPicker(!showDescriptionColorPicker)}}
                  ></div>
                  {showDescriptionColorPicker && (
                    <div className="absolute mt-2 left-0 top-full z-50" ref={descriptionColorPickerRef}>
                      <ColorPicker gradient={false} handlerFunction={handleDescriptionColorChange} pickerColor={descriptionColor} pickerValue={descriptionColor}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
        
            <div className="flex flex-col gap-6 mt-4 md:mr-60">
  <div className="flex flex-col gap-4 justify-center items-start">
    {/* Background Color */}
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="backgroundColor" className="font-medium">
        {t("Background Color")}
      </label>
      <div className="flex items-center relative">
        <div
          className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          style={{ background: backgroundColor }}
          onClick={() =>{if(globalTabValue!==1) setShowBackgroundColorPicker(!showBackgroundColorPicker)}}
        ></div>
        {showBackgroundColorPicker && (
          <div className="absolute mt-2 left-0 z-50" ref={backgroundColorPickerRef}>
            <ColorPicker
              gradient={true}
              handlerFunction={handleBackgroundColorChange}
              pickerColor={backgroundColor}
              pickerValue={backgroundColor}
            />
          </div>
        )}
      </div>
    </div>

    {/* Box Color */}
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="boxColor" className="font-medium">
        {t("Box Color")}
      </label>
      <div className="flex items-center relative">
        <div
          className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          style={{ background: boxColor }}
          onClick={() => {if(globalTabValue!==1)setShowBoxColorPicker(!showBoxColorPicker)}}
        ></div>
        {showBoxColorPicker && (
          <div className="absolute mt-2 left-0 z-50" ref={boxColorPickerRef}>
            <ColorPicker
              gradient={true}
              handlerFunction={handleBoxColorChange}
              pickerColor={boxColor}
              pickerValue={boxColor}
            />
          </div>
        )}
      </div>
    </div>

    {/* Border Profile Color */}
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="borderImg" className="font-medium">
        {t("Border Profile Color")}
      </label>
      <div className="flex items-center relative">
        <div
          className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          style={{ background: borderImg }}
          onClick={() => {if(globalTabValue!==1)setShowBorderColorPicker(!showBorderColorPicker)}}
        ></div>
        {showBorderColorPicker && (
          <div className="absolute mt-2 left-0 z-50" ref={borderColorPickerRef}>
            <ColorPicker
              gradient={true}
              handlerFunction={handleBorderColorChange}
              pickerColor={borderImg}
              pickerValue={borderImg}
            />
          </div>
        )}
      </div>
    </div>
  </div>
</div>
                            {/* Select de fuentes */}
                            <div className='flex flex-col md:flex-row md:items-center mb-4 mt-10'>
                  <h1 className='mt-3 text-lg font-semibold mr-6'>{t('Font style')}:</h1>
                            <select
                            value={isEditRoute ? appFormValues.idFontPreview : ''}
                            disabled={globalTabValue==1} 
                        className='p-4 rounded-[10px] bg-gray-300' 
                        name="fontFamily" 
                        id="" 
                        onChange={(e) => {
                          handleSelectedFont(e);
                        }}
                    >
                          {appFontsPreview?.map((item, index) => (
                            <option style={{ fontFamily: item.fontName }} key={index} id={item.id} value={item.id}>
                              {item.fontName}
                            </option>
                          ))}
                          </select>
                  </div>


                    <div className="flex flex-col md:flex-row md:items-center mb-4 mt-4">
                        <div className="w-full md:w-3/4">
                            <label htmlFor="" className="mb-2">{t("Multiselect")}</label>
                            <Select
                                id="multiselect"
                                options={appOptions}
                                isDisabled={globalTabValue==1}
                                isMulti
                                className="basic-multi-select w-full" // Para el contenedor externo
                                classNamePrefix="select" // Prefijo para los estilos internos
                                value={updatedSelectedOptions && updatedSelectedOptions.length > 0 ? updatedSelectedOptions.map(({ icon, ...rest }) => rest) : []}
                                onChange={(selected) => {
                                    handleMultiSelectChange(selected);
                                    setFieldValue('selectedOptions', selected);
                                }}
                                getOptionLabel={(option) => (
                                    <div className="flex items-center">
                                    {isOptionSelected(option) && <span className="mr-2">{option.icon}</span>}
                                    {option.label}
                                    </div>
                                )}
                                getOptionValue={(option) => option.value}
                                />


                            {formErrors.selectedOptions && (
                                <div className="text-red-500 text-sm">{formErrors.selectedOptions}</div>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {updatedSelectedOptions.map((option, index) => (
                        <div key={index} className="grid gap-3 mb-3">
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-center ">
                    <label htmlFor={`input_${option.value}`} className="mb-2">{option.icon}</label>
                    <Field
                        type="text"
                        id={`url_${index}`}
                        name={`url_${index}`}
                        disabled={globalTabValue==1}
                        placeholder={`URL for ${option.value}`}
                        className="border border-gray-300 rounded p-2 w-full focus:ring-0 focus:outline-none"
                        value={option.url} // Simplificado para tomar la URL directamente desde selectedOptions
                        onChange={(e) => handleUrlChange(index, e.target.value)}
                    />
                    </div>
                    <div className="relative flex justify-center items-center">
                        {/* Mostrar mensaje de error para cada URL */}
                        {formErrors[`url_${index}`] && (
                            <div className="absolute text-red-500 text-xs">
                                {formErrors[`url_${index}`]}
                            </div>
                        )}
                    </div>
                </div>

                    ))}
                </div>
                    <div className="flex items-center mt-6 mb-4">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded "
                         style={{ backgroundColor: '#284B63', color: '' }}
                         disabled={globalTabValue==1}
                         onMouseEnter={(e) => e.target.style.backgroundColor = '#3C6E71'} // Cambia el color al hacer hover
                         onMouseLeave={(e) => e.target.style.backgroundColor = '#284B63'} // Vuelve al color original al salir del hoover
                        >{t('Submit')}</button>   
            </div>
          </div>
        )}
      </Form>
    )}
  </Formik>
);
}

export default AppForm;
