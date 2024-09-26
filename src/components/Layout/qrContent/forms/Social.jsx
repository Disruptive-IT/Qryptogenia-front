/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:21:25
 * @description : Componente para el formulario de redes sociales de configuración de la aplicación QR. Permite al usuario ingresar y modificar el título, descripción, colores de fondo y caja, y subir una imagen.
 * @Props : - onFormChange: Función callback para actualizar el estado de la aplicación con los valores del formulario.
 * @return : Retorna un formulario interactivo que permite al usuario configurar los detalles de la aplicación QR, incluyendo título, descripción, colores y carga de imagen.
 */


import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import Select from 'react-select';
import { SocialIcon } from 'react-social-icons'
import { ImUpload2 } from "react-icons/im";
import GradientColorPicker from 'react-gcolor-picker'; // Importamos el nuevo color picker
import { IoIosClose } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { MdOutlineCloudUpload } from "react-icons/md";

export const SocialForm = ({ onFormChange, location, socialFormValues }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const maxLength = 250;
  const maxTitle = 30;
  const [borderImg, setBorderColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#E7473C')
  const [boxColor, setBoxColor] = useState('#F0F0F0')
  const [colorTitle, setTitleColor] = useState('#820e0e');
  const [descriptionColor, setDescriptionColor] = useState('#E7473C');
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
  const [showDescriptionColorPicker, setShowDescriptionColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);
  const [showBoxColorPicker, setShowBoxColorPicker] = useState(false);
  const titleColorPickerRef = useRef(null);
  const borderColorPickerRef = useRef(null);
  const descriptionColorPickerRef = useRef(null);
  const backgroundColorPickerRef = useRef(null);
  const boxColorPickerRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [image, setImage] = useState(null); // Nueva parte del estado para la imagen
  const [formErrors, setFormErrors] = useState({});
  const { t } = useTranslation();
  const isEditRoute = location.pathname.startsWith('/edit')

  const validateForm = (values) => {
    const errors = {};

    // Validar el título
    if (!values.title) {
      errors.title = t("Title is required");
    }

    // Validar la selección de opciones
    if (selectedOptions.length === 0) {
      errors.selectedOptions = t("At least one option must be selected");
    }
    console.log(selectedOptions)
    // Validar cada campo url en selectedOptions
    selectedOptions.forEach((option, index) => {
      console.log(option.url)
      if (!option.url) {
        errors[`url_${index}`] = t("URL is required");
      }
    });
    console.log(errors)

    return errors;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onFormChange((prevValues) => ({ ...prevValues, title: e.target.value }));
    const value = e.target.value;
    if (value.length <= maxTitle) {
      setTitle(value);
    }

  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    onFormChange((prevValues) => ({ ...prevValues, description: e.target.value }));
    const value = e.target.value;
    if (value.length <= maxLength) {
      setDescription(value);
    }
  };

  const handleBorderColorChange = (newHexCoor) => {
    setBorderColor(newHexCoor);
    onFormChange((prevValues) => ({ ...prevValues, borderImg: newHexCoor }));
  };

  const handleBackgroundColorChange = (newHexColor) => {
    setBackgroundColor(newHexColor);
    onFormChange((prevValues) => ({ ...prevValues, backgroundColor: newHexColor }));
  };

  const handleBoxColorChange = (newHexColor) => {
    setBoxColor(newHexColor);
    onFormChange((prevValues) => ({ ...prevValues, boxColor: newHexColor }));
  };

  const handleTitleColorChange = (newHexColor) => {
    setTitleColor(newHexColor);
    onFormChange((prevValues) => ({ ...prevValues, colorTitle: newHexColor }));
  };

  const handleDescriptionColorChange = (newHexColor) => {
    setDescriptionColor(newHexColor);
    onFormChange((prevValues) => ({ ...prevValues, descriptionColor: newHexColor }));
  };

  const handleTitleClickOutside = (e) => {
    if (titleColorPickerRef.current && !titleColorPickerRef.current.contains(e.target)) {
      setShowTitleColorPicker(false);
    }
  };

  const handleBorderClickOutside = (e) => {
    if (borderColorPickerRef.current && !borderColorPickerRef.current.contains(e.target)) {
      setShowBorderColorPicker(false);
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
    onFormChange((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
  };

  const handleUrlChange = (index, value) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index].url = value;
    setSelectedOptions(updatedOptions);
    onFormChange((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleTitleClickOutside);
    document.addEventListener('mousedown', handleBorderClickOutside);
    document.addEventListener('mousedown', handleDescriptionClickOutside);
    document.addEventListener('mousedown', handleBackgroundClickOutside);
    document.addEventListener('mousedown', handleBoxClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleTitleClickOutside);
      document.removeEventListener('mousedown', handleBorderClickOutside);
      document.removeEventListener('mousedown', handleDescriptionClickOutside);
      document.removeEventListener('mousedown', handleBackgroundClickOutside);
      document.removeEventListener('mousedown', handleBoxClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditRoute && socialFormValues) {
      setTitle(socialFormValues.title || '');
      setDescription(socialFormValues.description || '');
      setTitleColor(socialFormValues.colorTitle || '');
      setDescriptionColor(socialFormValues.descriptionColor || '');
      setBackgroundColor(socialFormValues.backgroundColor || '');
      setBoxColor(socialFormValues.boxColor || '');
      setBorderColor(socialFormValues.borderImg || '');
      setSelectedOptions(socialFormValues.selectedOptions || []);
      setImage(socialFormValues.image || null);
    }
  }, [isEditRoute, socialFormValues]);

  const initialValues = {
    title: isEditRoute && socialFormValues ? socialFormValues.title : '',
    description: isEditRoute && socialFormValues ? socialFormValues.description : '',
    colorTitle: isEditRoute && socialFormValues ? socialFormValues.colorTitle : '',
    descriptionColor: isEditRoute && socialFormValues ? socialFormValues.descriptionColor : '',
    backgroundColor: isEditRoute && socialFormValues ? socialFormValues.backgroundColor : '',
    boxColor: isEditRoute && socialFormValues ? socialFormValues.boxColor : '',
    borderImg: isEditRoute && socialFormValues ? socialFormValues.borderImg : '',
    selectedOptions: isEditRoute && socialFormValues ? socialFormValues.selectedOptions : [],
    image: isEditRoute && socialFormValues ? socialFormValues.image : null,
  };

  const options = [
    {
      value: 'instagram', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='instagram' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>Instagram</span>
        </div>
      ), icon: <SocialIcon network='instagram' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
    {
      value: 'facebook', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='facebook' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>Facebook</span>
        </div>
      ), icon: <SocialIcon network='facebook' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
    {
      value: 'tiktok', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='tiktok' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>TikTok</span>
        </div>
      ), icon: <SocialIcon network='tiktok' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
    {
      value: 'x', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='x' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>X</span>
        </div>
      ), icon: <SocialIcon network='x' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
    {
      value: 'discord', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='discord' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>Discord</span>
        </div>
      ), icon: <SocialIcon network='discord' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
    {
      value: 'youtube', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='youtube' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>YouTube</span>
        </div>
      ), icon: <SocialIcon network='youtube' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
    {
      value: 'reddit', label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SocialIcon network='reddit' style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          <span>Reddit</span>
        </div>
      ), icon: <SocialIcon network='reddit' style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} />
    },
  ];

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
        onFormChange((prevValues) => ({ ...prevValues, image: resizedImage.split(',')[1] }));
      });
    }
  };

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize the image
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl;
        if (file.type === 'image/png') {
          // If the file is PNG, convert to PNG
          dataUrl = canvas.toDataURL("image/png");
        } else {
          // If the file is not PNG, convert to JPEG with compression
          dataUrl = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality level for JPEG
        }
        callback(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const [updatedSelectedOptions, setUpdatedSelectedOptions] = useState([]);

  useEffect(() => {
    // Actualiza el estado de las opciones seleccionadas con los íconos correspondientes
    const updatedOptions = selectedOptions.map((option) => {
      const fullOption = options.find((opt) => opt.value === option.value);
      return {
        ...option,
        icon: fullOption ? fullOption.icon : '',
        label: fullOption ? fullOption.label : ''
      };
    });
    setUpdatedSelectedOptions(updatedOptions);
  }, [selectedOptions]);


  const handleRemoveImage = () => {
    setImage(null);
    onFormChange((prevValues) => ({
      ...prevValues,
      image: null // Elimina la imagen del estado global
    }));
  };


  const isOptionSelected = (option) => {
    return selectedOptions.some(selected => selected.value === option.value);
  };



  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const errors = validateForm(values);
        if (Object.keys(errors).length > 0) {
          setFormErrors(errors);
          actions.setSubmitting(false);
        } else {
          setFormErrors({});
          // Call the onSubmit function passed from the parent component
          onSubmit(values);
          actions.setSubmitting(false);
        }
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <Form className="max-w-4xl mx-auto mt-8 relative" onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  handleTitleChange(e);
                  setFieldValue('title', e.target.value);
                }}
              />
              <div className="text-right text-sm text-gray-900">
                {title.length}/{maxTitle} Characters
              </div>
              {formErrors.title && <div className="text-red-500 text-sm">{formErrors.title}</div>}
            </div>

            <div className="flex flex-col relative">
        {/* Flex para alinear ambos títulos {color e uploadimagen} */}
        <div className="flex flex-wrap md:flex-nowrap items-start space-x-12 w-full">

                                {/* Seccion del selector de color */}
                            <div className="flex flex-col md:flex-nowrap items-start ">
                            <label htmlFor="colorTitle" className="mb-2">{t("Color")}</label>
                                <div
                                    className="w-20 h-10 md:w-10 border border-gray-300 rounded cursor-pointer"
                                    style={{ background: colorTitle }}
                                    onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
                                ></div>
                                {showTitleColorPicker && (
                                    <div className="absolute mt-2 left-0 top-full z-50" ref={titleColorPickerRef}>
                                    {/* Color Picker */}
                                    </div>
                                )}
                                </div>

                                {/* seccion de subir imagen */}
                                <div className="flex flex-col items-center ">
                                <label className="mb-2 block">{t("Upload Image")}</label>

                                {/* Icono de subir imagen */}
                                <div className="flex items-center ">
                                    <input
                                    type="file"
                                    className="hidden "
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    />
                                    <button
                                    onClick={handleClick}
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
                                        <GradientColorPicker
                                            enableAlpha={true}
                                            disableHueSlider={false}
                                            disableAlphaSlider={false}
                                            disableInput={false}
                                            disableHexInput={false}
                                            disableRgbInput={false}
                                            disableAlphaInput={false}
                                            presetColors={[]}
                                            gradient={true}
                                            color={colorTitle}
                                            onChange={handleTitleColorChange}
                                        />
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
                  className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  style={{ background: descriptionColor }}
                  onClick={() => setShowDescriptionColorPicker(!showDescriptionColorPicker)}
                ></div>
                {showDescriptionColorPicker && (
                  <div className="absolute mt-2 left-0 top-full z-50" ref={descriptionColorPickerRef}>
                    <GradientColorPicker
                      enableAlpha={true}
                      disableHueSlider={false}
                      disableAlphaSlider={false}
                      disableInput={false}
                      disableHexInput={false}
                      disableRgbInput={false}
                      disableAlphaInput={false}
                      presetColors={[]}
                      gradient={true}
                      color={descriptionColor}
                      onChange={handleDescriptionColorChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row text-center gap-6 mr-20">
              <div className="w-full md:w-1/4 flex flex-col items-center">
              <label htmlFor="backgroundColor" className="mb-2">{t("Background Color")}</label>
              <div className="flex items-center relative">
                <div
                  className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  style={{ background: backgroundColor }}
                  onClick={() => setShowBackgroundColorPicker(!showBackgroundColorPicker)}
                ></div>
                {showBackgroundColorPicker && (
                  <div className="absolute mt-2 left-0 z-50" ref={backgroundColorPickerRef}>
                    <GradientColorPicker
                      enableAlpha={true}
                      disableHueSlider={false}
                      disableAlphaSlider={false}
                      disableInput={false}
                      disableHexInput={false}
                      disableRgbInput={false}
                      disableAlphaInput={false}
                      presetColors={[]}
                      gradient={true}
                      color={backgroundColor}
                      onChange={handleBackgroundColorChange}
                      style={{ width: "calc(100% + 2rem)" }} // Ajuste del ancho
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/4 flex flex-col items-center">
                <label htmlFor="boxColor" className="mb-2">{t("Box Color")}</label>
                <div className="flex items-center relative">
                <div
                  className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  style={{ background: boxColor }}
                  onClick={() => setShowBoxColorPicker(!showBoxColorPicker)}
                ></div>
                {showBoxColorPicker && (
                  <div className="absolute mt-2 left-0 z-50" ref={boxColorPickerRef}>
                    <GradientColorPicker
                      enableAlpha={true}
                      disableHueSlider={false}
                      disableAlphaSlider={false}
                      disableInput={false}
                      disableHexInput={false}
                      disableRgbInput={false}
                      disableAlphaInput={false}
                      presetColors={[]}
                      gradient={true}
                      color={boxColor}
                      onChange={handleBoxColorChange}
                      style={{ width: "calc(100% + 2rem)" }} // Ajuste del ancho
                    />
                  </div>

                )}
            </div>

              </div>
              <div className="w-full md:w-1/4 flex flex-col items-center">
              <label htmlFor="boxColor" className="mb-2">{t("Border Profile Color")}</label>
                <div className="flex items-center relative">
                  <div
                    className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    style={{ background: borderImg }}
                    onClick={() => setShowBorderColorPicker(!showBorderColorPicker)}
                  ></div>
                  {showBorderColorPicker && (
                    <div className="absolute mt-2 left-0 z-50" ref={borderColorPickerRef}>
                      <GradientColorPicker
                        enableAlpha={true}
                        disableHueSlider={false}
                        disableAlphaSlider={false}
                        disableInput={false}
                        disableHexInput={false}
                        disableRgbInput={false}
                        disableAlphaInput={false}
                        presetColors={[]}
                        gradient={true}
                        color={borderImg}
                        onChange={handleBorderColorChange}
                        style={{ width: "calc(100% + 2rem)" }} // Ajuste del ancho
                      />
                    </div>
                  )}
                </div>
              </div>
          </div>


          <div className="flex flex-col md:flex-row md:items-center mb-4 mt-4">
            <div className="w-full md:w-3/4">
              <label htmlFor="multiselect" className="mb-2">Multiselect:</label>
              <Select
                id="multiselect"
                options={options}
                isMulti
                className="basic-multi-select w-full"
                classNamePrefix="select"
                value={updatedSelectedOptions.map(({ icon, ...rest }) => rest)}
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
                <div className='grid grid-cols-[auto_1fr] gap-3 items-center'>
                <label htmlFor={`input_${option.value}`} className="mx-3">{option.icon}</label>
                <Field
                  type="text"
                  id={`url_${index}`}
                  name={`url_${index}`}
                  placeholder={`URL for ${option.value}`}
                  className="border border-gray-300 rounded p-2 w-full"
                  value={option.url}
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

          <div className="flex items-center mb-4 mt-6">
            <button 
              type="submit" 
              className="px-4 py-2 text-white rounded" 
              style={{ backgroundColor: '#284B63', color: '#fff' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3C6E71'} // Cambia el color al hacer hover
              onMouseLeave={(e) => e.target.style.backgroundColor = '#284B63'} // Vuelve al color original al salir del hoover
            >
              {t('Submit')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SocialForm;
