import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import Select from 'react-select';
import { SocialIcon } from 'react-social-icons'
import GradientColorPicker from 'react-gcolor-picker'; // Importamos el nuevo color picker
import PropTypes from 'prop-types';
import { ImUpload2 } from "react-icons/im";
import { FaApple, FaGooglePlay  } from "react-icons/fa";

export const AppForm = ({ onFormChangeApp }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const maxLength = 250;
    const maxTitle = 30;
    const [backgroundColor, setBackgroundColor] = useState('linear-gradient(180deg, rgb(253, 93, 8) 0.00%,rgb(251, 164, 14) 100.00%)');
    const [boxColor, setBoxColor] = useState('rgb(216, 61, 34)');
    const [titleColor, setTitleColor] = useState('rgb(6, 35, 254)');
    const [descriptionColor, setDescriptionColor] = useState('rgb(42, 40, 40)');
    const [borderColor, setBorderColor] = useState('#ffffff')
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



    const validateForm = (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Title is required';
        }
        if (selectedOptions.length === 0) {
          errors.selectedOptions = 'At least one option must be selected';
        }
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
        onFormChangeApp((prevValues) => ({ ...prevValues, borderColor: newHexCoor }));
      };

    const handleTitleColorChange = (newHexColor) => {
        setTitleColor(newHexColor);
        onFormChangeApp((prevValues) => ({ ...prevValues, titleColor: newHexColor }));
        
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
          url: '', 
        }));
        setSelectedOptions(updatedOptions);
        onFormChangeApp((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
      };

      const handleUrlChange = (index, value) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[index].url = value;
        setSelectedOptions(updatedOptions);
        onFormChangeApp((prevValues) => ({ ...prevValues, selectedOptions: updatedOptions }));
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

    const initialValues = {
        title: '',
        description: '',
    };

    const options = [
        {
            value: 'Samsung Galaxy Store', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
                        <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c72cce"></stop><stop offset="1" stopColor="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
                    </svg>
                    <span>Samsung Galaxy Store</span>
                </div>
            ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
                <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c72cce"></stop><stop offset="1" stopColor="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
            </svg>
        },
        {
            value: 'Google Play Store', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
                        <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#047ed6"></stop><stop offset="1" stopColor="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fillRule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"></stop><stop offset="1" stopColor="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fillRule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d9414f"></stop><stop offset="1" stopColor="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fillRule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33c481"></stop><stop offset="1" stopColor="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fillRule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clipRule="evenodd"></path>
                    </svg>
                    <span>Google Play Store</span>
                </div>
            ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
                <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#047ed6"></stop><stop offset="1" stopColor="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fillRule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffda1c"></stop><stop offset="1" stopColor="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fillRule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d9414f"></stop><stop offset="1" stopColor="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fillRule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clipRule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33c481"></stop><stop offset="1" stopColor="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fillRule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clipRule="evenodd"></path>
            </svg>
        },
        {
            value: 'App Store', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaApple size={20} style={{ marginRight: '10px' }}/>
                    <span>App store</span>
                    
                </div>
            ), icon: <FaApple size={40} />
        }
    ];

    const fileInputRef = React.createRef();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          onFormChangeApp((prevValues) => ({ ...prevValues, image: reader.result }));
        };
        if (file) {
          reader.readAsDataURL(file);
        }
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
          // Handle form submission logic here
          console.log(values);
          actions.setSubmitting(false);
        }
            }}
        >
            {({ setFieldValue }) => (
                <Form className="max-w-4xl mx-auto mt-8 relative">
                        <h2 className="text-xl font-semibold mb-4">App Qr</h2>
                        <div className="flex flex-col md:flex-row md:items-start md:mb-4">
                            <div className="flex flex-col w-full md:w-2/3 mr-6 mb-4 md:mb-0">
                                <label htmlFor="title" className="mb-2">Title:</label>
                                <Field
                                    type="text"
                                    id="title"
                                    placeholder="Title"
                                    className="border w-full border-gray-300 rounded p-2"
                                    value={title}
                                    onChange={(e) => {
                                        handleTitleChange(e);
                                        setFieldValue('title', e.target.value);
                                      }}
                                    maxLength={maxTitle}
                                />
                                <div className="text-right text-sm text-gray-900">
                                    {title.length}/{maxTitle} Characters
                                </div>
                                {formErrors.title && <div className="text-red-500 text-sm">{formErrors.title}</div>}
                            </div>
                            <div className="flex flex-col relative">
                                <label htmlFor="titleColor" className="mb-2">Color:</label>
                                <div className="flex items-center">
                                    <div
                                        className="w-20 md:w-10 h-10 border border-gray-300 rounded cursor-pointer"
                                        style={{ background: titleColor }}
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
                                                color={titleColor}
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
                                    placeholder="Description"
                                    type="text"
                                    id="description"
                                    className="w-full min-h-20 max-h-40 border border-gray-300 rounded p-2"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    maxLength={maxLength}
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
                            {image && <img src={image} width="30" />}
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
                    style={{ background: borderColor }}
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
                        color={borderColor}
                        onChange={handleBorderColorChange}
                        style={{ width: "calc(100% + 2rem)" }} // Ajuste del ancho
                      />
                    </div>
                  )}
                </div>
                </div>
                            </div>
                            
                        </div>

                        <div className="flex flex-col md:flex-row md:items-start md:mb-4">
                            <div className="w-full md:w-2/3">
                                <label htmlFor="multiselect" className="mb-2">Multiselect:</label>
                                <Select
                                    id="multiselect"
                                    options={options}
                                    isMulti
                                    className="basic-multi-select w-full"
                                    classNamePrefix="select "
                                    onChange={handleMultiSelectChange}
                                />
                            </div>
                        </div>

                        {selectedOptions.map((option, index) => (
                            <div className="flex items-center mb-4" key={option.value}>
                                <label htmlFor={`input_${option.value}`} className="mb-2">{option.icon}</label>
                                <Field
                                    type="text"
                                    id={`input_${option.value}`}
                                    name={`input_${option.value}`}
                                    placeholder={`Write the URL of ${option.value}`}
                                    className="w-full md:w-80 border border-gray-300 rounded p-2 ml-2"
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                />
                            </div>
                        ))}

                        <div className="flex items-center mb-4">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                        </div>
                </Form>
            )}
        </Formik>
    );

};

export default AppForm;
