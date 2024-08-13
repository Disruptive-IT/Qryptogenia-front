/**
 * @Author : Cristian Escobar,   @date 2024-07-24 08:18:47
 * @description : Componente para el formulario de musica de configuración de la aplicación QR. Permite al usuario ingresar y modificar el título, descripción, colores de fondo y caja, y subir una imagen.
 * @Props : - onFormChangeMusic: Función callback para actualizar el estado de la aplicación con los valores del formulario.
 * @return : Retorna un formulario interactivo que permite al usuario configurar los detalles de la aplicación QR, incluyendo título, descripción, colores y carga de imagen.
 */


import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import Select from 'react-select';
import { SocialIcon } from 'react-social-icons'
import { ImUpload2 } from "react-icons/im";
import GradientColorPicker from 'react-gcolor-picker'; // Importamos el nuevo color picker
import { IoIosClose } from "react-icons/io";

export const MusicForm = ({ onFormChangeMusic, location, musicFormValues }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const maxLength = 250;
    const maxTitle = 30;
    const [borderImg, setBorderColor] = useState('#ffffff')
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(180deg, rgb(0, 0, 0) 0.00%,rgb(50, 152, 153) 100.00%)')
    const [boxColor, setBoxColor] = useState('linear-gradient(180deg, rgb(0, 0, 0) 0.00%,rgb(50, 152, 153) 100.00%)')
    const [colorTitle, setTitleColor] = useState('#820e0e');
    const [descriptionColor, setDescriptionColor] = useState('#ffffff');
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

    const isEditRoute = location.pathname.startsWith('/edit')

    const validateForm = (values) => {
        const errors = {};

        // Validar el título
        if (!values.title) {
            errors.title = 'Title is required';
        }

        // Validar la selección de opciones
        if (selectedOptions.length === 0) {
            errors.selectedOptions = 'At least one option must be selected';
        }
        console.log(selectedOptions)
        // Validar cada campo url en selectedOptions
        selectedOptions.forEach((option, index) => {
            console.log(option.url)
            if (!option.url) {
                errors[`url_${index}`] = `URL is required`;
            }
        });
        console.log(errors)

        return errors;
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        onFormChangeMusic((prevValues) => ({ ...prevValues, title: e.target.value }));
        const value = e.target.value;
        if (value.length <= maxTitle) {
            setTitle(value);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        onFormChangeMusic((prevValues) => ({ ...prevValues, description: e.target.value }));
        const value = e.target.value;
        if (value.length <= maxLength) {
            setDescription(value);
        }
    };

    const handleBorderColorChange = (newHexCoor) => {
        setBorderColor(newHexCoor);
        onFormChangeMusic((prevValues) => ({ ...prevValues, borderImg: newHexCoor }));
    };

    const handleBackgroundColorChange = (newHexColor) => {
        setBackgroundColor(newHexColor);
        onFormChangeMusic((prevValues) => ({ ...prevValues, backgroundColor: newHexColor }));
    };

    const handleBoxColorChange = (newHexColor) => {
        setBoxColor(newHexColor);
        onFormChangeMusic((prevValues) => ({ ...prevValues, boxColor: newHexColor }));
    };

    const handleTitleColorChange = (newHexColor) => {
        setTitleColor(newHexColor);
        onFormChangeMusic((prevValues) => ({ ...prevValues, colorTitle: newHexColor }));
    };

    const handleDescriptionColorChange = (newHexColor) => {
        setDescriptionColor(newHexColor);
        onFormChangeMusic((prevValues) => ({ ...prevValues, descriptionColor: newHexColor }));
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
        onFormChangeMusic((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
    };

    const handleUrlChange = (index, value) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[index].url = value;
        setSelectedOptions(updatedOptions);
        onFormChangeMusic((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
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
        if (isEditRoute && musicFormValues) {
            setTitle(musicFormValues.title || '');
            setDescription(musicFormValues.description || '');
            setTitleColor(musicFormValues.colorTitle || '');
            setDescriptionColor(musicFormValues.descriptionColor || '');
            setBackgroundColor(musicFormValues.backgroundColor || '');
            setBoxColor(musicFormValues.boxColor || '');
            setBorderColor(musicFormValues.borderImg || '');
            setSelectedOptions(musicFormValues.selectedOptions || []);
            setImage(musicFormValues.image || null);
        }
    }, [isEditRoute, musicFormValues]);

    const initialValues = {
        title: isEditRoute && musicFormValues ? musicFormValues.title : '',
        description: isEditRoute && musicFormValues ? musicFormValues.description : '',
        colorTitle: isEditRoute && musicFormValues ? musicFormValues.colorTitle : '',
        descriptionColor: isEditRoute && musicFormValues ? musicFormValues.descriptionColor : '',
        backgroundColor: isEditRoute && musicFormValues ? musicFormValues.backgroundColor : '',
        boxColor: isEditRoute && musicFormValues ? musicFormValues.boxColor : '',
        borderImg: isEditRoute && musicFormValues ? musicFormValues.borderImg : '',
        selectedOptions: isEditRoute && musicFormValues ? musicFormValues.selectedOptions : [],
        image: isEditRoute && musicFormValues ? musicFormValues.image : null,
    };

    const options = [
        {
            value: 'youtube', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ marginRight: '5px', width: '25px', height: '25px' }} src="https://img.icons8.com/color/48/youtube-music.png" alt="youtube-music" />
                    <span>YouTube Music</span>
                </div>
            ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src="https://img.icons8.com/color/48/youtube-music.png" alt="youtube-music" />
        },
        {
            value: 'soundcloud', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ marginRight: '5px', width: '25px', height: '25px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
                    <span>SoundCloud</span>
                </div>
            ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=13669&format=png&color=000000' />
        },
        {
            value: 'deezer', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png" alt="external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo" />
                    <span>Deezer</span>
                </div>
            ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-deezer-a-french-online-music-streaming-service-logo-bold-tal-revivo.png' />
        },
        {
            value: 'spotify', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/?size=100&id=G9XXzb9XaEKX&format=png&color=000000" />
                    <span>Spotify</span>
                </div>
            ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />
        },
        {
            value: 'amazon', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000" />
                    <span>Amazon</span>
                </div>
            ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=lxwUaALAeQmr&format=png&color=000000' />
        },
        {
            value: 'apple', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img width="25" height="25" style={{ marginRight: '5px' }} src="https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000" />
                    <span>Apple Music</span>
                </div>
            ), icon: <img style={{ marginTop: '8px', marginRight: '5px', width: '40px', height: '40px' }} src='https://img.icons8.com/?size=100&id=Bri4HBrgCsPa&format=png&color=000000' />
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
                onFormChangeMusic((prevValues) => ({ ...prevValues, image: resizedImage.split(',')[1] }));
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
            };
        });
        setUpdatedSelectedOptions(updatedOptions);
    }, [selectedOptions]);

    const handleRemoveImage = () => {
        setImage(null);
        onFormChangeMusic((prevValues) => ({
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
                <Form className="max-w-4xl mx-auto mt-8 relative">
                    <h2 className="text-xl font-semibold mb-4">Social Qr</h2>
                    <div className="flex flex-col md:flex-row md:items-start md:mb-4">
                        <div className="flex flex-col w-full md:w-2/3 mr-6 mb-4 md:mb-0">
                            <label htmlFor="title" className="mb-2">Title:</label>
                            <Field
                                type="text"
                                id="title"
                                placeholder="Title"
                                className="border w-full border-gray-300 rounded p-2"
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
                            <label htmlFor="colorTitle" className="mb-2">Color:</label>
                            <div className="flex items-center">
                                <div
                                    className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                    style={{ background: colorTitle }}
                                    onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
                                ></div>
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
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:mb-4 mt-4">
                        <div className="flex flex-col w-full md:w-2/3 mr-6 mb-4 md:mb-0">
                            <label htmlFor="description" className="mb-2">Description:</label>
                            <Field
                                as="textarea"
                                rows="5"
                                type="text"
                                placeholder="Description"
                                maxLength={maxLength}
                                id="description"
                                className="w-full min-h-20 max-h-40 border border-gray-300 rounded p-2"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <div className="text-right text-sm text-gray-900">
                                {description.length}/{maxLength} Characters
                            </div>
                        </div>
                        <div className="flex flex-col relative">
                            <label htmlFor="descriptionColor" className="mb-2">Color:</label>
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

                    <div className="flex flex-col md:flex-row md:items-start md:mb-4">
                        <div className="w-full md:w-2/3 mr-6 mb-4 md:mb-0">
                            <label htmlFor="backgroundColor" className="mb-2">Background Color:</label>
                            <div className="flex items-center relative">
                                <div
                                    className="w-20 md:w-16 h-10 border border-gray-300 rounded cursor-pointer"
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
                            <div className="flex flex-col space-y-4 pt-4">
                                <label>Upload Image:</label>
                                <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
                                <button
                                    onClick={handleClick}
                                    className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                >
                                    <ImUpload2 size="30" />
                                </button>
                                {image && (
                                    <div className="relative w-12">
                                        <img src={image} width="30" alt="Uploaded" />
                                        <button
                                            onClick={handleRemoveImage}
                                            className="absolute top-0 right-0 bg-white p-0.2 rounded-full hover:bg-gray-200"
                                        >
                                            <IoIosClose size="15" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0">
                            <label htmlFor="boxColor" className="mb-2">Box Color:</label>
                            <div className="flex items-center relative">
                                <div
                                    className="w-20 md:w-16 h-10 border border-gray-300 rounded cursor-pointer"
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
                            <div className='pt-4'>
                                <label htmlFor="boxColor" className="mb-2">Border Profile Color:</label>
                                <div className="flex items-center relative">
                                    <div
                                        className="w-20 md:w-16 h-10 border border-gray-300 rounded cursor-pointer"
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
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center mb-4 mt-4">
                        <div className="w-full md:w-2/3">
                            <label htmlFor="multiselect" className="mb-2">Multiselect:</label>
                            <Select
                                id="multiselect"
                                options={options}
                                isMulti
                                className="basic-multi-select w-full"
                                classNamePrefix="select"
                                value={updatedSelectedOptions}
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
                            <div key={index} className="flex items-center mb-4">
                                <label htmlFor={`input_${option.value}`} className="mb-2">{option.icon}</label>
                                <Field
                                    type="text"
                                    id={`url_${index}`}
                                    name={`url_${index}`}
                                    placeholder={`URL for ${option.value}`}
                                    className="border w-full border-gray-300 rounded p-2"
                                    value={option.url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                />
                                {/* Mostrar mensaje de error para cada URL */}
                                {formErrors[`url_${index}`] && <div className="text-red-500 text-sm">{formErrors[`url_${index}`]}</div>}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center mb-4">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                    </div>
                </Form>
            )}
        </Formik>

    );
};

export default MusicForm;
