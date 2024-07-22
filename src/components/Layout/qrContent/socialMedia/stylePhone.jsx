import React, { useState, useEffect, useRef } from 'react';
import logot from "../../../../assets/imgs/google.png";
import { SocialButton, SocialButtonM } from './socialButtons';

export const WebLinkPhone = ({ socialFormValues }) => {
    console.log('Initial socialFormValues:', socialFormValues);

    const [showImage, setShowImage] = useState(true);
    const initialValues = useRef(socialFormValues);

    useEffect(() => {
        console.log('useEffect triggered');
        console.log('Current socialFormValues:', socialFormValues);
        console.log('Initial values:', initialValues.current);

        // Function to compare if current values differ from initial values
        const hasChanged = (current, initial) => {
            const keysToCompare = ['title', 'description', 'backgroundColor', 'boxColor', 'titleColor', 'descriptionColor', 'selectedOptions'];
            return keysToCompare.some(key => {
                if (key === 'selectedOptions') {
                    return current[key].length !== initial[key].length || 
                           current[key].some((opt, index) => opt.value !== initial[key][index].value);
                }
                return current[key] !== initial[key];
            });
        };

        // Check if any of the values (excluding image) have changed from initial values
        if (hasChanged(socialFormValues, initialValues.current)) {
            console.log('Values have changed, setting showImage to false');
            setShowImage(false);
        }

        // If a new image is provided, show the image
        if (socialFormValues.image && socialFormValues.image !== logot) {
            console.log('New image provided, setting showImage to true');
            setShowImage(true);
        }
    }, [socialFormValues]);

    console.log('Current showImage state:', showImage);
    console.log(socialFormValues)
    const data = Array.isArray(socialFormValues.selectedOptions) 
        ? socialFormValues.selectedOptions.map(option => ({
            name: option.value.charAt(0).toUpperCase() + option.value.slice(1),
            url: option.url // Include URL
        })) 
        : [];

    return (
        <div className='ml-2 flex flex-col h-full items-center rounded-t-[52px] rounded-b-[50px] w-full p-5' 
            style={{ 
                background: socialFormValues.backgroundColor, 
                minHeight: '670px', 
                maxHeight: '670px', 
                minWidth: '350px', 
                maxWidth: '350px' 
            }}
        >
            <div className='flex flex-col items-center mt-28 w-[97%] bg-white rounded-2xl' 
                style={{ background: socialFormValues.boxColor }}
            >
                {showImage && (
                    <div className='relative bg-white rounded-2xl -mt-14 border-4 shadow-lg' 
                        style={{ borderColor: socialFormValues.borderColor }}
                    >
                        <img className='w-20' src={socialFormValues.image ? `data:image/png;base64,${socialFormValues.image}` : logot} alt="" />
                    </div>
                )}
                <div className="mt-4 mb-2 w-[90%] text-center">
                    <h1 className="text-2xl mb-2 font-bold" style={{ color: socialFormValues.titleColor }}>
                        {socialFormValues.title}
                    </h1>
                    <div className="break-words overflow-y-auto max-h-[200px] custom-scrollbar text-lg leading-relaxed relative"
                        style={{ color: socialFormValues.descriptionColor }}
                    >
                        {socialFormValues.description}
                    </div>
                </div>
            </div>
            <SocialButtonM data={data} />
        </div>
    );
};
