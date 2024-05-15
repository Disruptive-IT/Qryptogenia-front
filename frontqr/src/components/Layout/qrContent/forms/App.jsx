import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from "formik";
import Select from 'react-select';
import { SocialIcon } from 'react-social-icons'
import GradientColorPicker from 'react-gcolor-picker'; // Importamos el nuevo color picker

export const AppForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [boxColor, setBoxColor] = useState('#ffffff')
    const [titleColor, setTitleColor] = useState('#ffffff');
    const [descriptionColor, setDescriptionColor] = useState('#ffffff');
    const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
    const [showDescriptionColorPicker, setShowDescriptionColorPicker] = useState(false);
    const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);
    const [showBoxColorPicker, setShowBoxColorPicker] = useState(false);
    const titleColorPickerRef = useRef(null);
    const descriptionColorPickerRef = useRef(null);
    const backgroundColorPickerRef = useRef(null);
    const boxColorPickerRef = useRef(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleBackgroundColorChange = (newHexColor) => {
        setBackgroundColor(newHexColor);
    };

    const handleBoxColorChange = (newHexColor) => {
        setBoxColor(newHexColor);
    };

    const handleTitleColorChange = (newHexColor) => {
        setTitleColor(newHexColor);
    };

    const handleDescriptionColorChange = (newHexColor) => {
        setDescriptionColor(newHexColor);
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

    useEffect(() => {
        document.addEventListener('mousedown', handleTitleClickOutside);
        document.addEventListener('mousedown', handleDescriptionClickOutside);
        document.addEventListener('mousedown', handleBackgroundClickOutside);
        document.addEventListener('mousedown', handleBoxClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleTitleClickOutside);
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
                        <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c72cce"></stop><stop offset="1" stop-color="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
                    </svg>
                    <span>Samsung Galaxy Store</span>
                </div>
            ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
                <linearGradient id="gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1" x1="9.422" x2="36.928" y1="8.565" y2="37.688" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c72cce"></stop><stop offset="1" stop-color="#fe5b5b"></stop></linearGradient><path fill="url(#gTN3BY4aRov8yoX_HP084a_GnODgj39wOZm_gr1)" d="M29.393,43H18.607C11.092,43,5,36.908,5,29.393V18.607C5,11.092,11.092,5,18.607,5h10.787 C36.908,5,43,11.092,43,18.607v10.787C43,36.908,36.908,43,29.393,43z"></path><path fill="#222220" d="M28.303,36h-8.605c-3.169,0-5.791-2.464-5.989-5.626l-0.707-11.312 C12.966,18.487,13.423,18,14,18h4c0-3.309,2.691-6,6-6s6,2.691,6,6h4c0.577,0,1.034,0.487,0.998,1.062l-0.707,11.312 C34.093,33.537,31.471,36,28.303,36z M15.064,20l0.641,10.249C15.837,32.353,17.591,34,19.697,34h8.605 c2.106,0,3.86-1.647,3.992-3.751L32.936,20H28v-2v2H15.064z M22,18h4c0-1.103-0.897-2-2-2S22,16.897,22,18z" opacity=".05"></path><path fill="#030000" d="M28.302,35.5h-8.605c-2.905,0-5.308-2.258-5.49-5.157l-0.674-10.78 c-0.036-0.576,0.421-1.062,0.998-1.062H18.5v-0.254c0-2.871,2.093-5.44,4.95-5.719c3.278-0.32,6.05,2.259,6.05,5.473v0.5h3.968 c0.577,0,1.034,0.487,0.998,1.062l-0.674,10.78C33.611,33.242,31.207,35.5,28.302,35.5z M14.532,19.5l0.674,10.78 c0.148,2.366,2.121,4.22,4.491,4.22h8.605c2.37,0,4.343-1.854,4.491-4.22l0.674-10.78H28.5V18c0-2.481-2.019-4.5-4.5-4.5 s-4.5,2.019-4.5,4.5v1.5H14.532z M27.5,19.5h-7V18c0-1.93,1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5V19.5z M21.5,18.5h5V18 c0-1.379-1.121-2.5-2.5-2.5s-2.5,1.121-2.5,2.5V18.5z" opacity=".07"></path><path fill="#fff" d="M29,19l0-0.777c0-2.61-1.903-4.945-4.5-5.199C21.52,12.733,19,15.078,19,18v1h-3.936 c-0.577,0-1.034,0.487-0.998,1.062l0.641,10.249c0.165,2.635,2.35,4.688,4.99,4.688h8.605c2.64,0,4.826-2.053,4.99-4.688 l0.641-10.249C33.97,19.487,33.512,19,32.936,19H29z M21,18c0-1.654,1.346-3,3-3s3,1.346,3,3v1h-6V18z"></path>
            </svg>
        },
        {
            value: 'Google Play Store', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
                        <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#047ed6"></stop><stop offset="1" stop-color="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fill-rule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffda1c"></stop><stop offset="1" stop-color="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fill-rule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d9414f"></stop><stop offset="1" stop-color="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fill-rule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33c481"></stop><stop offset="1" stop-color="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fill-rule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Google Play Store</span>
                </div>
            ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
                <linearGradient id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1" x1="1688.489" x2="1685.469" y1="-883.003" y2="-881.443" gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#047ed6"></stop><stop offset="1" stop-color="#50e6ff"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)" fill-rule="evenodd" d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2" x1="1645.286" x2="1642.929" y1="-897.055" y2="-897.055" gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffda1c"></stop><stop offset="1" stop-color="#feb705"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)" fill-rule="evenodd" d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3" x1="1722.978" x2="1720.622" y1="-889.412" y2="-886.355" gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d9414f"></stop><stop offset="1" stop-color="#8c193f"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)" fill-rule="evenodd" d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561" clip-rule="evenodd"></path><linearGradient id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4" x1="1721.163" x2="1722.215" y1="-891.39" y2="-890.024" gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33c481"></stop><stop offset="1" stop-color="#61e3a7"></stop></linearGradient><path fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)" fill-rule="evenodd" d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z" clip-rule="evenodd"></path>
            </svg>
        },
        {
            value: 'App Store', label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" style={{ marginRight: '5px' }} viewBox="0 0 48 48">
                        <linearGradient id="OpwYZ9nhL01h2sErtedzua_4PbFeZOKAc61_gr1" x1="24" x2="24" y1="4.617" y2="40.096" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#0a85d9"></stop></linearGradient><path fill="url(#OpwYZ9nhL01h2sErtedzua_4PbFeZOKAc61_gr1)" d="M33.9,6H14.1C9.626,6,6,9.626,6,14.1v19.8c0,4.473,3.626,8.1,8.1,8.1h19.8	c4.474,0,8.1-3.627,8.1-8.1V14.1C42,9.626,38.374,6,33.9,6z"></path><path d="M12.3,30.977c-1.378,0-2.5-1.114-2.5-2.484c0-1.37,1.122-2.484,2.5-2.484h3.798l4.869-8.309	l-1.423-2.429c-0.338-0.578-0.431-1.251-0.262-1.897c0.169-0.646,0.58-1.188,1.156-1.524c0.384-0.224,0.82-0.342,1.262-0.342	c0.885,0,1.712,0.474,2.158,1.237l0.007,0.012l0.006-0.011c0.445-0.763,1.272-1.237,2.158-1.237c0.443,0,0.879,0.119,1.263,0.343	c1.19,0.698,1.59,2.233,0.892,3.422l-6.291,10.736h3.328l0.293,0.295c0.222,0.223,0.425,0.476,0.623,0.774l0.197,0.33	c0.489,0.911,0.598,1.918,0.319,2.854l-0.211,0.714H12.3z" opacity=".05"></path><path d="M12.3,30.477c-1.103,0-2-0.89-2-1.984c0-1.094,0.897-1.984,2-1.984h4.084l5.162-8.809l-1.572-2.682	c-0.27-0.461-0.345-1-0.209-1.518c0.135-0.517,0.463-0.95,0.924-1.219c0.307-0.179,0.656-0.274,1.01-0.274	c0.708,0,1.37,0.379,1.727,0.989l0.438,0.749l0.438-0.748c0.356-0.61,1.018-0.989,1.726-0.989c0.354,0,0.703,0.095,1.01,0.274	c0.952,0.559,1.271,1.787,0.713,2.738L21.02,26.509h3.992l0.146,0.147c0.198,0.199,0.381,0.427,0.56,0.698l0.185,0.31	c0.418,0.781,0.511,1.646,0.27,2.456l-0.106,0.357H12.3z" opacity=".07"></path><path fill="#fff" d="M25.302,27.63c-0.148-0.224-0.312-0.434-0.498-0.621h-4.656l7.173-12.242	c0.419-0.715,0.179-1.634-0.535-2.053c-0.716-0.419-1.635-0.179-2.052,0.536l-0.87,1.484l-0.87-1.485	c-0.418-0.715-1.337-0.954-2.052-0.536c-0.715,0.418-0.955,1.337-0.536,2.052l1.72,2.935l-5.455,9.309H12.3	c-0.829,0-1.5,0.665-1.5,1.484c0,0.819,0.671,1.484,1.5,1.484h13.394c0.194-0.653,0.141-1.382-0.221-2.058L25.302,27.63z"></path><path d="M14.5,36.179c-0.443,0-0.879-0.119-1.263-0.344c-0.576-0.338-0.986-0.88-1.155-1.526	c-0.168-0.646-0.075-1.32,0.263-1.896l0.713-1.218l0.44-0.088C13.859,31.036,14.196,31,14.528,31l0.118,0.001	c1.081,0.032,2.06,0.494,2.766,1.3l0.476,0.542l-1.229,2.1C16.211,35.706,15.385,36.179,14.5,36.179z" opacity=".05"></path><path d="M14.5,35.679c-0.354,0-0.704-0.095-1.01-0.275c-0.46-0.27-0.789-0.704-0.924-1.221	s-0.061-1.056,0.21-1.517l0.6-1.024l0.22-0.044c0.329-0.066,0.634-0.098,0.932-0.098l0.112,0.001	c0.933,0.028,1.783,0.429,2.396,1.129l0.238,0.271l-1.047,1.789C15.87,35.3,15.208,35.679,14.5,35.679z" opacity=".07"></path><path fill="#fff" d="M14.626,32.002c-0.317-0.009-0.628,0.026-0.932,0.087l-0.487,0.831	c-0.419,0.715-0.179,1.634,0.536,2.053c0.238,0.14,0.5,0.206,0.757,0.206c0.515,0,1.017-0.266,1.295-0.741l0.865-1.477	c-0.487-0.556-1.19-0.934-2.03-0.959H14.626z"></path><path d="M33.229,36.179c-0.885,0-1.712-0.474-2.158-1.236l-6.027-10.285l-0.017-0.052	c-0.417-1.289-0.335-2.618,0.214-3.793l1.669-2.858l4.72,8.055h4.07c1.378,0,2.5,1.114,2.5,2.484c0,1.37-1.122,2.484-2.5,2.484	h-1.159l0.842,1.437c0.338,0.576,0.431,1.249,0.263,1.896s-0.579,1.188-1.155,1.526C34.109,36.06,33.673,36.179,33.229,36.179z" opacity=".05"></path><path d="M33.229,35.679c-0.708,0-1.37-0.378-1.727-0.988l-6-10.238l-0.017-0.052	c-0.361-1.118-0.288-2.317,0.208-3.376l1.216-2.081l4.433,7.565H35.7c1.103,0,2,0.89,2,1.984c0,1.094-0.897,1.984-2,1.984h-2.031	l1.283,2.19c0.271,0.461,0.345,1,0.21,1.517s-0.463,0.951-0.924,1.221C33.933,35.584,33.584,35.679,33.229,35.679z" opacity=".07"></path><path fill="#fff" d="M35.7,27.009h-4.643l-4.147-7.076l-0.763,1.303c-0.444,0.95-0.504,2.024-0.185,3.011l5.972,10.191	c0.279,0.476,0.78,0.741,1.295,0.741c0.257,0,0.519-0.066,0.757-0.206c0.715-0.419,0.954-1.338,0.535-2.053l-1.725-2.943H35.7	c0.829,0,1.5-0.665,1.5-1.484C37.2,27.674,36.529,27.009,35.7,27.009z"></path>
                    </svg>
                    <span>Google Play Store</span>
                </div>
            ), icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" style={{ marginTop: '8px' }} viewBox="0 0 48 48">
                <linearGradient id="OpwYZ9nhL01h2sErtedzua_4PbFeZOKAc61_gr1" x1="24" x2="24" y1="4.617" y2="40.096" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#0a85d9"></stop></linearGradient><path fill="url(#OpwYZ9nhL01h2sErtedzua_4PbFeZOKAc61_gr1)" d="M33.9,6H14.1C9.626,6,6,9.626,6,14.1v19.8c0,4.473,3.626,8.1,8.1,8.1h19.8	c4.474,0,8.1-3.627,8.1-8.1V14.1C42,9.626,38.374,6,33.9,6z"></path><path d="M12.3,30.977c-1.378,0-2.5-1.114-2.5-2.484c0-1.37,1.122-2.484,2.5-2.484h3.798l4.869-8.309	l-1.423-2.429c-0.338-0.578-0.431-1.251-0.262-1.897c0.169-0.646,0.58-1.188,1.156-1.524c0.384-0.224,0.82-0.342,1.262-0.342	c0.885,0,1.712,0.474,2.158,1.237l0.007,0.012l0.006-0.011c0.445-0.763,1.272-1.237,2.158-1.237c0.443,0,0.879,0.119,1.263,0.343	c1.19,0.698,1.59,2.233,0.892,3.422l-6.291,10.736h3.328l0.293,0.295c0.222,0.223,0.425,0.476,0.623,0.774l0.197,0.33	c0.489,0.911,0.598,1.918,0.319,2.854l-0.211,0.714H12.3z" opacity=".05"></path><path d="M12.3,30.477c-1.103,0-2-0.89-2-1.984c0-1.094,0.897-1.984,2-1.984h4.084l5.162-8.809l-1.572-2.682	c-0.27-0.461-0.345-1-0.209-1.518c0.135-0.517,0.463-0.95,0.924-1.219c0.307-0.179,0.656-0.274,1.01-0.274	c0.708,0,1.37,0.379,1.727,0.989l0.438,0.749l0.438-0.748c0.356-0.61,1.018-0.989,1.726-0.989c0.354,0,0.703,0.095,1.01,0.274	c0.952,0.559,1.271,1.787,0.713,2.738L21.02,26.509h3.992l0.146,0.147c0.198,0.199,0.381,0.427,0.56,0.698l0.185,0.31	c0.418,0.781,0.511,1.646,0.27,2.456l-0.106,0.357H12.3z" opacity=".07"></path><path fill="#fff" d="M25.302,27.63c-0.148-0.224-0.312-0.434-0.498-0.621h-4.656l7.173-12.242	c0.419-0.715,0.179-1.634-0.535-2.053c-0.716-0.419-1.635-0.179-2.052,0.536l-0.87,1.484l-0.87-1.485	c-0.418-0.715-1.337-0.954-2.052-0.536c-0.715,0.418-0.955,1.337-0.536,2.052l1.72,2.935l-5.455,9.309H12.3	c-0.829,0-1.5,0.665-1.5,1.484c0,0.819,0.671,1.484,1.5,1.484h13.394c0.194-0.653,0.141-1.382-0.221-2.058L25.302,27.63z"></path><path d="M14.5,36.179c-0.443,0-0.879-0.119-1.263-0.344c-0.576-0.338-0.986-0.88-1.155-1.526	c-0.168-0.646-0.075-1.32,0.263-1.896l0.713-1.218l0.44-0.088C13.859,31.036,14.196,31,14.528,31l0.118,0.001	c1.081,0.032,2.06,0.494,2.766,1.3l0.476,0.542l-1.229,2.1C16.211,35.706,15.385,36.179,14.5,36.179z" opacity=".05"></path><path d="M14.5,35.679c-0.354,0-0.704-0.095-1.01-0.275c-0.46-0.27-0.789-0.704-0.924-1.221	s-0.061-1.056,0.21-1.517l0.6-1.024l0.22-0.044c0.329-0.066,0.634-0.098,0.932-0.098l0.112,0.001	c0.933,0.028,1.783,0.429,2.396,1.129l0.238,0.271l-1.047,1.789C15.87,35.3,15.208,35.679,14.5,35.679z" opacity=".07"></path><path fill="#fff" d="M14.626,32.002c-0.317-0.009-0.628,0.026-0.932,0.087l-0.487,0.831	c-0.419,0.715-0.179,1.634,0.536,2.053c0.238,0.14,0.5,0.206,0.757,0.206c0.515,0,1.017-0.266,1.295-0.741l0.865-1.477	c-0.487-0.556-1.19-0.934-2.03-0.959H14.626z"></path><path d="M33.229,36.179c-0.885,0-1.712-0.474-2.158-1.236l-6.027-10.285l-0.017-0.052	c-0.417-1.289-0.335-2.618,0.214-3.793l1.669-2.858l4.72,8.055h4.07c1.378,0,2.5,1.114,2.5,2.484c0,1.37-1.122,2.484-2.5,2.484	h-1.159l0.842,1.437c0.338,0.576,0.431,1.249,0.263,1.896s-0.579,1.188-1.155,1.526C34.109,36.06,33.673,36.179,33.229,36.179z" opacity=".05"></path><path d="M33.229,35.679c-0.708,0-1.37-0.378-1.727-0.988l-6-10.238l-0.017-0.052	c-0.361-1.118-0.288-2.317,0.208-3.376l1.216-2.081l4.433,7.565H35.7c1.103,0,2,0.89,2,1.984c0,1.094-0.897,1.984-2,1.984h-2.031	l1.283,2.19c0.271,0.461,0.345,1,0.21,1.517s-0.463,0.951-0.924,1.221C33.933,35.584,33.584,35.679,33.229,35.679z" opacity=".07"></path><path fill="#fff" d="M35.7,27.009h-4.643l-4.147-7.076l-0.763,1.303c-0.444,0.95-0.504,2.024-0.185,3.011l5.972,10.191	c0.279,0.476,0.78,0.741,1.295,0.741c0.257,0,0.519-0.066,0.757-0.206c0.715-0.419,0.954-1.338,0.535-2.053l-1.725-2.943H35.7	c0.829,0,1.5-0.665,1.5-1.484C37.2,27.674,36.529,27.009,35.7,27.009z"></path>
            </svg>
        }
    ];

    const handleMultiSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                // Handle form submission logic here
                console.log(values);
                actions.setSubmitting(false);
            }}
        >
            {({ setFieldValue }) => (
                <Form className="max-w-4xl mx-auto mt-8 relative">
                    <div className="w-full bg-gray-100 p-6 rounded-lg">
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
                                    onChange={handleTitleChange}

                                />
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
                                />
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

                        {selectedOptions.map(option => (
                            <div className="flex items-center mb-4" key={option.value}>
                                <label htmlFor={`input_${option.value}`} className="mb-2">{option.icon}</label>
                                <Field
                                    type="text"
                                    id={`input_${option.value}`}
                                    name={`input_${option.value}`}
                                    placeholder={`Write the URL of ${option.value}`}
                                    className="w-full md:w-80 border border-gray-300 rounded p-2 ml-2"
                                />
                            </div>
                        ))}

                        <div className="flex items-center mb-4">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );

};

export default AppForm;
